// Major cities in Poland (not villages) - population over 50,000
export const polishCities = [
  "warszawa",
  "krakow",
  "lodz",
  "wroclaw",
  "poznan",
  "gdansk",
  "szczecin",
  "bydgoszcz",
  "lublin",
  "katowice",
  "bialystok",
  "gdynia",
  "czestochowa",
  "radom",
  "sosnowiec",
  "torun",
  "kielce",
  "gliwice",
  "zabrze",
  "bytom",
  "bielsko-biala
  "olsztyn",
  "rzeszow",
  "ruda-slaska",
  "rybnik",
  "tychy",
  "dabrowa-gornicza",
  "plock",
  "elblag",
  "walbrzych",
  "wloclawek",
  "tarnow",
  "chorzow",
  "kalisz",
  "koszalin",
  "legnica",
  "grudziadz",
  "slupsk",
  "jaworzno",
  "jastrzebie-zdroj",
  "nowy-sacz",
  "jelenia-gora",
  "konin",
  "piotrkow-trybunalski",
  "inowroclaw",
  "lubin",
  "ostrowiec-swietokrzyski",
  "gniezno",
  "stargard",
  "suwalki",
  "siedlce",
  "ostrow-wielkopolski",
  "zielona-gora",
  "przemysl",
  "bielawa",
  "starachowice",
  "pulawy",
  "lomza",
  "swinoujscie",
  "pabianice",
  "zgierz",
  "tomaszow-mazowiecki",
  "leszno",
  "zary",
  "mielec",
  "wejherowo",
  "ostroleka",
  "ciechanow",
  "zyrardow",
  "stalowa-wola",
  "belchatow",
  "tczew",
  "malbork",
  "chojnice",
  "kwidzyn",
  "elk",
  "ostroda",
  "ilawa",
  "debica",
  "krosno",
  "sanok",
  "zakopane",
  "nowy-targ",
  "opole",
  "nysa",
  "klodzko",
  "wodzislaw-slaski",
  "cieszyn",
  "pszczyna",
  "oswiecim",
  "tarnowskie-gory",
  "mikolow",
  "zawiercie",
  "olkusz",
  "myszkow",
  "lebork",
  "ustka",
  "kolobrzeg",
  "kamien-pomorski",
  "szczecinek",
  "walcz",
  "pila",
  "czarnkow",
  "wagrowiec",
  "miedzychod",
  "srem",
  "sroda-wielkopolska",
  "trzcianka",
  "oborniki",
  "sieradz",
  "skierniewice",
  "lowicz",
  "ozorkow",
  "kutno",
  "leczyca",
  "wielun",
  "pajeczno",
  "rawa-mazowiecka",
  "szadek",
  "opoczno",
  "tomaszow-lubelski",
  "lubartow",
  "swidnik",
  "krasnystaw",
  "chelm",
  "zamosc",
  "hrubieszow",
  "bilgoraj",
  "sandomierz",
  "tarnobrzeg",
  "stalowa-wola",
  "mielec",
];

// Convert city name to URL-friendly slug
export function cityToSlug(city: string): string {
  return `strona-internetowa-${city}`;
}

// Convert slug back to city name
export function slugToCity(slug: string): string | null {
  if (!slug.startsWith("strona-internetowa-")) {
    return null;
  }
  const cityName = slug.replace("strona-internetowa-", "");
  return polishCities.includes(cityName) ? cityName : null;
}

