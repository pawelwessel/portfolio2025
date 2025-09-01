import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Content from "./Content";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div>
      <Content dictionary={dictionary} lang={params.lang} />
    </div>
  );
}
