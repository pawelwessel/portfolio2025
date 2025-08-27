"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaClock,
  FaMoneyBillWave,
  FaUser,
  FaInfoCircle,
  FaCheck,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdAttachMoney, MdSchedule, MdCategory } from "react-icons/md";
import { FaMagic } from "react-icons/fa";
import { updateUser } from "@/firebase";
import { setUser } from "@/redux/slices/user";

// In production we initialize from the logged-in user's services if present

const serviceCategories = [
  "Manicure",
  "Pedicure",
  "Przedłużanie",
  "Naprawa",
  "Stylizacja",
  "Pielęgnacja",
  "Inne",
];

export default function ServiceConfiguration() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    category: "",
    features: [""],
    active: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const generateFlattenName = (realName) =>
    String(realName || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");

  useEffect(() => {
    if (user?.services && Array.isArray(user.services)) {
      // Normalize to internal shape
      const normalized = user.services.map((s, idx) => ({
        id: s.id ?? idx + 1,
        name: s.real_name || s.name || "",
        price: Number(s.price) || 0,
        duration: Number(s.duration) || 0,
        description: s.description || "",
        category: s.category || "Inne",
        active: s.active ?? true,
        features: Array.isArray(s.features) ? s.features : [],
      }));
      setServices(normalized);
    } else {
      setServices([]);
    }
  }, [user]);

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      duration: "",
      description: "",
      category: "",
      features: [""],
      active: true,
    });
    setEditingService(null);
  };

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures.length > 0 ? newFeatures : [""],
    });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.duration ||
      !formData.category
    ) {
      toast.error("Proszę wypełnić wszystkie wymagane pola");
      return;
    }

    const serviceData = {
      ...formData,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      features: formData.features.filter((f) => f.trim() !== ""),
    };

    // Persist to Firestore as IService-compatible object
    const persistItem = {
      real_name: serviceData.name,
      flatten_name: generateFlattenName(serviceData.name),
      price: serviceData.price,
      duration: serviceData.duration,
      description: serviceData.description,
      isCustomService: true,
      // keep extras
      category: serviceData.category,
      features: serviceData.features,
      active: serviceData.active,
    };

    const currentUserServices = Array.isArray(user?.services)
      ? [...user.services]
      : [];

    const targetIndex = editingService
      ? currentUserServices.findIndex(
          (s) =>
            (s?.flatten_name || generateFlattenName(s?.real_name || "")) ===
            generateFlattenName(editingService.name)
        )
      : currentUserServices.findIndex(
          (s) =>
            (s?.flatten_name || generateFlattenName(s?.real_name || "")) ===
            persistItem.flatten_name
        );

    let updatedForUser;
    if (targetIndex >= 0) {
      updatedForUser = [...currentUserServices];
      updatedForUser[targetIndex] = persistItem;
    } else {
      updatedForUser = [...currentUserServices, persistItem];
    }

    // Update Firestore and Redux, then local UI state
    if (!user?.uid) {
      toast.error("Brak zalogowanego użytkownika");
      return;
    }
    updateUser(user.uid, { services: updatedForUser })
      .then(() => {
        dispatch(setUser({ ...user, services: updatedForUser }));

        if (editingService) {
          setServices(
            services.map((s) =>
              s.id === editingService.id ? { ...s, ...serviceData } : s
            )
          );
          toast.success("Usługa została zaktualizowana!");
        } else {
          const newService = { ...serviceData, id: Date.now() };
          setServices([...services, newService]);
          toast.success("Usługa została dodana!");
        }

        setShowForm(false);
        resetForm();
      })
      .catch(() => {
        toast.error("Nie udało się zapisać usługi");
      });
  };

  const handleGenerate = async () => {
    if (!formData.name || isGenerating) return;
    try {
      setIsGenerating(true);
      const res = await fetch("/api/services/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
        }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      setFormData({
        name: data.name || formData.name,
        price: data.price ? String(data.price) : formData.price,
        duration: data.duration ? String(data.duration) : formData.duration,
        description: data.description || formData.description,
        category: data.category || formData.category,
        features:
          Array.isArray(data.features) && data.features.length > 0
            ? data.features
            : formData.features,
        active: true,
      });
      toast.success("Wygenerowano propozycję usługi");
    } catch (_e) {
      toast.error("Nie udało się wygenerować usługi");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      price: service.price.toString(),
      duration: service.duration.toString(),
      description: service.description,
      category: service.category,
      features: service.features.length > 0 ? service.features : [""],
      active: service.active,
    });
    setShowForm(true);
  };

  const handleDelete = (serviceId) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę usługę?")) return;
    const toDelete = services.find((s) => s.id === serviceId);
    setServices(services.filter((s) => s.id !== serviceId));

    // Sync deletion to Firestore
    try {
      const currentUserServices = Array.isArray(user?.services)
        ? [...user.services]
        : [];
      const updatedForUser = currentUserServices.filter(
        (s) =>
          (s?.flatten_name || generateFlattenName(s?.real_name || "")) !==
          (toDelete ? generateFlattenName(toDelete.name) : "__none__")
      );
      if (user?.uid) {
        updateUser(user.uid, { services: updatedForUser });
        dispatch(setUser({ ...user, services: updatedForUser }));
      }
      toast.success("Usługa została usunięta!");
    } catch (_e) {
      toast.error("Nie udało się zaktualizować usług");
    }
  };

  const toggleServiceStatus = (serviceId) => {
    const updatedLocal = services.map((s) =>
      s.id === serviceId ? { ...s, active: !s.active } : s
    );
    setServices(updatedLocal);

    // Persist active flag alongside the service if it exists in user.services
    const changed = updatedLocal.find((s) => s.id === serviceId);
    if (!changed || !user?.uid) return;
    const currentUserServices = Array.isArray(user?.services)
      ? [...user.services]
      : [];
    const idx = currentUserServices.findIndex(
      (s) =>
        (s?.flatten_name || generateFlattenName(s?.real_name || "")) ===
        generateFlattenName(changed.name)
    );
    if (idx >= 0) {
      const updatedForUser = [...currentUserServices];
      updatedForUser[idx] = { ...updatedForUser[idx], active: changed.active };
      updateUser(user.uid, { services: updatedForUser })
        .then(() => dispatch(setUser({ ...user, services: updatedForUser })))
        .catch(() => {});
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Manicure":
        return "bg-pink-100 text-pink-800";
      case "Pedicure":
        return "bg-purple-100 text-purple-800";
      case "Przedłużanie":
        return "bg-blue-100 text-blue-800";
      case "Naprawa":
        return "bg-orange-100 text-orange-800";
      case "Stylizacja":
        return "bg-green-100 text-green-800";
      case "Pielęgnacja":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-black">Konfiguracja usług</h2>
          <p className="text-neutral-500">
            Dodaj i zarządzaj swoimi usługami, które klienci będą mogli
            rezerwować
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors"
        >
          <FaPlus />
          <span>Dodaj usługę</span>
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.length === 0 ? (
          <div className="text-center py-8">
            <MdCategory className="text-4xl text-black mx-auto mb-4" />
            <p className="text-black mb-4">Nie masz jeszcze żadnych usług</p>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-rose-500 text-white px-4 py-2 rounded-elegant hover:bg-rose-600 transition-colors"
            >
              Dodaj pierwszą usługę
            </button>
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className={`bg-white border rounded-elegant p-4 hover:shadow-elegant transition-all ${
                service.active
                  ? "border-rose-200"
                  : "border-gray-300 opacity-75"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-black">
                        {service.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          service.category
                        )}`}
                      >
                        {service.category}
                      </span>
                      {!service.active && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          Nieaktywna
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-black mb-2">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-black">
                    <div className="flex items-center gap-1">
                      <MdAttachMoney className="text-rose-500" />
                      <span>{service.price} zł</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdSchedule className="text-rose-500" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUser className="text-rose-500" />
                      <span>{service.features.length} funkcji</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => toggleServiceStatus(service.id)}
                    className={`p-2 rounded-full transition-colors ${
                      service.active
                        ? "text-green-600 hover:bg-green-100"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title={service.active ? "Dezaktywuj" : "Aktywuj"}
                  >
                    {service.active ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-rose-500 hover:bg-rose-100 rounded-full transition-colors"
                    title="Edytuj"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    title="Usuń"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Service Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-elegant p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-black">
                {editingService ? "Edytuj usługę" : "Dodaj nową usługę"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="text-black hover:text-black"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Nazwa usługi *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-elegant focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="np. Manicure hybrydowy"
                    />
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={!formData.name || isGenerating}
                      className="whitespace-nowrap px-3 py-2 rounded-elegant bg-rose-600 text-white hover:bg-rose-700 disabled:bg-gray-300 disabled:text-gray-600 flex items-center gap-2"
                      title="Wygeneruj szczegóły usługi"
                    >
                      <FaMagic />
                      <span>{isGenerating ? "Generuję..." : "Wygeneruj"}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Kategoria *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-rose-200 rounded-elegant focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Wybierz kategorię</option>
                    {serviceCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Cena (zł) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-rose-200 rounded-elegant focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="80"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Czas trwania (min) *
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-rose-200 rounded-elegant focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="60"
                    min="15"
                    step="15"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Opis usługi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-rose-200 rounded-elegant focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  rows="3"
                  placeholder="Opisz szczegóły usługi..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Funkcje/usługi w pakiecie
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-rose-200 rounded-elegant focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="np. Przygotowanie płytki"
                      />
                      {formData.features.length > 1 && (
                        <button
                          onClick={() => handleRemoveFeature(index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={handleAddFeature}
                    className="flex items-center gap-2 text-rose-500 hover:text-rose-600 text-sm"
                  >
                    <FaPlus />
                    <span>Dodaj funkcję</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="rounded border-rose-200 text-rose-500 focus:ring-rose-500"
                />
                <label htmlFor="active" className="text-sm text-black">
                  Usługa aktywna (widoczna dla klientów)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-rose-500 text-white py-2 px-4 rounded-elegant hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FaSave />
                  <span>
                    {editingService ? "Zapisz zmiany" : "Dodaj usługę"}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-elegant hover:bg-gray-300 transition-colors"
                >
                  Anuluj
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
