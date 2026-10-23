import { Link } from "@tanstack/react-router";
import { CmsImage } from "@/components/cms-image";

type LocationPhoto = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type WelcomingLocation = {
  name: string;
  area: string;
  stay: string;
  desc: string;
  detail: string;
  imgs: LocationPhoto[];
};

type WelcomingLocationsProps = {
  eyebrow?: string;
  heading?: string;
  showViewAll?: boolean;
  viewAllLabel?: string;
  viewAllTo?: string;
  locations?: WelcomingLocation[];
};

/** Addresses come from WordPress › Locations; the headings and link from the section. */
export function WelcomingLocations({ eyebrow, heading, showViewAll = true, viewAllLabel, viewAllTo, locations = [] }: WelcomingLocationsProps) {
  return (
    <section id="locations" className="scroll-mt-20 bg-sand px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto mb-16 max-w-[1200px] text-center">
        {eyebrow && (
          <span className="mb-5 block text-[10px] uppercase tracking-[0.35em] text-clay">
            {eyebrow}
          </span>
        )}
        {heading && (
          <h2 className="font-serif text-3xl font-light leading-tight text-taupe md:text-5xl">
            {heading}
          </h2>
        )}
        {showViewAll && viewAllLabel && viewAllTo && (
          <Link
            to={viewAllTo}
            className="mt-10 inline-flex items-center gap-3.5 border-b border-clay/55 pb-1.5 text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors hover:border-umber/60 hover:text-umber focus-visible:outline focus-visible:outline-clay focus-visible:outline-offset-4 md:mt-12"
          >
            {viewAllLabel}
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
                        <CmsImage sizes="(min-width: 1024px) 33vw, 100vw"
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
                  <p className="font-serif text-[16px] italic leading-[1.7] text-taupe/60">{l.detail}</p>
                </div>
              </div>

            </article>
          );
        })}
      </div>
    </section>
  );
}
