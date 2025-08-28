import Image from "next/image";
import Link from "next/link";
import { getDocuments, getBlogPosts } from "@/common/firebase";
import { Post } from "@/types";
import Hero from "@/components/hero/Hero";
import { FaBook, FaEye } from "react-icons/fa";
import ParallaxImage from "@/components/ParallaxImage";
import ParallaxSection from "@/components/ParallaxSection";
import Cta from "@/components/cta/Cta";
import Header from "@/components/header";
import { Metadata } from "next";
import Script from "next/script";
import FaqSection from "./FaqSection";
import {
  polishCities,
  getAllCitySlugs,
  isCitySlug,
  slugToCity,
  getCityDisplayName,
  PolishCase,
  getCityInCase,
  generateCityContent,
} from "@/lib/polishCities";
import { generateCityPost } from "@/lib/cityPostGenerator";
import PricingHero from "@/components/landing/PricingHero";
import BlogSection from "@/components/landing/BlogSection";
import OpinionsSection from "@/components/landing/OpinionsSection";
import ReachSection from "@/components/landing/ReachSection";
import { mapMarkers } from "@/lib/mapMarkers";

// Generate static params for all city-based slugs
export async function generateStaticParams() {
  try {
    // Get existing blog post slugs
    const [collectionDocs, legacyDoc]: any = await Promise.all([
      getDocuments("blog"),
      getBlogPosts(),
    ]);

    const legacyPosts = Array.isArray(legacyDoc?.posts) ? legacyDoc.posts : [];
    const combined: Post[] = [...(collectionDocs || []), ...legacyPosts];
    const blogSlugs = combined
      .map((post) => ({ slug: post.slug || post.url || post.postId }))
      .filter(Boolean);

    // Get all city-based slugs
    const citySlugs = getAllCitySlugs().map((slug) => ({ slug }));

    // Combine both types of slugs
    return [...blogSlugs, ...citySlugs];
  } catch (error) {
    console.error("Error generating static params:", error);
    // Fallback to just city slugs if blog fetching fails
    return getAllCitySlugs().map((slug) => ({ slug }));
  }
}

// Helper function to get post data
async function getPostData(slug: string): Promise<Post | null> {
  try {
    // First, check database for all posts (including city posts)
    const [collectionDocs, legacyDoc]: any = await Promise.all([
      getDocuments("blog"),
      getBlogPosts(),
    ]);
    const legacyPosts = Array.isArray(legacyDoc?.posts) ? legacyDoc.posts : [];
    const combined: Post[] = [...(collectionDocs || []), ...legacyPosts];

    // Look for exact match in database first
    const existingPost =
      combined.find((p) => p?.slug === slug) ||
      combined.find((p) => p?.url === slug) ||
      combined.find((p) => p?.postId === slug);

    if (existingPost) {
      return existingPost;
    }

    // If not found and it's a city-based slug, generate fallback content
    if (isCitySlug(slug)) {
      const cityName = slugToCity(slug);
      if (cityName) {
        // Generate on-the-fly content as fallback
        return generateCityPost(cityName);
      }
    }

    return null;
  } catch (e) {
    console.error("Error fetching post data:", e);
    return null;
  }
}

