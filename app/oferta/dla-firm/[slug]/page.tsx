import Link from "next/link";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import Image from "next/image";
import JobBoardList from "@/components/quixyComponents/JobBoardList";
import removePolishSignsAndSpaces from "@/lib/removePolish";
import OpinionsForm from "@/components/quixyComponents/OpinionsForm";
import Market from "@/components/quixyComponents/marketplace/Market";
import BlogPostList from "@/components/quixyComponents/BlogPostList";
import { getServices } from "@/lib/getServices";
import { getPosts } from "@/lib/getPosts";
import { getContent } from "@/lib/getContent";
import { Suspense } from "react";
import Loadinger from "@/app/loading";
import Hero from "@/components/hero/Hero";
import InitializeUser from "@/components/quixyComponents/InitializeUser";
import { FaArrowRightLong } from "react-icons/fa6";
export const revalidate = 60;
export const dynamicParams = true;
export default async function Page(props: {
  params: Promise<any>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  const users = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/users/${params.slug}`
  ).then((res: any) => res.json());
  const opinions = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/opinions?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.slug)}`
  ).then((res: any) => res.json());
  const services = await getServices();
  const content = await getContent(params.slug);
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
                  className="text-sm lg:text-base hover:underline text-white py-2 px-4 border border-white rounded-md"
                  href="/register"
                >
                  Wpisz się
                </Link>
                <Link
                  className="hover:scale-105 duration-100 text-sm lg:text-base bg-gradient-to-b from-ctaStart to-ctaEnd hover:bg-opacity-90 text-white py-2 px-4 rounded-md shadow-md"
                  href="/register"
                >
                  Dodaj ofertę
                </Link>
              </div>
            </div>
          </section>
          <div className="mx-auto container px-4 lg:px-12 mt-12">
            <div className="flex flex-col mx-auto">
              <JobBoardList
                talents={users.filter((user: any) => user.seek)}
                companies={users.filter((user: any) => !user.seek)}
                content={content}
              />
            </div>
            <div className="w-full my-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex flex-col w-full justify-center items-center">
                  <div className="text-black">
                    <div className="relative overflow-hidden bg-white px-3 rounded-md">
                      <h2 className="text-sm text-white px-3 py-1 bg-gradient-to-b from-zinc-600 to-zinc-700 rounded-b-3xl w-max mb-2">
                        Quixy dla firm
                      </h2>
                      <p className="text-center sm:text-lg text-black p-3 bg-white rounded-md mt-3 mb-8">
                        Zatrudnij najlepszych specjalistów — opublikuj ofertę
                        pracy w kategorii{" "}
                        <b className="font-bold">
                          {content?.title?.toLowerCase()}
                        </b>{" "}
                        i znajdź ekspertów w tej dziedzinie. Promuj swoje
                        usługi, by dotrzeć do odpowiednich odbiorców.
                      </p>
                      <Link
                        href="/register"
                        className="translate-y-4 hover:translate-y-0 duration-200 absolute bottom-0 right-3 pb-6 ml-auto bg-gradient-to-b from-ctaStart to-ctaEnd mt-3 block w-max max-w-full text-white py-2 px-4 rounded-t-3xl"
                      >
                        Dołącz jako firma
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6 text-black">
                    <div className="relative overflow-hidden bg-white px-3 rounded-md">
                      <h2 className="text-sm text-white px-3 py-1 bg-gradient-to-b from-zinc-600 to-zinc-700 rounded-b-3xl w-max mb-2">
                        Quixy bez firmy
                      </h2>
                      <p className="sm:text-lg text-black text-center p-3 bg-white rounded-md mt-3 mb-8">
                        Znajdź pracę zdalną lub jednorazowe zlecenia i rozwijaj
                        swoje portfolio w panelu użytkownika. Przeglądaj
                        ogłoszenia pracy, dołącz do zespołu i twórz innowacyjne
                        rozwiązania.
                      </p>

                      <Link
                        href="/register"
                        className="translate-y-4 hover:translate-y-0 duration-200 absolute bottom-0 right-3 pb-6 ml-auto bg-gradient-to-b from-ctaStart to-ctaEnd mt-3 block w-max max-w-full text-white py-2 px-4 rounded-t-3xl"
                      >
                        Dołącz jako freelancer
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src={`/assets/mockup.png`}
                    width={1024}
                    height={1024}
                    alt={`Prace Zdalne w ${content?.genitive}`}
                    blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                    placeholder="blur"
                    className="my-12 sm:my-0 w-full scale-125 sm:scale-100 h-auto mx-auto"
                  />
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="bg-white mx-auto flex flex-col lg:flex-row gap-12 p-6 rounded-xl">
              <div className="w-full lg:w-[50%]">
                <h2
                  style={{ lineHeight: 1.2 }}
                  className="rounded-xl text-zinc-800 drop-shadow-md font-gotham shadow-black w-max max-w-full font-extrabold text-2xl 2xl:text-4xl mb-6"
                >
                  Dodaj zlecenie w {content?.genitive}
                </h2>
                {jobs.map((job: any, i: any) => (
                  <div key={i}>
                    {polishToEnglish(job.title) === params.slug && (
                      <div className="flex flex-col" key={i}>
                        <div className="flex flex-col bg-white rounded-xl gap-6">
                          {job.data.map((item: any, j: any) => (
                            <div key={j} className="relative">
                              <h2
                                title={`Pracuj zdalnie w ${item.title}`}
                                className="rounded-md py-2 w-full text-xl"
                              >
                                <div className="text-zinc-800 drop-shadow-md font-gotham shadow-black">
                                  {item.title}
                                </div>
                              </h2>

                              {/* Hover dropdown */}
                              <div className="grid grid-cols-2 gap-3 mt-4">
                                {item.data.map((subcategory: any, k: any) => (
                                  <Link
                                    title={`Pracuj zdalnie w ${subcategory.title}`}
                                    key={k}
                                    className="text-black flex flex-row group items-center gap-2"
                                    href={`/oferta/dla-firm/${polishToEnglish(
                                      job.title
                                    )}/${polishToEnglish(
                                      item.title
                                    )}/${polishToEnglish(subcategory.title)}`}
                                  >
                                    <FaArrowRightLong className="mr-2 group-hover:translate-x-1 duration-150" />
                                    {subcategory.title}{" "}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <section className="w-full lg:w-3/5">
                <h2 className="pb-3 text-black text-2xl font-extrabold">
                  Czym zajmują się{" "}
                  {content?.informal_title_plural.toLowerCase()}?
                </h2>

                <div
                  className="text-black max-w-3xl markdownSlug  "
                  dangerouslySetInnerHTML={{
                    __html: content?.description,
                  }}
                />
              </section>
            </div>

            <BlogPostList posts={posts} />
            {/* <h2 className="text-xl font-semibold text-primary mb-4">
          Najlepsi specjaliści {slug.title}
        </h2> */}
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
                  #{removePolishSignsAndSpaces(item.toLowerCase())}
                </li>
              ))}
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #firmy
                {removePolishSignsAndSpaces(content?.genitive.toLowerCase())}
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zleceniadlafirm
                {removePolishSignsAndSpaces(content?.genitive.toLowerCase())}
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zleceniadlafreelancerow
                {removePolishSignsAndSpaces(content?.genitive.toLowerCase())}
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #ilezarabia
                {removePolishSignsAndSpaces(
                  content?.informal_title_singular.toLowerCase()
                )}
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #
                {removePolishSignsAndSpaces(
                  content?.informal_title_singular.toLowerCase()
                )}
                freelance
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zarobki
                {removePolishSignsAndSpaces(
                  content?.informal_title_plural.toLowerCase()
                )}
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #
                {removePolishSignsAndSpaces(
                  content?.informal_title_plural.toLowerCase()
                )}
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

export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  const content = await getContent(params.slug);
  const title = `${content?.title} Zlecenia i Oferta Usług dla Firm`;
  const description = `Usługi dla firm Szukasz zleceń w ${content?.genitive}? Chcesz zająć się ${content?.instrumental}?`;
  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `https://quixy.pl/oferta/dla-firm/${polishToEnglish(params.slug)}`,
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
      image: {
        url: "/favicons/android-chrome-512x512.png",
        type: "image/png",
      },
      site: "@quixy",
      title,
      description,
    },
  };
}
