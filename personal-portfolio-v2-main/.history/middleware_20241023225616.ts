import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const bestLocale = matchLocale(languages, locales, i18n.defaultLocale);
  if (!bestLocale) {
    return undefined;
  }
  return `/${bestLocale}`;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const PUBLIC_FILE = /^\/public\//;
  // Ignore files in the public folder
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return;
  }
  if (
    ["/manifest.json", "/favicon.ico", "/assets/*", "/images/*"].includes(
      pathname
    )
  )
    return;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    if (!locale) {
      return;
    }

    // The new URL is now /en-US/products
    const newPathname = `${locale}${pathname.replace(/^\/+/, "")}`;
    return NextResponse.redirect(new URL(newPathname, request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/public/assets|images|_ipx|_next/_ipx|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};
