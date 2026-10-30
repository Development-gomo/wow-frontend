import { Link } from "@/components/localized-link";
import { cn } from "@/lib/utils";
import { CmsImage } from "@/components/cms-image";

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
  /** Background photo, from the CMS. */
  imageUrl?: string;
  /** Screen-reader description of the photo. */
  imageAlt?: string;
  /** Extra classes for this banner's band, e.g. to change its vertical padding. */
  className?: string;
};

export function StayCtaBanner({
  eyebrow,
  title,
  titleClassName,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  imageUrl,
  imageAlt = "",
  className,
}: StayCtaBannerProps) {
  return (
    <section
      aria-labelledby="stay-cta-heading"
      className={cn("relative overflow-hidden px-6 py-[88px] sm:px-20", className)}
    >
      {imageUrl && (
        <CmsImage sizes="100vw"
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-umber/50" />
      <div className="relative mx-auto flex max-w-[620px] flex-col items-center text-center">
        {eyebrow && (
          <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-pearl/85">
            {eyebrow}
          </p>
        )}
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
          {primaryLabel && primaryTo ? (
            <Link
              href={primaryTo}
              className="inline-flex h-12 items-center justify-center rounded-cta border border-pearl bg-pearl px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-taupe transition-colors duration-200 hover:bg-sand hover:text-umber"
            >
              {primaryLabel}
            </Link>
          ) : null}
          {secondaryLabel && secondaryTo ? (
            <Link
              href={secondaryTo}
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
