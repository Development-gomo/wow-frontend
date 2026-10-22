import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type WorkWithUsProps = {
  image: string;
  imageAlt: string;
  /** Extra classes for the photo itself, e.g. an object-position so the subject stays in view when the box is cropped. */
  imageClassName?: string;
  eyebrow: string;
  title: ReactNode;
  /** Optional pull-quote shown between the title and the description. */
  quote?: string;
  description: string;
  contactLabel?: string;
  email?: string;
  /** Optional phone line below the email: label, number as shown, and its tel: link. */
  phoneLabel?: string;
  phone?: string;
  phoneHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaTo?: string;
  /** Section surface overrides (spacing), merged with cn so the page value wins. */
  className?: string;
};

/** Shared photo-left / text-right contact section (About "Work with us", Concierge "Meet Anna"). */
export function WorkWithUs({ image, imageAlt, imageClassName, eyebrow, title, quote, description, contactLabel, email, phoneLabel, phone, phoneHref, ctaLabel, ctaHref, ctaTo, className }: WorkWithUsProps) {
  const ctaClassName = "mt-[48px] inline-flex items-center gap-[14px] self-start border-b border-clay/55 pb-[6px] pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70";
  const ctaContent = <><span>{ctaLabel}</span><svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M1 6 H14 M10 2 L14 6 L10 10" /></svg></>;
  return (
    <section className={cn("bg-background px-6 pb-[128px] pt-[128px] sm:px-10 lg:px-20", className)}>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:flex-row md:gap-[96px]">
        <div className="relative aspect-[4/5] w-full min-w-0 flex-1 overflow-hidden md:aspect-auto">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            width={1024}
            height={1280}
            className={cn("absolute inset-0 h-full w-full object-cover object-center", imageClassName)}
          />
        </div>

        <div className="flex max-w-[620px] min-w-0 flex-[1.4] flex-col">
          <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>
          <p className="mt-6 font-serif text-[32px] font-normal leading-[42px] text-taupe">
            {title}
          </p>
          {quote ? <blockquote className="mt-6 max-w-[560px] font-serif text-[22px] italic font-normal leading-[1.3] text-taupe">{quote}</blockquote> : null}
          <p className="mt-4 max-w-[500px] font-light leading-[1.75] text-taupe/85" style={{ fontSize: 18 }}>{description}</p>
          {contactLabel ? <div className="mt-6 text-[14px] font-light leading-[1.6] text-taupe/80">{contactLabel}</div> : null}
          {email ? <a
            href={`mailto:${email}`}
            className="mt-2 self-start border-b border-clay/60 pb-[4px] font-serif text-[22px] font-normal leading-[1.2] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70 sm:text-[26px]"
          >
            {email}
          </a> : null}
          {phone && phoneHref ? <>
            {phoneLabel ? <div className="mt-6 text-[14px] font-light leading-[1.6] text-taupe/80">{phoneLabel}</div> : null}
            <a
              href={phoneHref}
              className="mt-2 self-start border-b border-clay/60 pb-[4px] font-serif text-[22px] font-normal leading-[1.2] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70 sm:text-[26px]"
            >
              {phone}
            </a>
          </> : null}
          {ctaLabel ? (ctaTo ? <Link to={ctaTo} className={ctaClassName}>{ctaContent}</Link> : <a href={ctaHref} className={ctaClassName}>{ctaContent}</a>) : null}
        </div>
      </div>
    </section>
  );
}
