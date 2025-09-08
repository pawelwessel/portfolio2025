import Hero from "@/components/hero/Hero";
import Image from "next/image";
import Link from "next/link";
import ChooseTime from "./ChooseTime";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="min-h-screen w-full relative font-sans">
      <Link href="/" className="absolute left-8 top-6 xl:top-12 z-[501]">
        <Image
          src="/assets/quixy-logo.png"
          width={400}
          height={400}
          alt=""
          className="w-[150px] sm:w-[200px]"
        />
      </Link>
      <div className="bg-zinc-800 h-screen w-full fixed left-0 top-0">
        <Hero />
      </div>
      <div className="relative z-50 flex items-center justify-center h-full py-48">
        <div className="bg-black bg-opacity-50 rounded-xl h-max flex items-center justify-center flex-col mx-8 lg:mx-24 xl:mx-36 2xl:mx-64 p-3">
          <ChooseTime linkId={params.id} />
        </div>
      </div>
    </div>
  );
}
