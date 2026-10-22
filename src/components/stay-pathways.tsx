import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

export type StayPathway = {
  number: string;
  label: string;
  title: string;
  description: string;
  linkLabel: string;
  /** Id of the section on the same page that the link scrolls to. */
  targetId: string;
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  items: StayPathway[];
  className?: string;
};

const scrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
};

/** Two-column intro: section heading left, numbered stay options right, each linking to a section further down the page. */
export function StayPathways({ eyebrow, title, description, items, className }: Props) {
  return (
    <section className={cn("flex w-full justify-center bg-sand px-6 pt-20 text-taupe sm:px-10 lg:px-20 lg:pt-32", className)}>
      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16 lg:gap-28">
        <div className="flex flex-col pt-1">
          <p className="m-0 pl-[0.45em] uppercase tracking-[0.45em] text-clay" style={{ fontSize: 12, fontWeight: 400 }}>{eyebrow}</p>
          <h2 className="mt-6 font-serif leading-[1.1]" style={{ fontSize: 48, fontWeight: 400 }}>{title.split("\n").map((line, i) => <span key={i} className="block">{line}</span>)}</h2>
          <p className="mt-4 max-w-[420px] font-light leading-[1.8] opacity-[0.88]" style={{ fontSize: 18 }}>{description}</p>
        </div>

        <div className="flex flex-col">
          {items.map((item, i) => (
            <div key={item.targetId} className={i > 0 ? "mt-8" : undefined}>
              <article className="flex flex-col">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-serif italic leading-none text-warm-clay" style={{ fontSize: 22, fontWeight: 400 }}>{item.number}</span>
                  <span className="pl-[0.4em] uppercase tracking-[0.4em] text-clay" style={{ fontSize: 10, fontWeight: 500 }}>{item.label}</span>
                </div>
                <h3 className="mt-[18px] font-serif leading-[1.2]" style={{ fontSize: 32, fontWeight: 400 }}>{item.title}</h3>
                <p className="mt-2 max-w-[560px] font-light leading-[1.8] opacity-[0.88]" style={{ fontSize: 16 }}>{item.description}</p>
                <a
                  href={`#${item.targetId}`}
                  onClick={(e) => scrollTo(e, item.targetId)}
                  className="group/link mt-[22px] inline-flex items-center gap-2.5 self-start border-b border-clay/55 pb-[5px] pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors duration-[180ms] hover:border-umber/90 hover:text-umber focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-clay"
                >
                  <span>{item.linkLabel}</span>
                  <svg viewBox="0 0 16 10" width="16" height="10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-[220ms] group-hover/link:translate-x-[3px]">
                    <path d="M1 5 H14 M10 1 L14 5 L10 9" />
                  </svg>
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
