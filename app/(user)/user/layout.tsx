"use client";
import { auth } from "@/common/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import InitializeUser from "@/components/quixyComponents/InitializeUser";
import Settings from "@/components/quixyComponents/Dashboard/Settings/Settings";
import QuixiesModule from "@/components/quixyComponents/Dashboard/QuixiesModule";
import { ThemeProvider } from "@/common/context/ThemeContext";
import Hero from "@/components/hero/Hero";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setNavOpen] = useState(true);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [loading]);
  const { light } = useSelector((state: any) => state);
  return (
    <div className="w-full bg-black/90 relative pt-[65px] lg:pt-[94px] pb-[50vh]">
      <div className="h-full w-full fixed left-0 top-0">
        <Hero />
      </div>
      <ThemeProvider>
        <div className="z-[9999999999999999999999999999999]">
          <Settings isNavOpen={isNavOpen} />
          <QuixiesModule />
        </div>
        <div className="w-full relative">
          <InitializeUser />

          <div className="relative h-full w-full flex flex-col lg:flex-row">
            <Nav setNavOpen={setNavOpen} isNavOpen={isNavOpen} />

            <div className={`duration-300 w-full`}>{children}</div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
