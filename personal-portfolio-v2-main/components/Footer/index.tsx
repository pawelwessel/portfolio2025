import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="text-white font-light text-xl italic h-screen flex flex-col items-center justify-center z-[600] relative">
      <div className="h-max w-max group">
        <span className="opacity-50 group-hover:opacity-100 duration-200">
          wesiu.dev 2024
        </span>
        <div className="flex flex-row items-center w-full justify-evenly">
          <Link title="Send me an email" href="mailto:wesiudev@gmail.com">
            <FaEnvelope className="opacity-50 h-8 w-8 mt-4 hover:opacity-100 duration-200" />
          </Link>
          <Link title="Call me" href="tel:+48721417154">
            <FaPhone className="opacity-50 h-8 w-8 mt-4 hover:opacity-100 duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
