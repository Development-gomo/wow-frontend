import { cn } from "@/lib/utils";

export type EditorialPillar = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  note?: string;
};

type EditorialPillarsProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: EditorialPillar[];
  className?: string;
};

/** Unframed editorial pillars with a centred introduction and divided columns. */
export function EditorialPillars({ id, eyebrow, title, description, items, className }: EditorialPillarsProps) {
  return (
    <section aria-labelledby={id} className={cn("bg-sand px-6 py-20 text-taupe sm:px-10 lg:px-20 lg:py-32", className)}>
      <div className="mx-auto max-w-[720px] text-center">
        <span className="block pl-[0.45em] text-eyebrow uppercase tracking-[0.45em] text-clay" style={{ fontWeight: 400 }}>{eyebrow}</span>
        <h2 id={id} className="mt-6 font-serif leading-[1.15]" style={{ fontWeight: 400 }}>{title}</h2>
        {description ? <p className="mt-6 font-light text-taupe/85">{description}</p> : null}
      </div>
      <ol className="mx-auto mt-16 grid max-w-[1200px] list-none grid-cols-1 gap-y-10 p-0 md:grid-cols-3 md:gap-x-12 md:gap-y-0">
        {items.map((item, index) => (
          <li key={item.number} className={cn("flex min-w-0 flex-col px-6 py-2", index > 0 && "border-t border-clay/[0.22] pt-10 md:border-l md:border-t-0 md:py-2 md:pt-2")}>
            <span className="font-serif text-[32px] font-normal italic leading-none text-warm-clay">{item.number}</span>
            <span className="mt-7 block pl-[0.4em] uppercase tracking-[0.4em] text-clay" style={{ fontSize: 10, lineHeight: "14px", fontWeight: 500 }}>{item.eyebrow}</span>
            <h3 className="mt-4 whitespace-pre-line font-serif text-[26px] font-normal leading-[1.25]">{item.title}</h3>
            <p className="mt-5 font-light text-taupe/85" style={{ fontSize: 14, lineHeight: 1.75 }}>{item.description}</p>
            {item.note ? <p className="mt-auto pt-6 font-serif text-[16px] italic leading-[1.6] text-clay">{item.note}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}