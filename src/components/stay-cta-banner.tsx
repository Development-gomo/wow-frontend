import { Link } from "@tanstack/react-router";
import { CmsImage } from "@/components/cms/cms-image";
import { SIZES } from "@/lib/cms/image";
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
  /** Background photo, from the CMS. */
  imageUrl?: string;
  /** Screen-reader description of the photo. */
  imageAlt?: string;
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
}: StayCtaBannerProps) {
  return (
    <section
      aria-labelledby="stay-cta-heading"
      className="relative overflow-hidden px-6 py-[88px] sm:px-20"
    >
      {imageUrl && (
        <CmsImage
          src={imageUrl}
          alt={imageAlt}
          width={1920}
          height={1080}
          sizes={SIZES.fullWidth}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center"
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
              to={primaryTo}
              className="inline-flex h-12 items-center justify-center rounded-cta border border-pearl bg-pearl px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-taupe transition-colors duration-200 hover:bg-sand hover:text-umber"
            >
              {primaryLabel}
            </Link>
          ) : null}
          {secondaryLabel && secondaryTo ? (
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
