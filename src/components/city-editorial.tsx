import { cn } from "@/lib/utils";
import { CmsImage } from "@/components/cms-image";

type SectionIntroProps = { id: string; eyebrow: string; title: string; description?: string; inverse?: boolean; /** Override for the title→description gap (default mt-6). */ descriptionClassName?: string };

export function EditorialSectionIntro({ id, eyebrow, title, description, inverse, descriptionClassName }: SectionIntroProps) {
  return (
    <div className="mx-auto max-w-[720px] text-center">
      <span className={cn("block text-eyebrow uppercase tracking-[0.45em]", inverse ? "text-warm-clay" : "text-clay")}>{eyebrow}</span>
      <h2 id={id} className="mt-6 font-serif">{title}</h2>
      {description ? <p className={cn("mt-6", descriptionClassName)}>{description}</p> : null}
    </div>
  );
}

type DiscoveryProps = SectionIntroProps & { image: string; imageAlt: string; quote: string };

/** Editorial discovery split, with a separately styled closing quotation. */
export function EditorialDiscovery({ id, eyebrow, title, description, image, imageAlt, quote }: DiscoveryProps) {
  return (
    <section aria-labelledby={id} className="px-6 py-20 text-taupe sm:px-10 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="min-w-0">
          <span className="block text-eyebrow uppercase tracking-[0.45em] text-clay">{eyebrow}</span>
          <h2 id={id} className="mt-6 max-w-[460px] font-serif">{title}</h2>
          <div className="mt-4"><p className="max-w-[500px] text-taupe/85">{description}</p></div>
          <div aria-hidden="true" className="mt-8 mb-8 h-px w-9 bg-clay/60" />
          <blockquote className="font-serif text-[22px] italic leading-[1.5]">“{quote}”</blockquote>
        </div>
        <CmsImage sizes="(min-width: 1024px) 60vw, 100vw" src={image} alt={imageAlt} width={1536} height={1024} loading="lazy" className="aspect-[3/2] w-full object-cover" />
      </div>
    </section>
  );
}

export type CityGuideEntry = { number: string; eyebrow: string; title: string; description: string; highlights: string[]; image: string; imageAlt: string };

/** Alternating editorial panels use one layout and route-owned content. */
export function EditorialCityGuide({ id, eyebrow, title, entries }: SectionIntroProps & { entries: CityGuideEntry[] }) {
  return (
    <section aria-labelledby={id} className="px-6 pb-20 text-taupe sm:px-10 lg:px-20 lg:pb-32">
      <EditorialSectionIntro id={id} eyebrow={eyebrow} title={title} />
      <div className="mx-auto mt-16 flex max-w-[1200px] flex-col gap-20 lg:mt-24 lg:gap-32">
        {entries.map((entry, index) => (
          <article key={entry.number} className="grid min-w-0 items-center lg:grid-cols-12">
            <CmsImage sizes="(min-width: 1024px) 40vw, 100vw" src={entry.image} alt={entry.imageAlt} width={1536} height={1024} loading="lazy" className={cn("aspect-[1.12] w-full object-cover lg:row-start-1", index % 2 === 0 ? "lg:col-start-1 lg:col-end-7" : "lg:col-start-7 lg:col-end-13")} />
            <div className={cn("relative z-10 -mt-8 mx-3 bg-pearl p-7 shadow-accommodation sm:mx-6 sm:p-10 lg:mx-0 lg:mt-0 lg:p-12 lg:row-start-1", index % 2 === 0 ? "lg:col-start-6 lg:col-end-13" : "lg:col-start-1 lg:col-end-8")}>
              <div className="flex items-center gap-4">
                <span className="font-serif text-[20px] italic text-warm-clay">{entry.number}</span>
                <span className="text-eyebrow uppercase tracking-[0.3em] text-clay">{entry.eyebrow}</span>
              </div>
              <h3 className="mt-4 font-serif text-[32px] font-light leading-[1.2]">{entry.title}</h3>
              <p className="mt-4 text-[16px] text-taupe/85">{entry.description}</p>
              <ul className="mt-2 list-disc space-y-0 pl-4 marker:text-clay">
                {entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EditorialMap({ id, eyebrow, title, description, image, imageAlt }: SectionIntroProps & { image: string; imageAlt: string }) {
  return (
    <section aria-labelledby={id} className="px-6 pb-20 sm:px-10 lg:px-20 lg:pb-32">
      <EditorialSectionIntro id={id} eyebrow={eyebrow} title={title} description={description} descriptionClassName="mt-4" />
      <div className="mx-auto mt-16 max-w-[1200px]">
        <CmsImage sizes="(min-width: 1280px) 1200px, 100vw" src={image} alt={imageAlt} width={1152} height={768} loading="lazy" className="h-auto w-full shadow-accommodation" />
      </div>
    </section>
  );
}

export type SeasonalEntry = { season: string; months: string; title: string; description: string; bestFor: string };

export function SeasonalNotes({ id, eyebrow, title, description, entries, bestForLabel }: SectionIntroProps & { entries: SeasonalEntry[]; bestForLabel?: string }) {
  return (
    <section aria-labelledby={id} className="bg-deep-taupe px-6 py-20 text-pearl sm:px-10 lg:px-20 lg:py-32">
      <EditorialSectionIntro id={id} eyebrow={eyebrow} title={title} description={description} inverse />
      <div className="mx-auto mt-16 grid max-w-[1200px] gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {entries.map((entry, index) => (
          <article key={entry.season} className={cn("flex min-w-0 flex-col border-clay/25", index > 0 && "border-t pt-10 md:border-t-0 md:pt-0", index % 2 === 0 ? "md:pr-8" : "md:border-l md:pl-8", index > 0 && "lg:border-l lg:pl-8", index < entries.length - 1 && "lg:pr-8")}>
            <span className="text-eyebrow uppercase tracking-[0.3em] text-warm-clay">{entry.season}</span>
            <p className="mt-3 font-serif text-[16px] italic leading-[1.5] text-warm-clay">{entry.months}</p>
            <h3 className="mt-6 font-serif text-[28px] font-light leading-[1.2] lg:min-h-[68px]">{entry.title}</h3>
            <p className="mt-6 text-pearl/85">{entry.description}</p>
            <div className="mt-auto flex flex-wrap items-baseline gap-3 pt-7">
              {bestForLabel ? <span className="text-eyebrow uppercase tracking-[0.3em]">{bestForLabel}</span> : null}
              <span className="font-serif text-[18px] italic">{entry.bestFor}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}