"use client";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";

function normalizeSlug(input: string): string {
  return (input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function UserSlugInput({
  value,
  onChange,
  currentUid,
  baseUrlPrefix = "naily.pl/u/",
}: {
  value: string;
  onChange: (val: string) => void;
  currentUid: string;
  baseUrlPrefix?: string;
}) {
  const [raw, setRaw] = useState<string>(value || "");
  const normalized = useMemo(() => normalizeSlug(raw), [raw]);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const incoming = value || "";
    // Avoid redundant state updates that can cause render loops
    setRaw((prev) => (prev === incoming ? prev : incoming));
  }, [value]);

  useEffect(() => {
    const handle = setTimeout(async () => {
      if (!normalized) {
        setAvailable(null);
        return;
      }
      setChecking(true);
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userSlugUrl", "==", normalized));
        const snap = await getDocs(q);
        // Available if zero docs or only our own uid
        let ok = true;
        snap.forEach((docSnap) => {
          const data = docSnap.data();
          if (data?.uid && data.uid !== currentUid) ok = false;
        });
        setAvailable(ok);
      } catch {
        setAvailable(null);
      } finally {
        setChecking(false);
      }
    }, 400);
    return () => clearTimeout(handle);
  }, [normalized, currentUid]);

  useEffect(() => {
    // Only propagate when the normalized slug actually differs from the current value
    const current = value || "";
    if (normalized !== current) {
      onChange(normalized);
    }
    // Intentionally omit onChange from deps to avoid effect re-run due to new function identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalized, value]);

  return (
    <div>
      <input
        type="text"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        className="w-full pr-4 py-3 border border-beauty-rose-200 rounded-elegant focus:ring-2 focus:ring-beauty-rose-500 focus:border-transparent"
        placeholder="np. paznokcie-anna-warszawa"
      />
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-beauty-slate">
          Twój adres: {baseUrlPrefix}
          {(normalized || currentUid || "").toLowerCase()}
        </p>
        <span className="text-xs">
          {checking && <span className="text-gray-500">Sprawdzanie…</span>}
          {!checking && available === true && (
            <span className="text-green-600">Dostępny</span>
          )}
          {!checking && available === false && (
            <span className="text-red-600">Zajęty</span>
          )}
        </span>
      </div>
    </div>
  );
}
