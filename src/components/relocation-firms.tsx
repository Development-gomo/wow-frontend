import { Link } from "@tanstack/react-router";
import { Building2, CalendarDays, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export type RelocationFirmPoint = { title: string; text: string };

const POINT_ICONS = [CalendarDays, Users, Building2];

type RelocationFirmsProps = {
  eyebrow?: string;
  heading: string;
  description: string;
  points?: RelocationFirmPoint[];
  ctaLabel?: string;
  ctaTo?: string;
};

/** All copy, the points and the button come from the page's Relocation firms section in WordPress. */
export function RelocationFirms({ eyebrow, heading, description, points = [], ctaLabel, ctaTo }: RelocationFirmsProps) {
  return (
    <section aria-labelledby="relocation-firms-heading" className="bg-pearl px-6 py-[128px] text-taupe md:px-10">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div>
          {eyebrow && <p className="text-eyebrow font-light uppercase tracking-[0.3em] text-clay">{eyebrow}</p>}
          <h2 id="relocation-firms-heading" className="mt-6 font-serif text-heading-two font-light">{heading}</h2>
          <p className="mt-4 max-w-[520px] text-title-subtext font-light leading-[30px]">{description}</p>
          {ctaLabel && ctaTo && (
            <Button asChild className="mt-8 h-12 rounded-cta bg-taupe px-8 text-cta-label text-linen uppercase tracking-[0.15em] shadow-none hover:bg-umber hover:text-linen">
              <Link to={ctaTo}>{ctaLabel}</Link>
            </Button>
          )}
        </div>
        <ul className="divide-y divide-clay/30">
          {points.map((point, index) => {
            const Icon = POINT_ICONS[index % POINT_ICONS.length];
            return (
              <li key={point.title} className="flex items-start gap-5 py-6">
                <Icon aria-hidden="true" className="mt-1 size-6 shrink-0 text-clay" strokeWidth={1.2} />
                <div><h3 className="font-serif text-[26px] font-light">{point.title}</h3><p className="mt-2 text-body-copy font-light">{point.text}</p></div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
