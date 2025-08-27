"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
  FaGem,
  FaCheck,
} from "react-icons/fa";
import UserSlugInput from "@/components/User/UserSlugInput";

interface FastConfigurationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FastConfigurationPopup({
  isOpen,
  onClose,
}: FastConfigurationPopupProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    location: user?.location?.address || "",
    userSlugUrl: user?.userSlugUrl || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Update formData when user data changes
  useEffect(() => {
    if (user) {
      const next = {
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        location: user.location?.address || "",
        userSlugUrl: user.userSlugUrl || "",
      };
      // Prevent infinite loops by only setting when something actually changed
      setFormData((prev) =>
        prev.name === next.name &&
        prev.email === next.email &&
        prev.phoneNumber === next.phoneNumber &&
        prev.location === next.location &&
        prev.userSlugUrl === next.userSlugUrl
          ? prev
          : next
      );
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const id = toast.loading("Aktualizuję profil...", {
      position: "top-right",
      isLoading: true,
    });

    try {
      if (!user?.uid) {
        toast.update(id, {
          render: "Błąd: Użytkownik nie jest zalogowany",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      // Normalize slug (basic safety)
      const normalizedSlug = (formData.userSlugUrl || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      // Ensure slug uniqueness if provided
      if (normalizedSlug) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userSlugUrl", "==", normalizedSlug));
        const snap = await getDocs(q);
        let conflict = false;
        snap.forEach((docSnap) => {
          const data = docSnap.data();
          if (data?.uid && data.uid !== user.uid) conflict = true;
        });
        if (conflict) {
          toast.update(id, {
            render: "Wybrany adres profilu jest zajęty.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          setIsLoading(false);
          return;
        }
      }

      // Update user document
      await updateDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        location: {
          ...user.location,
          address: formData.location,
        },
        userSlugUrl: normalizedSlug || user.uid,
        configured: true,
      });

      // Update Redux state
      dispatch(
        setUser({
          ...user,
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          location: {
            ...user.location,
            address: formData.location,
          },
          userSlugUrl: normalizedSlug || user.uid,
          configured: true,
        })
      );

      toast.update(id, {
        render: "Profil zaktualizowany pomyślnie!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.update(id, {
        render: "Błąd podczas aktualizacji profilu",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed w-screen inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fast-config-title"
    >
      <div className="bg-white rounded-elegant shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaGem className="text-2xl text-beauty-rose-500" />
                <div className="absolute inset-0 bg-beauty-rose-500 rounded-full blur-sm opacity-30 animate-pulse"></div>
              </div>
              <h2
                id="fast-config-title"
                className="text-elegant-xl font-bold text-beauty-charcoal"
              >
                Uzupełnij profil
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-beauty-slate hover:text-beauty-charcoal transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Welcome Message */}
          <div className="mb-3 text-center">
            <h3 className="text-elegant-lg font-semibold text-beauty-charcoal mb-2">
              Witaj w Naily!
            </h3>
            <p className="text-beauty-slate">
              Uzupełnij swoje dane, aby w pełni korzystać z platformy
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-elegant-sm font-medium text-beauty-charcoal mb-2">
                Imię i nazwisko *
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-slate" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-beauty-rose-200 rounded-elegant focus:ring-2 focus:ring-beauty-rose-500 focus:border-transparent"
                  placeholder="Wprowadź swoje imię i nazwisko"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-elegant-sm font-medium text-beauty-charcoal mb-2">
                Email *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-slate" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-beauty-rose-200 rounded-elegant focus:ring-2 focus:ring-beauty-rose-500 focus:border-transparent"
                  placeholder="twoj@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-elegant-sm font-medium text-beauty-charcoal mb-2">
                Numer telefonu
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-slate" />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-beauty-rose-200 rounded-elegant focus:ring-2 focus:ring-beauty-rose-500 focus:border-transparent"
                  placeholder="+48 123 456 789"
                />
              </div>
            </div>

            <div>
              <label className="block text-elegant-sm font-medium text-beauty-charcoal mb-2">
                Lokalizacja
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-slate" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-beauty-rose-200 rounded-elegant focus:ring-2 focus:ring-beauty-rose-500 focus:border-transparent"
                  placeholder="Miasto, dzielnica"
                />
              </div>
            </div>

            <div>
              <label className="block text-elegant-sm font-medium text-beauty-charcoal mb-2">
                Adres profilu - (np. naily.pl/u/
                <span className="text-green-500">jan-kowalski</span>)
              </label>
              <UserSlugInput
                value={formData.userSlugUrl}
                onChange={
                  // Use stable functional update to prevent re-renders from stale closures
                  (val) =>
                    setFormData((prev) =>
                      prev.userSlugUrl === val
                        ? prev
                        : { ...prev, userSlugUrl: val }
                    )
                }
                currentUid={user?.uid || ""}
                baseUrlPrefix="naily.pl/u/"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.name || !formData.email}
              className="bg-primary-600 text-white p-4 rounded-xl max-w-full block w-max mx-auto elegant-button py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Aktualizuję..." : "Zapisz i kontynuuj"}
            </button>

            {/* Skip Option */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 block text-beauty-slate hover:text-beauty-charcoal transition-colors font-medium"
            >
              Uzupełnię później
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-8 p-4 bg-beauty-rose-50 rounded-elegant">
            <h4 className="font-semibold text-beauty-charcoal mb-3">
              Korzyści z uzupełnienia profilu:
            </h4>
            <ul className="space-y-2 text-beauty-slate text-sm">
              <li className="flex items-center gap-2">
                <FaCheck className="text-beauty-rose-500 text-xs" />
                Szybsze rezerwacje usług
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-beauty-rose-500 text-xs" />
                Personalizowane rekomendacje
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-beauty-rose-500 text-xs" />
                Powiadomienia o promocjach
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-beauty-rose-500 text-xs" />
                Historia wizyt i ulubieni specjaliści
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
