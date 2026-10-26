"use client";

import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useUi, useA11y, useLocalizeHref } from "@/components/cms/site-context";
import { fill } from "@/lib/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CmsImage, optimizedSrc } from "@/components/cms-image";

export type RoomGalleryImage = { url: string; alt: string };

type RoomDetailHeroProps = {
  breadcrumbParent: { label: string; to: string };
  kicker: string;
  title: string;
  description: string;
  location: string;
  chips: string[];
  optionsLabel?: string;
  /** Policy note shown instead of the options label (e.g. minimum stay). */
  note?: { label: string; content: ReactNode };
  ctaLabel: string;
  ctaHref: string;
  images: RoomGalleryImage[];
};

const THUMBS_VISIBLE = 4;


/** Detail-page hero: gallery with dark side arrows and a hover-revealed dot cluster, plus room summary. */
export function RoomDetailHero({ breadcrumbParent, kicker, title, description, location, chips, optionsLabel, note, ctaLabel, ctaHref, images }: RoomDetailHeroProps) {
  const a11y = useA11y();
  const localize = useLocalizeHref();
  const ui = useUi();
  const [index, setIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const total = images.length;

  const go = (raw: number) => {
    const next = ((raw % total) + total) % total;
    setThumbStart((start) => (next < start ? next : next >= start + THUMBS_VISIBLE ? next - THUMBS_VISIBLE + 1 : start));
    setIndex(next);
  };

  const visible = images.slice(thumbStart, thumbStart + THUMBS_VISIBLE).map((img, k) => ({ ...img, idx: thumbStart + k }));
  const arrowCls =
    "absolute top-1/2 inline-flex cursor-pointer h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-taupe bg-taupe text-pearl transition-colors duration-150 hover:border-umber hover:bg-umber focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pearl";

  return (
    <section className="flex flex-col items-center bg-sand px-6 pb-16 pt-28 sm:pt-32 md:px-20">
      <nav aria-label={a11y.breadcrumb} className="w-full max-w-[1200px] text-[11px] font-normal uppercase tracking-[0.24em] text-clay">
        <Link to="/" className="transition-colors duration-200 hover:text-umber">{ui.breadcrumbHome}</Link>
        <span aria-hidden="true" className="px-3">›</span>
        <Link to={breadcrumbParent.to} className="transition-colors duration-200 hover:text-umber">{breadcrumbParent.label}</Link>
        <span aria-hidden="true" className="px-3">›</span>
        <span aria-current="page" className="text-taupe">{title}</span>
      </nav>

      <div className="mt-8 grid w-full max-w-[1200px] grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,672px)_1fr] lg:gap-x-16">
        <div>
          <div className="group/img relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-ivory">
            {images.map((img, i) => (
              <CmsImage sizes="(min-width: 1024px) 60vw, 100vw"
                key={img.url}
                src={img.url}
                alt={img.alt}
                aria-hidden={i !== index}
                loading={i === 0 ? "eager" : "lazy"}
                priority={i === 0}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none",
                  i === index ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
            <button type="button" aria-label={a11y.previousImage} onClick={() => go(index - 1)} className={cn(arrowCls, "left-5")}>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" aria-label={a11y.nextImage} onClick={() => go(index + 1)} className={cn(arrowCls, "right-5")}>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <p aria-live="polite" className="sr-only">{fill(a11y.imageOf, { n: index + 1, total })}</p>
            <div className="group/dots absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center rounded-full border border-transparent py-1.5 pl-1.5 pr-1.5 transition-[background-color,backdrop-filter,border-color] duration-300 hover:border-pearl/20 hover:bg-pearl/10 hover:backdrop-blur-[5px] group-hover/img:border-pearl/20 group-hover/img:bg-pearl/10 group-hover/img:backdrop-blur-[5px] has-[:focus-visible]:border-pearl/20 has-[:focus-visible]:bg-pearl/10 has-[:focus-visible]:backdrop-blur-[5px] motion-reduce:transition-none">
              <button
                type="button"
                aria-label={a11y.previousImage}
                onClick={() => go(index - 1)}
                className="flex h-4 w-4 cursor-pointer items-center justify-center text-pearl opacity-0 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.45))] transition-opacity duration-200 hover:text-white focus-visible:opacity-100 group-hover/dots:opacity-100 group-hover/img:opacity-100 group-has-[:focus-visible]/dots:opacity-100 motion-reduce:transition-none"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <div className="flex items-center gap-2 px-2 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.45))]">
                {images.map((img, dotIndex) => (
                  <button
                    key={`dot-${img.url}`}
                    type="button"
                    onClick={() => go(dotIndex)}
                    aria-label={fill(a11y.showImageOf, { n: dotIndex + 1, total })}
                    aria-current={index === dotIndex}
                    className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span aria-hidden="true" className={cn("rounded-full transition-[width,height] duration-200 motion-reduce:transition-none", index === dotIndex ? "h-2 w-2 bg-white" : "h-1 w-1 bg-white/70 hover:bg-white")} />
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label={a11y.nextImage}
                onClick={() => go(index + 1)}
                className="flex h-4 w-4 cursor-pointer items-center justify-center text-pearl opacity-0 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.45))] transition-opacity duration-200 hover:text-white focus-visible:opacity-100 group-hover/dots:opacity-100 group-hover/img:opacity-100 group-has-[:focus-visible]/dots:opacity-100 motion-reduce:transition-none"
              >
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <ul aria-label={a11y.thumbnails} className="m-0 mt-4 grid list-none grid-cols-4 gap-3 p-0">
            {visible.map((t) => {
              const active = t.idx === index;
              return (
                <li key={t.url}>
                  <button
                    type="button"
                    aria-label={`${fill(a11y.showImageOf, { n: t.idx + 1, total })}: ${t.alt}`}
                    aria-current={active}
                    onClick={() => go(t.idx)}
                    className={cn(
                      "block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[4px] bg-cover bg-center transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-taupe",
                      active ? "opacity-100 shadow-[inset_0_0_0_2px_var(--taupe)]" : "opacity-[0.78] shadow-[0_2px_12px_oklch(0_0_0/0.06)]",
                    )}
                    style={{ backgroundImage: `url("${optimizedSrc(t.url, 256)}")` }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe">{kicker}</div>
          <h1 className="mt-6 font-serif text-[36px] font-normal leading-[1.15] text-taupe">{title}</h1>
          <p className="mt-1 max-w-[440px] text-[15px] font-light leading-[1.75] text-taupe/90">{description}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-[14px] font-light leading-[1.6] text-taupe/80">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-clay">
              <path d="M8 14.5 C4.5 10 3 8 3 6.2 A5 5 0 0 1 13 6.2 C13 8 11.5 10 8 14.5 Z" />
              <circle cx="8" cy="6.2" r="1.6" />
            </svg>
            <span>{location}</span>
          </p>
          <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
            {chips.map((chip) => (
              <li key={chip} className="wow-chip rounded-full bg-ivory px-3.5 py-2 text-xs font-normal text-taupe">{chip}</li>
            ))}
          </ul>
          <div className="mt-8 h-px bg-clay/25" />
          {note ? (
            <div role="note" aria-label={note.label} className="mt-8 inline-flex items-center gap-3 self-start rounded-[4px] border-l-2 border-[oklch(0.72_0.05_70)] bg-ivory/55 py-3.5 pl-4 pr-[18px]">
              <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[oklch(0.72_0.05_70)]">
                <circle cx="10" cy="10" r="8" /><path d="M10 6 V11" /><path d="M10 14 V14.01" />
              </svg>
              <span className="text-[14px] font-normal leading-[1.5] text-taupe">{note.content}</span>
            </div>
          ) : optionsLabel ? (
            <div className="mt-8 pl-[0.32em] text-[13px] font-medium uppercase tracking-[0.32em] text-clay">{optionsLabel}</div>
          ) : null}
          <a
            href={localize(ctaHref)}
            className="mt-6 inline-flex cursor-pointer h-12 items-center gap-3.5 self-start rounded-cta bg-taupe px-[30px] text-[11px] font-medium uppercase tracking-[0.28em] text-pearl transition-colors duration-200 hover:bg-umber"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
