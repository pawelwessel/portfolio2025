"use client";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { pushLead } from "@/common/firebase";
import { usePhoneModal } from "@/common/context/PhoneModalContext";

export default function PhoneModal() {
  const { isOpen, close } = usePhoneModal();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!phone) {
      toast.error("Podaj numer telefonu", { position: "bottom-right" });
      return;
    }
    try {
      setLoading(true);
      await pushLead({
        id: uuidv4(),
        phone,
        name,
        createdAt: Date.now(),
        type: "phone",
      });
      toast.success("Dziękujemy! Oddzwonimy.", { position: "bottom-right" });
      setPhone("");
      setName("");
      close();
    } catch (e) {
      toast.error("Błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`fixed left-0 top-0 w-full h-full z-[99999999999999] font-gotham ${
        isOpen ? "translate-x-0" : "-translate-x-[400vw]"
      }`}
    >
      <button
        onClick={close}
        style={{ boxShadow: "0 0 5px 0 white" }}
        className={`fixed z-[9999] border border-black bg-white bg-opacity-80 text-white text-4xl top-5 right-5 p-2 rounded-xl w-10 h-10 flex items-center justify-center ${
          isOpen ? "translate-x-0 duration-[1000ms]" : "translate-x-[100vw]"
        }`}
      >
        <IoIosClose className="w-10 h-10 text-black" />
      </button>
      <div
        onClick={close}
        className={`w-full h-full bg-black duration-500 ${
          isOpen ? "bg-opacity-80" : "bg-opacity-0"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${
            isOpen ? "fixed -translate-y-0" : "-translate-y-[100vh]"
          } duration-500 delay-500 left-1/2 -translate-x-1/2 top-0 w-[85vw] lg:max-w-[70vw] xl:max-w-[60vw] h-[60vh] bg-white overflow-y-auto max-h-[80vh] rounded-b-3xl overflow-x-hidden p-6`}
        >
          <h2 className="text-2xl xl:text-4xl font-bold text-blue-500">
            Podaj numer telefonu
          </h2>
          <p className="text-gray-600 mt-2">Oddzwonimy możliwie najszybciej.</p>
          <div className="mt-6 grid gap-3">
            <input
              placeholder="Imię (opcjonalnie)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-3 text-zinc-800"
            />
            <input
              placeholder="Numer telefonu"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded p-3 text-zinc-800"
            />
            <button
              disabled={loading}
              onClick={submit}
              className="py-3 px-5 bg-green-500 hover:bg-green-600 text-white rounded font-bold disabled:opacity-60"
            >
              Wyślij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
