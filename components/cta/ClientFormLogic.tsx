"use client";
import { pushLead } from "@/common/firebase";
import React, { useState } from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Toast from "../Toast";
import { useDispatch } from "react-redux";
import { setModalVisible } from "@/common/redux/slices/actionSlice";
import Success from "../Success";
import { useRouter } from "next/navigation";
export default function ClientFormLogic({
  searchParams,
}: {
  searchParams: any;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    name: false,
    region: false,
    phone: false,
  });
  const [formData, setFormData] = useState<any>({
    projectType: "",
    mainGoal: "",
    materials: [],
    style: "",
    hosting: "",
    timeline: "",
    budget: "",
    name: "",
    phone: "",
    email: "",
  });

  const [isSent, setIsSent] = useState<any>(false);
  const [step, setStep] = useState(0);
  const handleSubmit = () => {
    // Check for errors
    let hasError = false;
    if (!formData.name || !formData.phone) {
      toast.error("Uzupełnij dane.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      hasError = true;
      return;
    }

    // If no errors, proceed
    const id = toast.loading(<span>Wysyłanie formularza...</span>, {
      position: "bottom-right",
      theme: "dark",
    });
    if (!hasError) {
      pushLead({ ...formData, id: uuidv4() }).then(() => {
        setIsSent(true);
        toast.update(id, {
          render: (
            <span
              onClick={() => {
                dispatch(setModalVisible(""));
              }}
            >
              Formularz wysłano pomyślnie!
            </span>
          ),
          type: "success",
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          isLoading: false,
        });
        router.push("/?thankyou=true");
        setTimeout(() => {
          dispatch(setModalVisible(""));
        }, 5000);
      });
    }
  };

  return (
    <div>
      <Toast />
      {isSent && <Success />}
      <div className="flex flex-col relative pb-48">
        {formData.budget !== "" && (
          <div
            style={{ boxShadow: "0px 0px 3px black" }}
            className="rounded-xl mx-6 my-6 p-6 bg-white flex flex-col"
          >
            <div className="flex items-center flex-wrap -ml-4">
              <div className="mt-4 ml-4">
                <h2 className="sm:text-xl">Imię:</h2>

                <input
                  onFocus={() => setError({ ...error, name: false })}
                  autoComplete="name"
                  style={{ boxShadow: "0px 0px 3px black" }}
                  className={`mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500`}
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  value={formData.name}
                  placeholder="Wpisz imię"
                />
              </div>
              <div className="mt-4 ml-4">
                <h2 className="sm:text-xl">Numer telefonu:</h2>

                <input
                  onFocus={() => setError({ ...error, phone: false })}
                  autoComplete="tel"
                  style={{ boxShadow: "0px 0px 3px black" }}
                  className={`mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500`}
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  value={formData.phone}
                  placeholder="Wpisz numer"
                />
              </div>
            </div>
            {/* <div className="mt-4">
                  <h2 className="sm:text-xl">
                    Numer księgi wieczystej
                    <span className="text-sm ml-1">(opcjonalnie)</span>
                  </h2>
                  <p className="text-base text-zinc-800 text-justify font-light">
                    Podaj swój numer księgi wieczystej w celu przyspieszenia
                    weryfikacji wniosku.
                  </p>
                  <div className="flex flex-row items-center h-max">
                    <input
                      style={{ boxShadow: "0px 0px 3px black" }}
                      className={`mt-3 w-[80px] p-2 placeholder:font-light focus:outline-2 focus:outline-green-500`}
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, ownerNumber1: e.target.value })
                      }
                      value={formData.ownerNumber1}
                    />
                    <div className="px-2 mt-1.5">/</div>
                    <input
                      style={{ boxShadow: "0px 0px 3px black" }}
                      className={`mt-3 w-[80px] p-2 placeholder:font-light focus:outline-2 focus:outline-green-500`}
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, ownerNumber2: e.target.value })
                      }
                      value={formData.ownerNumber2}
                    />
                    <div className="px-2 mt-1.5">/</div>
                    <input
                      style={{ boxShadow: "0px 0px 3px black" }}
                      className={`mt-3 w-[80px] p-2 placeholder:font-light focus:outline-2 focus:outline-green-500`}
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, ownerNumber3: e.target.value })
                      }
                      value={formData.ownerNumber3}
                    />
                  </div>
                </div> */}
            <div className="">
              {isSent && (
                <div className="text-green-500 animate-pulse mt-3">
                  Dziękujemy za wypełnienie briefu!
                </div>
              )}
              <div className="flex flex-col-reverse lg:flex-row items-center w-full mt-2">
                <button
                  onClick={() =>
                    setFormData({ ...formData, houseAge: undefined })
                  }
                  className="font-light mt-2 lg:mr-4"
                >
                  Powrót
                </button>
                <button
                  disabled={isSent}
                  onClick={() => handleSubmit()}
                  className="disabled:cursor-not-allowed flex flex-row items-center justify-center py-3 px-5 w-full text-base lg:w-max bg-gradient-to-br from-[#C5FF17] to-[#33E5CF] hover:scale-105 duration-200 ease-in-out text-zinc-800 rounded-lg cursor-pointer font-bold mt-2"
                >
                  Wyślij brief <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="z-0 relative">
          {step >= 6 && (
            <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
              <span className="font-bold text-lg">
                {formData.budget !== "" && (
                  <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                    <FaCheckCircle />
                  </div>
                )}
                Pytanie 7/8
              </span>
              <label className="font-light mt-3">
                Szacowany budżet na projekt?
              </label>
              {/* do 5 tys. zł / 5–10 tys. zł / 10–20 tys. zł / powyżej 20 tys. zł / Jeszcze nie wiem */}
              {formData.timeline !== "" && (
                <div className="-ml-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, budget: "do 5 tys. zł" });
                      setStep(7);
                    }}
                    className={`${
                      formData.budget === "do 5 tys. zł"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    do 5 tys. zł
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, budget: "5–10 tys. zł" });
                      setStep(7);
                    }}
                    className={`${
                      formData.budget === "5–10 tys. zł"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    5–10 tys. zł
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, budget: "10–20 tys. zł" });
                      setStep(7);
                    }}
                    className={`${
                      formData.budget === "10–20 tys. zł"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    10–20 tys. zł
                  </button>
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        budget: "powyżej 20 tys. zł",
                      });
                      setStep(7);
                    }}
                    className={`${
                      formData.budget === "powyżej 20 tys. zł"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    powyżej 20 tys. zł
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, budget: "Jeszcze nie wiem" });
                      setStep(7);
                    }}
                    className={`${
                      formData.budget === "Jeszcze nie wiem"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Jeszcze nie wiem
                  </button>
                </div>
              )}
              {/* Add more input fields as needed */}
            </div>
          )}
          {step >= 5 && (
            <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
              <span className="font-bold text-lg">
                {formData.timeline !== "" && (
                  <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                    <FaCheckCircle />
                  </div>
                )}
                Pytanie 6/8
              </span>
              <label className="font-light mt-3">
                Kiedy chcesz wystartować ze stroną?
              </label>
              {formData.hosting !== "" && (
                <div className="-ml-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, timeline: "Jak najszybciej" });
                      setStep(6);
                    }}
                    className={`${
                      formData.timeline === "Jak najszybciej"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Jak najszybciej
                  </button>
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        timeline: "W ciągu miesiąca",
                      });
                      setStep(6);
                    }}
                    className={`${
                      formData.timeline === "W ciągu miesiąca"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    W ciągu miesiąca
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, timeline: "Za 2-3 miesiące" });
                      setStep(6);
                    }}
                    className={`${
                      formData.timeline === "Za 2-3 miesiące"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Za 2-3 miesiące
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, timeline: "Nie mam terminu" });
                      setStep(6);
                    }}
                    className={`${
                      formData.timeline === "Nie mam terminu"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Nie mam terminu
                  </button>
                </div>
              )}
            </div>
          )}
          {step >= 4 && (
            <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
              <span className="font-bold text-lg">
                {formData.hosting !== "" && (
                  <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                    <FaCheckCircle />
                  </div>
                )}
                Pytanie 5/8
              </span>
              <label className="font-light mt-3">
                Czy masz już domenę i hosting?
              </label>
              {/* Tak / Nie / Potrzebuję pomocy */}
              {formData.style !== "" && (
                <div className="-ml-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, hosting: "Tak" });
                      setStep(5);
                    }}
                    className={`${
                      formData.hosting === "Tak"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Tak
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, hosting: "Nie" });
                      setStep(5);
                    }}
                    className={`${
                      formData.hosting === "Nie"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Nie
                  </button>
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        hosting: "Potrzebuję pomocy",
                      });
                      setStep(5);
                    }}
                    className={`${
                      formData.hosting === "Potrzebuję pomocy"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Potrzebuję pomocy
                  </button>
                </div>
              )}
            </div>
          )}
          {step >= 3 && (
            <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
              <span className="font-bold text-lg">
                {formData.style !== "" && (
                  <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                    <FaCheckCircle />
                  </div>
                )}
                Pytanie 4/8
              </span>
              <label className="font-light mt-3">
                Jaki styl strony najbardziej Ci odpowiada?
              </label>
              {/* Nowoczesny / Minimalistyczny / Klasyczny / Nie mam zdania */}
              {formData.materials.length > 0 && (
                <div className="-ml-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, style: "Nowoczesny" });
                      setStep(4);
                    }}
                    className={`${
                      formData.style === "Nowoczesny"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Nowoczesny
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, style: "Minimalistyczny" });
                      setStep(4);
                    }}
                    className={`${
                      formData.style === "Minimalistyczny"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Minimalistyczny
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, style: "Klasyczny" });
                      setStep(4);
                    }}
                    className={`${
                      formData.style === "Klasyczny"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Klasyczny
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, style: "Nie mam zdania" });
                      setStep(4);
                    }}
                    className={`${
                      formData.style === "Nie mam zdania"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Nie mam zdania
                  </button>
                </div>
              )}
            </div>
          )}
          {step >= 2 && (
            <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
              <span className="font-bold text-lg">
                {formData.materials.length > 0 && (
                  <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                    <FaCheckCircle />
                  </div>
                )}
                Pytanie 3/8
              </span>
              <label className="font-light mt-3">Czy masz już materiały?</label>
              {formData.mainGoal !== "" && (
                <div className="-ml-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {/* Logo / Teksty / Zdjęcia / Nic jeszcze */}
                  <button
                    onClick={() => {
                      if (formData.materials === "Nic jeszcze") {
                        setFormData({ ...formData, materials: ["Logo"] });
                      } else {
                        const newMaterials = formData.materials?.includes(
                          "Logo"
                        )
                          ? formData.materials.filter(
                              (m: string) => m !== "Logo"
                            )
                          : [...(formData.materials || []), "Logo"];
                        setFormData({ ...formData, materials: newMaterials });
                      }
                      setStep(3);
                    }}
                    className={`${
                      formData.materials?.includes("Logo")
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Logo
                  </button>
                  <button
                    onClick={() => {
                      if (formData.materials === "Nic jeszcze") {
                        setFormData({ ...formData, materials: ["Teksty"] });
                      } else {
                        const newMaterials = formData.materials?.includes(
                          "Teksty"
                        )
                          ? formData.materials.filter(
                              (m: string) => m !== "Teksty"
                            )
                          : [...(formData.materials || []), "Teksty"];
                        setFormData({ ...formData, materials: newMaterials });
                      }
                      setStep(3);
                    }}
                    className={`${
                      formData.materials?.includes("Teksty")
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Teksty
                  </button>
                  <button
                    onClick={() => {
                      if (formData.materials === "Nic jeszcze") {
                        setFormData({ ...formData, materials: ["Zdjęcia"] });
                      } else {
                        const newMaterials = formData.materials?.includes(
                          "Zdjęcia"
                        )
                          ? formData.materials.filter(
                              (m: string) => m !== "Zdjęcia"
                            )
                          : [...(formData.materials || []), "Zdjęcia"];
                        setFormData({ ...formData, materials: newMaterials });
                      }
                      setStep(3);
                    }}
                    className={`${
                      formData.materials?.includes("Zdjęcia")
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Zdjęcia
                  </button>
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        materials: "Nic jeszcze",
                      });
                      setStep(3);
                    }}
                    className={`${
                      formData.materials === "Nic jeszcze"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Nic jeszcze
                  </button>
                </div>
              )}
            </div>
          )}
          {step >= 1 && (
            <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
              <span className="font-bold text-lg">
                {formData.mainGoal !== "" && (
                  <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                    <FaCheckCircle />
                  </div>
                )}
                Pytanie 2/8
              </span>
              <label className="font-light mt-3">
                Jaki jest główny cel tej strony?
              </label>
              {formData.projectType !== "" && (
                <div className="-ml-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Pozyskiwanie klientów / Sprzedaż online / Prezentacja firmy / Inne */}
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        mainGoal: "Pozyskiwanie klientów",
                      });
                      setStep(2);
                    }}
                    className={`${
                      formData.mainGoal === "Pozyskiwanie klientów"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Pozyskiwanie klientów
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, mainGoal: "Sprzedaż online" });
                      setStep(2);
                    }}
                    className={`${
                      formData.mainGoal === "Sprzedaż online"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Sprzedaż online
                  </button>
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        mainGoal: "Prezentacja firmy",
                      });
                      setStep(2);
                    }}
                    className={`${
                      formData.mainGoal === "Prezentacja firmy"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Prezentacja firmy
                  </button>
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        mainGoal: "Inne",
                      });
                      setStep(2);
                    }}
                    className={`${
                      formData.mainGoal === "Inne"
                        ? "border-black"
                        : "border-green-500"
                    } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                  >
                    Inne
                  </button>
                </div>
              )}
            </div>
          )}
          {step >= 0 && (
            <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
              <span className="font-bold text-lg">
                {formData.projectType !== "" && (
                  <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                    <FaCheckCircle />
                  </div>
                )}
                Pytanie 1/8
              </span>
              <label className="font-light mt-3">
                Jaki typ strony chcesz stworzyć?
              </label>
              <div className="-ml-2 flex flex-row flex-wrap">
                {/* Strona firmowa / Sklep internetowy / Landing page / Inne */}
                <button
                  onClick={() => {
                    setFormData({ ...formData, projectType: "Strona firmowa" });
                    setStep(1);
                  }}
                  className={`${
                    formData.projectType === "Strona firmowa"
                      ? "border-black"
                      : "border-green-500"
                  } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                >
                  Strona firmowa
                </button>
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      projectType: "Sklep internetowy",
                    });
                    setStep(1);
                  }}
                  className={`${
                    formData.projectType === "Sklep internetowy"
                      ? "border-black"
                      : "border-green-500"
                  } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                >
                  Sklep internetowy
                </button>
                <button
                  onClick={() => {
                    setFormData({ ...formData, projectType: "Landing page" });
                    setStep(1);
                  }}
                  className={`${
                    formData.projectType === "Landing page"
                      ? "border-black"
                      : "border-green-500"
                  } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                >
                  Landing page
                </button>
                <button
                  onClick={() => {
                    setFormData({ ...formData, projectType: "Inne" });
                    setStep(1);
                  }}
                  className={`${
                    formData.projectType === "Inne"
                      ? "border-black"
                      : "border-green-500"
                  } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                >
                  Inne
                </button>
              </div>
              {/* Add more input fields as needed */}
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
