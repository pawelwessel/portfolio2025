import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { getDocuments, getBlogPosts } from "@/common/firebase";
import { Post } from "@/types";

const HeroStars = dynamic(() => import("@/components/hero/Hero"), {
  ssr: false,
});

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  let post: Post | null = null;
  try {
    const [collectionDocs, legacyDoc]: any = await Promise.all([
      getDocuments("blog"),
      getBlogPosts(),
    ]);
    const legacyPosts = Array.isArray(legacyDoc?.posts) ? legacyDoc.posts : [];
    const combined: Post[] = [...(collectionDocs || []), ...legacyPosts];
    post =
      combined.find((p) => p?.slug === slug) ||
      combined.find((p) => p?.url === slug) ||
      combined.find((p) => p?.postId === slug) ||
      null;
  } catch (e) {
    post = null;
  }

  if (!post) {
    return (
      <div className="relative w-screen overflow-x-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="fixed left-0 top-0 w-full h-screen">
            <HeroStars />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#11131a]/70 to-[#0b0d12]" />
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

              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-gotham">
                Nie znaleziono artykułu
              </h1>
              <p className="text-gray-200 text-lg mb-8">
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

  return (
    <div className="relative w-screen overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="fixed left-0 top-0 w-full h-screen">
          <HeroStars />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#11131a]/70 to-[#0b0d12]" />
      </div>

      {/* Hero banner */}
      <section className="relative w-full">
        <div className="relative w-full aspect-[16/6] min-h-[400px]">
          <Image
            src={
              typeof post.mainImage === "string" &&
              (post.mainImage.startsWith("http://") ||
                post.mainImage.startsWith("https://") ||
                post.mainImage.startsWith("/"))
                ? post.mainImage
                : "/images/projects/quixy/hero.png"
            }
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d12]/20 via-[#0b0d12]/60 to-[#0b0d12]" />

          {/* Floating accent elements */}
          <div className="absolute top-8 left-8 w-3 h-3 bg-[#B4FC2D] rounded-full opacity-60 animate-pulse" />
          <div
            className="absolute top-12 right-12 w-2 h-2 bg-[#3EE7C0] rounded-full opacity-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 left-12 w-1.5 h-1.5 bg-[#B4FC2D] rounded-full opacity-80 animate-pulse"
            style={{ animationDelay: "2s" }}
          />

          <div className="absolute inset-0 flex items-end">
            <div className="w-full max-w-6xl mx-auto px-4 pb-8">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="bg-[#1a1f2e]/80 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-200 px-3 py-2 rounded-full">
                    {new Date(post.creationTime).toLocaleDateString("pl-PL")}
                  </span>
                  {typeof post.readTime === "number" && post.readTime > 0 && (
                    <span className="bg-[#1a1f2e]/80 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-200 px-3 py-2 rounded-full">
                      {post.readTime} min czytania
                    </span>
                  )}
                  {typeof post.viewerCount === "number" && (
                    <span className="bg-[#1a1f2e]/80 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-200 px-3 py-2 rounded-full">
                      {post.viewerCount} wyświetleń
                    </span>
                  )}
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#1a1f2e]/80 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-200 hover:text-white hover:border-[#B4FC2D]/30 px-4 py-2 rounded-full transition-all duration-300"
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
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight font-gotham">
                {post.title}
              </h1>

              {/* Subtle gradient line */}
              <div className="w-32 h-1 bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] mt-6 rounded-full opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Article card */}
      <main className="relative z-10 w-full px-4">
        <article className="w-full max-w-6xl mx-auto -mt-10 md:-mt-16">
          <div className="relative bg-[#0f1320]/90 backdrop-blur-xl border border-[#2a2f3d]/50 rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden">
            {/* Background accent elements */}
            <div className="absolute top-8 right-8 w-2 h-2 bg-[#B4FC2D] rounded-full opacity-30" />
            <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-[#3EE7C0] rounded-full opacity-40" />

            <div className="relative z-10">
              {post.intro && (
                <div className="mb-10">
                  <p className="text-gray-100 text-lg lg:text-xl leading-relaxed whitespace-pre-line font-light">
                    {post.intro}
                  </p>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] mt-6 rounded-full opacity-60" />
                </div>
              )}

              {post.sections && post.sections.length > 0 && (
                <div className="space-y-12">
                  {post.sections.map((section, idx) => (
                    <section key={idx} className="relative">
                      {section.title && (
                        <h2 className="text-2xl lg:text-3xl text-white font-bold mb-6 font-gotham relative">
                          {section.title}
                          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#B4FC2D] to-[#3EE7C0] rounded-full opacity-60" />
                        </h2>
                      )}
                      <div
                        className="prose prose-lg prose-invert prose-a:text-[#B4FC2D] prose-a:hover:text-[#A3E626] prose-headings:text-white prose-headings:font-gotham prose-p:text-gray-100 prose-p:leading-relaxed prose-strong:text-white prose-code:text-[#B4FC2D] prose-code:bg-[#1a1f2e] prose-code:px-2 prose-code:py-1 prose-code:rounded max-w-none"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </section>
                  ))}
                </div>
              )}

              {post.outro && (
                <div className="mt-12 pt-8 border-t border-[#2a2f3d]/50">
                  <p className="text-gray-100 text-lg leading-relaxed whitespace-pre-line font-light">
                    {post.outro}
                  </p>
                </div>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-[#2a2f3d]/50">
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

              <div className="mt-12 pt-8 border-t border-[#2a2f3d]/50 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] hover:from-[#A3E626] hover:to-[#2DD4B0] text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#B4FC2D]/20"
                >
                  Skontaktuj się
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center bg-[#1a1f2e]/80 hover:bg-[#22263a] border border-[#2a2f3d] text-gray-200 hover:text-white hover:border-[#B4FC2D]/30 px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
                >
                  Strona główna
                </Link>
              </div>
            </div>
          </div>
        </article>
        <div className="h-32" />
      </main>
    </div>
  );
}
