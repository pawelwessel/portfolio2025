import ShopSection from "@/components/ShopSection";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fetch all products from Shopify instead of limiting to 8 */}
      {/* You can still filter by product_type, vendor, collection_id */}
      <ShopSection
        title="Sklep"
        subtitle="Wszystkie produkty"
        fetch_all={true}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Sklep – produkty do manicure i pedicure",
  description:
    "Sklep Naily: sprawdzone produkty do stylizacji paznokci. Kup lakiery, żele, akcesoria i narzędzia polecane przez profesjonalistki.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    type: "website",
    title: "Sklep – produkty do manicure i pedicure",
    description:
      "Sklep Naily: sprawdzone produkty do stylizacji paznokci. Kup lakiery, żele, akcesoria i narzędzia polecane przez profesjonalistki.",
    url: "/shop",
  },
};
