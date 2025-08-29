import Link from "next/link";

export default function SearchJobs() {
  return (
    <div className="flex flex-col">
      <h2 className="text-white w-max max-w-full text-3xl xl:text-5xl font-extrabold">
        <Link title="oferta" href="/oferta">
          Zapoznaj się z naszą ofertą
        </Link>
      </h2>
      <div className="flex flex-row">
        <h2 className="mt-3 max-w-xl text-white">
          Zatrudniaj specjalistów lub realizuj zlecenia – Twój sukces zaczyna
          się tutaj!
        </h2>
      </div>
    </div>
  );
}
