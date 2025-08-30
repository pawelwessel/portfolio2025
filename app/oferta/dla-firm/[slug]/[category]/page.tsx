import Link from "next/link";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import { FaBriefcase } from "react-icons/fa";
import JobBoardList from "@/components/quixyComponents/JobBoardList";
import dynamic from "next/dynamic";
import { getServices } from "@/lib/getServices";
import { getPosts } from "@/lib/getPosts";
import { getContent } from "@/lib/getContent";
import Loadinger from "@/app/loading";
import { Suspense } from "react";
import Hero from "@/components/hero/Hero";
import InitializeUser from "@/components/quixyComponents/InitializeUser";
const BlogPostList = dynamic(
  () => import("@/components/quixyComponents/BlogPostList")
);
// Generowanie parametrów statycznych
export async function generateStaticParams() {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 600 } }
  ).then((res) => res.json());
  return jobs.flatMap((service: any) =>
    service.data.flatMap((subItem: any) => ({ category: subItem.title }))
  );
}
export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 600 } }
  ).then((res) => res.json());
  const cat: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const slug = cat?.data.find(
    (item: any) => polishToEnglish(item.title) === params.category
  );
  const users = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/users/${params.category}`
  ).then((res: any) => res.json());
  const content = await getContent(params.category);
  const services = await getServices();
  const posts = await getPosts();
  return (
    <Suspense fallback={<Loadinger />}>
      <div className="w-full h-full bg-zinc-800">
        <div className="h-screen w-screen fixed left-0 top-0 z-0">
          <Hero />
        </div>
        <div className="relative pt-[65px] lg:pt-[92px] font-sans min-h-screen flex flex-col w-full">
          <InitializeUser />
          <section className="py-12 xl:py-24 text-left relative bg-black/50">
            {/* Główna zawartość */}
            <div className="relative z-50 w-full mx-auto container px-4 lg:px-12">
              {/* Główny nagłówek */}
              <h1
                style={{ lineHeight: 1.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
              >
                <span className="text-green-500">
                  {content?.informal_title_plural}
                </span>{" "}
                do Twoich usług.
              </h1>

              {/* Opis */}
              <p className="lg:text-base text-gray-100 max-w-2xl mb-6">
                Zatrudnij najlepszych specjalistów od{" "}
                <b className="text-white">{content?.genitive}</b> i zrealizuj
                swój projekt z ich wsparciem!
              </p>

              {/* Przyciski */}
              <div className="flex gap-4">
                <Link
                  className="hover:underline text-white py-2 px-4 border border-white rounded-md"
                  href="/register"
                >
                  Wpisz się
                </Link>
                <Link
                  className="bg-gradient-to-b from-ctaStart to-ctaEnd text-white py-2 px-4 rounded-md shadow-md hover:scale-105 duration-100"
                  href="/register"
                >
                  Dodaj ofertę
                </Link>
              </div>
            </div>
          </section>

          <div className="w-full mx-auto container px-4 lg:px-12 flex flex-col items-center justify-center">
            {/* Sekcja główna */}
            <div className="mt-12 w-full">
              <div className="flex flex-col mx-auto ">
                <JobBoardList
                  talents={users.filter((user: any) => user.seek)}
                  companies={users.filter((user: any) => !user.seek)}
                  content={content}
                />
              </div>
            </div>

            {/* Podkategorie */}
            {slug?.data?.length > 0 && (
              <div className="bg-white p-6 mt-12 w-full rounded-xl">
                <h2 className="text-black text-2xl lg:text-3xl font-extrabold mb-6">
                  {slug.title} - zlecenia
                </h2>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {slug.data.map((item: any, index: number) => (
                    <Link
                      href={`/oferta/dla-firm/${params.slug}/${
                        params.category
                      }/${polishToEnglish(item.title)}`}
                      key={index}
                      className="p-1 hover:scale-105 duration-100 flex items-center bg-gradient-to-br from-zinc-600 to-zinc-700 text-white pr-4 h-[50px] rounded-lg shadow-md hover:shadow-lg transition"
                    >
                      <div className="flex items-center justify-center aspect-square h-full rounded-md bg-white text-zinc-700">
                        <FaBriefcase className="w-6 h-6" />
                      </div>
                      <h2 className="font-coco w-full flex items-center justify-center text-center gap-3">
                        {item.title}
                      </h2>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sekcja opisu */}
            <div className="p-6 w-full flex flex-col lg:flex-row bg-white mt-12 rounded-xl">
              <div className="">
                {/* Główna sekcja tekstowa */}
                <section className="w-full">
                  {/* Nagłówek */}
                  <h2 className="font-extrabold text-black text-xl lg:text-3xl mb-3">
                    Czym zajmują się{" "}
                    {content?.informal_title_plural?.toLowerCase()}?
                  </h2>

                  {/* Opis - obsługa HTML */}
                  <div
                    className="text-gray-800 text-sm sm:text-base leading-relaxed markdownSlug"
                    dangerouslySetInnerHTML={{
                      __html: content?.description,
                    }}
                  />
                </section>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 lg:px-12">
            <BlogPostList posts={posts} />
          </div>
          <div className="mt-12 p-6 lg:p-12 w-full bg-black/50">
            <h4 className="text-xl font-extrabold text-white text-center mb-12">
              Tagi
            </h4>
            <ul className="flex overflow-x-scroll lg:overflow-visible w-full lg:flex-wrap gap-4 text-sm lg:text-base">
              {content?.synonyms.map((item: any, i: number) => (
                <li
                  key={i}
                  className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all"
                >
                  #{item.toLowerCase()}
                </li>
              ))}
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #firmy
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zleceniadlafirm
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zleceniadlafreelancerow
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #ilezarabia
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #freelance
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zarobki
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #znajdzprace
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #rekrutacja
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #pracazdalna
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #freelancer
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #jobboards
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #joboffers
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #ofertypracy
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #ogloszeniaoprace
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

// Metadata generation
export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  const content = await getContent(params.category);
  const title = `${content?.title} Zlecenia i Oferta Usług dla Firm`;
  const description = `Usługi dla firm Szukasz zleceń w ${content?.genitive}? Chcesz zająć się ${content?.instrumental}?`;
  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: "https://quixy.pl",
      title,
      description,
      siteName: "Quixy",
      images: [
        {
          url: "/favicons/android-chrome-512x512.png",
          type: "image/png",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@quixy",
      title,
      description,
      image: {
        url: "/favicons/android-chrome-512x512.png",
      },
    },
  };
}
