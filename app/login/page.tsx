"use client";
import { useState, useEffect } from "react";
import { auth, getDocument } from "@/common/firebase/index";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onLogin() {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/praca-zdalna/user");
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Zaloguj się</h1>
        <label className="block text-sm">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 text-black"
          type="email"
        />
        <label className="block text-sm">Hasło</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 text-black"
          type="password"
        />
        <button
          disabled={loading}
          onClick={onLogin}
          className="w-full bg-[#126b91] text-white py-2 disabled:opacity-60"
        >
          {loading ? "Loguję..." : "Zaloguj"}
        </button>
        <GoogleAuthButton />
        <p className="mt-3 text-sm">
          Nie masz konta?{" "}
          <Link
            className="text-[#126b91] underline"
            href="/praca-zdalna/register"
          >
            Zarejestruj się
          </Link>
        </p>
      </div>
    </div>
  );
}
