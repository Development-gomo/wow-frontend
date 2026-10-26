import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

import { CmsImage } from "@/components/cms-image";
import { SectionLink } from "@/components/section-link";
type Props = {
  eyebrow: string;
  /** Section heading; "\n" starts a new line. */
  title: string;
  /** One paragraph, or several — each becomes its own line. */
  description: string | string[];
  /** Optional link under the text; omit both to show no link. */
  ctaLabel?: string;
  /** External url (new tab), internal route, or an id on this page such as "#parking-by-location". */
  ctaHref?: string;
  image: string;
  imageAlt: string;
  /** Optional override for the photo's corners, e.g. "rounded-none". */
  imageClassName?: string;
  /** Optional overrides so a page can match a supplied design without forking the section. */
  titleClassName?: string;
  /** Inline styles for the heading, for values the global type roles or class merging would otherwise override. */
  titleStyle?: CSSProperties;
  descriptionClassName?: string;
  /** Inline styles for the paragraph text, for sizes the global type roles would otherwise override. */
  descriptionStyle?: CSSProperties;
  ctaClassName?: string;
  /** Optional override for the content/photo row, e.g. "lg:items-start". */
  contentClassName?: string;
  className?: string;
};

export function ExternalGuideCallout({ eyebrow, title, description, ctaLabel, ctaHref, image, imageAlt, imageClassName, titleClassName, titleStyle, descriptionClassName, descriptionStyle, ctaClassName, contentClassName, className }: Props) {
  const paragraphs = Array.isArray(description) ? description : [description];
  const isExternal = ctaHref ? /^https?:/.test(ctaHref) : false;

  return (
    <section className={cn("mx-auto max-w-[1280px] px-6 pb-24 pt-16 text-umber sm:px-10 sm:pb-32 lg:px-20", className)}>
      <div className={cn("mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24", contentClassName)}>
        <div className="flex flex-col">
          <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</p>
          <p className={cn("mt-6 max-w-[520px] font-serif text-[36px] font-normal leading-[1.18] sm:text-[42px]", titleClassName)} style={titleStyle}>
            {title.split("\n").map((line, index) => (
              <span key={index} className="block">{line}</span>
            ))}
          </p>
          <div className={cn("mt-4 flex max-w-[480px] flex-col gap-3 text-[15px] font-light leading-[1.75] opacity-85", descriptionClassName)}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} style={descriptionStyle}>{paragraph}</p>
            ))}
          </div>
          {ctaLabel && ctaHref ? <SectionLink
            href={ctaHref}
            localize
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn("group/link mt-12 inline-flex items-center gap-3.5 self-start border-b border-clay/55 pb-1.5 pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] transition-colors duration-[180ms] hover:border-umber/60 hover:text-umber focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-clay", ctaClassName)}
          >
            <span>{ctaLabel}</span>
            <svg viewBox="0 0 16 12" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className="transition-transform duration-[220ms] group-hover/link:translate-x-[3px]">
              <path d="M1 6 H14 M10 2 L14 6 L10 10" />
            </svg>
          </SectionLink> : null}
        </div>
        <CmsImage sizes="(min-width: 1024px) 45vw, 100vw"
          src={image}
          alt={imageAlt}
          loading="lazy"
          className={cn("aspect-[16/10] w-full rounded-[4px] object-cover", imageClassName)}
        />
      </div>
    </section>
  );
}
