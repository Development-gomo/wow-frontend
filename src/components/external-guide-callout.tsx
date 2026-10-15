import { CmsImage } from "@/components/cms/cms-image";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
};

export function ExternalGuideCallout({ eyebrow, title, description, ctaLabel, ctaHref, image, imageAlt }: Props) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-24 pt-16 text-umber sm:px-10 sm:pb-32 lg:px-20">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="flex flex-col">
          <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</p>
          <h2 className="mt-6 max-w-[520px] font-serif text-[36px] font-normal leading-[1.18] sm:text-[48px]">{title}</h2>
          <p className="mt-4 max-w-[480px] text-[15px] font-light leading-[1.75] opacity-85">{description}</p>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3.5 self-start border-b border-clay/55 pb-1.5 pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] transition-colors duration-[180ms] hover:border-umber/60 hover:text-umber focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-clay"
          >
            <span>{ctaLabel}</span>
            <svg viewBox="0 0 16 12" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path d="M1 6 H14 M10 2 L14 6 L10 10" />
            </svg>
          </a>
        </div>
        <CmsImage
          src={image}
          alt={imageAlt}
          width={1600}
          height={1000}
          sizes="(min-width: 1280px) 580px, (min-width: 1024px) 48vw, 100vw"
          loading="lazy"
          className="aspect-[16/10] h-auto w-full rounded-[4px] object-cover"
        />
      </div>
    </section>
  );
}
