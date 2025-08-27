"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { storage, db } from "@/firebase";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export default function PortfolioManager({ uid }) {
  const [items, setItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const colRef = useMemo(
    () => (uid ? collection(db, "users", uid, "portfolio") : null),
    [uid]
  );

  useEffect(() => {
    if (!colRef) return;
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [colRef]);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleFiles(files) {
    if (!uid || !files?.length) return;
    const fileArray = Array.from(files);
    setIsUploading(true);
    setProgress(0);
    try {
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        const id = uuidv4();
        const path = `users/${uid}/portfolio/${id}-${file.name}`;
        const sRef = storageRef(storage, path);
        const task = uploadBytesResumable(sRef, file);
        task.on("state_changed", (snap) => {
          const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(Math.round(pct));
        });
        await task;
        const url = await getDownloadURL(sRef);
        await addDoc(colRef, {
          id,
          url,
          path,
          title: file.name,
          createdAt: serverTimestamp(),
        });
      }
    } finally {
      setIsUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function updateTitle(itemId, title) {
    if (!colRef || !itemId) return;
    await updateDoc(doc(colRef, itemId), { title });
  }

  async function removeItem(item) {
    if (!colRef || !item?.id) return;
    try {
      await deleteDoc(doc(colRef, item.id));
    } finally {
      if (item.path) {
        try {
          await deleteObject(storageRef(storage, item.path));
        } catch (_) {}
      }
    }
  }

  return (
    <div className="w-full">
      {!uid && (
        <div className="p-4 mb-4 border border-neutral-200 rounded-md bg-neutral-50 text-sm text-neutral-700">
          Zaloguj się, aby zarządzać swoim portfolio.
        </div>
      )}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-semibold">Portfolio prac</h3>
          <p className="text-sm text-neutral-600">
            Dodawaj zdjęcia swoich realizacji i zarządzaj nimi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button
            onClick={openFilePicker}
            className="px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
          >
            Dodaj zdjęcia
          </button>
        </div>
      </div>

      {isUploading && (
        <div className="mb-4">
          <div className="h-2 rounded bg-neutral-200 overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-neutral-600 mt-1">
            Wgrywanie: {progress}%
          </p>
        </div>
      )}

      {items.length === 0 && !isUploading ? (
        <div className="text-center py-12 border border-dashed border-neutral-300 rounded-lg bg-white">
          <p className="text-neutral-700 mb-2">Brak zdjęć w portfolio</p>
          <p className="text-sm text-neutral-500 mb-4">
            Kliknij „Dodaj zdjęcia”, aby rozpocząć.
          </p>
          <button
            onClick={openFilePicker}
            className="px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
          >
            Dodaj zdjęcia
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-neutral-200 rounded-lg overflow-hidden bg-white"
            >
              <div className="relative w-full h-56 bg-neutral-100">
                {item.url && (
                  <Image
                    src={item.url}
                    alt={item.title || "portfolio"}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-3 flex items-center gap-2">
                <input
                  defaultValue={item.title || "Bez tytułu"}
                  onBlur={(e) => updateTitle(item.id, e.target.value)}
                  className="flex-1 border border-neutral-300 rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={() => removeItem(item)}
                  className="px-2 py-1 text-sm rounded-md bg-red-50 text-red-700 hover:bg-red-100"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
