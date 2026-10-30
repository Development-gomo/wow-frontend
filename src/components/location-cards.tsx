import { SectionLink } from "@/components/section-link";
import { cn } from "@/lib/utils";

export type LocationCard = {
  number: string;
  area: string;
  name: string;
  description: string;
  /** Label/value rows, e.g. Type · Booking · Rates. */
  facts: { label: string; value: string }[];
  /** Link under the card; external urls open in a new tab, "#id" scrolls on this page. */
  cta: { label: string; href: string };
};

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: LocationCard[];
  /** Label for the card list. */
  listLabel?: string;
  className?: string;
};

/** Centred intro with one pearl card per address: number, area, note, label/value rows and a directions link. */
export function LocationCards({ id, eyebrow, title, description, cards, listLabel = "Locations", className }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-24 bg-sand px-6 py-[128px] text-taupe sm:px-10 lg:px-20", className)}>
      <div className="mx-auto max-w-[720px] text-center">
        <span className="block pl-[0.45em] text-eyebrow uppercase tracking-[0.45em] text-clay" style={{ fontWeight: 400 }}>{eyebrow}</span>
        <h2 id={`${id}-title`} className="mt-6 font-serif leading-[1.15]" style={{ fontWeight: 400 }}>{title}</h2>
        <p className="mx-auto mt-4 max-w-[540px] font-light text-taupe/85">{description}</p>
      </div>

      <ul aria-label={listLabel} className="mx-auto mt-16 grid w-full max-w-[1200px] list-none grid-cols-1 gap-7 p-0 md:grid-cols-3">
        {cards.map((card) => {
          const isExternal = /^https?:/.test(card.cta.href);
          return (
            <li key={card.name} className="flex min-w-0">
              <article className="flex h-full w-full flex-col rounded-[4px] bg-pearl px-9 pb-9 pt-10 shadow-accommodation">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[24px] italic leading-none text-warm-clay">{card.number}</span>
                  <span className="pl-[0.4em] uppercase tracking-[0.4em] text-clay" style={{ fontSize: 11, lineHeight: "15px", fontWeight: 500 }}>{card.area}</span>
                </div>
                <h3 className="mt-[14px] font-serif text-[26px] font-normal leading-[1.25]">{card.name}</h3>
                <p className="mt-5 font-light text-taupe/90" style={{ fontSize: 16, lineHeight: 1.7 }}>{card.description}</p>
                <ul className="mt-5 flex flex-col gap-2.5 text-[14px] leading-[1.5] text-taupe/90">
                  {card.facts.map((fact) => (
                    <li key={fact.label} className="flex gap-3">
                      <span className="min-w-[80px] pt-[2px] uppercase tracking-[0.3em] text-clay" style={{ fontSize: 11, lineHeight: "15px", fontWeight: 500 }}>{fact.label}</span>
                      <span>{fact.value}</span>
                    </li>
                  ))}
                </ul>
                {card.cta.label && card.cta.href ? <SectionLink
                  href={card.cta.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group/link mt-auto inline-flex items-center gap-2.5 self-start border-b border-clay/55 pb-[5px] pl-[0.32em] pr-[0.32em] pt-[28px] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors duration-[180ms] hover:border-umber/90 hover:text-umber focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-clay"
                >
                  <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-[220ms] group-hover/link:translate-x-[3px]">
                    <path d="M7 1 C9.76 1 12 3.24 12 6 C12 10 7 13 7 13 C7 13 2 10 2 6 C2 3.24 4.24 1 7 1 Z M7 7.5 A1.5 1.5 0 1 1 7 4.5 A1.5 1.5 0 1 1 7 7.5 Z" />
                  </svg>
                  <span>{card.cta.label}</span>
                </SectionLink> : null}
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
