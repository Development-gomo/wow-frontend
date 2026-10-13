import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useUi } from "@/components/cms/site-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Accommodation = {
  kicker: string;
  title: string;
  sub: string;
  image: string;
  /** Extra photos shown after `image` in the card carousel. */
  images?: string[];
  chips: string[];
  /** Nightly price shown under the description; cards without one simply omit it. */
  price?: { prefix: string; amount: string; unit: string };
  /** Short stay condition shown under the price, e.g. a minimum stay. Cards without one omit it. */
  note?: string;
  /** Area and street shown in place of `sub`, with a map pin, e.g. "Vasastan · Föreningsgatan 7 & 9". Cards without one omit it. */
  location?: string;
  variations?: { name: string; detail: string }[];
  /** Detail page for this card; cards without one link to "#" until their page exists. */
  detailPath?: "/rooms/single-room" | "/apartments/penthouse-apartment";
  /** Stretches the card across the full grid width with photo and details side by side. */
  wide?: boolean;
};

type AccommodationListingProps = {
  eyebrow: string;
  heading: string;
  description: string;
  accommodations: Accommodation[];
  actionLabel: string;
  /** Where the card action button leads: the room or the apartment booking page. */
  actionTo?: string;
  /** Hides the divider above the card actions and widens the action spacing to 48px. */
  hideDivider?: boolean;
  /** Extra classes for the section, e.g. a custom top padding override. */
  className?: string;
  viewAllTo?: string;
  viewAllLabel?: string;
};

const readMoreCls =
  "border-b border-clay/50 pb-[3px] text-[11px] font-medium uppercase tracking-[0.24em] text-taupe transition-colors duration-150 hover:text-umber";

