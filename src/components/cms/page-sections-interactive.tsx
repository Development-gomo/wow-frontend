"use client";

import { useEffect, useState } from "react";

import { CmsImage } from "@/components/cms-image";
import { useA11y } from "@/components/cms/site-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Link } from "@/components/localized-link";

/*
 * The interactive sections of the one-off pages: the Gallery lightbox and the
 * Locations map. Everything else in page-sections.tsx renders on the server.
 */

type GalleryPhoto = { src: string; alt: string; shape: "small" | "feature" | "portrait" | "wide" };

const SHAPE_CLASS: Record<GalleryPhoto["shape"], string> = {
  feature: "col-span-2 row-span-2 aspect-square md:aspect-auto",
  portrait: "row-span-2 aspect-[1/2] md:aspect-auto",
  wide: "col-span-2 aspect-[2/1] md:aspect-auto",
  small: "aspect-square md:aspect-auto",
};

/** Rendered width per shape: two columns (of 2, then 4) or one; the grid stops growing at 1400px. */
const SHAPE_SIZES: Record<GalleryPhoto["shape"], string> = {
  feature: "(min-width: 1400px) 620px, (min-width: 768px) 50vw, 100vw",
  portrait: "(min-width: 1400px) 310px, (min-width: 768px) 25vw, 50vw",
  wide: "(min-width: 1400px) 620px, (min-width: 768px) 50vw, 100vw",
  small: "(min-width: 1400px) 310px, (min-width: 768px) 25vw, 50vw",
};

function Arrow({ direction }: { direction: "left" | "right" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6"><path d={direction === "left" ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"} /></svg>;
}

export function GalleryGrid({ ariaLabel, photos }: { ariaLabel: string; photos: GalleryPhoto[] }) {
  const a11y = useA11y();
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : photos[active];
  const count = photos.length;

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => current === null ? null : (current + 1) % count);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? null : (current - 1 + count) % count);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, count]);

  return (
    <div className="bg-linen text-taupe">
      <section aria-label={ariaLabel} className="mx-auto max-w-[1400px] px-6 py-[128px] sm:px-10 lg:px-20">
        <div className="grid grid-flow-row-dense grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:auto-rows-[190px] lg:auto-rows-[235px]">
          {photos.map((photo, index) => (
            <Button
              key={`${photo.alt}-${index}`}
              type="button"
              variant="ghost"
              onClick={() => setActive(index)}
              aria-label={`${index + 1} / ${count}: ${photo.alt}`}
              className={`group relative block h-auto min-w-0 overflow-hidden rounded-none bg-sand p-0 shadow-none hover:bg-sand focus-visible:ring-2 focus-visible:ring-clay ${SHAPE_CLASS[photo.shape]}`}
            >
              <CmsImage sizes={SHAPE_SIZES[photo.shape]} src={photo.src} alt={photo.alt} loading={index < 5 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none" />
              <span className="sr-only">{photo.alt}</span>
            </Button>
          ))}
        </div>
      </section>

      {selected && active !== null && (
        <div role="dialog" aria-modal="true" aria-label={ariaLabel} className="fixed inset-0 z-[60] flex flex-col bg-umber text-linen">
          <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
            <span className="text-[12px] uppercase tracking-[0.24em]">{active + 1} / {count}</span>
            <Button type="button" variant="ghost" size="icon" autoFocus aria-label={a11y.close} onClick={() => setActive(null)} className="h-11 w-11 rounded-none text-linen hover:bg-linen/10 hover:text-linen">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6"><path d="M5 5l14 14M19 5 5 19" /></svg>
            </Button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 sm:px-24">
            <Button type="button" variant="ghost" size="icon" aria-label={a11y.previous} onClick={() => setActive((active - 1 + count) % count)} className="absolute left-2 z-10 h-11 w-11 rounded-none text-linen hover:bg-linen/10 hover:text-linen sm:left-7"><Arrow direction="left" /></Button>
            <CmsImage sizes="100vw" key={active} src={selected.src} alt={selected.alt} className="max-h-full max-w-full object-contain" />
            <Button type="button" variant="ghost" size="icon" aria-label={a11y.next} onClick={() => setActive((active + 1) % count)} className="absolute right-2 z-10 h-11 w-11 rounded-none text-linen hover:bg-linen/10 hover:text-linen sm:right-7"><Arrow direction="right" /></Button>
          </div>
          <p className="shrink-0 px-4 py-5 text-center text-[13px] font-light tracking-[0.03em] text-linen/80">{selected.alt}</p>
        </div>
      )}
    </div>
  );
}

type MapLocation = { number: string; area: string; address: string; descriptor: string; x: number; y: number; labelY: number };

