"use client";
import { usePhoneModal } from "@/common/context/PhoneModalContext";
export default function Cta({ label }: { label: string }) {
  const { open } = usePhoneModal();
  return (
    <>
      <button
        onClick={() => open()}
        className={`py-3 px-5 text-sm lg:text-base mt-4 hover:scale-110 duration-200 in-out text-white rounded-lg cursor-pointer bg-green-500 w-max max-w-full`}
      >
        {label || "Zostaw brief – odezwiemy się do Ciebie"}
      </button>
    </>
  );
}