function CardCarousel({ images, title, heightClass = "h-[240px]" }: { images: string[]; title: string; heightClass?: string }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);


  return (
    <div className={`group/img relative w-full overflow-hidden ${heightClass}`}>
      <div
        className="flex h-full transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt={`${title} photo ${i + 1} of ${count}`}
            loading="lazy"
            aria-hidden={i !== index}
            className="h-full w-full flex-none object-cover"
          />
        ))}
      </div>
      {count > 1 && (
        <div className="group/dots absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center rounded-full border border-transparent py-1.5 pl-1.5 pr-1.5 transition-[background-color,backdrop-filter,border-color] duration-300 hover:border-pearl/20 hover:bg-pearl/10 hover:backdrop-blur-[5px] group-hover/img:border-pearl/20 group-hover/img:bg-pearl/10 group-hover/img:backdrop-blur-[5px] has-[:focus-visible]:border-pearl/20 has-[:focus-visible]:bg-pearl/10 has-[:focus-visible]:backdrop-blur-[5px] motion-reduce:transition-none">
          <button
            type="button"
            aria-label={`Previous ${title} photo`}
            onClick={() => go(-1)}
            className="flex h-4 w-4 items-center justify-center text-pearl opacity-0 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.45))] transition-opacity duration-200 hover:text-white focus-visible:opacity-100 group-hover/dots:opacity-100 group-hover/img:opacity-100 group-has-[:focus-visible]/dots:opacity-100 motion-reduce:transition-none"
          >
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.25} />
          </button>
          <div className="flex items-center gap-2 px-2 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.45))]">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show ${title} photo ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`rounded-full bg-pearl transition-all duration-200 motion-reduce:transition-none ${i === index ? "h-2 w-2 opacity-100" : "h-1 w-1 opacity-100"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label={`Next ${title} photo`}
            onClick={() => go(1)}
            className="flex h-4 w-4 items-center justify-center text-pearl opacity-0 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.45))] transition-opacity duration-200 hover:text-white focus-visible:opacity-100 group-hover/dots:opacity-100 group-hover/img:opacity-100 group-has-[:focus-visible]/dots:opacity-100 motion-reduce:transition-none"
          >
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.25} />
          </button>
        </div>
      )}
    </div>
  );
}

export function AccommodationCard({ accommodation, actionLabel, actionTo, hideDivider }: { accommodation: Accommodation; actionLabel: string; actionTo?: string; hideDivider?: boolean }) {
  const ui = useUi();
  const wide = Boolean(accommodation.wide);
  const photos = [accommodation.image, ...(accommodation.images ?? [])];
  return (
    <article className={`group flex w-full flex-col ${wide ? "md:col-span-2 md:flex-row lg:col-span-3" : ""}`}>
      {wide ? (
        <div className="md:w-[52%] md:shrink-0">
          <CardCarousel images={photos} title={accommodation.title} heightClass="h-[240px] md:h-full" />
        </div>
      ) : (
        <CardCarousel images={photos} title={accommodation.title} />
      )}

      <div className={`relative z-10 flex flex-grow flex-col bg-pearl px-7 pb-6 pt-7 shadow-accommodation ${wide ? "md:-ml-6 md:min-h-[420px]" : "mx-auto -mt-5 w-[calc(100%-24px)]"}`}>
        <span className="wow-card-meta block pl-[0.32em] text-[10px] uppercase tracking-[0.32em] text-clay">
          {accommodation.kicker}
        </span>
        <h3 className="mt-3.5 font-serif text-[26px] font-normal leading-[1.15] text-taupe">
          {accommodation.title}
        </h3>
        {accommodation.location ? (
          <p className="mt-2 flex items-center gap-1.5 text-[14px] font-light leading-[1.6] text-taupe/75">
            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            {accommodation.location}
          </p>
        ) : (
          <p className="mt-2 text-[14px] font-light leading-[1.6] text-taupe/75">
            {accommodation.sub}
          </p>
        )}

        {accommodation.price && (
          <p className="mt-4 flex flex-wrap items-baseline whitespace-nowrap font-serif text-umber">
            <span className="mr-2.5 font-serif text-[16px] font-normal">{accommodation.price.prefix}</span>
            <span className="font-serif text-[22px] font-normal">{accommodation.price.amount}</span>
            <span className="ml-4 font-serif text-[13px] font-light text-clay">{accommodation.price.unit}</span>
          </p>
        )}
        {accommodation.note && (
          <p className="mt-2 text-[12px] font-light tracking-[0.01em] text-clay">
            {accommodation.note}
          </p>
        )}


        <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
          {accommodation.chips.map((chip) => (
            <li key={chip} className="wow-chip rounded-full bg-ivory px-3.5 py-2 text-xs text-taupe">
              {chip}
            </li>
          ))}
        </ul>

        {!hideDivider && <div className="mt-6 h-px bg-clay/25" />}

        {accommodation.variations && accommodation.variations.length > 0 && (
          <>
            <div className="mt-5 pl-[0.32em] text-[10px] uppercase tracking-[0.32em] text-clay">
              {ui.variations}
            </div>
            <ul className="m-0 mt-2.5 list-none p-0">
              {accommodation.variations.map((variation) => (
                <li key={variation.name} className="-mx-1.5 rounded-[4px] px-1.5 py-2.5 transition-colors duration-150 hover:bg-linen">
                  <span className="flex flex-col gap-[3px]">
                    <span className="text-[14px] font-medium leading-tight text-taupe">{variation.name}</span>
                    <span className="wow-card-meta text-xs font-light text-clay">{variation.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className={`mt-auto flex items-center justify-between gap-3 ${hideDivider ? "pt-12" : "pt-6"}`}>
          {accommodation.detailPath ? (
            <Link
              to={accommodation.detailPath}
              aria-label={`${ui.readMore ?? ""}: ${accommodation.title}`}
              className={readMoreCls}
            >
              {ui.readMore}
            </Link>
          ) : (
            <a href="#" aria-label={`${ui.readMore ?? ""}: ${accommodation.title}`} className={readMoreCls}>
              {ui.readMore}
            </a>
          )}
          <Button asChild className="h-9 rounded-cta bg-taupe px-5 text-[11px] font-medium uppercase tracking-[0.24em] text-pearl hover:bg-umber">
            {actionTo ? (
              <Link to={actionTo}>{actionLabel}</Link>
            ) : (
              <a href="#">{actionLabel}</a>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}

export function AccommodationListing({ eyebrow, heading, description, accommodations, actionLabel, actionTo, hideDivider, className, viewAllTo, viewAllLabel }: AccommodationListingProps) {
  return (
    <section className={cn("overflow-x-clip bg-sand px-6 py-24 md:px-20 md:py-32", className)}>
      <div className="flex flex-col items-center text-center">
        <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>
        <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.15] text-taupe md:text-5xl">{heading}</h2>
        <p className="mt-4 max-w-[620px] text-[15px] font-light leading-[1.8] text-taupe/85">{description}</p>
      </div>

      <AccommodationGrid className="mx-auto mt-16" accommodations={accommodations} actionLabel={actionLabel} actionTo={actionTo} hideDivider={hideDivider} />
      {viewAllTo && viewAllLabel ? (
        <div className="mt-16 flex justify-center">
          <Button asChild className="h-12 rounded-cta bg-taupe px-8 text-[11px] uppercase tracking-[0.28em] text-pearl hover:bg-umber">
            <Link to={viewAllTo}>{viewAllLabel}</Link>
          </Button>
        </div>
      ) : null}
    </section>
  );
}
/** The card grid on its own, for sections (like the homepage tabs) that supply their own heading.
 * With more than three cards it becomes a sliding carousel whose cards keep the exact grid column width. */
export function AccommodationGrid({ accommodations, actionLabel, actionTo, hideDivider, className }: Pick<AccommodationListingProps, "accommodations" | "actionLabel" | "actionTo" | "hideDivider" | "className">) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  // Bumped on every arrow click so the auto-advance timer restarts from zero.
  const [timerKey, setTimerKey] = useState(0);
  const isCarousel = accommodations.length > 3;

  // The card list is rendered twice; when the track reaches the copy it jumps back
  // one full set instantly (same picture), so sliding always continues forwards.
  const scroll = (dir: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const step = card.offsetWidth + 32;
    const setWidth = step * accommodations.length;
    if (dir > 0 && track.scrollLeft >= setWidth - 1) track.scrollTo({ left: track.scrollLeft - setWidth, behavior: "instant" });
    if (dir < 0 && track.scrollLeft <= 1) track.scrollTo({ left: track.scrollLeft + setWidth, behavior: "instant" });
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollByArrow = (dir: number) => {
    scroll(dir);
    setTimerKey((key) => key + 1);
  };

  // Auto-advance one card every 3s; pauses while hovered or touched, and for reduced motion.
  useEffect(() => {
    if (!isCarousel || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => scroll(1), 3000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCarousel, paused, timerKey]);

  if (!isCarousel) {
    return (
      <div className={`grid w-full max-w-[1200px] grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 ${className ?? ""}`}>
        {accommodations.map((accommodation) => (
          <AccommodationCard key={accommodation.title} accommodation={accommodation} actionLabel={actionLabel} actionTo={actionTo} hideDivider={hideDivider} />
        ))}
      </div>
    );
  }
  const arrowCls =
    "flex h-11 w-11 items-center justify-center rounded-full border border-taupe bg-taupe text-pearl transition-colors duration-150 hover:border-umber hover:bg-umber";
  return (
    <div
      className={`relative w-full max-w-[1200px] ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="-my-16 flex snap-x snap-mandatory gap-8 overflow-x-auto py-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[...accommodations, ...accommodations].map((accommodation, index) => {
          const isCopy = index >= accommodations.length;
          return (
            <div key={`${accommodation.title}-${index}`} aria-hidden={isCopy || undefined} inert={isCopy} className="flex w-full flex-none snap-start md:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)]">
              <AccommodationCard accommodation={accommodation} actionLabel={actionLabel} actionTo={actionTo} hideDivider={hideDivider} />
            </div>
          );
        })}
      </div>
      {/* Desktop/tablet: arrows overlay the outer edges of the first and last visible cards. */}
      <button
        type="button"
        aria-label="Previous cards"
        onClick={() => scrollByArrow(-1)}
        className={`${arrowCls} absolute left-0 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:flex`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next cards"
        onClick={() => scrollByArrow(1)}
        className={`${arrowCls} absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 translate-x-1/2 md:flex`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      {/* Phone: arrows stay below the cards, where nothing is cut off. */}
      <div className="mt-10 flex justify-center gap-4 md:hidden">
        <button type="button" aria-label="Previous cards" onClick={() => scrollByArrow(-1)} className={arrowCls}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" aria-label="Next cards" onClick={() => scrollByArrow(1)} className={arrowCls}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