// Get city display name (capitalize first letter)
export function getCityDisplayName(city: string): string {
  return city
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Check if slug is a city-based slug
export function isCitySlug(slug: string): boolean {
  return slug.startsWith("strona-internetowa-") && slugToCity(slug) !== null;
}

// Generate all city slugs
export function getAllCitySlugs(): string[] {
  return polishCities.map(cityToSlug);
}

// Polish grammatical cases enum
export enum PolishCase {
  NOMINATIVE = "nominative", // mianownik – kto? co?
  GENITIVE = "genitive", // dopełniacz – kogo? czego?
  DATIVE = "dative", // celownik – komu? czemu?
  ACCUSATIVE = "accusative", // biernik – kogo? co?
  INSTRUMENTAL = "instrumental", // narzędnik – z kim? z czym?
  LOCATIVE = "locative", // miejscownik – o kim? o czym?
  VOCATIVE = "vocative", // wołacz – o!
}

// City declension interface
export interface CityDeclension {
  nominative: string; // kto? co?
  genitive: string; // kogo? czego?
  dative: string; // komu? czemu?
  accusative: string; // kogo? co?
  instrumental: string; // z kim? z czym?
  locative: string; // o kim? o czym?
  vocative: string; // o!
}

// Comprehensive declension map for Polish cities
export const cityDeclensions: Record<string, CityDeclension> = {
  warszawa: {
    nominative: "Warszawa",
    genitive: "Warszawy",
    dative: "Warszawie",
    accusative: "Warszawę",
    instrumental: "Warszawą",
    locative: "Warszawie",
    vocative: "Warszawo",
  },
  krakow: {
    nominative: "Kraków",
    genitive: "Krakowa",
    dative: "Krakowowi",
    accusative: "Kraków",
    instrumental: "Krakowem",
    locative: "Krakowie",
    vocative: "Krakowie",
  },
  lodz: {
    nominative: "Łódź",
    genitive: "Łodzi",
    dative: "Łodzi",
    accusative: "Łódź",
    instrumental: "Łodzią",
    locative: "Łodzi",
    vocative: "Łodzi",
  },
  wroclaw: {
    nominative: "Wrocław",
    genitive: "Wrocławia",
    dative: "Wrocławiowi",
    accusative: "Wrocław",
    instrumental: "Wrocławiem",
    locative: "Wrocławiu",
    vocative: "Wrocławiu",
  },
  poznan: {
    nominative: "Poznań",
    genitive: "Poznania",
    dative: "Poznaniowi",
    accusative: "Poznań",
    instrumental: "Poznaniem",
    locative: "Poznaniu",
    vocative: "Poznaniu",
  },
  gdansk: {
    nominative: "Gdańsk",
    genitive: "Gdańska",
    dative: "Gdańskowi",
    accusative: "Gdańsk",
    instrumental: "Gdańskiem",
    locative: "Gdańsku",
    vocative: "Gdańsku",
  },
  szczecin: {
    nominative: "Szczecin",
    genitive: "Szczecina",
    dative: "Szczecinowi",
    accusative: "Szczecin",
    instrumental: "Szczecinem",
    locative: "Szczecinie",
    vocative: "Szczecinie",
  },
  bydgoszcz: {
    nominative: "Bydgoszcz",
    genitive: "Bydgoszczy",
    dative: "Bydgoszczy",
    accusative: "Bydgoszcz",
    instrumental: "Bydgoszczą",
    locative: "Bydgoszczy",
    vocative: "Bydgoszczy",
  },
  lublin: {
    nominative: "Lublin",
    genitive: "Lublina",
    dative: "Lublinowi",
    accusative: "Lublin",
    instrumental: "Lublinem",
    locative: "Lublinie",
    vocative: "Lublinie",
  },
  katowice: {
    nominative: "Katowice",
    genitive: "Katowic",
    dative: "Katowicom",
    accusative: "Katowice",
    instrumental: "Katowicami",
    locative: "Katowicach",
    vocative: "Katowice",
  },
  bialystok: {
    nominative: "Białystok",
    genitive: "Białegostoku",
    dative: "Białemustokowi",
    accusative: "Białystok",
    instrumental: "Białymstokiem",
    locative: "Białymstoku",
    vocative: "Białymstoku",
  },
  gdynia: {
    nominative: "Gdynia",
    genitive: "Gdyni",
    dative: "Gdyni",
    accusative: "Gdynię",
    instrumental: "Gdynią",
    locative: "Gdyni",
    vocative: "Gdynio",
  },
  czestochowa: {
    nominative: "Częstochowa",
    genitive: "Częstochowy",
    dative: "Częstochowie",
    accusative: "Częstochowę",
    instrumental: "Częstochową",
    locative: "Częstochowie",
    vocative: "Częstochowo",
  },
  radom: {
    nominative: "Radom",
    genitive: "Radomia",
    dative: "Radomiowi",
    accusative: "Radom",
    instrumental: "Radomiem",
    locative: "Radomiu",
    vocative: "Radomie",
  },
  sosnowiec: {
    nominative: "Sosnowiec",
    genitive: "Sosnowca",
    dative: "Sosnowcowi",
    accusative: "Sosnowiec",
    instrumental: "Sosnowcem",
    locative: "Sosnowcu",
    vocative: "Sosnowcu",
  },
  torun: {
    nominative: "Toruń",
    genitive: "Torunia",
    dative: "Toruniowi",
    accusative: "Toruń",
    instrumental: "Toruniem",
    locative: "Toruniu",
    vocative: "Toruniu",
  },
  kielce: {
    nominative: "Kielce",
    genitive: "Kielc",
    dative: "Kielcom",
    accusative: "Kielce",
    instrumental: "Kielcami",
    locative: "Kielcach",
    vocative: "Kielce",
  },
  gliwice: {
    nominative: "Gliwice",
    genitive: "Gliwic",
    dative: "Gliwicom",
    accusative: "Gliwice",
    instrumental: "Gliwicami",
    locative: "Gliwicach",
    vocative: "Gliwice",
  },
  zabrze: {
    nominative: "Zabrze",
    genitive: "Zabrza",
    dative: "Zabrzowi",
    accusative: "Zabrze",
    instrumental: "Zabrzem",
    locative: "Zabrzu",
    vocative: "Zabrze",
  },
  bytom: {
    nominative: "Bytom",
    genitive: "Bytomia",
    dative: "Bytomiowi",
    accusative: "Bytom",
    instrumental: "Bytomiem",
    locative: "Bytomiu",
    vocative: "Bytomie",
  },
  "bielsko-biala": {
    nominative: "Bielsko-Biała",
    genitive: "Bielska-Białej",
    dative: "Bielsku-Białej",
    accusative: "Bielsko-Białą",
    instrumental: "Bielskiem-Białą",
    locative: "Bielsku-Białej",
    vocative: "Bielsko-Biała",
  },
  olsztyn: {
    nominative: "Olsztyn",
    genitive: "Olsztyna",
    dative: "Olsztynowi",
    accusative: "Olsztyn",
    instrumental: "Olsztynem",
    locative: "Olsztynie",
    vocative: "Olsztynie",
  },
  rzeszow: {
    nominative: "Rzeszów",
    genitive: "Rzeszowa",
    dative: "Rzeszowowi",
    accusative: "Rzeszów",
    instrumental: "Rzeszowem",
    locative: "Rzeszowie",
    vocative: "Rzeszowie",
  },
  grudziadz: {
    nominative: "Grudziądz",
    genitive: "Grudziądza",
    dative: "Grudziądzowi",
    accusative: "Grudziądz",
    instrumental: "Grudziądzem",
    locative: "Grudziądzu",
    vocative: "Grudziądzu",
  },
  "ruda-slaska": {
    nominative: "Ruda Śląska",
    genitive: "Rudy Śląskiej",
    dative: "Rudzie Śląskiej",
    accusative: "Rudę Śląską",
    instrumental: "Rudą Śląską",
    locative: "Rudzie Śląskiej",
    vocative: "Rudo Śląska",
  },
  rybnik: {
    nominative: "Rybnik",
    genitive: "Rybnika",
    dative: "Rybnikowi",
    accusative: "Rybnik",
    instrumental: "Rybnikiem",
    locative: "Rybniku",
    vocative: "Rybniku",
  },
  tychy: {
    nominative: "Tychy",
    genitive: "Tychów",
    dative: "Tychom",
    accusative: "Tychy",
    instrumental: "Tychami",
    locative: "Tychach",
    vocative: "Tychy",
  },
  "dabrowa-gornicza": {
    nominative: "Dąbrowa Górnicza",
    genitive: "Dąbrowy Górniczej",
    dative: "Dąbrowie Górniczej",
    accusative: "Dąbrowę Górniczą",
    instrumental: "Dąbrową Górniczą",
    locative: "Dąbrowie Górniczej",
    vocative: "Dąbrowo Górnicza",
  },
  plock: {
    nominative: "Płock",
    genitive: "Płocka",
    dative: "Płockowi",
    accusative: "Płock",
    instrumental: "Płockiem",
    locative: "Płocku",
    vocative: "Płocku",
  },
  elblag: {
    nominative: "Elbląg",
    genitive: "Elbląga",
    dative: "Elblągiowi",
    accusative: "Elbląg",
    instrumental: "Elblągiem",
    locative: "Elblągu",
    vocative: "Elblągu",
  },
  walbrzych: {
    nominative: "Wałbrzych",
    genitive: "Wałbrzycha",
    dative: "Wałbrzychowi",
    accusative: "Wałbrzych",
    instrumental: "Wałbrzychem",
    locative: "Wałbrzychu",
    vocative: "Wałbrzychu",
  },
  wloclawek: {
    nominative: "Włocławek",
    genitive: "Włocławka",
    dative: "Włocławkowi",
    accusative: "Włocławek",
    instrumental: "Włocławkiem",
    locative: "Włocławku",
    vocative: "Włocławku",
  },
  tarnow: {
    nominative: "Tarnów",
    genitive: "Tarnowa",
    dative: "Tarnowowi",
    accusative: "Tarnów",
    instrumental: "Tarnowem",
    locative: "Tarnowie",
    vocative: "Tarnowie",
  },
  chorzow: {
    nominative: "Chorzów",
    genitive: "Chorzowa",
    dative: "Chorzowowi",
    accusative: "Chorzów",
    instrumental: "Chorzowem",
    locative: "Chorzowie",
    vocative: "Chorzowie",
  },
  kalisz: {
    nominative: "Kalisz",
    genitive: "Kalisza",
    dative: "Kaliszowi",
    accusative: "Kalisz",
    instrumental: "Kaliszem",
    locative: "Kaliszu",
    vocative: "Kaliszu",
  },
  koszalin: {
    nominative: "Koszalin",
    genitive: "Koszalina",
    dative: "Koszalinowi",
    accusative: "Koszalin",
    instrumental: "Koszalinem",
    locative: "Koszalinie",
    vocative: "Koszalinie",
  },
  legnica: {
    nominative: "Legnica",
    genitive: "Legnicy",
    dative: "Legnicy",
    accusative: "Legnicę",
    instrumental: "Legnicą",
    locative: "Legnicy",
    vocative: "Legnico",
  },
  slupsk: {
    nominative: "Słupsk",
    genitive: "Słupska",
    dative: "Słupskowi",
    accusative: "Słupsk",
    instrumental: "Słupskiem",
    locative: "Słupsku",
    vocative: "Słupsku",
  },
  jaworzno: {
    nominative: "Jaworzno",
    genitive: "Jaworzna",
    dative: "Jaworznie",
    accusative: "Jaworzno",
    instrumental: "Jaworznem",
    locative: "Jaworznie",
    vocative: "Jaworzno",
  },
  "jastrzebie-zdroj": {
    nominative: "Jastrzębie-Zdrój",
    genitive: "Jastrzębia-Zdroju",
    dative: "Jastrzębiu-Zdrojowi",
    accusative: "Jastrzębie-Zdrój",
    instrumental: "Jastrzębiem-Zdrojem",
    locative: "Jastrzębiu-Zdroju",
    vocative: "Jastrzębie-Zdroju",
  },
  "nowy-sacz": {
    nominative: "Nowy Sącz",
    genitive: "Nowego Sącza",
    dative: "Nowemu Sączowi",
    accusative: "Nowy Sącz",
    instrumental: "Nowym Sączem",
    locative: "Nowym Sączu",
    vocative: "Nowy Sączu",
  },
  "jelenia-gora": {
    nominative: "Jelenia Góra",
    genitive: "Jeleniej Góry",
    dative: "Jeleniej Górze",
    accusative: "Jelenią Górę",
    instrumental: "Jelenią Górą",
    locative: "Jeleniej Górze",
    vocative: "Jelenia Góro",
  },
  konin: {
    nominative: "Konin",
    genitive: "Konina",
    dative: "Koninowi",
    accusative: "Konin",
    instrumental: "Koninem",
    locative: "Koninie",
    vocative: "Koninie",
  },
  "piotrkow-trybunalski": {
    nominative: "Piotrków Trybunalski",
    genitive: "Piotrkowa Trybunalskiego",
    dative: "Piotrkowowi Trybunalskiemu",
    accusative: "Piotrków Trybunalski",
    instrumental: "Piotrkowem Trybunalskim",
    locative: "Piotrkowie Trybunalskim",
    vocative: "Piotrkowie Trybunalski",
  },
  "zielona-gora": {
    nominative: "Zielona Góra",
    genitive: "Zielonej Góry",
    dative: "Zielonej Górze",
    accusative: "Zieloną Górę",
    instrumental: "Zieloną Górą",
    locative: "Zielonej Górze",
    vocative: "Zielona Góro",
  },
  zakopane: {
    nominative: "Zakopane",
    genitive: "Zakopanego",
    dative: "Zakopanemu",
    accusative: "Zakopane",
    instrumental: "Zakopanem",
    locative: "Zakopanem",
    vocative: "Zakopane",
  },
  opole: {
    nominative: "Opole",
    genitive: "Opola",
    dative: "Opolu",
    accusative: "Opole",
    instrumental: "Opolem",
    locative: "Opolu",
    vocative: "Opole",
  },
};

// Get city in specific grammatical case
export function getCityInCase(
  citySlug: string,
  grammaticalCase: PolishCase
): string {
  const declension = cityDeclensions[citySlug];
  if (!declension) {
    // Fallback to display name if declension not found
    return getCityDisplayName(citySlug);
  }

  switch (grammaticalCase) {
    case PolishCase.NOMINATIVE:
      return declension.nominative;
    case PolishCase.GENITIVE:
      return declension.genitive;
    case PolishCase.DATIVE:
      return declension.dative;
    case PolishCase.ACCUSATIVE:
      return declension.accusative;
    case PolishCase.INSTRUMENTAL:
      return declension.instrumental;
    case PolishCase.LOCATIVE:
      return declension.locative;
    case PolishCase.VOCATIVE:
      return declension.vocative;
    default:
      return declension.nominative;
  }
}

// Get all declensions for a city
export function getCityDeclension(citySlug: string): CityDeclension | null {
  return cityDeclensions[citySlug] || null;
}

// Generate content with proper grammar for different contexts
export function generateCityContent(citySlug: string) {
  const declension = getCityDeclension(citySlug);
  if (!declension) return null;

  return {
    // Different grammatical contexts
    contexts: {
      // "Strona internetowa w Warszawie" (locative)
      location: `w ${getCityInCase(citySlug, PolishCase.LOCATIVE)}`,

      // "Firma z Warszawy" (genitive)
      origin: `z ${getCityInCase(citySlug, PolishCase.GENITIVE)}`,

      // "Usługi dla Warszawy" (genitive)
      target: `dla ${getCityInCase(citySlug, PolishCase.GENITIVE)}`,

      // "Mieszkańcom Warszawy" (dative)
      residents: `mieszkańcom ${getCityInCase(citySlug, PolishCase.GENITIVE)}`,

      // "Obsługujemy Warszawę" (accusative)
      service: `obsługujemy ${getCityInCase(citySlug, PolishCase.ACCUSATIVE)}`,

      // "Razem z Warszawą" (instrumental)
      together: `razem z ${getCityInCase(citySlug, PolishCase.INSTRUMENTAL)}`,

      // "O Warszawie" (locative)
      about: `o ${getCityInCase(citySlug, PolishCase.LOCATIVE)}`,
    },

    // Ready-to-use phrases for content
    phrases: {
      webDesignService: `Tworzenie stron internetowych w ${getCityInCase(
        citySlug,
        PolishCase.LOCATIVE
      )}`,
      localBusiness: `Lokalna firma z ${getCityInCase(
        citySlug,
        PolishCase.GENITIVE
      )}`,
      forResidents: `Dla mieszkańców ${getCityInCase(
        citySlug,
        PolishCase.GENITIVE
      )}`,
      servingCity: `Obsługujemy ${getCityInCase(
        citySlug,
        PolishCase.ACCUSATIVE
      )}`,
      aboutCity: `O ${getCityInCase(citySlug, PolishCase.LOCATIVE)}`,
      welcomeCity: `Witaj ${getCityInCase(citySlug, PolishCase.VOCATIVE)}!`,
      workingWith: `Współpracujemy z ${getCityInCase(
        citySlug,
        PolishCase.INSTRUMENTAL
      )}`,
      citySpecialist: `Specjalista ${getCityInCase(
        citySlug,
        PolishCase.GENITIVE
      )}`,
    },

    // All grammatical forms for reference
    allForms: declension,
  };
}
