"use client";
import { useDispatch, useSelector } from "react-redux";
import { setModalVisible } from "@/common/redux/slices/actionSlice";
export default function Cta({ label }: { label: string }) {
  const dispatch = useDispatch();
  function setModalVisibility(action: string) {
    dispatch(setModalVisible(action));
  }
  return (
    <>
      <button
        onClick={() => setModalVisibility("client")}
        className={`py-3 px-5 text-sm lg:text-base mt-4 hover:scale-110 duration-200 in-out text-white rounded-lg cursor-pointer bg-green-500 w-max max-w-full`}
      >
        {label || "Zostaw brief – odezwiemy się do Ciebie"}
      </button>
    </>
  );
}
