"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser, initialState } from "@/redux/slices/user";
import DownloadApp from "./Navigation/DownloadApp";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  FaGem,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  // FaDownload,
  FaBookOpen,
  FaMapMarkerAlt,
  FaBell,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import LoginRegisterPopup from "./User/LoginRegisterPopup";
import Image from "next/image";
import logo from "@/public/naily-logo.png";
import HeaderSearch from "@/components/SearchBar/HeaderSearch";

declare global {
  interface Window {
    openLoginRegisterPopup?: (
      _tab?: "login" | "register",
      _accountType?: "salon" | "individual"
    ) => void;
  }
}

// Minimal type for the non-standard PWA install event
type NavBeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice?: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  platforms?: string[];
};

export default function Header({
  landing,
  isUserProfile,
}: {
  landing?: boolean;
  isUserProfile?: boolean;
}) {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [loginPopupTab, setLoginPopupTab] = useState<"login" | "register">(
    "login"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDashboardRoute, setIsDashboardRoute] = useState(false);
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  const [dashboardNotificationCount, setDashboardNotificationCount] =
    useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollYRef = useRef(0);
  const isTickingRef = useRef(false);
  const [, /* pwaPrompt */ setPwaPrompt] =
    useState<NavBeforeInstallPromptEvent | null>(null);
  const [defaultAccountType, setDefaultAccountType] = useState<
    "salon" | "individual" | undefined
  >(undefined);

  const handleScroll = useCallback(() => {
    if (isTickingRef.current) return;
    isTickingRef.current = true;
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      const delta = currentY - lastScrollYRef.current;
      const atTopNow = currentY <= 8;
      setIsAtTop(atTopNow);

      if (!isMobileMenuOpen) {
        if (atTopNow) {
          setIsHeaderVisible(true);
        } else if (delta > 6) {
          setIsHeaderVisible(false);
        } else if (delta < -6) {
          setIsHeaderVisible(true);
        }
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentY;
      isTickingRef.current = false;
    });
  }, [isMobileMenuOpen]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY || 0;
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    } as EventListenerOptions);
    return () =>
      window.removeEventListener("scroll", handleScroll as EventListener);
  }, [handleScroll]);

  // Capture PWA install prompt for custom triggers (mobile menu & bottom bar)
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPwaPrompt(e as unknown as NavBeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
  }, []);

  // Dashboard bridge: detect route and subscribe to dashboard state
  useEffect(() => {
    try {
      const path = window.location?.pathname || "";
      setIsDashboardRoute(
        path === "/dashboard" || path.startsWith("/dashboard")
      );
    } catch (_e) {}

    const handleMenuState = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      setDashboardMenuOpen(Boolean(ce.detail));
    };
    const handleNotificationCount = (e: Event) => {
      const ce = e as CustomEvent<number>;
      setDashboardNotificationCount(Number(ce.detail) || 0);
    };

    window.addEventListener(
      "dashboard:menu-state",
      handleMenuState as unknown as EventListener
    );
    window.addEventListener(
      "dashboard:notification-count",
      handleNotificationCount as unknown as EventListener
    );

    return () => {
      window.removeEventListener(
        "dashboard:menu-state",
        handleMenuState as unknown as EventListener
      );
      window.removeEventListener(
        "dashboard:notification-count",
        handleNotificationCount as unknown as EventListener
      );
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  const logout = () => {
    signOut(auth);
    dispatch(setUser(initialState.user));
    setIsMobileMenuOpen(false);
  };

  const handleViewPublicProfile = () => {
    try {
      if (user?.userSlugUrl) {
        window.open(`/u/${user.userSlugUrl}`, "_blank");
      } else if (user?.uid) {
        window.open(`/u/${user.uid}`, "_blank");
      }
    } catch (_e) {}
  };

  const openLoginPopup = (
    tab: "login" | "register" = "login",
    accountType?: "salon" | "individual"
  ) => {
    setLoginPopupTab(tab);
    if (accountType) setDefaultAccountType(accountType);
    setIsLoginPopupOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (isDashboardRoute) {
      try {
        window.dispatchEvent(new Event("dashboard:toggle-menu"));
      } catch (_e) {}
    } else {
      setIsMobileMenuOpen((prev) => !prev);
    }
  };

  const openLoginPopupRef = useRef(openLoginPopup);
  openLoginPopupRef.current = openLoginPopup;

  useEffect(() => {
    window.openLoginRegisterPopup = (...args) =>
      openLoginPopupRef.current(...args);
    return () => {
      window.openLoginRegisterPopup = undefined;
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 will-change-transform duration-300 ease-in-out ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isAtTop
            ? isUserProfile
              ? "bg-black/60 backdrop-blur-md"
              : "bg-transparent"
            : "bg-black/60 backdrop-blur-md"
        } `}
      >
        {/* Main Header */}
        <div className="bg-transparent">
          <div className="container-professional">
            <div className="flex py-3 justify-between items-center">
              <div className="flex flex-row items-center">
                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className={`lg:hidden mobile-menu-button p-2 rounded-md ${
                    landing
                      ? "text-white"
                      : !isAtTop
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {(isDashboardRoute ? dashboardMenuOpen : isMobileMenuOpen) ? (
                    <FaTimes className="text-lg" />
                  ) : (
                    <FaBars className="text-lg" />
                  )}
                </button>
                <Link href="/" className="p-2 ">
                  <Image
                    src={logo}
                    alt="Logo Naily.pl - Pierwszej strony internetowej poświęconej manicurzystkom i pedicurzystkom"
                    width={200}
                    height={150}
                    className="h-auto min-w-10 lg:min-w-28 max-w-16"
                  />
                </Link>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden lg:flex rounded-xl p-2 h-max space-x-6 px-3 items-center">
                <nav className="flex items-center space-x-6">
                  <Link
                    href="/"
                    className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                      isUserProfile ? "text-white" : ""
                    } ${
                      landing
                        ? "text-white"
                        : !isAtTop
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    Strona główna
                  </Link>
                  <Link
                    href="/manicure-pedicure/warszawa"
                    className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                      isUserProfile ? "text-white" : ""
                    } ${
                      landing
                        ? "text-white"
                        : !isAtTop
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    Usługi
                  </Link>
                  <Link
                    href="/blog"
                    className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                      isUserProfile ? "text-white" : ""
                    } ${
                      landing
                        ? "text-white"
                        : !isAtTop
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/influencer-program"
                    className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                      isUserProfile ? "text-white" : ""
                    } ${
                      landing
                        ? "text-white"
                        : !isAtTop
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    Program influencerów
                  </Link>
                  {isDashboardRoute && (
                    <button
                      onClick={() => {
                        try {
                          window.dispatchEvent(
                            new CustomEvent("dashboard:set-tab", {
                              detail: "notifications",
                            })
                          );
                        } catch (_e) {}
                      }}
                      className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                        isUserProfile ? "text-white" : ""
                      } ${
                        landing
                          ? "text-white"
                          : !isAtTop
                          ? "text-white"
                          : "text-black"
                      }`}
                      title="Powiadomienia"
                      aria-label="Powiadomienia"
                    >
                      Powiadomienia
                      {dashboardNotificationCount > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] w-5 h-5">
                          {dashboardNotificationCount}
                        </span>
                      )}
                    </button>
                  )}
                </nav>

                <div className="flex items-center space-x-4">
                  {user?.uid ? (
                    <>
                      {isDashboardRoute ? (
                        <>
                          <button
                            onClick={() => {
                              try {
                                window.dispatchEvent(
                                  new CustomEvent("dashboard:set-tab", {
                                    detail: "settings",
                                  })
                                );
                              } catch (_e) {}
                            }}
                            className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                              isUserProfile ? "text-white" : ""
                            } ${
                              landing
                                ? "text-white"
                                : !isAtTop
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            Ustawienia
                          </button>
                          <button
                            onClick={handleViewPublicProfile}
                            className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                              isUserProfile ? "text-white" : ""
                            } ${
                              landing
                                ? "text-white"
                                : !isAtTop
                                ? "text-white"
                                : "text-black"
                            }`}
                            title="Zobacz profil publiczny"
                          >
                            Mój profil
                          </button>
                          <button
                            onClick={logout}
                            className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                              isUserProfile ? "text-white" : ""
                            } ${
                              landing
                                ? "text-white"
                                : !isAtTop
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            Wyloguj
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/dashboard"
                            className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                              isUserProfile ? "text-white" : ""
                            } ${
                              landing
                                ? "text-white"
                                : !isAtTop
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            Dashboard
                          </Link>
                          <button
                            onClick={logout}
                            className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                              isUserProfile ? "text-white" : ""
                            } ${
                              landing
                                ? "text-white"
                                : !isAtTop
                                ? "text-white"
                                : "text-black"
                            }`}
                          >
                            Wyloguj
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => openLoginPopup()}
                      className={`text-sm transition-colors duration-200 font-medium whitespace-nowrap ${
                        isUserProfile ? "text-white" : ""
                      } ${
                        landing
                          ? "text-white"
                          : !isAtTop
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      Zaloguj
                    </button>
                  )}
                </div>
                <DownloadApp />
              </div>

              {/* Right actions on mobile when on dashboard */}
              {isDashboardRoute && (
                <div className="flex lg:hidden items-center gap-2">
                  <button
                    onClick={() => {
                      try {
                        window.dispatchEvent(
                          new CustomEvent("dashboard:set-tab", {
                            detail: "notifications",
                          })
                        );
                      } catch (_e) {}
                    }}
                    aria-label="Powiadomienia"
                    className="relative p-2 text-white/90"
                  >
                    <FaBell className="h-5 w-5" />
                    {dashboardNotificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-red-600 text-white text-[10px] leading-4 text-center">
                        {dashboardNotificationCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleViewPublicProfile}
                    aria-label="Zobacz profil publiczny"
                    title="Zobacz profil publiczny"
                    className="p-2 text-white/90"
                  >
                    <FaExternalLinkAlt className="h-5 w-5" />
                  </button>
                  <button
                    onClick={logout}
                    aria-label="Wyloguj"
                    title="Wyloguj"
                    className="p-2 text-white/90"
                  >
                    <FaSignOutAlt className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu (site-wide). Hidden on dashboard where dashboard drawer is used */}

        {/* Bottom Navigation - Always visible on Mobile */}
      </header>
      {/* Enhanced Backdrop */}
      {!isDashboardRoute && (
        <div
          onClick={toggleMobileMenu}
          className={`fixed z-[40] inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        />
      )}
      {!isDashboardRoute && (
        <div
          className={`mobile-menu fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-out z-50 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-[-100vw]"
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside menu from closing it
        >
          <div className="h-full flex flex-col">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-accent-50">
              <div className="flex items-center gap-3">
                <Image
                  src={logo}
                  alt="Logo Naily.pl"
                  width={100}
                  height={50}
                  className="h-16 w-auto"
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(false);
                }}
                className="h-6 w-6 flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 transition-colors rounded-full"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Enhanced Navigation Links */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Header Search (mobile) */}
              <div className="mb-4">
                <HeaderSearch />
              </div>
              <nav className="space-y-2">
                <Link
                  href="/"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-4 p-4 rounded-lg text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <FaHome className="text-lg text-primary-600" />
                  </div>
                  <div>
                    <span className="font-medium text-sm">Strona główna</span>
                    <p className="text-xs text-neutral-500">
                      Powrót do strony głównej
                    </p>
                  </div>
                </Link>

                <Link
                  href="/manicure-pedicure/warszawa"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-4 p-4 rounded-lg text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <FaGem className="text-lg text-primary-600" />
                  </div>
                  <div>
                    <span className="font-medium text-sm">Usługi</span>
                    <p className="text-xs text-neutral-500">
                      Znajdź usługi manicure
                    </p>
                  </div>
                </Link>

                <Link
                  href="/blog"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-4 p-4 rounded-lg text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <FaBookOpen className="text-lg text-primary-600" />
                  </div>
                  <div>
                    <span className="font-medium text-sm">Blog</span>
                    <p className="text-xs text-neutral-500">
                      Artykuły i porady
                    </p>
                  </div>
                </Link>

                {user?.uid && (
                  <Link
                    href="/dashboard"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-4 p-4 rounded-lg text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <MdDashboard className="text-lg text-primary-600" />
                    </div>
                    <div>
                      <span className="font-medium text-sm">Dashboard</span>
                      <p className="text-xs text-neutral-500">
                        Panel użytkownika
                      </p>
                    </div>
                  </Link>
                )}
              </nav>
            </div>

            {/* Enhanced User Section */}
            <div className="p-6 border-t border-neutral-200 bg-neutral-50">
              {user?.uid ? (
                <div>
                  <div className="flex flex-col text-center items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                    <div className="aspect-square min-w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <FaUser className="text-primary-600 text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-neutral-900">
                        {user.name || "Użytkownik"}
                      </p>
                      <p className="text-xs text-neutral-500">{user.email}</p>
                    </div>

                    <button
                      onClick={handleViewPublicProfile}
                      className="flex text-xs text-white transition-colors duration-200 font-medium whitespace-nowrap flex-col bg-yellow-500 p-2 rounded-lg text-wrap mt-2 mx-auto gap-1 justify-center items-center"
                    >
                      Zobacz profil
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      logout();
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-lg text-neutral-700 hover:bg-white hover:text-primary-600 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-neutral-200 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                      <FaSignOutAlt className="text-lg text-neutral-600 group-hover:text-primary-600" />
                    </div>
                    <div>
                      <span className="font-medium text-sm">Wyloguj</span>
                      <p className="text-xs text-neutral-500">Zamknij sesję</p>
                    </div>
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openLoginPopup();
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-lg text-neutral-700 hover:bg-white hover:text-primary-600 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-neutral-200 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <FaUser className="text-lg text-neutral-600 group-hover:text-primary-600" />
                  </div>
                  <div>
                    <span className="font-medium text-sm">Zaloguj</span>
                    <p className="text-xs text-neutral-500">Dostęp do konta</p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login/Register Popup */}
      <LoginRegisterPopup
        isOpen={isLoginPopupOpen}
        onClose={closeLoginPopup}
        defaultTab={loginPopupTab}
        defaultAccountType={defaultAccountType}
      />
    </>
  );
}
