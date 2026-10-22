"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AccommodationGrid, type Accommodation } from "@/components/accommodation-listing";
import { ProcessSteps, type ProcessStep } from "@/components/process-steps";
import { SirvoyBooking } from "@/components/sirvoy-booking";
import { Button } from "@/components/ui/button";
import { StatsBand, type StatItem } from "@/components/stats-band";

/**
 * The homepage's Hero, Intro and Gallery.
 *
 * These three were written inline in app/home-page.tsx rather than as shared
 * components, so they had no home when the page became CMS-driven. The markup
 * below is lifted verbatim from that file — same elements, same Tailwind
 * classes, same animation — with only the hardcoded strings and assets
 * replaced by props so WordPress can edit them.
 */

/* -------------------- HERO -------------------- */

export type HeroCta = { label: string; to: string; variant?: string };

export function HomeHero({
  videoUrl,
  posterUrl,
  label,
  title,
  subtitle,
  ctas,
}: {
  videoUrl?: string;
  posterUrl?: string;
  label: string;
  title: string;
  subtitle: string;
  ctas: HeroCta[];
}) {
  // The original cycled a headline array on a 6s interval; a single headline
  // is the configured content, so the key only needs to change if that grows.
  const [idx] = useState(0);

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <video
        src={videoUrl}
        poster={posterUrl}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-taupe/30 via-taupe/10 to-taupe/60" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div key={idx} className="animate-fadein max-w-3xl">
          <span className="block text-linen/85 text-[10.5px] md:text-[11px] uppercase tracking-[0.45em] mb-6">
            {label}
          </span>
          <h1 className="font-serif text-linen text-[34px] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-light tracking-[-0.005em]">
            {title}
          </h1>
          <p className="mt-6 text-linen/90 text-base md:text-lg italic font-serif tracking-wide">
            {subtitle}
          </p>
        </div>

        <div className="relative z-10 mt-10 flex flex-col sm:flex-row gap-cta">
          {ctas.map((cta) => (
            <Button
              key={cta.label}
              asChild
              className={
                "outline" === cta.variant
                  ? "inline-flex items-center justify-center px-8 h-12 text-[11px] uppercase tracking-[0.28em] font-medium text-linen border border-linen/80 bg-transparent hover:bg-linen hover:text-taupe shadow-none transition-colors rounded-cta"
                  : "inline-flex items-center justify-center px-8 h-12 text-[11px] uppercase tracking-[0.28em] font-medium text-taupe bg-linen/95 hover:bg-sand hover:text-umber shadow-none transition-colors duration-200 rounded-cta"
              }
            >
              <Link to={cta.to}>{cta.label}</Link>
            </Button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadein { animation: fadein 1.1s ease-out both; }
      `}</style>
    </section>
  );
}

/* -------------------- INTRO -------------------- */

export function HomeIntro({
  eyebrow,
  heading,
  body,
  stats,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  stats: StatItem[];
}) {
  return (
    <section className="px-6 py-32 md:px-10 text-center">
      <div className="mx-auto max-w-4xl">
        <span className="block text-[10px] uppercase tracking-[0.35em] text-clay mb-6">
          {eyebrow}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] font-light text-taupe">
          {heading}
        </h2>
        <p className="mt-4 text-[15px] md:text-base leading-[1.85] text-taupe/80 max-w-3xl mx-auto">
          {body}
        </p>
      </div>

      {stats.length > 0 && <StatsBand stats={stats} className="mt-16" />}
    </section>
  );
}

/* -------------------- GALLERY -------------------- */

export type GalleryPhoto = { src: string; alt: string };

export function HomeGallery({
  eyebrow,
  heading,
  linkLabel,
  linkTo,
  photos,
}: {
  eyebrow: string;
  heading: string;
  linkLabel?: string;
  linkTo?: string;
  photos: GalleryPhoto[];
}) {
  return (
    <section id="galleri" className="bg-linen text-taupe py-32 overflow-hidden">
      <div className="flex flex-col items-center text-center px-6">
        <span className="text-[10px] uppercase tracking-[0.45em] text-clay pl-[0.45em]">{eyebrow}</span>
        <h2 className="font-serif text-[38px] md:text-[48px] font-normal leading-[1.15] mt-[30px]">
          {heading}
        </h2>
        {linkLabel && linkTo && (
          <Link to={linkTo} className="mt-[26px] inline-flex items-center gap-3.5 pb-1.5 pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] border-b border-clay/55 hover:text-umber hover:border-umber/60 focus-visible:outline focus-visible:outline-clay focus-visible:outline-offset-4 transition-colors">
            {linkLabel}
            <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M1 6h13m-4-4 4 4-4 4" /></svg>
          </Link>
        )}
      </div>
      <div id="gallery-photos" role="region" aria-label={heading} className="wow-gallery-viewport mt-16 w-full overflow-hidden scroll-mt-24">
        <div className="wow-gallery-track">
          {[0, 1].map((pass) => (
            <div key={pass} className="wow-gallery-set" aria-hidden={pass === 1 ? true : undefined}>
              {photos.map((photo, i) => (
                <img key={i} src={photo.src} alt={pass === 0 ? photo.alt : ""} loading="lazy" className="w-[220px] md:w-[340px] aspect-[3/4] object-cover shrink-0" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- ACCOMMODATION TABS -------------------- */

export function HomeAccommodationTabs({
  eyebrow,
  heading,
  description,
  roomsTabLabel,
  apartmentsTabLabel,
  roomsActionLabel,
  apartmentsActionLabel,
  roomsActionTo,
  apartmentsActionTo,
  roomsViewAllLabel,
  roomsViewAllTo,
  apartmentsViewAllLabel,
  apartmentsViewAllTo,
  rooms,
  apartments,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  roomsTabLabel: string;
  apartmentsTabLabel: string;
  roomsActionLabel: string;
  apartmentsActionLabel: string;
  roomsActionTo?: string;
  apartmentsActionTo?: string;
  roomsViewAllLabel?: string;
  roomsViewAllTo?: string;
  apartmentsViewAllLabel?: string;
  apartmentsViewAllTo?: string;
  rooms: Accommodation[];
  apartments: Accommodation[];
}) {
  const [category, setCategory] = useState<"rooms" | "apartments">("rooms");
  const isRooms = category === "rooms";
  const viewAllLabel = isRooms ? roomsViewAllLabel : apartmentsViewAllLabel;
  const viewAllTo = isRooms ? roomsViewAllTo : apartmentsViewAllTo;

  return (
    <section id="rum" className="overflow-x-clip bg-linen py-32 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto">
          <span className="block text-[10px] uppercase tracking-[0.45em] text-clay">
            {eyebrow}
          </span>
          <h2 className="font-serif text-[42px] md:text-[48px] text-taupe font-normal leading-[1.15] mt-6">
            {heading}
          </h2>
          <p className="text-[15px] leading-[1.8] text-taupe/85 max-w-[560px] mx-auto mt-4">
            {description}
          </p>
          <div role="tablist" aria-label={`${roomsTabLabel} / ${apartmentsTabLabel}`} className="mt-16 flex w-full gap-cta sm:w-auto sm:inline-flex">
            <button
              role="tab"
              id="rooms-tab"
              aria-selected={isRooms}
              aria-controls="accommodation-panel"
              onClick={() => setCategory("rooms")}
              className={`flex-1 sm:flex-none sm:w-[200px] h-12 rounded-cta border font-medium uppercase tracking-[0.28em] cursor-pointer transition-colors duration-200 ${isRooms ? "bg-taupe border-taupe text-ivory hover:bg-umber hover:border-umber" : "bg-taupe/65 border-transparent text-ivory hover:bg-taupe/85"}`}
            >
              {roomsTabLabel}
            </button>
            <button
              role="tab"
              id="apartments-tab"
              aria-selected={!isRooms}
              aria-controls="accommodation-panel"
              onClick={() => setCategory("apartments")}
              className={`flex-1 sm:flex-none sm:w-[200px] h-12 rounded-cta border font-medium uppercase tracking-[0.28em] cursor-pointer transition-colors duration-200 ${!isRooms ? "bg-taupe border-taupe text-ivory hover:bg-umber hover:border-umber" : "bg-taupe/65 border-transparent text-ivory hover:bg-taupe/85"}`}
            >
              {apartmentsTabLabel}
            </button>
          </div>
        </div>

        <div key={category} id="accommodation-panel" role="tabpanel" aria-labelledby={isRooms ? "rooms-tab" : "apartments-tab"} className="w-full mt-12 flex justify-center animate-accommodation-in">
          <AccommodationGrid
            accommodations={isRooms ? rooms : apartments}
            actionLabel={isRooms ? roomsActionLabel : apartmentsActionLabel}
            actionTo={isRooms ? roomsActionTo : apartmentsActionTo}
            hideDivider={!isRooms}
          />
        </div>
        {viewAllLabel && viewAllTo && (
          <Button asChild className="mt-16 h-12 px-8 rounded-cta bg-taupe text-pearl hover:bg-umber text-[11px] uppercase tracking-[0.28em] gap-4">
            <Link to={viewAllTo}>
              {viewAllLabel}
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}

/* -------------------- SIRVOY BOOKING SECTION -------------------- */

/**
 * SirvoyBooking renders only the widget host div. On /book-room the baseline
 * wrapped it in a card that overlaps the hero; that wrapper is structural, so
 * it lives here rather than becoming an editable field.
 *
 * The 128px margin under the card is bare page background. The original page
 * sat on a bg-linen wrapper, so that gap matched the listing below it; the CMS
 * page wrapper is bg-background (sand), so the gap needs its own linen backing.
 * flow-root keeps the margin inside this box so the backing covers it.
 */
export function SirvoyBookingSection() {
  return (
    <div className="flow-root bg-linen">
      <section aria-label="Room booking" /* content-exempt: landmark label for the booking widget region */ className="relative z-10 mx-5 -mt-16 mb-[128px] bg-white md:mx-20 md:-mt-24">
        <SirvoyBooking />
      </section>
    </div>
  );
}

/* -------------------- PROCESS STEPS SECTION -------------------- */

/**
 * ProcessSteps renders a bare <div>; on book-apartment the baseline wrapped it
 * in a titled section. That wrapper markup is reproduced verbatim here so the
 * eyebrow and heading become editable without changing the rendered output.
 */
export function ProcessStepsSection({
  eyebrow,
  heading,
  steps,
  variant,
  className,
}: {
  eyebrow?: string | null;
  heading?: string | null;
  steps: ProcessStep[];
  variant?: "hero" | "section";
  className?: string;
}) {
  if (!eyebrow && !heading) {
    return <ProcessSteps steps={steps} variant={variant} className={className} />;
  }

  return (
    <section aria-labelledby="how-it-works-heading" className="bg-white px-5 py-[128px] text-center">
      {eyebrow && <p className="m-0 pl-[0.45em] uppercase tracking-[0.45em] text-clay">{eyebrow}</p>}
      {heading && (
        <h2 id="how-it-works-heading" className="mx-auto mt-6 max-w-[720px] font-serif text-[42px] font-normal leading-[1.15] text-taupe md:text-[48px]">
          {heading}
        </h2>
      )}
      <ProcessSteps steps={steps} variant={variant ?? "section"} className={className ?? "mt-14"} />
    </section>
  );
}
