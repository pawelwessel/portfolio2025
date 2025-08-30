export default function OpinionsSection() {
  return (
    <div className="mt-12">
      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl p-8 shadow-lg">
        <h3 className="text-zinc-800 drop-shadow-xl shadow-black text-3xl lg:text-4xl font-bold text-center mb-4">
          Opinie zadowolonych klientów
        </h3>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Zobacz, co mówią o mnie moi klienci. Każdy projekt to dla mnie nowa
          przygoda!
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
              Strona gotowa szybciej niż się spodziewałam! Wszystko działa
              super, a klienci mogą się łatwo umawiać dzięki Pawłowi.
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
              Sklep śmiga, płatności bez problemu, a sprzedaż rośnie. Polecam!
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
              Zero stresu, wszystko ogarnięte od A do Z. Strona dla gabinetu
              wygląda świetnie.
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
              Paweł zrobił stronę i system dla klientów – wszystko działa, a ja
              mam spokój. Polecam!
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
              Moje prace w końcu mają swoje miejsce w sieci! Strona wygląda
              pięknie 🎨
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
              Zamówienia online działają super, klienci zadowoleni, ja też!
              Dzięki!
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
              Strona śmiga na telefonie i komputerze, a klienci łatwo kupują.
              Paweł zna się na rzeczy.
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
              Aplikacja działa bez zarzutu, wszystko zgodnie z planem. Polecam
              Pawła każdemu!
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
              Strona wygląda świetnie i ładuje się błyskawicznie. Efekt wow! 🚀
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
              Rezerwacje online? Teraz to bajka. Wszystko działa, pacjenci
              zadowoleni.
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
              Więcej klientów i szybka strona – o to chodziło! Dzięki Pawłowi.
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
              Nowoczesna aplikacja, wszystko działa jak należy. Paweł zna się na
              rzeczy!
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
              Strona dla szkoły super, uczniowie zachwyceni. Polecam z całego
              serca!
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
