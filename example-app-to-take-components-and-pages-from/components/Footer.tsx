"use client";
import Link from "next/link";
import {
  FaGem,
  FaHome,
  FaBookOpen,
  FaMapMarkerAlt,
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import logo from "@/public/naily-logo.png";

export default function Footer() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <footer className="relative bg-neutral-950 text-white pb-5 lg:pb-0">
      {/* Subtle gradient texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-700/10 via-neutral-950 to-neutral-950 pointer-events-none" />
      {/* Accent top border */}
      <div className="border-t-4 border-primary-600/90" />

      <div className="container-professional relative py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src={logo}
              alt="Naily Logo"
              width={100}
              height={100}
              className="h-12 mx-auto w-auto mt-6 md:mt-0"
            />
            <p className="text-neutral-300 text-sm leading-relaxed text-center">
              Profesjonalne usługi, konkurencyjne ceny, <br /> wygodne
              rezerwacje online.
            </p>
            <div className="flex space-x-4 justify-center">
              <Link
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61571850669360"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaFacebook className="text-sm" />
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/naily.pl/"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaInstagram className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-neutral-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  Strona główna
                </Link>
              </li>
              <li>
                <Link
                  href="/manicure-pedicure/warszawa"
                  className="text-neutral-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  Usługi
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  Naily Blog
                </Link>
              </li>

              {user?.uid && (
                <li>
                  <Link
                    href="/dashboard"
                    className="text-neutral-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    Panel użytkownika
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/manicure-pedicure/warszawa"
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  Manicure Warszawa
                </Link>
              </li>
              <li>
                <Link
                  href="/manicure-pedicure/krakow"
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  Manicure Kraków
                </Link>
              </li>
              <li>
                <Link
                  href="/manicure-pedicure/wroclaw"
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  Manicure Wrocław
                </Link>
              </li>
              <li>
                <Link
                  href="/manicure-pedicure/poznan"
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  Manicure Poznań
                </Link>
              </li>
              <li>
                <Link
                  href="/manicure-pedicure/gdansk"
                  className="text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  Manicure Gdańsk
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & App */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-300 text-sm">
                <FaEnvelope className="text-xs" />
                <span>naily@naily.pl</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300 text-sm">
                <FaPhone className="text-xs" />
                <span>+48 721 417 154</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-400 text-sm">
              © 2025 Naily. Wszystkie prawa zastrzeżone.
            </div>
            <div className="text-neutral-400 text-sm">Naily.pl</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
