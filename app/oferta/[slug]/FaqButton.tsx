"use client";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import Faq from "@/components/faq";
import { Post } from "@/types";

interface FaqButtonProps {
  post: Post;
}

export default function FaqButton({ post }: FaqButtonProps) {
  const [isFaqOpen, setFaqOpen] = useState(false);

  if (!post.faq || post.faq.length === 0) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setFaqOpen(true)}
        className="flex items-center flex-row w-max text-nowrap text-xs sm:text-sm bg-[#1a1f2e]/80 backdrop-blur-sm border border-[#2a2f3d]/50 text-gray-200 hover:text-white hover:border-[#B4FC2D]/30 px-3 py-2 rounded-full transition-all duration-300"
      >
        <FaQuestionCircle className="mr-1.5 w-4 h-4" />
        FAQ ({post.faq.length})
      </button>

      <Faq faqs={post.faq} isFaqOpen={isFaqOpen} setFaqOpen={setFaqOpen} />
    </>
  );
}
