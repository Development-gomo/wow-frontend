export type InfoColumn = { value: string; title: string; body: string };

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: InfoColumn[];
  listLabel: string;
  className?: string;
};

/** Centred intro with up to four divided columns (value, title, body) — "Easy to reach" layout. */
export function InfoColumns({ id, eyebrow, title, description, items, listLabel, className = "bg-sand" }: Props) {
  const mdCols = items.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3";
  return (
    <section aria-labelledby={id} className={`${className} px-6 py-20 sm:px-14 md:px-20 md:py-32`}>
      <div className="flex flex-col items-center text-center">
        <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">{eyebrow}</p>
        <h2 id={id} className="mt-6 font-serif text-[34px] font-normal leading-[1.15] text-taupe sm:text-[44px] lg:text-[52px]">
          {title}
        </h2>
        <p className="mt-4 max-w-[820px] text-[15px] font-light leading-[1.75] text-taupe/85">{description}</p>
      </div>

      <ul aria-label={listLabel} className={`mx-auto mt-12 grid w-full max-w-[1200px] list-none grid-cols-1 p-0 sm:mt-16 sm:grid-cols-2 md:mt-16 ${mdCols}`}>
        {items.map((col, index) => (
          <li
            key={col.title}
            className={`wow-ga-col flex flex-col items-center border-clay/[0.22] px-7 py-10 text-center sm:py-12 md:py-0 ${
              index === 0
                ? ""
                : index === 1
                  ? "border-t sm:border-t-0 sm:border-l"
                  : index === 2
                    ? "border-t md:border-t-0 md:border-l"
                    : "border-t md:border-t-0 sm:border-l"
            }`}
          >
            <div className="font-serif text-[36px] font-normal leading-[1.1] text-taupe sm:text-[40px]">{col.value}</div>
            <h3 className="mt-6 font-serif text-[22px] font-normal leading-[1.2] text-taupe">{col.title}</h3>
            <p className="mt-2 max-w-[240px] text-[14px] font-light leading-[1.65] text-taupe/85">{col.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
