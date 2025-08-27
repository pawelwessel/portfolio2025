"use client";
import { auth } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { fetchUser } from "@/utils/fetchUser";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

export default function InitUser() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe: undefined | (() => void);
    if (user && !loading) {
      // Initial fetch for SSR compatibility
      fetchUser(user?.uid)
        .then((res) => {
          if (res && !res.error) {
            dispatch(setUser(res));
          } else {
            console.error("Failed to fetch user data:", res?.error);
          }
        })
        .catch((error) => {
          console.error("Error in InitUser:", error);
        });

      // Live updates from Firestore
      const ref = doc(db, "users", user.uid);
      unsubscribe = onSnapshot(ref, (snap) => {
        const data = snap.data();
        if (data) {
          dispatch(setUser(data as any));
        }
      });
    }
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [user, loading, dispatch]);

  return <div></div>;
}