// Metadata generation function
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    // Enhanced 404 metadata for city pages
    if (isCitySlug(params.slug)) {
      const cityName = slugToCity(params.slug);
      const displayName = cityName
        ? getCityDisplayName(cityName)
        : "Polski Miasto";
      return {
        title: `Strony internetowe ${displayName} | Quixy Studio`,
        description: `Profesjonalne tworzenie stron internetowych w ${displayName}. Sprawdź naszą ofertę i skontaktuj się z nami po bezpłatną wycenę.`,
      };
    }

    return {
      title: "Artykuł nie znaleziony | Quixy Studio",
      description: "Nie znaleziono artykułu. Sprawdź adres i spróbuj ponownie.",
    };
  }

  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription || post.intro || "Artykuł z Quixy Studio";
  const keywords = post.metaKeywords || post.tags || [];
  const imageUrl =
    typeof post.mainImage === "string" &&
    (post.mainImage.startsWith("http://") ||
      post.mainImage.startsWith("https://") ||
      post.mainImage.startsWith("/"))
      ? post.mainImage
      : "/assets/globe.jpg";

  const url = `https://quixy.pl/oferta/${params.slug}`;

  return {
    title: `${title} | Quixy Studio`,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
    authors: [{ name: "Quixy Studio", url: "https://quixy.pl" }],
    publisher: "Quixy Studio",
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Quixy Studio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: new Date(post.creationTime).toISOString(),
      modifiedTime: new Date(post.creationTime).toISOString(),
      authors: ["Quixy Studio"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@quixystudio",
      site: "@quixystudio",
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function PageContent({ post, slug }: { post: Post; slug: string }) {
  // Generate JSON-LD structured data for FAQ
  const faqJsonLd =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  // Generate JSON-LD structured data for Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.intro || post.metaDescription,
    image:
      // Use globe image for city-based posts, otherwise use post's main image
      isCitySlug(slug)
        ? "/assets/globe.jpg"
        : typeof post.mainImage === "string" &&
          (post.mainImage.startsWith("http://") ||
            post.mainImage.startsWith("https://") ||
            post.mainImage.startsWith("/"))
        ? post.mainImage
        : "/assets/globe.jpg",
    author: {
      "@type": "Organization",
      name: "Quixy Studio",
      url: "https://quixy.pl",
    },
    publisher: {
      "@type": "Organization",
      name: "Quixy Studio",
      logo: {
        "@type": "ImageObject",
        url: "https://quixy.pl/logo-quixy.png",
      },
    },
    datePublished: new Date(post.creationTime).toISOString(),
    dateModified: new Date(post.creationTime).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://quixy.pl/oferta/${slug}`,
    },
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      {faqJsonLd && (
        <Script
          id="faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
      )}

      <div className="z-[1500] absolute w-[130px] sm:w-[300px] h-[50px] left-0 top-6 xl:top-12 overflow-hidden rounded-r-xl">
        <div className="w-full flex items-start relative">
          <div className="w-max absolute left-[300px] top-0">
            <Image
              src="/loga.png"
              width={3600}
              height={200}
              alt="Quixy Studio - Tworzenie stron internetowych"
              className="w-auto h-[50px] move-from-right-to-left"
              priority
            />
          </div>
        </div>
      </div>
      <div className="relative w-screen overflow-x-hidden">
        <Header />
        <div className="absolute inset-0 -z-10">
          <div className="z-50 fixed left-0 top-0 w-full h-screen">
            <Hero />
          </div>
          <div className="absolute z-[-1] inset-0 bg-black/85" />
        </div>

        {/* Hero banner */}
        <section className="relative w-full">
          <div className="relative w-full aspect-[16/6] min-h-[400px]">
            <ParallaxImage
              src={
                // Use globe image for city-based posts, otherwise use post's main image
                isCitySlug(slug)
                  ? "/assets/globe.jpg"
                  : typeof post.mainImage === "string" &&
                    (post.mainImage.startsWith("http://") ||
                      post.mainImage.startsWith("https://") ||
                      post.mainImage.startsWith("/"))
                  ? post.mainImage
                  : "/assets/globe.jpg"
              }
              alt={post.title}
              fill
              priority
              speed={0.5}
              direction="down"
              scale={1.2}
              containerClassName="w-full h-full"
              overlay
              overlayClassName="bg-gradient-to-b from-black/20 via-black/60 to-black"
            />

            {/* Floating accent elements */}
            <ParallaxSection
              speed={0.1}
              direction="up"
              className="absolute top-8 left-8"
            >
              <div className="w-3 h-3 bg-[#B4FC2D] rounded-full opacity-60 animate-pulse" />
            </ParallaxSection>
            <ParallaxSection
              speed={0.15}
              direction="down"
              className="absolute top-12 right-12"
            >
              <div
                className="w-2 h-2 bg-[#3EE7C0] rounded-full opacity-40 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </ParallaxSection>
            <ParallaxSection
              speed={0.08}
              direction="up"
              className="absolute bottom-20 left-12"
            >
              <div
                className="w-1.5 h-1.5 bg-[#B4FC2D] rounded-full opacity-80 animate-pulse"
                style={{ animationDelay: "2s" }}
              />
            </ParallaxSection>

            <div className="absolute inset-0 flex items-end">
              <div className="w-full max-w-6xl mx-auto px-4 pb-8">
                <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                  <div className="flex items-center gap-3 text-xs font-gotham font-light">
                    <span className="w-max text-nowrap text-xs sm:text-sm bg-[#1a1f2e]/80 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-200 px-3 py-2 rounded-full">
                      {new Date(post.creationTime).toLocaleDateString("pl-PL")}
                    </span>
                    {typeof post.readTime === "number" && post.readTime > 0 && (
                      <span className="flex items-center flex-row w-max text-nowrap text-xs sm:text-sm bg-[#1a1f2e]/80 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-200 px-3 py-2 rounded-full">
                        <FaBook className="mr-1.5 w-4 h-4" />
                        {post.readTime} min
                      </span>
                    )}
                    {typeof post.viewerCount === "number" && (
                      <span className="flex items-center flex-row w-max text-nowrap text-xs sm:text-sm bg-[#1a1f2e]/80 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-200 px-3 py-2 rounded-full">
                        <FaEye className="mr-1.5 w-4 h-4" />
                        {post.viewerCount}
                      </span>
                    )}
                  </div>
                  <br />
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#1a1f2e]/80 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-200 hover:text-white hover:border-[#B4FC2D]/30 px-4 py-2 rounded-full transition-all duration-300 font-gotham font-light"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Wróć
                  </Link>
                </div>
                <h1 className="mb-16 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight font-gotham">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Article card */}
        <main className="relative z-10 w-full px-4">
          <article className="w-full max-w-6xl mx-auto -mt-10 md:-mt-16">
            <ParallaxSection speed={0.1} direction="up">
              <div className="relative bg-[#0f1320]/90 backdrop-blur-xl border border-[#2a2f3d]/50 rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden">
                {/* Background accent elements */}
                <Image
                  src="/logo-quixy.png"
                  width={400}
                  height={400}
                  alt="Quixy Studio Strony Internetowe Logo"
                  className="w-auto h-[90px]"
                  priority
                />
                <div className="mt-6 relative z-10">
                  {post.intro && (
                    <div className="mb-10 font-gotham font-light">
                      <p className="text-gray-100 text-base lg:text-lg leading-relaxed whitespace-pre-line font-light">
                        {post.intro}
                      </p>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] mt-6 rounded-full opacity-60" />
                    </div>
                  )}

                  {post.sections && post.sections.length > 0 && (
                    <div className="space-y-12">
                      {post.sections.map((section, idx) => (
                        <section key={idx} className="relative font-sans">
                          {section.title && (
                            <h2 className="my-16 text-xl lg:text-2xl text-white font-bold font-gotham relative">
                              {section.title}
                            </h2>
                          )}
                          <div
                            className="prose prose-sm md:prose-base prose-invert prose-a:text-[#B4FC2D] prose-a:hover:text-[#A3E626] prose-headings:text-white prose-headings:font-gotham prose-p:text-gray-100 prose-p:leading-relaxed prose-strong:text-white prose-code:text-[#B4FC2D] prose-code:bg-[#1a1f2e] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-h1:text-2xl md:prose-h1:text-3xl max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: section.content,
                            }}
                          />
                        </section>
                      ))}
                    </div>
                  )}

                  {post.outro && (
                    <div className="font-gotham font-light mt-12 pt-8 border-t border-[#2a2f3d]/50">
                      <p className="text-gray-100 text-base lg:text-lg leading-relaxed whitespace-pre-line font-light">
                        {post.outro}
                      </p>
                    </div>
                  )}

                  {/* FAQ Section */}
                  <FaqSection faqs={post.faq} />

                  {post.tags && post.tags.length > 0 && (
                    <div className="font-gotham font-light flex flex-wrap gap-3 mt-10 pt-8 border-t border-[#2a2f3d]/50">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-sm bg-gradient-to-r from-[#1a1f2e] to-[#22263a] text-gray-300 px-4 py-2 rounded-full border border-[#2a2f3d]/30 backdrop-blur-sm hover:border-[#B4FC2D]/30 transition-colors duration-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="font-gotham font-light mt-12 pt-8 border-t border-[#2a2f3d]/50 flex flex-col sm:flex-row items-center gap-4">
                    <Cta label="Darmowa wycena" />
                    <Link
                      href="/"
                      className="mt-3 px-5 text-gray-200 flex items-center gap-2"
                    >
                      Strona główna
                    </Link>
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </article>
          <PricingHero />
          <BlogSection />
          <OpinionsSection />
          <ReachSection markers={mapMarkers} />
        </main>
      </div>
    </>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostData(slug);

  if (!post) {
    return (
      <div className="relative w-screen overflow-x-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="z-5 fixed left-0 top-0 w-full h-screen">
            <Hero />
          </div>
          <div className="absolute inset-0 bg-black/85" />
        </div>
        <main className="relative z-10 min-h-screen w-full px-4 flex items-center justify-center">
          <section className="w-full max-w-2xl mx-auto text-center">
            <div className="relative bg-[#0f1320]/90 backdrop-blur-xl border border-[#2a2f3d]/50 rounded-2xl p-12 shadow-2xl">
              {/* Floating accent elements */}
              <div className="absolute top-6 left-6 w-2 h-2 bg-[#B4FC2D] rounded-full opacity-60 animate-pulse" />
              <div
                className="absolute top-8 right-8 w-1.5 h-1.5 bg-[#3EE7C0] rounded-full opacity-40 animate-pulse"
                style={{ animationDelay: "1s" }}
              />

              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-gotham">
                Nie znaleziono artykułu
              </h1>
              <p className="text-gray-200 text-base lg:text-lg mb-8">
                Sprawdź adres i spróbuj ponownie.
              </p>

              <div className="w-16 h-0.5 bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] mx-auto mb-8 rounded-full opacity-60" />

              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] hover:from-[#A3E626] hover:to-[#2DD4B0] text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#B4FC2D]/20"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Wróć do strony głównej
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return <PageContent post={post} slug={slug} />;
}
