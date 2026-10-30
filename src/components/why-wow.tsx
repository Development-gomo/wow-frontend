import { Link } from "@/components/localized-link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type WhyWowItem = { icon: ReactNode; title: string; text: string };

const iconProps = {
  viewBox: "0 0 28 28",
  width: 30,
  height: 30,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "text-linen/90",
};

export const WhyWowIcons = {
  flexibleStays: (
    <svg {...iconProps}><rect x="3.5" y="6" width="21" height="18" rx="1" /><path d="M3.5 11 H24.5 M9 3.5 V8 M19 3.5 V8" /></svg>
  ),
  fullyFurnished: (
    <svg {...iconProps}><path d="M4 15 V20 M24 15 V20 M4 15 C4 13 5 12 7 12 H21 C23 12 24 13 24 15 V19 H4 Z M6 12 V9 C6 8 7 7 8 7 H20 C21 7 22 8 22 9 V12 M4 19 V22 M24 19 V22" /></svg>
  ),
  everythingYouNeed: (
    <svg {...iconProps}><path d="M2.5 10.5 C6 7 10 5.5 14 5.5 C18 5.5 22 7 25.5 10.5 M6 14 C8.5 11.5 11.2 10.5 14 10.5 C16.8 10.5 19.5 11.5 22 14 M9.5 17.5 C11 16 12.5 15.5 14 15.5 C15.5 15.5 17 16 18.5 17.5" /><circle cx="14" cy="21.5" r="1.1" fill="currentColor" stroke="none" /></svg>
  ),
  personalService: (
    <svg {...iconProps}><circle cx="10" cy="10" r="3.2" /><circle cx="19" cy="11.5" r="2.6" /><path d="M3.5 22 C3.5 18 6.5 16 10 16 C13.5 16 16.5 18 16.5 22 M15 22 C15 19.5 17 18 19 18 C21 18 23.5 19.5 24 22" /></svg>
  ),
} as const;

export function WhyWow({
  eyebrow,
  heading,
  description,
  items,
  ctaLabel,
  ctaTo,
  className,
}: {
  eyebrow?: string;
  heading: ReactNode;
  description: string;
  items: WhyWowItem[];
  ctaLabel?: string;
  ctaTo?: string;
  className?: string;
}) {
  return (
    <section className={cn("bg-taupe text-linen px-6 py-20 md:px-10 md:py-28 lg:px-20 lg:py-32", className)}>
      <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">
        <div className="flex flex-col items-start">
          {eyebrow && <span className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-sand/75">{eyebrow}</span>}
          <h2 className="mt-6 font-serif text-[42px] font-normal leading-[1.15] md:text-[48px]">{heading}</h2>
          <p className="mt-4 max-w-[420px] text-[15px] font-light leading-[1.75] text-linen/80">
            {description}
          </p>
          {ctaLabel && ctaTo ? (
            <Link href={ctaTo} className="mt-12 inline-flex items-center gap-3 border-b border-linen/40 pb-[5px] pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-linen transition-colors duration-200 hover:border-sand/70 hover:text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-linen">
              {ctaLabel}
              <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M1 6 H14 M10 2 L14 6 L10 10" /></svg>
            </Link>
          ) : null}
        </div>

        <ul aria-label={eyebrow} className="grid grid-cols-2 mt-1.5">
          {items.map((item, index) => (
            <li key={item.title} className={`flex flex-col gap-4 ${index % 2 === 0 ? "pb-10 pr-5 sm:pr-10" : "pb-10 border-l border-linen/20 pl-5 sm:pl-10"} ${index < 2 ? "border-b border-linen/20" : "pt-10"}`}>
              {item.icon}
              <h3 className="font-serif text-[26px] font-normal leading-[1.2]">{item.title}</h3>
              <p className="text-[15px] font-light leading-[1.7] text-linen/80">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
