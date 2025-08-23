export default function OpinionsSection() {
  return (
    <div className="mt-12">
      <div className="w-[90vw] sm:w-3/4 mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl p-8 shadow-lg">
        <h3 className="text-3xl lg:text-4xl font-bold text-center mb-4">Opinie Zadowolonych Klientów</h3>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Poznaj opinię klientów o współpracy ze mną. Każdy projekt realizuję z pełnym zaangażowaniem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">A</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Anna Nowak</h4>
                <p className="text-sm text-gray-500">Właścicielka salonu fryzjerskiego</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;Profesjonalne wykonanie strony internetowej w bardzo dobrym czasie. Paweł świetnie zrozumiał moje potrzeby i stworzył nowoczesną stronę wizytówkę z systemem rezerwacji online. Polecam każdemu przedsiębiorcy!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">M</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Marek Zieliński</h4>
                <p className="text-sm text-gray-500">CEO firmy e-commerce</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;Sklep internetowy wykonany zgodnie z najwyższymi standardami. Integracja płatności, responsywny design i optymalizacja SEO - wszystko na najwyższym poziomie. Sprzedaż wzrosła o 200% w pierwszym miesiącu.&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">K</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Katarzyna Wójcik</h4>
                <p className="text-sm text-gray-500">Lekarz dentysta</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;Fantastyczne podejście do klienta! Nie musiałam się martwić żadnymi technikaliami. Paweł przeprowadził mnie przez cały proces tworzenia strony medycznej z systemem umówienia wizyt. Rezultat przekroczył oczekiwania!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">T</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Tomasz Lewandowski</h4>
                <p className="text-sm text-gray-500">Właściciel agencji marketingowej</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;Kompleksowa realizacja projektu - od UX/UI design po wdrożenie. Aplikacja webowa z CRM działa bez zarzutu. Świetne wsparcie techniczne i regularne aktualizacje. Najlepsza inwestycja w IT!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">J</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Joanna Kowalska</h4>
                <p className="text-sm text-gray-500">Artystka, właścicielka galerii</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;Portfolio online wykonane z niezwykłą dbałością o detale. Galeria zdjęć z zaawansowanymi animacjami Three.js wygląda profesjonalnie. Dzięki nowej stronie moja sztuka dotarła do szerszej publiczności!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">R</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Robert Nowicki</h4>
                <p className="text-sm text-gray-500">Właściciel restauracji</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;Strona restauracji z systemem zamówień online działa perfekcyjnie. Integracja z systemami płatności i dostaw znacznie uprościła prowadzenie biznesu. Profesjonalna obsługa od A do Z. Gorąco polecam!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">E</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Ewa Kowalczyk</h4>
                <p className="text-sm text-gray-500">Właścicielka sklepu internetowego</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;Sklep internetowy WordPress z WooCommerce to strzał w dziesiątkę! Optymalizacja SEO pozwoliła mi znaleźć się na pierwszej stronie Google. Responsywna strona internetowa działa idealnie na wszystkich urządzeniach. Programista webdeveloper z prawdziwą pasją!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">M</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Michał Jankowski</h4>
                <p className="text-sm text-gray-500">Dyrektor firmy IT</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;Aplikacja mobilna React Native przekroczyła nasze oczekiwania. Full-stack developer z ogromną wiedzą o nowoczesnych technologiach. Frontend React.js i backend Node.js działają bez zarzutu. Najlepszy programista stron internetowych w Polsce!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">A</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Aleksandra Wąsik</h4>
                <p className="text-sm text-gray-500">Marketing Manager</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;Strona firmowa wykonana w Next.js to prawdziwe dzieło sztuki! Web design UI/UX na najwyższym poziomie. Optymalizacja PageSpeed 100/100 i pozycjonowanie strony w Google przyniosły fantastyczne rezultaty. Webmaster z prawdziwą pasją do kodowania!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg">P</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Piotr Mazurek</h4>
                <p className="text-sm text-gray-500">Właściciel centrum medycznego</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;System rezerwacji online z kalendarzem wizyt to rewolucja w naszej praktyce! Strona internetowa HTML CSS JavaScript z integracją bazy danych MySQL działa bezawaryjnie. Tworzenie stron internetowych na poziomie enterprise. Najlepszy freelancer programista w branży!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg">L</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Liliana Bąk</h4>
                <p className="text-sm text-gray-500">Właścicielka butiku</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;E-commerce WooCommerce z płatnościami online Stripe i PayPal to najlepsza inwestycja! Responsywna strona www z mobile-first design ładuje się błyskawicznie. Pozycjonowanie SEO Google i optymalizacja Core Web Vitals na 5 gwiazdek. Polecam tego web developera każdemu!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">D</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Damian Czajka</h4>
                <p className="text-sm text-gray-500">CEO startupu technologicznego</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;Progressive Web App (PWA) z TypeScript i Firebase to technologiczne arcydzieło! API REST integracja z systemami zewnętrznymi działa perfekcyjnie. Frontend frameworki Vue.js i backend Laravel PHP - profesjonalizm na najwyższym poziomie. Software developer z prawdziwym talentem!&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center text-white font-bold text-lg">K</div>
              <div className="ml-3">
                <h4 className="font-bold text-gray-800">Karolina Nowak</h4>
                <p className="text-sm text-gray-500">Właścicielka szkoły językowej</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3"><span>⭐⭐⭐⭐⭐</span></div>
            <p className="text-gray-700 leading-relaxed">&quot;CMS WordPress z custom theme i wtyczkami to idealne rozwiązanie dla edukacji online! Optymalizacja bezpieczeństwa SSL i hosting optimization zapewniają spokój. Website design z animacjami CSS3 robi ogromne wrażenie na uczniach. Programowanie stron internetowych na światowym poziomie!&quot;</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">100%</div>
            <div className="text-sm text-gray-600">Zadowoleni klienci</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">79+</div>
            <div className="text-sm text-gray-600">Zrealizowanych projektów</div>
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