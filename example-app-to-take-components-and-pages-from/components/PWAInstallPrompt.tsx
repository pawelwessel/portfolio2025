"use client";

import React from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const LOCAL_STORAGE_KEYS = {
  installDismissed: "pwaInstallPromptDismissed",
  installed: "pwaInstalled",
};

function isIosSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent || navigator.vendor;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  return isIOS && isSafari;
}

export default function PWAInstallPrompt() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [isIosHint, setIsIosHint] = React.useState(false);

  React.useEffect(() => {
    const wasDismissed =
      typeof window !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE_KEYS.installDismissed) === "true";
    const alreadyInstalled =
      typeof window !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE_KEYS.installed) === "true";
    if (alreadyInstalled || wasDismissed) return;

    function handleBeforeInstallPrompt(e: Event) {
      // Prevent the mini-infobar on mobile
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show after 4 seconds
      setTimeout(() => setIsVisible(true), 4000);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", () => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.installed, "true");
      } catch {}
      setIsVisible(false);
    });

    // iOS Safari doesn't fire beforeinstallprompt; show hint after 4s
    if (isIosSafari()) {
      setIsIosHint(true);
      setTimeout(() => setIsVisible(true), 4000);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const onInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    try {
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEYS.installed, "true");
        } catch {}
        setIsVisible(false);
      } else {
        // keep visible; user can try later
      }
    } catch {}
  };

  const onClose = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.installDismissed, "true");
    } catch {}
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-[9999] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[420px]"
      role="dialog"
      aria-modal="true"
      aria-label="Zainstaluj aplikację Naily"
    >
      <div className="professional-card bg-white shadow-2xl rounded-2xl border border-purple-100 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center text-white font-semibold">
            N
          </div>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Zainstaluj aplikację Naily
            </h3>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
              Tak, jak w Booksy — tylko że u nas za darmo. Dodatkowo tworzymy
              kampanie marketingowe, współpracujemy z influencerami od manicure
              i robimy to z miłości do manicure i pedicure.
            </p>
            {isIosHint ? (
              <p className="mt-2 text-xs text-gray-500">
                Na iPhone: stuknij przycisk Udostępnij i wybierz „Dodaj do
                ekranu głównego”.
              </p>
            ) : null}
            <div className="mt-3 flex items-center gap-2">
              {!isIosHint && (
                <button
                  onClick={onInstallClick}
                  className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  Zainstaluj aplikację
                </button>
              )}
              <button
                onClick={onClose}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                Później
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