/** Stylised Gothenburg map. The artwork is fixed; marker positions and labels come from the CMS. */
function WowMap({ label, locations, active, setActive }: {
  label: string;
  locations: MapLocation[];
  active: number | null;
  setActive: (i: number | null) => void;
}) {
  return (
    <div role="img" aria-label={label} className="overflow-hidden rounded shadow-accommodation bg-map-land">
      <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
        <rect width="500" height="400" className="fill-map-land" />

        <path d="M-10 20 Q 120 40 220 30 Q 340 20 500 45 L 510 0 L -10 0 Z" className="fill-map-water" opacity="0.35" />
        <path d="M-10 20 Q 120 40 220 30 Q 340 20 500 45" fill="none" className="stroke-map-water" strokeWidth="0.5" opacity="0.4" />

        <ellipse cx="90" cy="230" rx="70" ry="45" className="fill-map-park" opacity="0.45" />
        <ellipse cx="440" cy="290" rx="75" ry="55" className="fill-map-park" opacity="0.45" />
        <ellipse cx="210" cy="370" rx="55" ry="30" className="fill-map-park" opacity="0.4" />

        <path d="M 0 170 Q 130 150 260 175 Q 370 195 500 180" className="stroke-tile" strokeWidth="2" fill="none" />
        <path d="M 220 40 Q 235 200 260 400" className="stroke-tile" strokeWidth="1.5" fill="none" />
        <path d="M 120 100 L 430 320" className="stroke-tile" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M 350 80 L 200 400" className="stroke-tile" strokeWidth="1" fill="none" opacity="0.45" />

        <g transform="translate(465 65)" opacity="0.5">
          <circle r="10" fill="none" className="stroke-clay" strokeWidth="0.5" />
          <path d="M0 -7 L2 0 L0 7 L-2 0 Z" className="fill-clay" />
          <text x="0" y="-14" textAnchor="middle" fontFamily="Barlow Condensed" fontSize="7" letterSpacing="1" className="fill-clay">
            N{/* content-exempt: compass rose glyph in the map artwork */}
          </text>
        </g>

        {locations.map((loc, i) => {
          const isActive = active === i;
          return (
            <g
              key={i}
              className="wow-marker"
              transform={`translate(${loc.x} ${loc.y})`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(isActive ? null : i)}
            >
              <circle r={isActive ? 30 : 0} className="fill-taupe" opacity={isActive ? 0.12 : 0} style={{ transition: "all 220ms ease" }} />
              <circle
                r={isActive ? 20 : 17}
                className={isActive ? "fill-taupe stroke-taupe" : "fill-pearl stroke-clay"}
                strokeWidth="1.5"
                style={{ transition: "all 220ms ease" }}
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontFamily="Barlow Condensed"
                fontSize="11"
                fontWeight="500"
                letterSpacing="0.8"
                className={isActive ? "fill-pearl" : "fill-taupe"}
                style={{ transition: "all 220ms ease" }}
              >
                {loc.number}
              </text>
              <text
                className="wow-marker-label"
                x="0"
                y={loc.labelY}
                textAnchor="middle"
                opacity={isActive ? 1 : 0.7}
                fill={isActive ? "var(--color-taupe)" : "var(--color-clay)"}
              >
                {loc.area}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function LocationsMap({ eyebrow, heading, mapLabel, itemLabel, locations, ctaLabel, ctaTo }: {
  eyebrow: string;
  heading: string;
  mapLabel: string;
  itemLabel: string;
  locations: MapLocation[];
  ctaLabel?: string;
  ctaTo?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section aria-labelledby="locations-overview-heading" className="bg-sand px-6 pb-0 pt-24 sm:px-14 md:px-20 md:pt-32">
      <div className="flex flex-col items-center text-center">
        {eyebrow && <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">{eyebrow}</p>}
        {heading && (
          <h2
            id="locations-overview-heading"
            className="mt-6 font-serif text-[34px] font-normal leading-[1.15] text-taupe sm:text-[clamp(34px,3.75vw,48px)]"
          >
            {heading}
          </h2>
        )}
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-[1200px] grid-cols-1 items-stretch gap-10 md:mt-16 md:grid-cols-[1.15fr_1fr] md:gap-14">
        <WowMap label={mapLabel} locations={locations} active={active} setActive={setActive} />

        <div className="flex flex-col">
          <ul aria-label={heading} className="m-0 flex list-none flex-col p-0">
            {locations.map((loc, i) => {
              const isActive = active === i;
              return (
                <li
                  key={i}
                  tabIndex={0}
                  className="wow-loc-item cursor-pointer px-6 py-[22px] pl-6"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid oklch(0.62 0.020 70 / 0.22)",
                    background: isActive ? "oklch(0.935 0.010 78 / 0.55)" : "transparent",
                    borderLeft: `2px solid ${isActive ? "var(--color-taupe)" : "transparent"}`,
                  }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                >
                  <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">
                    {[itemLabel, loc.number].filter(Boolean).join(" ")}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-baseline gap-3.5">
                    <h3 className="m-0 font-serif text-[24px] font-normal leading-[1.15] text-taupe sm:text-[26px]">{loc.area}</h3>
                    <span className="text-[13px] font-light text-clay">{loc.address}</span>
                  </div>
                  <p className="mt-1 max-w-[440px] text-[14px] font-light leading-[1.65] text-taupe/85">{loc.descriptor}</p>
                </li>
              );
            })}
          </ul>
          {ctaLabel && ctaTo && (
            <Link
              href={ctaTo}
              className="wow-cta-primary ml-0 mt-7 inline-flex h-12 items-center gap-3.5 self-start rounded-cta bg-taupe px-[30px] text-[11px] font-medium uppercase tracking-[0.28em] text-pearl transition-colors hover:bg-umber md:ml-6"
            >
              <span>{ctaLabel}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
