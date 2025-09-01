"use client";
import { useRouter } from "next/navigation";
interface RouteProps {
  to: string;
  lang: string;
  className?: string;
  children: React.ReactNode;
}
export const LinkRoute = ({ to, lang, className, children }: RouteProps) => {
  const router = useRouter();
  return (
    <button className={className} onClick={() => router.push(`/${lang}/${to}`)}>
      {children}
    </button>
  );
};
