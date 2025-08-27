import Image from "next/image";

export default function ProfessionalsHighlight() {
  return (
    <section className="px-4 sm:px-6 bg-white">
      <div className="container-professional">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <figure className="relative rounded-xl overflow-hidden shadow-lg group">
            <Image
              src="https://images.unsplash.com/photo-1582092728391-2f82a8b29a03?w=1600&h=1200&fit=crop&crop=center&auto=format"
              alt="Certyfikowana manicurzystka – portfolio stylizacji paznokci hybrydowych"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <figcaption className="absolute bottom-3 left-3 right-3 bg-white/85 rounded-full text-xs font-semibold px-3 py-1 text-neutral-900">
              Specjalistka hybryd • Portfolio
            </figcaption>
          </figure>
          <figure className="relative rounded-xl overflow-hidden shadow-lg group">
            <Image
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&h=1200&fit=crop&crop=center&auto=format"
              alt="Stylistka paznokci – manicure japoński z naturalnym połyskiem, efekt przed i po"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <figcaption className="absolute bottom-3 left-3 right-3 bg-white/85 rounded-full text-xs font-semibold px-3 py-1 text-neutral-900">
              Manicure japoński • Efekt naturalny
            </figcaption>
          </figure>
          <figure className="relative rounded-xl overflow-hidden shadow-lg group">
            <Image
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600&h=1200&fit=crop&crop=center&auto=format"
              alt="Profesjonalna stylistka – salon manicure premium, stanowisko pracy i sterylne narzędzia"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <figcaption className="absolute bottom-3 left-3 right-3 bg-white/85 rounded-full text-xs font-semibold px-3 py-1 text-neutral-900">
              Salon premium • Profesjonalne stanowisko
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
