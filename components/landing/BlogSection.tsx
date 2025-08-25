"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getDocuments, getBlogPosts } from "@/common/firebase";
import { Post } from "@/types";

const HeroStars = dynamic(() => import("@/components/hero/Hero"), {
  ssr: false,
});

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [collectionDocs, legacyDoc]: any = await Promise.all([
          getDocuments("blog"),
          getBlogPosts(),
        ]);
        const legacyPosts = Array.isArray(legacyDoc?.posts)
          ? legacyDoc.posts
          : [];
        const combined = [...(collectionDocs || []), ...legacyPosts];
        const unique = new Map<string, Post>();
        for (const p of combined) {
          if (p?.postId) unique.set(p.postId, p as Post);
        }
        setPosts(Array.from(unique.values()));
      } catch (e) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="relative w-full py-24 overflow-hidden px-4">
      <div className="absolute inset-0 -z-10">
        <div className="fixed left-0 top-0 w-full h-screen">
          <HeroStars />
        </div>
        <div className="left-0 absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-[#11131a]/70 to-[#0b0d12]" />
      </div>

      <div className="relative z-10 w-full px-3 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Z Bloga</h2>
          <p className="text-gray-300 mt-2">
            Artykuły o stronach, projektowaniu i inspiracjach
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#1b1e29] rounded-xl p-4 animate-pulse"
              >
                <div className="w-full aspect-[16/9] bg-[#2a2f3d] rounded" />
                <div className="h-4 bg-[#2a2f3d] rounded mt-4 w-3/4" />
                <div className="h-4 bg-[#2a2f3d] rounded mt-2 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.postId}
                role="button"
                tabIndex={0}
                onClick={() => setActivePost(post)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActivePost(post);
                }}
                className="group bg-[#141723]/80 hover:bg-[#1b2030]/80 transition-colors rounded-xl overflow-hidden border border-[#2a2f3d] backdrop-blur-sm cursor-pointer"
              >
                <div className="relative aspect-[16/9]">
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
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>
                      {new Date(post.creationTime).toLocaleDateString("pl-PL")}
                    </span>
                    {typeof post.readTime === "number" && post.readTime > 0 && (
                      <span>• {post.readTime} min</span>
                    )}
                    {typeof post.viewerCount === "number" && (
                      <span>• {post.viewerCount} wyświetleń</span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-[#B4FC2D] transition-colors">
                    {post.title}
                  </h3>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-[#22263a] text-gray-300 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activePost && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setActivePost(null)}
          />
          <div className="relative w-full max-w-3xl bg-[#0f1320] border border-[#2a2f3d] rounded-2xl overflow-hidden shadow-xl">
            <button
              onClick={() => setActivePost(null)}
              className="absolute right-3 top-3 text-gray-300 hover:text-white z-10"
              aria-label="Zamknij"
            >
              ✕
            </button>
            <div className="relative aspect-[16/7]">
              <Image
                src={
                  typeof activePost.mainImage === "string" &&
                  (activePost.mainImage.startsWith("http://") ||
                    activePost.mainImage.startsWith("https://") ||
                    activePost.mainImage.startsWith("/"))
                    ? activePost.mainImage
                    : "/images/projects/quixy/hero.png"
                }
                alt={activePost.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1320] via-transparent to-transparent" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                <span>
                  {new Date(activePost.creationTime).toLocaleDateString(
                    "pl-PL"
                  )}
                </span>
                {typeof activePost.readTime === "number" &&
                  activePost.readTime > 0 && (
                    <span>• {activePost.readTime} min</span>
                  )}
                {typeof activePost.viewerCount === "number" && (
                  <span>• {activePost.viewerCount} wyświetleń</span>
                )}
              </div>
              <h3 className="text-white text-2xl font-bold">
                {activePost.title}
              </h3>
              {activePost.intro && (
                <p className="text-gray-300 mt-3 whitespace-pre-line">
                  {activePost.intro}
                </p>
              )}
              {activePost.tags && activePost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {activePost.tags.slice(0, 6).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#22263a] text-gray-300 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-6 flex gap-3">
                <Link
                  href={`/blog/${activePost.url || activePost.postId}`}
                  className="inline-block bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] text-black font-semibold px-4 py-2 rounded-lg"
                >
                  Czytaj cały artykuł
                </Link>
                <button
                  onClick={() => setActivePost(null)}
                  className="inline-block bg-[#22263a] text-gray-200 px-4 py-2 rounded-lg"
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
