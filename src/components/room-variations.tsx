import { BedSingle, Expand, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export type RoomVariation = {
  title: string;
  size: string;
  area: string;
  price: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
  guests?: string;
  bed?: string;
};

type RoomVariationsProps = {
  title: string;
  options: RoomVariation[];
  label: string;
  heading?: string;
  pricePrefix?: string;
  priceSuffix?: string;
  ctaLabel?: string;
};

export function RoomVariations({ title, options, label, heading, pricePrefix, priceSuffix, ctaLabel }: RoomVariationsProps) {
  return (
    <section id="room-variations" aria-labelledby="room-variations-heading" className="bg-sand px-5 py-16 text-taupe md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <p className="m-0 pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">{label}</p>
          <h2 id="room-variations-heading" className="mt-6 font-serif text-[48px] font-normal leading-[1.15]">{heading}</h2>
        </div>

        <ul aria-label={`${title} options`} className="mt-12 grid list-none gap-6 p-0 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {options.map((option) => (
            <li key={option.title} className="flex">
              <article className="group flex w-full flex-col transition-transform duration-[220ms] motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none">
                <div className="relative h-[240px] shrink-0 overflow-hidden">
                  <img src={option.image} alt={option.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                </div>

                <div className="relative z-10 mx-auto -mt-5 flex w-[calc(100%-24px)] min-w-0 flex-1 flex-col bg-pearl shadow-accommodation">
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <p className="wow-card-meta m-0 pl-[0.32em] text-[10px] font-normal uppercase tracking-[0.32em] text-clay">{option.size}</p>
                    <h3 className="mt-4 font-serif text-[26px] font-normal leading-[1.15]">{option.title}</h3>
                    <p className="mt-1 text-sm font-light leading-[1.65] text-taupe/85">{option.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-serif text-[15px]">
                      <span className="inline-flex items-center gap-2"><UserRound aria-hidden="true" size={15} strokeWidth={1.2} className="text-clay" />{option.guests}</span>
                      <span className="inline-flex items-center gap-2"><BedSingle aria-hidden="true" size={18} strokeWidth={1.2} className="text-clay" />{option.bed}</span>
                      <span className="inline-flex items-center gap-2"><Expand aria-hidden="true" size={15} strokeWidth={1.2} className="text-clay" />{option.area}</span>
                    </div>
                    <ul aria-label={`${option.title} features`} className="mt-5 flex list-none flex-wrap gap-2 p-0">
                      {option.features.map((feature) => <li key={feature} className="wow-chip rounded-full bg-ivory px-3.5 py-2 text-xs font-normal">{feature}</li>)}
                    </ul>
                  </div>

                  <div className="mt-auto flex flex-col gap-4 border-t border-clay/22 px-6 py-5">
                    <p aria-label={[pricePrefix, option.price, priceSuffix].filter(Boolean).join(" ")} className="m-0 flex flex-wrap items-baseline gap-1.5 font-serif leading-[1.15]">
                      <span className="font-serif text-base">{pricePrefix}</span><span className="font-serif text-[26px] font-medium">{option.price}</span><span className="font-serif text-sm opacity-65">{priceSuffix}</span>
                    </p>
                    <Button type="button" aria-label={`${ctaLabel ?? ""} ${option.title}`.trim()} className="h-11 w-full cursor-pointer rounded-cta bg-taupe px-5 text-[11px] font-medium uppercase tracking-[0.28em] text-pearl shadow-none transition-colors duration-200 hover:bg-umber">{ctaLabel}</Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
