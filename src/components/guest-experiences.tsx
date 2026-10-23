import { ChevronLeft, ChevronRight } from "lucide-react";
import { useId, useState } from "react";
import { useUi, useA11y } from "@/components/cms/site-context";
import { fill } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type GuestExperienceReview = {
  quote: string;
  name: string;
  stay: string;
  location: string;
};

export type GuestExperiencesProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  rating?: number;
  outOf?: number;
  reviewSource?: string;
  reviewCount?: number;
  reviews: GuestExperienceReview[];
  className?: string;
};

export function GuestExperiences({
  eyebrow,
  title,
  description,
  rating,
  outOf = 5,
  reviewSource,
  reviewCount,
  reviews,
  className,
}: GuestExperiencesProps) {
  const a11y = useA11y();
  const ui = useUi();
  const headingId = `wow-guest-heading-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const halfStarId = `wow-half-star-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const count = reviews.length;
  const [slide, setSlide] = useState(count);
  const [isSliding, setIsSliding] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const slides = [...reviews, ...reviews, ...reviews];

  function shift(direction: number) {
    if (isSliding) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTransitionEnabled(false);
      setSlide((current) => count + ((current - count + direction + count) % count));
      return;
    }
    setTransitionEnabled(true);
    setIsSliding(true);
    setSlide((current) => current + direction);
  }

  function finishSlide() {
    setIsSliding(false);
    if (slide < count || slide >= count * 2) {
      setTransitionEnabled(false);
      setSlide(count + ((slide - count + count) % count));
      requestAnimationFrame(() => requestAnimationFrame(() => setTransitionEnabled(true)));
    }
  }

  const ratingLabel = fill(a11y.ratingOutOf, { rating, outOf });
  const starState = (index: number) => {
    const value = (rating ?? 0) - index;
    if (value >= 1) return "full";
    if (value >= 0.25) return "half";
    return "muted";
  };


  return (
    <section aria-labelledby={headingId} className={cn("bg-sand px-5 pt-20 pb-16 text-taupe md:px-10 md:pt-28 lg:px-20 lg:pt-32", className)}>
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          {eyebrow ? <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span> : null}
          <h2 id={headingId} className="mt-6 font-serif text-[38px] font-normal leading-[1.15] md:text-[48px]">{title}</h2>
          {description ? <p className="mt-4 text-[15px] font-light leading-[1.75] text-taupe/85">{description}</p> : null}
        </div>

        {rating !== undefined ? (
        <div className="mt-12 flex items-center justify-center gap-6 md:mt-16 md:gap-12">
          <div className="flex items-baseline gap-1 font-serif" aria-label={ratingLabel}>
            <span className="text-[64px] leading-none md:text-[72px]">{rating}</span>
            <span className="pl-1 text-[32px] font-light leading-none text-clay md:text-[36px]">/ {outOf}</span>
          </div>
          <div className="h-[76px] w-px bg-clay/40 md:h-[88px]" aria-hidden="true" />
          <div className="flex flex-col items-start gap-1.5">
            <div aria-label={ratingLabel} className="flex gap-1 text-clay">
              {Array.from({ length: outOf }, (_, i) => {
                const state = starState(i);
                return (
                  <svg key={i} viewBox="0 0 20 20" width="18" height="18" className="h-[18px] w-[18px]" aria-hidden="true">
                    {state === "half" && (
                      <defs>
                        <linearGradient id={halfStarId}>
                          <stop offset="50%" stopColor="currentColor" />
                          <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
                        </linearGradient>
                      </defs>
                    )}
                    <path
                      fill={state === "half" ? `url(#${halfStarId})` : "currentColor"}
                      fillOpacity={state === "muted" ? 0.25 : 1}
                      d="M10 1.5 L12.472 7.146 L18.5 7.842 L14 11.926 L15.3 17.9 L10 14.9 L4.7 17.9 L6 11.926 L1.5 7.842 L7.528 7.146 Z"
                    />
                  </svg>
                );
              })}

            </div>
            {reviewSource ? <span className="font-serif text-[22px] leading-[1.2]">{reviewSource}</span> : null}
            {typeof reviewCount === "number" ? (
              <span className="text-[12px] leading-[1.4] text-clay">{[ui.reviewsBasedOn, reviewCount, ui.reviewsVerified].filter((part) => part !== undefined && part !== "").join(" ")}</span>
            ) : null}
          </div>
        </div>
        ) : null}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:flex-nowrap sm:justify-between sm:gap-4 lg:gap-6">
          <Button type="button" variant="ghost" size="icon" onClick={() => shift(-1)} aria-label={a11y.previousTestimonials} className="order-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-taupe bg-taupe text-pearl transition-colors duration-150 hover:border-umber hover:bg-umber hover:text-pearl focus-visible:ring-clay sm:order-1">
            <ChevronLeft className="!h-5 !w-5" aria-hidden="true" />
          </Button>

          <div className="order-1 w-full min-w-0 overflow-hidden sm:order-2 sm:-mx-2 sm:w-auto sm:flex-1 lg:-mx-4">
            <div
              className={`wow-testimonial-track flex ${transitionEnabled ? "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-in-out" : ""}`}
              style={{ "--carousel-index": slide } as React.CSSProperties}
              onTransitionEnd={(event) => { if (event.target === event.currentTarget) finishSlide(); }}
            >
              {slides.map((review, i) => (
                <div key={`${i}-${review.name}`} className="wow-testimonial-slide shrink-0 px-2 lg:px-4" aria-hidden={i < count || i >= count * 2}>
                <article className="flex min-h-[280px] h-full flex-col bg-pearl p-6 sm:min-h-[340px] md:p-10">
                  <span aria-hidden="true" className="mb-5 font-serif text-[56px] font-medium leading-[0.5]">“</span>
                  <blockquote className="flex-1 font-serif text-[20px] font-normal leading-[1.45]">“{review.quote}”</blockquote>
                  <div className="mt-4 h-px w-8 bg-clay/50" />
                  <p className="mt-5 font-serif text-[20px] leading-[1.2]">{review.name}</p>
                  <p className="mt-2.5 text-[11px] uppercase leading-[1.5] tracking-[0.24em] text-clay">{review.stay}<br />{review.location}</p>
                </article>
                </div>
              ))}
            </div>
          </div>

          <Button type="button" variant="ghost" size="icon" onClick={() => shift(1)} aria-label={a11y.nextTestimonials} className="order-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-taupe bg-taupe text-pearl transition-colors duration-150 hover:border-umber hover:bg-umber hover:text-pearl focus-visible:ring-clay sm:order-3">
            <ChevronRight className="!h-5 !w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
