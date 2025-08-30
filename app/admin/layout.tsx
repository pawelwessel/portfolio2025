"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./LoginPage";
import Loading from "./loading";
import { app, auth } from "@/common/firebase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import Toast from "@/components/Toast";
import Assistant from "@/components/assistant/Assistant";
import Nav from "@/components/Nav";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setNavOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Toast />

      {/* <Assistant messages={assistantMessages} mode={mode} setMode={setMode} /> */}
      {!loading && (
        <div className="relative w-full overflow-x-hidden font-coco bg-[#404149] font-sans pb-48">
          {user ? (
            <>
              <Nav isNavOpen={isNavOpen} setNavOpen={setNavOpen} />
              <div className={` duration-500 w-full pt-24 scrollbar`}>
                <Link href="/" className="absolute left-20 top-6 z-50">
                  <Image
                    src="/logo-quixy.png"
                    width={200}
                    height={200}
                    alt=""
                    className="w-[150px]"
                  />
                </Link>

                {children}
              </div>
            </>
          ) : (
            <LoginPage />
          )}
        </div>
      )}
      {loading && <Loading />}
    </>
  );
}
