"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import bedroom from "@/assets/gallery/gallery-bedroom.jpg.asset.json";
import living from "@/assets/uploads/IMG_1256.asset.json";
import detail from "@/assets/uploads/IMG_4067.asset.json";
import lounge from "@/assets/uploads/IMG_4117.asset.json";
import kitchen from "@/assets/uploads/IMG_5731.asset.json";
import windowRoom from "@/assets/uploads/IMG_8843.asset.json";
import doubleBed from "@/assets/uploads/IMG_8848.asset.json";
import suite from "@/assets/uploads/IMG_8884.asset.json";
import apartment from "@/assets/uploads/apartment-interior.asset.json";
import penthouse from "@/assets/uploads/penthouse-0.jpg.asset.json";
import terrace from "@/assets/uploads/penthouse-2.jpg.asset.json";
import vasastan from "@/assets/uploads/vasastan.asset.json";
import breakfast from "@/assets/gallery/editorial-breakfast.jpg";
import city from "@/assets/gallery/editorial-gothenburg.jpg";
import linen from "@/assets/gallery/editorial-details.jpg";


const photos = [
  { src: bedroom.url, alt: "Softly lit WOW bedroom with crisp bedding", shape: "feature" },
  { src: kitchen.url, alt: "Welcoming kitchen and dining area", shape: "small" },
  { src: windowRoom.url, alt: "Bedroom beside a light-filled window", shape: "small" },
  { src: penthouse.url, alt: "Penthouse apartment interior", shape: "small" },
  { src: living.url, alt: "Comfortable living room in a WOW apartment", shape: "small" },
  { src: doubleBed.url, alt: "A double bed dressed in fresh linen", shape: "small" },
  { src: apartment.url, alt: "Bright apartment living space", shape: "feature" },
  { src: lounge.url, alt: "Quiet lounge corner in one of our homes", shape: "small" },
  { src: breakfast, alt: "A quiet breakfast by the window", shape: "portrait" },
  { src: detail.url, alt: "Thoughtful details in a WOW room", shape: "small" },
  { src: suite.url, alt: "Spacious suite bedroom", shape: "small" },
  { src: linen, alt: "Fresh linen and a bedside arrangement", shape: "wide" },
  { src: terrace.url, alt: "Penthouse terrace and interior", shape: "small" },
  { src: city, alt: "A leafy Gothenburg street", shape: "small" },
  { src: vasastan.url, alt: "Streetscape near our Vasastan homes", shape: "wide" },
] as const;

function Arrow({ direction }: { direction: "left" | "right" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6"><path d={direction === "left" ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"} /></svg>;
}

export function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : photos[active];

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => current === null ? null : (current + 1) % photos.length);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? null : (current - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <main className="min-h-screen bg-linen text-taupe pt-16 sm:pt-20">
      <header className="mx-auto max-w-[780px] px-6 pb-12 pt-16 text-center sm:pb-16 sm:pt-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-clay">Gallery</p>
        <h1 className="mt-5 font-serif text-[48px] font-normal leading-none sm:text-[70px]">A glimpse of WOW</h1>
        <p className="mx-auto mt-5 max-w-[540px] text-[17px] font-light leading-relaxed text-muted-taupe sm:text-[19px]">Thoughtful spaces, quiet details and a sense of home in the heart of Gothenburg.</p>
        <p className="mx-auto mt-5 max-w-[600px] text-[15px] font-light leading-[1.8] text-muted-taupe">
          We see photos as small return tickets to the moments worth keeping — morning light across a bedroom, a quiet corner to read, the tree-lined streets just outside the door. Below is a mix of pictures from our rooms, apartments and neighbourhoods. Take a look, picture your stay, and save your favourites.
        </p>
      </header>

      <section aria-label="Photos from WOW Apartments & Rooms" className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-8 sm:pb-20 lg:pb-24 xl:px-10">
        <div className="grid grid-flow-row-dense grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:auto-rows-[190px] lg:auto-rows-[235px]">
          {photos.map((photo, index) => (
            <Button
              key={`${photo.alt}-${index}`}
              type="button"
              variant="ghost"
              onClick={() => setActive(index)}
              aria-label={`View photo ${index + 1} of ${photos.length}: ${photo.alt}`}
              className={`group relative block h-auto min-w-0 overflow-hidden rounded-[4px] bg-sand p-0 shadow-none hover:bg-sand focus-visible:ring-2 focus-visible:ring-clay ${photo.shape === "feature" ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : photo.shape === "portrait" ? "row-span-2 aspect-[1/2] md:aspect-auto" : photo.shape === "wide" ? "col-span-2 aspect-[2/1] md:aspect-auto" : "aspect-square md:aspect-auto"}`}
            >
              <img src={photo.src} alt={photo.alt} loading={index < 5 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none" />
              <span className="sr-only">{photo.alt}</span>
            </Button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[780px] px-6 pb-20 text-center sm:pb-24 lg:pb-32">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-clay">Stay with us</p>
        <h2 className="mt-5 font-serif text-[34px] font-normal leading-[1.15] sm:text-[46px]">Want to see it in real life?</h2>
        <p className="mx-auto mt-5 max-w-[600px] text-[16px] font-light leading-[1.8] text-muted-taupe">
          Rooms for a few nights and apartments for longer stays, in three calm Gothenburg neighbourhoods — Vasastan, Örgryte and Johanneberg. Each home is furnished with care, so you can arrive, unpack and feel settled from the first evening.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-cta">
          <Button asChild className="h-12 rounded-cta bg-taupe px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-pearl shadow-none hover:bg-umber">
            <Link to="/rooms">Book room</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-cta border-taupe/40 bg-transparent px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-taupe shadow-none hover:bg-sand">
            <Link to="/apartments">Book apartment</Link>
          </Button>
        </div>
      </section>

      {selected && active !== null && (
        <div role="dialog" aria-modal="true" aria-label="Gallery photo viewer" className="fixed inset-0 z-[60] flex flex-col bg-umber text-linen">
          <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
            <span className="text-[12px] uppercase tracking-[0.24em]">{active + 1} / {photos.length}</span>
            <Button type="button" variant="ghost" size="icon" autoFocus aria-label="Close photo viewer" onClick={() => setActive(null)} className="h-11 w-11 rounded-none text-linen hover:bg-linen/10 hover:text-linen">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6"><path d="M5 5l14 14M19 5 5 19" /></svg>
            </Button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 sm:px-24">
            <Button type="button" variant="ghost" size="icon" aria-label="Previous photo" onClick={() => setActive((active - 1 + photos.length) % photos.length)} className="absolute left-2 z-10 h-11 w-11 rounded-none text-linen hover:bg-linen/10 hover:text-linen sm:left-7"><Arrow direction="left" /></Button>
            <img key={active} src={selected.src} alt={selected.alt} className="max-h-full max-w-full object-contain" />
            <Button type="button" variant="ghost" size="icon" aria-label="Next photo" onClick={() => setActive((active + 1) % photos.length)} className="absolute right-2 z-10 h-11 w-11 rounded-none text-linen hover:bg-linen/10 hover:text-linen sm:right-7"><Arrow direction="right" /></Button>
          </div>
          <p className="shrink-0 px-4 py-5 text-center text-[13px] font-light tracking-[0.03em] text-linen/80">{selected.alt}</p>
        </div>
      )}
    </main>
  );
}