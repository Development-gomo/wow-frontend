import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type ResponsibleHostingProps = {
  eyebrow: string;
  lead: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
  image: string;
  imageAlt: string;
  className?: string;
};

/** Shared text-left / photo-right editorial section (About "Responsible hosting", Sustainability "Thoughtful living"). */
export function ResponsibleHosting({ eyebrow, lead, description, ctaLabel, ctaTo, image, imageAlt, className }: ResponsibleHostingProps) {
  return (
    <section className={cn("bg-background px-6 pt-[128px] sm:px-10 lg:px-20", className)}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="flex min-w-0 flex-col">
          <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>
          <p className="mt-6 max-w-[520px] font-serif text-[28px] font-normal leading-[1.3] text-taupe sm:text-[32px]">{lead}</p>
          <p className="mt-4 max-w-[460px] font-light leading-[1.75] text-taupe/80" style={{ fontSize: 18 }}>{description}</p>
          {ctaLabel && ctaTo ? <Link
            to={ctaTo}
            className="mt-12 inline-flex items-center gap-[14px] self-start border-b border-clay/55 pb-[6px] pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70"
          >
            <span>{ctaLabel}</span>
            <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path d="M1 6 H14 M10 2 L14 6 L10 10" />
            </svg>
          </Link> : null}
        </div>
        <div className="relative aspect-[1/0.88] w-full overflow-hidden lg:aspect-auto lg:self-stretch">
          <img src={image} alt={imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
        </div>
      </div>
    </section>
  );
}
