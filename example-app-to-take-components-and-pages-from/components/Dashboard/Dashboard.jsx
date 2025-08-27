"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FastConfigurationPopup from "@/components/User/Dashboard/FastConfigurationPopup";
import DashboardNavigation from "./DashboardNavigation";
import DashboardContent from "./DashboardContent";
import "./dashboardTheme.css";
import { FaBell, FaCrown, FaEye, FaListUl } from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();
  const { user: reduxUser } = useSelector((state) => state.user);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [notificationCount, setNotificationCount] = useState(0);
  const [showFastConfig, setShowFastConfig] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Real user reservations data (this would come from your actual data source)
  const userReservations = [
    {
      id: 1,
      service: "Manicure hybrydowy",
      specialist: "Anna Kowalska",
      date: "2024-01-25",
      time: "14:00",
      status: "pending",
      price: 80,
      duration: 60,
      location: "Warszawa, Mokotów",
    },
    {
      id: 2,
      service: "Pedicure klasyczny",
      specialist: "Maria Nowak",
      date: "2024-01-28",
      time: "16:30",
      status: "pending",
      price: 60,
      duration: 45,
      location: "Warszawa, Śródmieście",
    },
    {
      id: 3,
      service: "Przedłużanie paznokci",
      specialist: "Joanna Dąbrowska",
      date: "2024-01-30",
      time: "10:00",
      status: "confirmed",
      price: 120,
      duration: 90,
      location: "Warszawa, Żoliborz",
    },
    {
      id: 4,
      service: "Manicure klasyczny",
      specialist: "Katarzyna Wiśniewska",
      date: "2024-02-02",
      time: "15:00",
      status: "completed",
      price: 50,
      duration: 30,
      location: "Warszawa, Wola",
    },
    {
      id: 5,
      service: "Pedicure hybrydowy",
      specialist: "Agnieszka Zielińska",
      date: "2024-02-05",
      time: "12:00",
      status: "pending",
      price: 90,
      duration: 75,
      location: "Warszawa, Ochota",
    },
  ];

  // Calculate real statistics from user data
  const calculateStats = () => {
    const totalReservations = userReservations.length;
    const completedServices = userReservations.filter(
      (r) => r.status === "completed"
    ).length;
    const pendingReservations = userReservations.filter(
      (r) => r.status === "pending"
    ).length;
    const cancelledReservations = userReservations.filter(
      (r) => r.status === "cancelled"
    ).length;
    const totalSpent = userReservations.reduce((sum, r) => sum + r.price, 0);
    const averageSpentPerService =
      totalReservations > 0 ? Math.round(totalSpent / totalReservations) : 0;

    // Calculate this month's data
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthReservations = userReservations.filter((r) => {
      const reservationDate = new Date(r.date);
      return (
        reservationDate.getMonth() === currentMonth &&
        reservationDate.getFullYear() === currentYear
      );
    });
    const thisMonthSpent = thisMonthReservations.reduce(
      (sum, r) => sum + r.price,
      0
    );

    return {
      totalReservations,
      completedServices,
      pendingReservations,
      cancelledReservations,
      totalSpent,
      averageSpentPerService,
      thisMonthReservations: thisMonthReservations.length,
      thisMonthSpent,
    };
  };

  // Calculate top services from real data
  const calculateTopServices = () => {
    const serviceStats = {};

    userReservations.forEach((reservation) => {
      if (!serviceStats[reservation.service]) {
        serviceStats[reservation.service] = { count: 0, totalSpent: 0 };
      }
      serviceStats[reservation.service].count++;
      serviceStats[reservation.service].totalSpent += reservation.price;
    });

    return Object.entries(serviceStats)
      .map(([name, stats]) => ({
        name,
        count: stats.count,
        totalSpent: stats.totalSpent,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  };

  // Get recent reservations (last 5)
  const getRecentReservations = () => {
    return userReservations
      .sort(
        (a, b) =>
          new Date(b.date + " " + b.time).getTime() -
          new Date(a.date + " " + a.time).getTime()
      )
      .slice(0, 5);
  };

  // Calculate live dashboard data
  const dashboardData = {
    stats: calculateStats(),
    recentReservations: getRecentReservations(),
    topServices: calculateTopServices(),
  };

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setFirebaseUser(authUser);

      if (!authUser) {
        // No user authenticated, redirect to home
        router.push("/");
        return;
      }

      // User is authenticated, check if Redux user data is loaded
      if (reduxUser?.uid) {
        setIsLoading(false);

        // Check if user needs fast configuration
        if (!reduxUser.configured) {
          setShowFastConfig(true);
        }
      }
      // If authUser exists but reduxUser is not loaded yet,
      // the InitUser component will handle loading it and this effect will re-run
    });

    return () => unsubscribe();
  }, [router, reduxUser]);

  // Live unread notifications badge
  useEffect(() => {
    let unsubscribe;
    if (reduxUser?.uid) {
      const { subscribeToUserUnreadCount } = require("@/firebase");
      unsubscribe = subscribeToUserUnreadCount(reduxUser.uid, (count) => {
        setNotificationCount(count || 0);
      });
    }
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [reduxUser?.uid]);

  // Bridge events between global header and dashboard
  useEffect(() => {
    const handleToggleMenu = () => {
      setIsMobileMenuOpen((prev) => !prev);
    };
    const handleSetTab = (event) => {
      try {
        const nextTab = event?.detail;
        if (typeof nextTab === "string") {
          setActiveTab(nextTab);
        }
      } catch (e) {
        // noop
      }
    };

    window.addEventListener("dashboard:toggle-menu", handleToggleMenu);
    window.addEventListener("dashboard:set-tab", handleSetTab);

    return () => {
      window.removeEventListener("dashboard:toggle-menu", handleToggleMenu);
      window.removeEventListener("dashboard:set-tab", handleSetTab);
    };
  }, []);

  // Notify global header about current dashboard menu state
  useEffect(() => {
    try {
      window.dispatchEvent(
        new CustomEvent("dashboard:menu-state", { detail: isMobileMenuOpen })
      );
    } catch (e) {
      // noop
    }
  }, [isMobileMenuOpen]);

  // Share live notification count with global header
  useEffect(() => {
    try {
      window.dispatchEvent(
        new CustomEvent("dashboard:notification-count", {
          detail: notificationCount,
        })
      );
    } catch (e) {
      // noop
    }
  }, [notificationCount]);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-success-100 text-success-800 border-success-200";
      case "pending":
        return "bg-warning-100 text-warning-800 border-warning-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-primary-100 text-primary-800 border-primary-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Potwierdzona";
      case "pending":
        return "Oczekująca";
      case "cancelled":
        return "Anulowana";
      case "completed":
        return "Ukończona";
      default:
        return "Nieznany";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mx-auto mb-3"></div>
          <p className="text-neutral-600 text-sm">Ładowanie dashboardu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-dashboard theme-dashboard-blue w-full min-h-screen">
      {/* Fast Configuration Popup */}
      {showFastConfig && (
        <FastConfigurationPopup
          isOpen={showFastConfig}
          onClose={() => setShowFastConfig(false)}
        />
      )}

      <div className="container-professional w-full">
        {/* Desktop grid: sidebar + main; Mobile uses top chips */}
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-6">
          <aside className="hidden lg:block">
            <DashboardNavigation
              layout="sidebar"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              notificationCount={notificationCount}
            />
          </aside>
          <main className="min-w-0">
            <div className="lg:hidden -mx-4 sm:mx-0">
              <DashboardNavigation
                layout="top"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                notificationCount={notificationCount}
              />
            </div>

            {/* Welcome / Quick Actions header */}
            {reduxUser?.uid && (
              <div className="mt-4">
                <div className="rounded-xl border border-neutral-200 bg-gradient-to-r from-rose-50 via-primary-50 to-purple-50 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="text-sm text-neutral-600">
                        Witaj ponownie
                      </div>
                      <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 leading-tight">
                        {reduxUser?.name || "Twój dashboard"}
                      </h1>
                      <div className="mt-1 inline-flex items-center gap-2 text-xs">
                        {Boolean(
                          reduxUser?.subscription?.status === "active" ||
                            reduxUser?.premiumActive ||
                            reduxUser?.active
                        ) ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700">
                            <FaCrown className="w-3 h-3" /> Premium
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                            <FaCrown className="w-3 h-3" /> Plan darmowy
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setActiveTab("services")}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 hover:bg-white text-neutral-800 border border-neutral-200 transition-colors"
                      >
                        <FaListUl className="w-4 h-4" /> Moje usługi
                      </button>
                      <button
                        onClick={() => setActiveTab("notifications")}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 hover:bg-white text-neutral-800 border border-neutral-200 transition-colors"
                      >
                        <FaBell className="w-4 h-4" /> Powiadomienia
                      </button>
                      <Link
                        href={`/u/${reduxUser?.userSlugUrl || reduxUser?.uid}`}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                      >
                        <FaEye className="w-4 h-4" /> Zobacz profil publiczny
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="py-6">
              <DashboardContent
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                user={reduxUser}
                firebaseUser={firebaseUser}
                dashboardData={dashboardData}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
