import { Link } from "@tanstack/react-router";
import contactBedroom from "@/assets/contact/contact-callout-bedroom.jpg.asset.json";
import { cn } from "@/lib/utils";

type StayCtaBannerProps = {
  eyebrow?: string;
  title: string;
  /** Extra classes for the heading, e.g. to keep a short title on one line. */
  titleClassName?: string;
  description?: string;
  primaryLabel?: string;
  primaryTo?: string;
  /** Omit to render a single-button banner. */
  secondaryLabel?: string;
  secondaryTo?: string;
  /** Override the background photo for this banner only; defaults to the shared bedroom photo. */
  imageUrl?: string;
  /** Screen-reader description of the photo. */
  imageAlt?: string;
};

export function StayCtaBanner({
  eyebrow = "Stay your way",
  title,
  titleClassName,
  description,
  primaryLabel = "Book room",
  primaryTo = "/book-room",
  secondaryLabel,
  secondaryTo = "/book-apartment",
  imageUrl = contactBedroom.url,
  imageAlt = "A warm bedroom and sunlit window in one of our homes",
}: StayCtaBannerProps) {
  return (
    <section
      aria-labelledby="stay-cta-heading"
      className="relative overflow-hidden px-6 py-[88px] sm:px-20"
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-umber/50" />
      <div className="relative mx-auto flex max-w-[620px] flex-col items-center text-center">
        <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-pearl/85">
          {eyebrow}
        </p>
        <h2
          id="stay-cta-heading"
          className={cn(
            "mt-6 max-w-[600px] font-serif text-[38px] font-normal leading-[1.15] text-pearl sm:text-[clamp(38px,4.06vw,52px)]",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-[500px] text-[15px] font-light leading-[1.75] text-pearl/90">
            {description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-cta">
          <Link
            to={primaryTo}
            className="inline-flex h-12 items-center justify-center rounded-cta border border-pearl bg-pearl px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-taupe transition-colors duration-200 hover:bg-sand hover:text-umber"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel ? (
            <Link
              to={secondaryTo}
              className="inline-flex h-12 items-center justify-center rounded-cta border border-pearl/60 bg-transparent px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-pearl transition-colors duration-200 hover:border-pearl hover:bg-pearl hover:text-taupe"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
