export const i18n = {
  defaultLocale: "pl",
  locales: ["en"],
} as const;
export type Locale = (typeof i18n)["locales"][number];
