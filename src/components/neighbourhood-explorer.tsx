import { useState } from "react";

import { useUi } from "@/components/cms/site-context";
import { CmsImage } from "@/components/cms/cms-image";
import { SIZES } from "@/lib/cms/image";

export type ExplorePlace = {
  kicker: string;
  title: string;
  description: string;
  image?: string;
  href?: string;
};

export type Neighbourhood = {
  name: string;
  intro: string;
  places: ExplorePlace[];
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  neighbourhoods: Neighbourhood[];
};

export function NeighbourhoodExplorer({ eyebrow, title, description, neighbourhoods }: Props) {
  const ui = useUi();
  const [active, setActive] = useState(0);
  const current = neighbourhoods[active];

  return (
    <section className="flex w-full flex-col items-center bg-sand px-6 pb-16 pt-20 text-taupe sm:px-10 sm:pt-24 lg:px-20 lg:pt-32">
      <div className="flex flex-col items-center text-center">
        <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</p>
        <h2 className="mt-7 font-serif text-[34px] font-normal leading-[1.15] sm:text-[44px]">{title}</h2>
        <p className="mt-5 max-w-[560px] text-[15px] font-light leading-[1.75] opacity-85">{description}</p>
      </div>

      <div
        role="tablist"
        aria-label="Choose a neighbourhood"
        className="mt-14 flex items-center justify-center gap-8 sm:gap-14"
      >
        {neighbourhoods.map((n, i) => (
          <button
            key={n.name}
            type="button"
            role="tab"
            id={`tab-${i}`}
            aria-selected={active === i}
            aria-controls={`panel-${i}`}
            onClick={() => setActive(i)}
            className={`cursor-pointer border-b py-3.5 text-[12px] font-medium uppercase tracking-[0.32em] transition-colors duration-200 hover:text-taupe focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-clay ${
              active === i ? "border-taupe text-taupe" : "border-transparent text-clay"
            }`}
          >
            {n.name}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="mt-14 flex w-full max-w-[1200px] flex-col items-center"
      >
        <div className="text-center">
          <h3 className="font-serif text-[30px] font-normal leading-[1.15] sm:text-[34px]">{ui.explore} {current.name}</h3>
          <p className="mx-auto mt-4 max-w-[640px] text-[15px] font-light leading-[1.7] opacity-85">{current.intro}</p>
        </div>

        <ul className="mt-12 grid w-full list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {current.places.map((p) => (
            <li key={p.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[4px] bg-pearl shadow-[0_4px_40px_rgba(0,0,0,0.06)] transition-[transform,box-shadow] duration-[260ms] ease-out hover:-translate-y-[3px] hover:shadow-[0_14px_46px_rgba(0,0,0,0.10)]">
                <div className="aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-sand to-clay/50">
                  {p.image && (
                    <CmsImage
                      src={p.image}
                      alt={p.title}
                      width={1600}
                      height={1000}
                      sizes={SIZES.card}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <div className="flex min-h-[140px] flex-grow flex-col px-6 py-6">
                  <p className="pl-[0.32em] text-[10px] uppercase tracking-[0.32em] text-clay">{p.kicker}</p>
                  <h4 className="mt-4 font-serif text-[22px] font-normal leading-[1.15]">{p.title}</h4>
                  <p className="mt-1 text-[14px] font-light leading-[1.6] opacity-85">{p.description}</p>
                  <a
                    href={p.href ?? "#"}
                    className="mt-4 inline-flex items-center gap-2.5 self-start border-b border-clay/55 pb-1 pt-1 text-[11px] font-medium uppercase tracking-[0.32em] transition-colors duration-[180ms] hover:border-umber/70 hover:text-umber"
                  >
                    <span>{ui.explorePlace}</span>
                    <svg viewBox="0 0 16 12" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                      <path d="M1 6 H14 M10 2 L14 6 L10 10" />
                    </svg>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
