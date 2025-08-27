"use client";
import { useEffect, useState } from "react";
import Cta from "../cta/Cta";
export default function Header() {
  const [supportsPWA, setSupportsPWA] = useState<any>(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window?.addEventListener("beforeinstallprompt", handler);

    return () => window?.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  return (
    <header className="fixed left-0 top-3 xl:top-9 w-full z-[500] font-sans">
      <div className="w-[98vw] mx-auto flex flex-row justify-end px-6">
        <Cta label="Darmowa wycena" />
      </div>
    </header>
  );
}
