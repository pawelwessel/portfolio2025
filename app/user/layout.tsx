"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/common/firebase/index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) router.push("/praca-zdalna/login");
  }, [user, loading]);
  return <>{children}</>;
}
