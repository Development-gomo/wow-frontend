import { useState } from "react";

import { useUi, useLocalizeHref } from "@/components/cms/site-context";
import { cn } from "@/lib/utils";
import { PhotoCarousel } from "@/components/photo-carousel";
import { PriceTag, CardActionButton, type Price } from "@/components/accommodation-listing";

export type ExplorePlace = {
  kicker: string;
  title: string;
  description: string;
  image?: string;
  href?: string;
  /** Extra photos after `image`; the card then shows the shared photo carousel. */
  images?: string[];
  /** Price + booking button footer (offer cards); replaces the text link. */
  price?: Price;
  action?: { label: string; to: string };
};

export type Neighbourhood = {
  name: string;
  intro: string;
  /** Optional panel heading; defaults to the shared "Explore" label and the name. "" hides it. */
  heading?: string;
  places: ExplorePlace[];
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  neighbourhoods: Neighbourhood[];
  /** Tab list label for screen readers. */
  tabsLabel?: string;
  /** Card link label; cards without href show no link. Defaults to the shared "Explore place" label. */
  linkLabel?: string;
  /** Unique prefix for tab/panel ids when a page renders more than one explorer. */
  idPrefix?: string;
  /** Section surface overrides (spacing), merged with cn so the page value wins. */
  className?: string;
  /** Section anchor id, e.g. for in-page links. */
  id?: string;
  /** Disable the card lift for service cards without affecting other pages. */
  cardHoverMotion?: boolean;
  /** Override for the gap between the section intro and the card panel (default mt-14). */
  panelClassName?: string;
};

export function NeighbourhoodExplorer({ id, eyebrow, title, description, neighbourhoods, tabsLabel = "Choose a neighbourhood", linkLabel, idPrefix = "", className, cardHoverMotion = true, panelClassName }: Props) {
  const localize = useLocalizeHref();
  const ui = useUi();
  const placeLinkLabel = linkLabel ?? ui.explorePlace;
  const [active, setActive] = useState(0);
  const current = neighbourhoods[active];

  return (
    <section id={id} className={cn("scroll-mt-20 flex w-full flex-col items-center bg-sand px-6 text-taupe sm:px-10 sm:py-24 lg:px-20 lg:py-32", className)}>
      <div className="flex flex-col items-center text-center">
        <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</p>
        <h2 className="mt-6 font-serif text-[34px] font-normal leading-[1.15] sm:text-[44px]">{title}</h2>
        <p className="mt-4 max-w-[560px] text-[15px] font-light leading-[1.75] opacity-85">{description}</p>
      </div>

      {neighbourhoods.length > 1 && (<div
        role="tablist"
        aria-label={tabsLabel}
        className="mt-14 flex items-center justify-center gap-8 sm:gap-14"
      >
        {neighbourhoods.map((n, i) => (
          <button
            key={n.name}
            type="button"
            role="tab"
            id={`${idPrefix}tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${idPrefix}panel-${i}`}
            onClick={() => setActive(i)}
            className={`cursor-pointer border-b py-3.5 text-[12px] font-medium uppercase tracking-[0.32em] transition-colors duration-200 hover:text-taupe focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-clay ${
              active === i ? "border-taupe text-taupe" : "border-transparent text-clay"
            }`}
          >
            {n.name}
          </button>
        ))}
      </div>)}

      <div
        role={neighbourhoods.length > 1 ? "tabpanel" : undefined}
        id={`${idPrefix}panel-${active}`}
        aria-labelledby={`${idPrefix}tab-${active}`}
        className={cn("mt-14 flex w-full max-w-[1200px] flex-col items-center", panelClassName)}
      >
        {(current.heading ?? current.name) || current.intro ? (
          <div className="text-center">
            <h3 className="font-serif text-[30px] font-normal leading-[1.15] sm:text-[34px]">{current.heading ?? `${ui.explore} ${current.name}`}</h3>
            <p className="mx-auto mt-4 max-w-[640px] text-[15px] font-light leading-[1.7] opacity-85">{current.intro}</p>
          </div>
        ) : null}

        <ul className={cn("grid w-full list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3", current.places.some((place) => place.price && place.action) && "sm:grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] lg:grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]", current.heading === "" && !current.intro ? "" : "mt-12")}>
          {current.places.map((p) => (
            <li key={p.title}>
              <article className={cn("group flex h-full flex-col", cardHoverMotion && "transition-transform duration-[260ms] ease-out motion-safe:hover:-translate-y-[3px]")}>
                {p.image ? (
                  <PhotoCarousel images={[p.image, ...(p.images ?? [])]} title={p.title} heightClass="aspect-[16/10]" />
                ) : (
                  <div className="aspect-[16/10] w-full bg-gradient-to-br from-sand to-clay/50" />
                )}
                <div className="relative z-10 mx-auto -mt-5 flex min-h-[140px] w-[calc(100%-24px)] flex-grow flex-col bg-pearl px-6 py-6 shadow-accommodation">
                  <p className="pl-[0.32em] text-[10px] uppercase tracking-[0.32em] text-clay">{p.kicker}</p>
                  <h4 className="mt-4 font-serif text-[22px] font-normal leading-[1.15]">{p.title}</h4>
                  <p className="mt-1 text-[14px] font-light leading-[1.6] opacity-85">{p.description}</p>
                  {p.price && p.action ? (
                    <div className="mt-auto flex flex-nowrap items-center justify-between gap-0.5 pt-6">
                      <PriceTag price={p.price} compact />
                      <CardActionButton label={p.action.label} to={p.action.to} className="shrink-0 whitespace-nowrap px-2.5" />
                    </div>
                  ) : p.href && (<a
                    href={localize(p.href)}
                    className="mt-4 inline-flex items-center gap-2.5 self-start border-b border-clay/55 pb-1 pt-1 text-[11px] font-medium uppercase tracking-[0.32em] transition-colors duration-[180ms] hover:border-umber/70 hover:text-umber"
                  >
                    <span>{placeLinkLabel}</span>
                    <svg viewBox="0 0 16 12" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                      <path d="M1 6 H14 M10 2 L14 6 L10 10" />
                    </svg>
                  </a>)}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
