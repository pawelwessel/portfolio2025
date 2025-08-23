import Map from "@/components/Map";

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

export default function ReachSection({ markers }: ReachSectionProps) {
  return (
    <div className="mt-24">
      <div className="w-[90vw] sm:w-3/4 mx-auto bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-12">
          <h2 className="mt-12 mb-6 italic text-3xl lg:text-4xl font-bold text-zinc-800 drop-shadow-md shadow-black">
            Zasięg Działania
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Realizuję projekty dla klientów w całej Polsce. Współpracuję
            zdalnie, zapewniając profesjonalną obsługę bez względu na
            lokalizację.
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

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="relative w-full mx-auto overflow-visible">
            <Map />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className="text-sm text-gray-700">
                Zrealizowane projekty
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-700">Obszar działania</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg md:col-span-2 lg:col-span-1">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <span className="text-sm text-gray-700">Współpraca zdalna</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">Północ</h4>
            <p className="text-sm text-blue-700">Gdańsk, Szczecin, Olsztyn</p>
            <p className="text-xs text-blue-600 mt-1">8+ projektów</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">Zachód</h4>
            <p className="text-sm text-green-700">
              Wrocław, Poznań, Zielona Góra
            </p>
            <p className="text-xs text-green-600 mt-1">12+ projektów</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <h4 className="font-bold text-purple-800 mb-2">Centrum</h4>
            <p className="text-sm text-purple-700">Warszawa, Łódź, Bydgoszcz</p>
            <p className="text-xs text-purple-600 mt-1">15+ projektów</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
            <h4 className="font-bold text-orange-800 mb-2">Południe</h4>
            <p className="text-sm text-orange-700">Kraków, Katowice, Rzeszów</p>
            <p className="text-xs text-orange-600 mt-1">18+ projektów</p>
          </div>
        </div>
      </div>
    </div>
  );
}
