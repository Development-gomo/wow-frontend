import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useUi, useA11y } from "@/components/cms/site-context";
import { Button } from "@/components/ui/button";
import { PhotoCarousel } from "@/components/photo-carousel";
import { CmsImage } from "@/components/cms-image";

export type SimilarRoom = {
  title: string;
  meta: string;
  description: string;
  chips: string[];
  image: string;
  imageAlt: string;
  /** More photos for the card's carousel; without any, the card shows just `image`. */
  images?: string[];
  href?: string;
  /** The room's own booking page; its button goes there instead of the section's link. */
  bookingPath?: string;
};

type SimilarRoomsProps = {
  rooms: SimilarRoom[];
  eyebrow: string;
  heading: string;
  subheading: string;
  carouselLabel: string;
  /** Booking button on each card, e.g. "Book" for rooms or "See Availability" for apartments. */
  actionLabel?: string;
  actionTo?: string;
};

const arrowCls =
  "flex h-11 w-11 items-center justify-center rounded-full border border-taupe bg-taupe text-pearl transition-colors duration-150 hover:border-umber hover:bg-umber";

export function SimilarRooms({ rooms, eyebrow, heading, subheading, carouselLabel, actionLabel, actionTo }: SimilarRoomsProps) {
  const a11y = useA11y();
  const ui = useUi();
  const viewport = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const cardsPerView = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  function goTo(next: number) {
    const element = viewport.current;
    if (!element || rooms.length < 2) return;
    const cards = element.querySelectorAll<HTMLElement>("[data-similar-card]");
    const first = cards[0];
    const target = cards[next];
    if (!first || !target) return;
    setIndex(next);
    element.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function scroll(dir: number) {
    const per = cardsPerView();
    goTo(Math.min(Math.max(index + dir * per, 0), rooms.length - 1));
  }

  function syncFromScroll() {
    const element = viewport.current;
    if (!element) return;
    const cards = element.querySelectorAll<HTMLElement>("[data-similar-card]");
    const first = cards[0];
    if (!first) return;
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    cards.forEach((card, cardIndex) => {
      const distance = Math.abs((card.offsetLeft - first.offsetLeft) - element.scrollLeft);
      if (distance < best) {
        best = distance;
        nearest = cardIndex;
      }
    });
    setIndex(nearest);
  }

  return (
    <section aria-labelledby="similar-rooms-heading" className="overflow-x-clip bg-sand pb-32 pt-16 text-taupe">
      <div className="px-5 text-center md:px-10">
        <p className="m-0 pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">{eyebrow}</p>
        <h2 id="similar-rooms-heading" className="mt-6 font-serif text-[48px] font-normal leading-[1.15]">{heading}</h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[15px] font-light leading-[1.75] text-taupe/85">{subheading}</p>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-[1200px]">
        <div ref={viewport} onScroll={syncFromScroll} role="region" aria-label={carouselLabel} aria-roledescription="carousel" className="-my-16 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth py-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {rooms.map((room, cardIndex) => (
            <div key={`${room.title}-${cardIndex}`} data-similar-card className="flex w-full flex-none snap-start md:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)]">
              <article className="group flex w-full flex-col transition-transform duration-300 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none">
                {room.images && room.images.length > 0 ? (
                  <PhotoCarousel images={[room.image, ...room.images]} title={room.title} heightClass="aspect-[3/2]" />
                ) : (
                  <div className="aspect-[3/2] overflow-hidden">
                    <CmsImage sizes="(min-width: 1024px) 33vw, 85vw" src={room.image} alt={room.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="relative z-10 mx-auto -mt-5 flex w-[calc(100%-24px)] flex-1 flex-col bg-pearl px-6 py-6 shadow-accommodation">
                  <div>
                    <p className="wow-card-meta m-0 pl-[0.32em] text-[10px] font-normal uppercase tracking-[0.32em] text-clay">{room.meta}</p>
                    <h3 className="mt-4 font-serif text-[26px] font-normal leading-[1.15]">{room.title}</h3>
                  </div>
                  <p className="m-0 mt-1 text-sm font-light leading-[1.65] text-taupe/85">{room.description}</p>
                  <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                    {room.chips.map((chip) => <li key={chip} className="wow-chip rounded-full bg-ivory px-3.5 py-2 text-xs font-normal">{chip}</li>)}
                  </ul>
                  {actionLabel && actionTo ? (
                    <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                      {room.href ? (
                        <Link to={room.href} className="inline-flex border-b border-clay/55 pb-1.5 pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] transition-colors hover:border-umber/60 hover:text-umber focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-clay">{ui.readMore}</Link>
                      ) : (
                        <a href="#" className="inline-flex border-b border-clay/55 pb-1.5 pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] transition-colors hover:border-umber/60 hover:text-umber focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-clay">{ui.readMore}</a>
                      )}
                      <Button asChild className="h-9 rounded-cta bg-taupe px-5 text-[11px] font-medium uppercase tracking-[0.24em] text-pearl hover:bg-umber">
                        <Link to={room.bookingPath ?? actionTo}>{actionLabel}</Link>
                      </Button>
                    </div>
                  ) : room.href ? (
                    <Link to={room.href} className="mt-auto inline-flex self-start pt-8 border-b border-clay/55 pb-1.5 pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] transition-colors hover:border-umber/60 hover:text-umber focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-clay">{ui.readMore}</Link>
                  ) : (
                    <a href="#" className="mt-auto inline-flex self-start pt-8 border-b border-clay/55 pb-1.5 pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] transition-colors hover:border-umber/60 hover:text-umber focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-clay">{ui.readMore}</a>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
        {/* Desktop/tablet: arrows overlay the outer edges of the first and last visible cards. */}
        <button
          type="button"
          aria-label={a11y.previousCards}
          onClick={() => scroll(-1)}
          className={`${arrowCls} absolute left-0 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:flex`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label={a11y.nextCards}
          onClick={() => scroll(1)}
          className={`${arrowCls} absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 translate-x-1/2 md:flex`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        {/* Phone: arrows stay below the cards, where nothing is cut off. */}
        <div className="mt-10 flex justify-center gap-4 md:hidden">
          <button type="button" aria-label={a11y.previousCards} onClick={() => scroll(-1)} className={arrowCls}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label={a11y.nextCards} onClick={() => scroll(1)} className={arrowCls}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
