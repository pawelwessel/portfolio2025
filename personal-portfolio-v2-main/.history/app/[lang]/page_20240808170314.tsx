import IndexPage from "@/components/IndexPage";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div>
      <IndexPage dictionary={dictionary} />
    </div>
  );
}
