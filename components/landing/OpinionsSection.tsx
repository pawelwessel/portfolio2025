export default function OpinionsSection() {
  return (
    <div className="mt-12">
      <div className="w-[90vw] sm:w-3/4 mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl p-8 shadow-lg">
        <h3 className="text-zinc-800 drop-shadow-xl shadow-black text-3xl lg:text-4xl font-bold text-center mb-4">
          Opinie Zadowolonych Klientów
        </h3>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Poznaj opinię klientów o współpracy ze mną. Każdy projekt realizuję z
          pełnym zaangażowaniem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Anna N.</h4>
                <p className="text-sm text-gray-500">
                  Właścicielka salonu fryzjerskiego
                </p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Profesjonalne wykonanie strony internetowej w bardzo dobrym
              czasie. Paweł świetnie zrozumiał moje potrzeby i stworzył
              nowoczesną stronę z możliwością umówienia wizyt online. Polecam
              każdemu przedsiębiorcy!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Marek Z.</h4>
                <p className="text-sm text-gray-500">CEO firmy e-commerce</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Sklep internetowy wykonany profesjonalnie i zgodnie z moimi
              oczekiwaniami. Strona działa sprawnie, płatności online działają
              bez problemów. Sprzedaż wzrosła o 200% w pierwszym miesiącu dzięki
              lepszej widoczności w Google.&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                K
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Katarzyna W.</h4>
                <p className="text-sm text-gray-500">Lekarz dentysta</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Fantastyczne podejście do klienta! Nie musiałam się martwić
              żadnymi szczegółami technicznymi. Paweł przeprowadził mnie przez
              cały proces tworzenia strony dla mojej praktyki lekarskiej z
              możliwością umawiania wizyt. Rezultat przekroczył
              oczekiwania!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Tomasz L.</h4>
                <p className="text-sm text-gray-500">
                  Właściciel agencji marketingowej
                </p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Kompleksowa realizacja projektu - od projektu strony po jej
              uruchomienie. Nowa strona z systemem zarządzania klientami działa
              bez zarzutu. Świetne wsparcie po oddaniu projektu i regularne
              aktualizacje. Najlepsza inwestycja w rozwój firmy!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                J
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Joanna K.</h4>
                <p className="text-sm text-gray-500">
                  Artystka, właścicielka galerii
                </p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Portfolio online wykonane z niezwykłą dbałością o detale.
              Galeria moich prac wygląda profesjonalnie i bardzo efektownie.
              Dzięki nowej stronie moja sztuka dotarła do szerszej publiczności
              i zyskałam nowych klientów!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Robert N.</h4>
                <p className="text-sm text-gray-500">Właściciel restauracji</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Strona restauracji z możliwością zamawiania online działa
              perfekcyjnie. Klienci mogą teraz łatwo składać zamówienia, a
              płatności są automatycznie obsługiwane. Znacznie uprościło to
              prowadzenie biznesu. Profesjonalna obsługa od A do Z!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                E
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Ewa K.</h4>
                <p className="text-sm text-gray-500">
                  Właścicielka sklepu internetowego
                </p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Sklep internetowy to strzał w dziesiątkę! Dzięki poprawie
              widoczności w Google moja strona znalazła się na pierwszej stronie
              wyników wyszukiwania. Sklep działa idealnie na telefonach i
              komputerach. Paweł to profesjonalista z prawdziwą pasją!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Michał J.</h4>
                <p className="text-sm text-gray-500">Dyrektor firmy IT</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Aplikacja mobilna dla naszej firmy przekroczyła nasze
              oczekiwania. Paweł ma ogromną wiedzę o nowoczesnych rozwiązaniach
              internetowych. Cały system działa bez zarzutu i znacznie ułatwił
              nam pracę. Najlepszy specjalista od stron internetowych!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Aleksandra W.</h4>
                <p className="text-sm text-gray-500">Marketing Manager</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Strona firmowa to prawdziwe dzieło sztuki! Projekt i
              użyteczność na najwyższym poziomie. Strona ładuje się
              błyskawicznie, a pozycjonowanie w Google przyniosło fantastyczne
              rezultaty w postaci nowych klientów. Paweł to specjalista z
              prawdziwą pasją!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Piotr M.</h4>
                <p className="text-sm text-gray-500">
                  Właściciel centrum medycznego
                </p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;System rezerwacji online z kalendarzem wizyt to rewolucja w
              naszej praktyce! Pacjenci mogą teraz umówić się na wizytę przez
              stronę internetową, a my mamy wszystko pod kontrolą. Strona działa
              bezawaryjnie. Najlepszy specjalista w branży!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                L
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Liliana B.</h4>
                <p className="text-sm text-gray-500">Właścicielka butiku</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Sklep internetowy z płatnościami online to najlepsza
              inwestycja! Strona ładuje się błyskawicznie na telefonach i
              komputerach. Dzięki poprawie widoczności w Google mam znacznie
              więcej klientów. Polecam Pawła każdemu przedsiębiorcy!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Damian C.</h4>
                <p className="text-sm text-gray-500">
                  CEO startupu technologicznego
                </p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;Progressive Web App (PWA) z TypeScript i Firebase to
              technologiczne arcydzieło! API REST integracja z systemami
              zewnętrznymi działa perfekcyjnie. Frontend frameworki Vue.js i
              backend Laravel PHP - profesjonalizm na najwyższym poziomie.
              Software developer z prawdziwym talentem!&quot;
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 aspect-square bg-lime-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                K
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Karolina N.</h4>
                <p className="text-sm text-gray-500">
                  Właścicielka szkoły językowej
                </p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              &quot;CMS WordPress z custom theme i wtyczkami to idealne
              rozwiązanie dla edukacji online! Optymalizacja bezpieczeństwa SSL
              i hosting optimization zapewniają spokój. Website design z
              animacjami CSS3 robi ogromne wrażenie na uczniach. Programowanie
              stron internetowych na światowym poziomie!&quot;
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">100%</div>
            <div className="text-sm text-gray-600">Zadowoleni klienci</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">79+</div>
            <div className="text-sm text-gray-600">
              Zrealizowanych projektów
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600">Wsparcie techniczne</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">5.0</div>
            <div className="text-sm text-gray-600">Średnia ocen</div>
          </div>
        </div>
      </div>
    </div>
  );
}
