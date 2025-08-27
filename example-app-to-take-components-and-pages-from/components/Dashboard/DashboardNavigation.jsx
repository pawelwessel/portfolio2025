"use client";
import {
  MdDashboard,
  MdBookOnline,
  MdSettings,
  MdAttachMoney,
  MdCategory,
  MdNotifications,
  MdCampaign,
  MdLogout,
  MdPhotoLibrary,
} from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { cn } from "@/lib/utils";
import styles from "./dashboardChips.module.css";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardNavigation({
  activeTab,
  setActiveTab,
  notificationCount,
  layout = "auto",
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigationItems = [
    { id: "overview", label: "Przegląd", icon: MdDashboard },
    { id: "reservations", label: "Rezerwacje", icon: MdBookOnline },
    // { id: "pricing", label: "Plan i płatności", icon: MdAttachMoney },
    // { id: "ads", label: "Reklama", icon: MdCampaign },
    { id: "portfolio", label: "Portfolio prac", icon: MdPhotoLibrary },
    { id: "services", label: "Usługi", icon: MdCategory },
    { id: "favorites", label: "Ulubione", icon: FaHeart },
    { id: "notifications", label: "Powiadomienia", icon: MdNotifications },
    { id: "settings", label: "Ustawienia konta", icon: MdSettings },
    { id: "logout", label: "Wyloguj", icon: MdLogout },
  ];

  const onSelectTab = (id) => {
    if (id === "logout") {
      handleLogout();
    } else {
      setActiveTab(id);
    }
  };

  const SidebarNav = (
    <nav
      className="flex flex-col h-full bg-white border-r border-gray-200 md:sticky md:top-0 md:h-[calc(100vh-16px)]"
      aria-label="Nawigacja boczna dashboardu"
    >
      <div className="p-4">
        <Image
          src="/naily-logo.png"
          alt="Naily Logo"
          width={100}
          height={40}
          className="h-10 w-auto"
        />
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors",
                "hover:bg-gray-100",
                isActive ? "text-primary-600 bg-primary-50" : "text-gray-700"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" aria-hidden />
              <span>{item.label}</span>
              {item.id === "notifications" && notificationCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {notificationCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );

  const TopChipsNav = (
    <div className={styles.chipsNavWrapper}>
      <div className={styles.chipsInner}>
        <nav className={styles.chipsScroller} aria-label="Nawigacja dashboardu">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={cn(
                  styles.chipButton,
                  isActive && styles.chipButtonActive
                )}
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                title={item.label}
              >
                {Icon && <Icon className={styles.chipIcon} aria-hidden />}
                <span>{item.label}</span>
                {item.id === "notifications" && notificationCount > 0 && (
                  <span className={styles.badgeCount}>{notificationCount}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  if (layout === "sidebar") return SidebarNav;
  if (layout === "top") return TopChipsNav;

  return (
    <>
      <div className="hidden lg:block">{SidebarNav}</div>
      <div className="lg:hidden">{TopChipsNav}</div>
    </>
  );
}
