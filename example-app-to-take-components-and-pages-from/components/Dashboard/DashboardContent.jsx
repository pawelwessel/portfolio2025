"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user";
import { updateUser as updateUserDoc } from "@/firebase";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaCog,
  FaShieldAlt,
  FaPalette,
  FaBell,
  FaCalendarAlt,
  FaCrown,
  FaListUl,
  FaHeart,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import ReservationManager from "@/components/User/Dashboard/ReservationManager";
import PremiumTab from "@/components/User/Payments/PremiumTab";
import AdsTab from "@/components/User/Payments/Pricing/AdsTab";
import ServiceConfiguration from "@/components/User/Dashboard/ServiceConfiguration";
import FavoritesManager from "@/components/User/Dashboard/FavoritesManager";
import NotificationManager from "@/components/User/Dashboard/NotificationManager";
import PortfolioManager from "@/components/User/Dashboard/PortfolioManager";
import DashboardOverview from "./DashboardOverview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { auth } from "@/firebase";
import { updateEmail as updateAuthEmail } from "firebase/auth";

export default function DashboardContent({
  activeTab,
  user,
  firebaseUser,
  dashboardData,
  getStatusColor,
  getStatusText,
  setActiveTab,
}) {
  // Premium tab is now an inline, interactive experience (no modal)
  const isSubscribed = Boolean(
    user?.subscription?.status === "active" ||
      user?.premiumActive ||
      user?.active
  );
  const dispatch = useDispatch();

  function getSafeSettings(u) {
    return (
      u?.settings || {
        emailNotifications: false,
        autoReminders: false,
        darkMode: false,
        twoFactorEnabled: false,
        publicProfile: true,
      }
    );
  }

  // Inline edit states for basic information
  const [editing, setEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [formValues, setFormValues] = useState({
    name: user?.name || "",
    email: firebaseUser?.email || user?.email || "",
    phone: user?.phoneNumber || user?.phone || "",
  });

  useEffect(() => {
    setFormValues({
      name: user?.name || "",
      email: firebaseUser?.email || user?.email || "",
      phone: user?.phoneNumber || user?.phone || "",
    });
  }, [
    user?.name,
    user?.phoneNumber,
    user?.phone,
    firebaseUser?.email,
    user?.email,
  ]);

  async function saveBasicField(fieldKey) {
    if (!user?.uid) return;
    const updates = {};
    if (fieldKey === "name") updates.name = formValues.name;
    if (fieldKey === "phone") updates.phoneNumber = formValues.phone;
    if (fieldKey === "email") updates.email = formValues.email;

    const nextUser = { ...user, ...updates };
    // Optimistic update
    dispatch(setUser(nextUser));
    try {
      await updateUserDoc(user.uid, updates);
      if (fieldKey === "email" && auth?.currentUser && formValues.email) {
        try {
          await updateAuthEmail(auth.currentUser, formValues.email);
        } catch (_) {
          // Ignore auth email update failure; the Firestore email is updated
        }
      }
      setEditing((prev) => ({ ...prev, [fieldKey]: false }));
    } catch (e) {
      // Revert on failure
      dispatch(setUser(user));
    }
  }

  // Google metadata configuration state
  const [metaDraft, setMetaDraft] = useState({
    seoTitle: user?.metadata?.seoTitle || "",
    seoDescription: user?.metadata?.seoDescription || "",
    seoKeywords: user?.metadata?.seoKeywords || "",
  });

  useEffect(() => {
    setMetaDraft({
      seoTitle: user?.metadata?.seoTitle || "",
      seoDescription: user?.metadata?.seoDescription || "",
      seoKeywords: user?.metadata?.seoKeywords || "",
    });
  }, [
    user?.metadata?.seoTitle,
    user?.metadata?.seoDescription,
    user?.metadata?.seoKeywords,
  ]);

  async function saveMetadata() {
    if (!user?.uid) return;
    const next = {
      ...user,
      metadata: { ...(user?.metadata || {}), ...metaDraft },
    };
    dispatch(setUser(next));
    try {
      await updateUserDoc(user.uid, { metadata: next.metadata });
    } catch (e) {
      dispatch(setUser(user));
    }
  }

  async function toggleSetting(settingKey) {
    if (!user?.uid) return;
    const currentSettings = getSafeSettings(user);
    const nextSettings = {
      ...currentSettings,
      [settingKey]: !Boolean(currentSettings?.[settingKey]),
    };
    const nextUser = { ...user, settings: nextSettings };
    // Optimistic update
    dispatch(setUser(nextUser));
    try {
      await updateUserDoc(user.uid, { settings: nextSettings });
    } catch (e) {
      // Revert on failure
      dispatch(setUser(user));
    }
  }

  async function changeFont(fontKey) {
    if (!user?.uid) return;
    const currentSettings = getSafeSettings(user);
    const nextSettings = {
      ...currentSettings,
      fontFamily: fontKey,
    };
    const nextUser = { ...user, settings: nextSettings };
    dispatch(setUser(nextUser));
    try {
      await updateUserDoc(user.uid, { settings: nextSettings });
    } catch (e) {
      dispatch(setUser(user));
    }
  }

  return (
    <div className="lg:col-span-3">
      {activeTab === "overview" && (
        <Card className="shadow-sm rounded-xl">
          <CardContent className="p-6 w-full">
            <DashboardOverview
              setActiveTab={setActiveTab}
              dashboardData={dashboardData}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
            />
          </CardContent>
        </Card>
      )}

      {activeTab === "reservations" && (
        <Card className="w-full shadow-sm rounded-xl">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <FaCalendarAlt className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Twoje rezerwacje</CardTitle>
                <CardDescription>
                  Zarządzaj nadchodzącymi wizytami, akceptuj lub zmieniaj
                  terminy.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 w-full">
            <ReservationManager />
          </CardContent>
        </Card>
      )}

      {activeTab === "notifications" && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <FaBell className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Powiadomienia</CardTitle>
                <CardDescription>
                  Bądź na bieżąco — tutaj znajdziesz aktualizacje dotyczące
                  Twojego konta i rezerwacji.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <NotificationManager />
          </CardContent>
        </Card>
      )}

      {activeTab === "pricing" && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <FaCrown className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Plan i płatności</CardTitle>
                <CardDescription>
                  Wybierz plan, który najlepiej pasuje do Twoich potrzeb i opłać
                  subskrypcję.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <PremiumTab user={user} />
          </CardContent>
        </Card>
      )}

      {activeTab === "ads" && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <FaCrown className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Reklama</CardTitle>
                <CardDescription>
                  Zarządzaj budżetem reklamowym i włącz promocję w Google.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <AdsTab user={user} />
          </CardContent>
        </Card>
      )}

      {activeTab === "services" && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <FaListUl className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Moje usługi</CardTitle>
                <CardDescription>
                  Dodawaj, edytuj i organizuj usługi, które oferujesz.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ServiceConfiguration />
          </CardContent>
        </Card>
      )}

      {activeTab === "portfolio" && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <FaPalette className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Portfolio prac</CardTitle>
                <CardDescription>
                  Dodawaj zdjęcia swoich realizacji i zarządzaj nimi.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <PortfolioManager uid={user?.uid} />
          </CardContent>
        </Card>
      )}

      {activeTab === "favorites" && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <FaHeart className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Ulubione</CardTitle>
                <CardDescription>
                  Zapisuj miejsca i specjalistów, do których chcesz wrócić.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <FavoritesManager />
          </CardContent>
        </Card>
      )}

      {activeTab === "settings" && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <FaCog className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Ustawienia konta</CardTitle>
                <CardDescription>
                  Zarządzaj danymi profilu, preferencjami, prywatnością i
                  bezpieczeństwem.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 md:space-y-4">
              {/* Profile Information */}
              <div className="bg-neutral-50 rounded-md p-3 md:p-4 body-font">
                <h3 className="text-sm md:text-base font-semibold text-neutral-900 mb-2 md:mb-3">
                  Informacje podstawowe
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <FaUser className="text-primary-600 flex-shrink-0 text-sm" />
                    <span className="text-xs md:text-sm text-neutral-600">
                      Imię i nazwisko:
                    </span>
                    {!editing.name ? (
                      <>
                        <span className="font-medium text-neutral-900 text-xs md:text-sm truncate">
                          {user?.name || "Nie ustawiono"}
                        </span>
                        <button
                          onClick={() =>
                            setEditing((p) => ({ ...p, name: true }))
                          }
                          className="text-primary-600 hover:text-primary-700 flex-shrink-0 p-1"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          className="text-xs md:text-sm border border-neutral-300 rounded-md px-2 py-1 flex-1"
                          value={formValues.name}
                          onChange={(e) =>
                            setFormValues((v) => ({
                              ...v,
                              name: e.target.value,
                            }))
                          }
                        />
                        <button
                          onClick={() => saveBasicField("name")}
                          className="text-green-600 p-1"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() =>
                            setEditing((p) => ({ ...p, name: false }))
                          }
                          className="text-neutral-500 p-1"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <FaEnvelope className="text-primary-600 flex-shrink-0 text-sm" />
                    <span className="text-xs md:text-sm text-neutral-600">
                      Email:
                    </span>
                    {!editing.email ? (
                      <>
                        <span className="font-medium text-neutral-900 text-xs md:text-sm truncate">
                          {firebaseUser?.email ||
                            user?.email ||
                            "Nie ustawiono"}
                        </span>
                        <button
                          onClick={() =>
                            setEditing((p) => ({ ...p, email: true }))
                          }
                          className="text-primary-600 hover:text-primary-700 flex-shrink-0 p-1"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          className="text-xs md:text-sm border border-neutral-300 rounded-md px-2 py-1 flex-1"
                          value={formValues.email}
                          onChange={(e) =>
                            setFormValues((v) => ({
                              ...v,
                              email: e.target.value,
                            }))
                          }
                        />
                        <button
                          onClick={() => saveBasicField("email")}
                          className="text-green-600 p-1"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() =>
                            setEditing((p) => ({ ...p, email: false }))
                          }
                          className="text-neutral-500 p-1"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <FaPhone className="text-primary-600 flex-shrink-0 text-sm" />
                    <span className="text-xs md:text-sm text-neutral-600">
                      Telefon:
                    </span>
                    {!editing.phone ? (
                      <>
                        <span className="font-medium text-neutral-900 text-xs md:text-sm truncate">
                          {user?.phoneNumber || user?.phone || "Nie ustawiono"}
                        </span>
                        <button
                          onClick={() =>
                            setEditing((p) => ({ ...p, phone: true }))
                          }
                          className="text-primary-600 hover:text-primary-700 flex-shrink-0 p-1"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          className="text-xs md:text-sm border border-neutral-300 rounded-md px-2 py-1 flex-1"
                          value={formValues.phone}
                          onChange={(e) =>
                            setFormValues((v) => ({
                              ...v,
                              phone: e.target.value,
                            }))
                          }
                        />
                        <button
                          onClick={() => saveBasicField("phone")}
                          className="text-green-600 p-1"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() =>
                            setEditing((p) => ({ ...p, phone: false }))
                          }
                          className="text-neutral-500 p-1"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Google metadata configuration */}
              <div className="bg-neutral-50 rounded-md p-3 md:p-4 body-font">
                <h3 className="text-sm md:text-base font-semibold text-neutral-900 mb-2 md:mb-3">
                  Metadane Google (SEO)
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <label className="text-xs md:text-sm text-neutral-700">
                      Tytuł (title)
                    </label>
                    <input
                      className="text-xs md:text-sm border border-neutral-300 rounded-md px-2 py-1 bg-white"
                      value={metaDraft.seoTitle}
                      onChange={(e) =>
                        setMetaDraft((v) => ({
                          ...v,
                          seoTitle: e.target.value,
                        }))
                      }
                      maxLength={60}
                      placeholder="Np. Salon manicure — nazwa marki"
                    />
                    <span className="text-[10px] text-neutral-500">
                      {metaDraft.seoTitle.length}/60
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <label className="text-xs md:text-sm text-neutral-700">
                      Opis (meta description)
                    </label>
                    <textarea
                      className="text-xs md:text-sm border border-neutral-300 rounded-md px-2 py-1 bg-white"
                      value={metaDraft.seoDescription}
                      onChange={(e) =>
                        setMetaDraft((v) => ({
                          ...v,
                          seoDescription: e.target.value,
                        }))
                      }
                      maxLength={160}
                      rows={3}
                      placeholder="Krótki opis widoczny w Google"
                    />
                    <span className="text-[10px] text-neutral-500">
                      {metaDraft.seoDescription.length}/160
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <label className="text-xs md:text-sm text-neutral-700">
                      Słowa kluczowe (opcjonalne)
                    </label>
                    <input
                      className="text-xs md:text-sm border border-neutral-300 rounded-md px-2 py-1 bg-white"
                      value={metaDraft.seoKeywords}
                      onChange={(e) =>
                        setMetaDraft((v) => ({
                          ...v,
                          seoKeywords: e.target.value,
                        }))
                      }
                      placeholder="manicure, stylizacja paznokci, pedicure"
                    />
                  </div>
                  {/* Google-like preview */}
                  <div className="bg-white rounded-md p-3 border border-neutral-200">
                    <p className="text-[#1a0dab] text-sm md:text-base leading-tight truncate">
                      {metaDraft.seoTitle || user?.name || "Tytuł strony"}
                    </p>
                    <p className="text-[#006621] text-[11px] md:text-xs truncate">
                      {`manikuracja.pl/${
                        user?.userSlugUrl || user?.uid || "profil"
                      }`}
                    </p>
                    <p className="text-neutral-700 text-[11px] md:text-xs line-clamp-2">
                      {metaDraft.seoDescription ||
                        "Podgląd opisu strony tak jak w wynikach Google."}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={saveMetadata}
                      className="px-3 py-1.5 text-xs md:text-sm rounded-md bg-primary-600 text-white"
                    >
                      Zapisz metadane
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferences (trimmed per spec) */}
              <div className="bg-neutral-50 rounded-md p-3 md:p-4 body-font">
                <h3 className="text-sm md:text-base font-semibold text-neutral-900 mb-2 md:mb-3">
                  Preferencje
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white rounded-md">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <FaBell className="text-primary-600 flex-shrink-0 text-sm" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-neutral-900 text-xs md:text-sm">
                          Powiadomienia email
                        </p>
                        <p className="text-xs md:text-sm text-neutral-600 truncate">
                          Otrzymuj powiadomienia na email
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSetting("emailNotifications")}
                      className={`w-10 h-5 rounded-full relative flex-shrink-0 ${
                        getSafeSettings(user).emailNotifications
                          ? "bg-primary-600"
                          : "bg-neutral-300"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-transform ${
                          getSafeSettings(user).emailNotifications
                            ? "right-1"
                            : "left-1"
                        }`}
                      ></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-white rounded-md">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <FaCog className="text-primary-600 flex-shrink-0 text-sm" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-neutral-900 text-xs md:text-sm">
                          Automatyczne przypomnienia
                        </p>
                        <p className="text-xs md:text-sm text-neutral-600 truncate">
                          Przypomnienia o nadchodzących wizytach
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSetting("autoReminders")}
                      className={`w-10 h-5 rounded-full relative flex-shrink-0 ${
                        getSafeSettings(user).autoReminders
                          ? "bg-primary-600"
                          : "bg-neutral-300"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-transform ${
                          getSafeSettings(user).autoReminders
                            ? "right-1"
                            : "left-1"
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy & Security (trimmed per spec) */}
              <div className="bg-neutral-50 rounded-md p-3 md:p-4 body-font">
                <h3 className="text-sm md:text-base font-semibold text-neutral-900 mb-2 md:mb-3">
                  Prywatność i bezpieczeństwo
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white rounded-md">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <FaUser className="text-primary-600 flex-shrink-0 text-sm" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-neutral-900 text-xs md:text-sm">
                          Profil publiczny
                        </p>
                        <p className="text-xs md:text-sm text-neutral-600 truncate">
                          Pokaż swój profil innym użytkownikom
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSetting("publicProfile")}
                      className={`w-10 h-5 rounded-full relative flex-shrink-0 ${
                        getSafeSettings(user).publicProfile
                          ? "bg-primary-600"
                          : "bg-neutral-300"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-transform ${
                          getSafeSettings(user).publicProfile
                            ? "right-1"
                            : "left-1"
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-red-50 rounded-md p-3 md:p-4">
                <h3 className="text-sm md:text-base font-semibold text-red-800 mb-2 md:mb-3">
                  Akcje konta
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <button className="w-full text-left p-2 bg-white rounded-md text-red-600 hover:bg-red-50 transition-colors">
                    <p className="font-medium text-xs md:text-sm">Usuń konto</p>
                    <p className="text-xs md:text-sm text-red-500">
                      Trwale usuń swoje konto i wszystkie dane
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
