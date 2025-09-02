import Map from "@/components/Map";
import Contact from "../quixyComponents/Contact";

type MapMarker = {
  id: string;
  top: string;
  left: string;
  leftSm?: string;
  topSm?: string;
  width: string;
  text: string;
};

type ReachSectionProps = {
  markers: MapMarker[];
};

// Helper: disables pointer events and hides marker text when invisible
function MarkerText({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  if (!visible) return null;
  return (
    <span
      className={visible ? "" : "pointer-events-none select-none opacity-0"}
      aria-hidden={!visible}
    >
      {children}
    </span>
  );
}

export default function ReachSection({ markers }: ReachSectionProps) {
  return (
    <div className="mb-12">
      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-12">
          <span className="mt-12 mb-6 italic text-3xl lg:text-4xl font-bold text-zinc-800 drop-shadow-md shadow-black">
            Zasięg Działania
          </span>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Realizujemy strony internetowe, platformy webowe oraz kampanie
            marketingowe (Google Ads, social media) dla klientów w całej Polsce.
            Pracujemy zdalnie, z pełnym wsparciem niezależnie od lokalizacji.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm text-center">
              <div className="text-2xl font-bold text-blue-600">16</div>
              <div className="text-sm text-gray-600">Województw</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm text-center">
              <div className="text-2xl font-bold text-green-600">50+</div>
              <div className="text-sm text-gray-600">Miast</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm text-center">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Zdalnie</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm text-center">
              <div className="text-2xl font-bold text-orange-600">24h</div>
              <div className="text-sm text-gray-600">Odpowiedź</div>
            </div>
          </div>
        </div>

        <div className="relative w-full mx-auto overflow-visible">
          <Map />
        </div>
      </div>
    </div>
  );
}
