import { Link } from "@tanstack/react-router";
import foreningsgatanFacade from "@/assets/locations/foreningsgatan-facade.jpg";
import foreningsgatanTrees from "@/assets/locations/foreningsgatan-trees.jpg";
import foreningsgatanNeighbourhood from "@/assets/locations/foreningsgatan-neighbourhood.jpg";
import sanktSigfridsgatanAvenue from "@/assets/locations/sankt-sigfridsgatan-avenue.jpg";
import sanktSigfridsgatanStreet from "@/assets/locations/sankt-sigfridsgatan-street.jpg";
import sanktSigfridsgatanNeighbourhood from "@/assets/locations/sankt-sigfridsgatan-neighbourhood.jpg";
import fridkullagatanBuilding from "@/assets/locations/fridkullagatan-building.jpg";
import fridkullagatanGarden from "@/assets/locations/fridkullagatan-garden.jpg";
import fridkullagatanNeighbourhood from "@/assets/locations/fridkullagatan-neighbourhood.jpg";

type LocationPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function WelcomingLocations({ showViewAll = true }: { showViewAll?: boolean }) {
  const locations = [
    {
      name: "Föreningsgatan 7 & 9",
      area: "Vasastan",
      stay: "Shorter & longer stay",
      desc: "Vasastan sits at the heart of central Gothenburg — nineteenth-century stone buildings, tree-lined boulevards and cafés on every corner give the district its character. Haga, Avenyn and Slottsskogen are all within walking distance, yet Föreningsgatan itself keeps the calm rhythm of a real residential street.",
      detail: "Our original two buildings, side by side. Rooms, suites, the Penthouse apartment and longer-stay apartments — all opening onto a shared garden terrace at the back.",
      imgs: [
        { src: foreningsgatanFacade, alt: "Historic facade at Föreningsgatan in Vasastan", width: 1024, height: 1280 },
        { src: foreningsgatanTrees, alt: "Tree-lined street around Föreningsgatan in Vasastan", width: 1024, height: 1280 },
        { src: foreningsgatanNeighbourhood, alt: "Historic streetscape and corner café near Föreningsgatan", width: 1280, height: 1024 },
      ] satisfies LocationPhoto[],
    },
    {
      name: "Sankt Sigfridsgatan 64 and 66",
      area: "Örgryte",
      stay: "Longer stay",
      desc: "Örgryte has a quiet elegance — grand villas, avenues lined with older trees, and a stillness that feels a long way from the centre, even though Korsvägen, Liseberg and the heart of the city are only minutes away by tram. It is where the parks meet the city, with the Delsjön nature reserve just beyond.",
      detail: "Spacious apartments on a peaceful residential block, a short walk to the tram at Korsvägen and the cultural quarter around Liseberg and Universeum.",
      imgs: [
        { src: sanktSigfridsgatanAvenue, alt: "Historic villas at Sankt Sigfridsgatan in Örgryte", width: 1024, height: 1280 },
        { src: sanktSigfridsgatanStreet, alt: "Leafy street and tram near Sankt Sigfridsgatan", width: 1024, height: 1280 },
        { src: sanktSigfridsgatanNeighbourhood, alt: "Green residential avenue near Sankt Sigfridsgatan", width: 1280, height: 1024 },
      ] satisfies LocationPhoto[],
    },
    {
      name: "Fridkullagatan 2",
      area: "Johanneberg",
      stay: "Longer stay",
      desc: "Johanneberg is where the city gives way to green. Surrounded by gardens and stately 1930s architecture, it has the feel of an oasis without losing touch with the city around it. Fridkullagatan is a quiet street close to Chalmers and Mossen — the kind where you wake to birdsong rather than traffic.",
      detail: "Apartments with access to a shared garden — several with their own balcony or terrace for a quiet morning coffee outside.",
      imgs: [
        { src: fridkullagatanBuilding, alt: "Fridkullagatan residence and shared garden in Johanneberg", width: 1024, height: 1280 },
        { src: fridkullagatanGarden, alt: "Leafy shared courtyard at Fridkullagatan", width: 1024, height: 1280 },
        { src: fridkullagatanNeighbourhood, alt: "Leafy residential garden path around Fridkullagatan", width: 1280, height: 1024 },
      ] satisfies LocationPhoto[],
    },
  ];

  return (
    <section id="locations" className="scroll-mt-20 bg-sand px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto mb-16 max-w-[1200px] text-center">
        <span className="mb-5 block text-[10px] uppercase tracking-[0.35em] text-clay">
          Our addresses
        </span>
        <h2 className="font-serif text-3xl font-light leading-tight text-taupe md:text-5xl">
          Our welcoming locations in Gothenburg
        </h2>
        {showViewAll && (
          <Link
            to="/locations"
            className="mt-10 inline-flex items-center gap-3.5 border-b border-clay/55 pb-1.5 text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors hover:border-umber/60 hover:text-umber focus-visible:outline focus-visible:outline-clay focus-visible:outline-offset-4 md:mt-12"
          >
            View all locations
            <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path d="M1 6h13m-4-4 4 4-4 4" />
            </svg>
          </Link>
        )}
      </div>

      <div id="locations-list" className="mx-auto flex max-w-[1200px] scroll-mt-24 flex-col gap-16">
        {locations.map((l, i) => {
          const reverse = i % 2 === 1;
          return (
            <article key={l.name}>
              <div className={`grid items-center gap-10 md:grid-cols-12 md:gap-12 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative md:col-span-7">
                  <div className="relative aspect-[5/4] w-full">
                    {l.imgs.map((photo, photoIndex) => (
                      <div
                        key={photo.src}
                        className={`group absolute cursor-pointer overflow-hidden bg-pearl p-2 shadow-[0_20px_60px_-20px_color-mix(in_oklch,var(--taupe)_30%,transparent)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-500 motion-safe:ease-out hover:z-20 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_color-mix(in_oklch,var(--taupe)_48%,transparent)] focus-within:z-20 ${
                          [
                            "left-0 top-0 h-[78%] w-[72%]",
                            "right-0 top-[8%] h-[52%] w-[44%]",
                            "bottom-0 left-[32%] h-[46%] w-[46%]",
                          ][photoIndex]
                        }`}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          width={photo.width}
                          height={photo.height}
                          className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5">
                  <span className="mb-4 block text-[10px] uppercase tracking-[0.32em] text-clay">{l.area}</span>
                  <h3 className="mb-4 font-serif text-2xl font-light leading-[1.15] text-taupe md:text-4xl">{l.name}</h3>
                  <div className="mb-6">
                    <span className="wow-chip inline-flex items-center gap-2.5 rounded-full border border-clay/30 bg-pearl/70 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-taupe">
                      <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
                      {l.stay}
                    </span>
                  </div>
                  <p className="mb-5 text-[15px] font-light leading-[1.8] text-taupe/80">{l.desc}</p>
                  <p className="font-serif text-[13px] italic leading-[1.7] text-taupe/60">{l.detail}</p>
                </div>
              </div>

            </article>
          );
        })}
      </div>
    </section>
  );
}
