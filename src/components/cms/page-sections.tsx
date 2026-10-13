"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Gift, Mail, Phone } from "lucide-react";

import { BookActions } from "@/components/book-actions";
import { ContactForm } from "@/components/contact-form";
import { useSite } from "@/components/cms/site-context";
import { Button } from "@/components/ui/button";

import { withLineBreaks } from "./icon-map";

/*
 * Sections for the pages whose bodies used to be one-off markup: About us,
 * Contact, Gift card, Gallery and Locations. Each is the original markup with
 * its copy, images and links swapped for props from the matching page-builder
 * layout in WordPress. Empty fields render nothing.
 */

/** Router link for site paths; plain anchor for mailto:, tel: and external URLs. */
function SmartLink({ to, className, children }: { to: string; className: string; children: ReactNode }) {
  if (/^(mailto:|tel:|https?:)/.test(to)) {
    return <a href={to} className={className}>{children}</a>;
  }
  return <Link to={to} className={className}>{children}</Link>;
}

const ArrowRight = () => (
  <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    <path d="M1 6 H14 M10 2 L14 6 L10 10" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/* About us                                                                   */
/* -------------------------------------------------------------------------- */

export function AboutStory({ imageUrl, imageAlt, captionName, captionRole, eyebrow, lead, paragraphs }: {
  imageUrl: string;
  imageAlt: string;
  captionName: string;
  captionRole: string;
  eyebrow: string;
  lead: string;
  paragraphs: string[];
}) {
  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="aspect-[1/1.08] w-full overflow-hidden lg:h-[480px] lg:aspect-auto">
            {imageUrl && (
              <img src={imageUrl} alt={imageAlt} loading="lazy" className="h-full w-full object-cover object-center" />
            )}
          </div>
          <div className="flex items-center gap-[18px] px-1">
            <span className="shrink-0 pl-[0.4em] text-[10px] uppercase tracking-[0.4em] text-clay">{captionName}</span>
            <span className="h-px flex-1 bg-clay/50" />
            <span className="shrink-0 pl-[0.4em] text-[10px] uppercase tracking-[0.4em] text-clay">{captionRole}</span>
          </div>
        </div>

        <div className="min-w-0">
          {eyebrow && (
            <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>
          )}
          {lead && (
            <p className="mt-6 max-w-[560px] font-serif text-[28px] italic font-normal leading-[1.3] text-taupe sm:text-[32px]">{lead}</p>
          )}
          <div className="mt-8 h-px w-11 bg-clay" />
          <div className="mt-8 flex max-w-[520px] flex-col gap-3 text-[15px] font-light leading-[1.8] text-taupe/90">
            {paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function QuoteBand({ eyebrow, paragraphs, quote, attribution }: {
  eyebrow: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
}) {
  return (
    <section className="bg-taupe px-6 py-16 text-linen sm:px-10 md:py-16 lg:px-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:flex-row md:items-center md:gap-[88px]">
        <div className="flex max-w-[460px] min-w-0 flex-1 flex-col">
          {eyebrow && (
            <span className="block pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-linen/70">{eyebrow}</span>
          )}
          {paragraphs.map((paragraph, i) => (
            <p key={i} className={`${i === 0 ? "mt-6" : "mt-3"} text-[15px] font-light leading-[1.8] text-linen/90`}>{paragraph}</p>
          ))}
        </div>

        <div aria-hidden="true" className="hidden w-px shrink-0 self-center bg-linen/25 md:block md:h-[300px]" />

        <div className="flex max-w-[500px] min-w-0 flex-1 flex-col">
          {quote && (
            <blockquote className="font-serif text-[34px] font-normal italic leading-[1.2] text-linen sm:text-[42px] md:text-[52px]">{quote}</blockquote>
          )}
          {attribution && (
            <div className="mt-8 pl-[0.4em] text-[11px] font-normal uppercase tracking-[0.4em] text-linen/70">{attribution}</div>
          )}
        </div>
      </div>
    </section>
  );
}

export function LocationCards({ eyebrow, heading, linkLabel, linkTo, cards }: {
  eyebrow: string;
  heading: string;
  linkLabel?: string;
  linkTo?: string;
  cards: { area: string; name: string; image: string; imageAlt: string; description: string }[];
}) {
  return (
    <section className="bg-background px-6 pt-20 sm:px-10 sm:pt-24 lg:px-20 lg:pt-32">
      <div className="flex flex-col items-center text-center">
        {eyebrow && <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>}
        {heading && (
          <h2 className="mt-6 font-serif text-[34px] font-normal leading-[1.15] text-taupe sm:text-[clamp(34px,3.75vw,48px)]">{heading}</h2>
        )}
        {linkLabel && linkTo && (
          <SmartLink
            to={linkTo}
            className="mt-10 inline-flex items-center gap-[14px] border-b border-clay/55 pb-[6px] pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70 motion-safe:hover:gap-[20px] sm:mt-12"
          >
            <span>{linkLabel}</span>
            <ArrowRight />
          </SmartLink>
        )}
      </div>

      <div className="mx-auto mt-10 grid max-w-[1200px] grid-cols-1 gap-10 sm:mt-16 md:grid-cols-3 md:gap-8">
        {cards.map((card, i) => (
          <article key={i} className="group flex min-w-0 flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden">
              {card.image && (
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
              )}
            </div>
            <div className="mt-6 pl-[0.4em] text-[10px] uppercase tracking-[0.4em] text-clay">{card.area}</div>
            <h3 className="mt-3 font-serif text-[22px] font-normal leading-[1.2] text-taupe md:text-[26px]">{card.name}</h3>
            <p className="mt-2 max-w-[320px] text-[14px] font-light leading-[1.65] text-taupe/80">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EditorialSplit({ eyebrow, lead, text, linkLabel, linkTo, imageUrl, imageAlt }: {
  eyebrow: string;
  lead: string;
  text: string;
  linkLabel?: string;
  linkTo?: string;
  imageUrl: string;
  imageAlt: string;
}) {
  return (
    <section className="bg-background px-6 pt-[128px] sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="flex min-w-0 flex-col">
          {eyebrow && <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>}
          {lead && (
            <p className="mt-6 max-w-[520px] font-serif text-[28px] font-normal leading-[1.3] text-taupe sm:text-[32px]">{lead}</p>
          )}
          {text && <p className="mt-4 max-w-[460px] text-[14px] font-light leading-[1.75] text-taupe/80">{text}</p>}
          {linkLabel && linkTo && (
            <SmartLink
              to={linkTo}
              className="mt-12 inline-flex items-center gap-[14px] self-start border-b border-clay/55 pb-[6px] pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70"
            >
              <span>{linkLabel}</span>
              <ArrowRight />
            </SmartLink>
          )}
        </div>

        <div className="aspect-[1/0.88] w-full overflow-hidden lg:self-center">
          {imageUrl && (
            <img src={imageUrl} alt={imageAlt} loading="lazy" className="h-full w-full object-cover object-center" />
          )}
        </div>
      </div>
    </section>
  );
}

/** The careers heading breaks onto two lines from the sm breakpoint only. */
function responsiveLines(value: string): ReactNode {
  return value.split(/\r?\n/).map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br className="hidden sm:block" />}
      {i > 0 ? ` ${line}` : line}
    </Fragment>
  ));
}

export function CareersCallout({ imageUrl, imageAlt, eyebrow, heading, text, emailLabel, email, linkLabel, linkTo }: {
  imageUrl: string;
  imageAlt: string;
  eyebrow: string;
  heading: string;
  text: string;
  emailLabel?: string;
  email?: string;
  linkLabel?: string;
  linkTo?: string;
}) {
  const linkClass =
    "mt-[48px] inline-flex items-center gap-[14px] self-start border-b border-clay/55 pb-[6px] pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70";

  return (
    <section className="bg-background px-6 pb-[128px] pt-[128px] sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:flex-row md:gap-[96px]">
        <div className="aspect-[4/5] w-full min-w-0 flex-1 overflow-hidden md:aspect-auto md:h-auto">
          {imageUrl && (
            <img src={imageUrl} alt={imageAlt} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover object-center" />
          )}
        </div>

        <div className="flex max-w-[620px] min-w-0 flex-[1.4] flex-col">
          {eyebrow && <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>}
          {heading && (
            <h2 className="mt-6 font-serif text-[36px] font-normal leading-[1.15] text-taupe sm:text-[clamp(36px,4.1vw,52px)]">
              {responsiveLines(heading)}
            </h2>
          )}
          {text && <p className="mt-4 max-w-[500px] text-[15px] font-light leading-[1.75] text-taupe/85">{text}</p>}
          {emailLabel && <div className="mt-12 text-[14px] font-light leading-[1.6] text-taupe/80">{emailLabel}</div>}
          {email && (
            <a
              href={`mailto:${email}`}
              className="mt-2 self-start border-b border-clay/60 pb-[4px] font-serif text-[22px] font-normal leading-[1.2] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70 sm:text-[26px]"
            >
              {email}
            </a>
          )}
          {linkLabel && linkTo && (
            <SmartLink to={linkTo} className={linkClass}>
              <span>{linkLabel}</span>
              <ArrowRight />
            </SmartLink>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact and gift card                                                      */
/* -------------------------------------------------------------------------- */

export function ContactDetails({ eyebrow, heading, text, contactHeading, formEyebrow, formHeading }: {
  eyebrow: string;
  heading: string;
  text: string;
  contactHeading: string;
  formEyebrow: string;
  formHeading: string;
}) {
  const { contact } = useSite();

  return (
    <section className="px-6 py-20 text-taupe sm:px-10 sm:py-24 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="order-2 lg:order-1">
          {eyebrow && <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</p>}
          {heading && <h2 className="mt-6 max-w-[460px] font-serif text-[36px] font-normal leading-[1.15] sm:text-[48px]">{heading}</h2>}
          {text && <p className="mt-5 max-w-[430px] text-[15px] font-light leading-[1.75] text-taupe/85">{text}</p>}

          <div className="mt-12 grid gap-9">
            <div>
              {contactHeading && (
                <h3 className="pl-[0.32em] text-[10px] font-medium uppercase tracking-[0.32em] text-clay">{contactHeading}</h3>
              )}
              <div className="mt-4 flex flex-col items-start gap-2 text-[15px] font-light leading-[1.75]">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="border-b border-clay/55 pb-0.5 transition-colors hover:border-taupe">
                    {contact.email}
                  </a>
                )}
                {contact.phoneDisplay && (
                  <a href={`tel:${contact.phoneLink}`} className="transition-colors hover:text-umber">
                    {contact.phoneDisplay}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 border-b border-clay/30 pb-16 lg:order-2 lg:border-b-0 lg:border-l lg:pb-0 lg:pl-24">
          {formEyebrow && <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{formEyebrow}</p>}
          {formHeading && <h2 className="mt-6 font-serif text-[32px] font-normal leading-[1.15] sm:text-[40px]">{formHeading}</h2>}
          <div className="mt-9">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export function GiftCardSection({ eyebrow, heading, paragraphs, panelEyebrow, panelHeading, panelText, emailLabel, callLabel, emailSubject }: {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  panelEyebrow: string;
  panelHeading: string;
  panelText: string;
  emailLabel: string;
  callLabel: string;
  emailSubject: string;
}) {
  const { contact } = useSite();
  const mailto = contact.email
    ? `mailto:${contact.email}${emailSubject ? `?subject=${encodeURIComponent(emailSubject)}` : ""}`
    : "";
  const tel = contact.phoneLink ? `tel:${contact.phoneLink}` : "";

  return (
    <section className="px-6 py-20 text-taupe sm:px-10 sm:py-24 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-[1120px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div>
          {eyebrow && <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</p>}
          {heading && (
            <h2 className="mt-6 max-w-[620px] font-serif text-[38px] font-normal leading-[1.12] sm:text-[52px]">{heading}</h2>
          )}
          <div className="mt-7 max-w-[620px] space-y-5 text-[15px] font-light leading-[1.8] text-taupe/85 sm:text-[16px]">
            {paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
        </div>

        <div className="border-t border-clay/30 pt-10 lg:border-l lg:border-t-0 lg:pl-20 lg:pt-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-clay/45 text-clay" aria-hidden="true">
            <Gift className="h-5 w-5" strokeWidth={1.4} />
          </div>
          {panelEyebrow && (
            <p className="mt-7 pl-[0.35em] text-[10px] font-medium uppercase tracking-[0.35em] text-clay">{panelEyebrow}</p>
          )}
          {panelHeading && <h2 className="mt-5 font-serif text-[32px] font-normal leading-[1.15] sm:text-[40px]">{panelHeading}</h2>}
          {panelText && <p className="mt-5 max-w-[430px] text-[15px] font-light leading-[1.75] text-taupe/85">{panelText}</p>}
          <div className="mt-8 flex flex-col items-start gap-cta sm:flex-row sm:flex-wrap">
            {mailto && emailLabel && (
              <Button asChild className="h-12 rounded-cta bg-taupe px-6 text-[11px] font-medium uppercase tracking-[0.24em] text-pearl shadow-none hover:bg-umber">
                <a href={mailto}>
                  <Mail aria-hidden="true" />
                  {emailLabel}
                </a>
              </Button>
            )}
            {tel && callLabel && (
              <Button asChild variant="outline" className="h-12 rounded-cta border-clay/55 bg-transparent px-6 text-[11px] font-medium uppercase tracking-[0.24em] text-taupe shadow-none hover:bg-sand">
                <a href={tel}>
                  <Phone aria-hidden="true" />
                  {callLabel}
                </a>
              </Button>
            )}
          </div>
          <div className="mt-8 space-y-2 text-[15px] font-light leading-[1.7]">
            {mailto && (
              <a href={mailto} className="block underline decoration-clay/55 underline-offset-4 transition-colors hover:text-umber">
                {contact.email}
              </a>
            )}
            {tel && (
              <a href={tel} className="block transition-colors hover:text-umber">
                {contact.phoneDisplay}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Gallery                                                                    */
/* -------------------------------------------------------------------------- */

/** Page header for pages without a photo hero; the top padding clears the fixed navbar. */
export function PageIntro({ eyebrow, title, subtitle, text }: { eyebrow: string; title: string; subtitle: string; text: string }) {
  return (
    <div className="bg-linen pt-16 text-taupe sm:pt-20">
      <header className="mx-auto max-w-[780px] px-6 pb-12 pt-16 text-center sm:pb-16 sm:pt-24">
        {eyebrow && <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-clay">{eyebrow}</p>}
        {title && <h1 className="mt-5 font-serif text-[48px] font-normal leading-none sm:text-[70px]">{title}</h1>}
        {subtitle && (
          <p className="mx-auto mt-5 max-w-[540px] text-[17px] font-light leading-relaxed text-muted-taupe sm:text-[19px]">{subtitle}</p>
        )}
        {text && <p className="mx-auto mt-5 max-w-[600px] text-[15px] font-light leading-[1.8] text-muted-taupe">{text}</p>}
      </header>
    </div>
  );
}

type GalleryPhoto = { src: string; alt: string; shape: "small" | "feature" | "portrait" | "wide" };

const SHAPE_CLASS: Record<GalleryPhoto["shape"], string> = {
  feature: "col-span-2 row-span-2 aspect-square md:aspect-auto",
  portrait: "row-span-2 aspect-[1/2] md:aspect-auto",
  wide: "col-span-2 aspect-[2/1] md:aspect-auto",
  small: "aspect-square md:aspect-auto",
};

function Arrow({ direction }: { direction: "left" | "right" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6"><path d={direction === "left" ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"} /></svg>;
}

export function GalleryGrid({ ariaLabel, photos }: { ariaLabel: string; photos: GalleryPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : photos[active];
  const count = photos.length;

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => current === null ? null : (current + 1) % count);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? null : (current - 1 + count) % count);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, count]);

  return (
    <div className="bg-linen text-taupe">
      <section aria-label={ariaLabel} className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-8 sm:pb-20 lg:pb-24 xl:px-10">
        <div className="grid grid-flow-row-dense grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:auto-rows-[190px] lg:auto-rows-[235px]">
          {photos.map((photo, index) => (
            <Button
              key={`${photo.alt}-${index}`}
              type="button"
              variant="ghost"
              onClick={() => setActive(index)}
              aria-label={`${index + 1} / ${count}: ${photo.alt}`}
              className={`group relative block h-auto min-w-0 overflow-hidden rounded-[4px] bg-sand p-0 shadow-none hover:bg-sand focus-visible:ring-2 focus-visible:ring-clay ${SHAPE_CLASS[photo.shape]}`}
            >
              <img src={photo.src} alt={photo.alt} loading={index < 5 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none" />
              <span className="sr-only">{photo.alt}</span>
            </Button>
          ))}
        </div>
      </section>

      {selected && active !== null && (
        <div role="dialog" aria-modal="true" aria-label={ariaLabel} className="fixed inset-0 z-[60] flex flex-col bg-umber text-linen">
          <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
            <span className="text-[12px] uppercase tracking-[0.24em]">{active + 1} / {count}</span>
            <Button type="button" variant="ghost" size="icon" autoFocus aria-label="Close" /* content-exempt: control label */ onClick={() => setActive(null)} className="h-11 w-11 rounded-none text-linen hover:bg-linen/10 hover:text-linen">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6"><path d="M5 5l14 14M19 5 5 19" /></svg>
            </Button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 sm:px-24">
            <Button type="button" variant="ghost" size="icon" aria-label="Previous" /* content-exempt: control label */ onClick={() => setActive((active - 1 + count) % count)} className="absolute left-2 z-10 h-11 w-11 rounded-none text-linen hover:bg-linen/10 hover:text-linen sm:left-7"><Arrow direction="left" /></Button>
            <img key={active} src={selected.src} alt={selected.alt} className="max-h-full max-w-full object-contain" />
            <Button type="button" variant="ghost" size="icon" aria-label="Next" /* content-exempt: control label */ onClick={() => setActive((active + 1) % count)} className="absolute right-2 z-10 h-11 w-11 rounded-none text-linen hover:bg-linen/10 hover:text-linen sm:right-7"><Arrow direction="right" /></Button>
          </div>
          <p className="shrink-0 px-4 py-5 text-center text-[13px] font-light tracking-[0.03em] text-linen/80">{selected.alt}</p>
        </div>
      )}
    </div>
  );
}

/** Closing call to action with the navbar's booking buttons. */
export function BookingCta({ eyebrow, heading, text }: { eyebrow: string; heading: string; text: string }) {
  return (
    <div className="bg-linen text-taupe">
      <section className="mx-auto max-w-[780px] px-6 pb-20 text-center sm:pb-24 lg:pb-32">
        {eyebrow && <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-clay">{eyebrow}</p>}
        {heading && <h2 className="mt-5 font-serif text-[34px] font-normal leading-[1.15] sm:text-[46px]">{heading}</h2>}
        {text && <p className="mx-auto mt-5 max-w-[600px] text-[16px] font-light leading-[1.8] text-muted-taupe">{text}</p>}
        <div className="mt-9 flex flex-wrap justify-center gap-cta">
          <BookActions />
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Locations                                                                  */
/* -------------------------------------------------------------------------- */

type MapLocation = { number: string; area: string; address: string; descriptor: string; x: number; y: number; labelY: number };

/** Stylised Gothenburg map. The artwork is fixed; marker positions and labels come from the CMS. */
function WowMap({ label, locations, active, setActive }: {
  label: string;
  locations: MapLocation[];
  active: number | null;
  setActive: (i: number | null) => void;
}) {
  return (
    <div role="img" aria-label={label} className="overflow-hidden rounded shadow-accommodation bg-map-land">
      <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
        <rect width="500" height="400" className="fill-map-land" />

        <path d="M-10 20 Q 120 40 220 30 Q 340 20 500 45 L 510 0 L -10 0 Z" className="fill-map-water" opacity="0.35" />
        <path d="M-10 20 Q 120 40 220 30 Q 340 20 500 45" fill="none" className="stroke-map-water" strokeWidth="0.5" opacity="0.4" />

        <ellipse cx="90" cy="230" rx="70" ry="45" className="fill-map-park" opacity="0.45" />
        <ellipse cx="440" cy="290" rx="75" ry="55" className="fill-map-park" opacity="0.45" />
        <ellipse cx="210" cy="370" rx="55" ry="30" className="fill-map-park" opacity="0.4" />

        <path d="M 0 170 Q 130 150 260 175 Q 370 195 500 180" className="stroke-tile" strokeWidth="2" fill="none" />
        <path d="M 220 40 Q 235 200 260 400" className="stroke-tile" strokeWidth="1.5" fill="none" />
        <path d="M 120 100 L 430 320" className="stroke-tile" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M 350 80 L 200 400" className="stroke-tile" strokeWidth="1" fill="none" opacity="0.45" />

        <g transform="translate(465 65)" opacity="0.5">
          <circle r="10" fill="none" className="stroke-clay" strokeWidth="0.5" />
          <path d="M0 -7 L2 0 L0 7 L-2 0 Z" className="fill-clay" />
          <text x="0" y="-14" textAnchor="middle" fontFamily="Barlow Condensed" fontSize="7" letterSpacing="1" className="fill-clay">
            N{/* content-exempt: compass rose glyph in the map artwork */}
          </text>
        </g>

        {locations.map((loc, i) => {
          const isActive = active === i;
          return (
            <g
              key={i}
              className="wow-marker"
              transform={`translate(${loc.x} ${loc.y})`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(isActive ? null : i)}
            >
              <circle r={isActive ? 30 : 0} className="fill-taupe" opacity={isActive ? 0.12 : 0} style={{ transition: "all 220ms ease" }} />
              <circle
                r={isActive ? 20 : 17}
                className={isActive ? "fill-taupe stroke-taupe" : "fill-pearl stroke-clay"}
                strokeWidth="1.5"
                style={{ transition: "all 220ms ease" }}
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontFamily="Barlow Condensed"
                fontSize="11"
                fontWeight="500"
                letterSpacing="0.8"
                className={isActive ? "fill-pearl" : "fill-taupe"}
                style={{ transition: "all 220ms ease" }}
              >
                {loc.number}
              </text>
              <text
                className="wow-marker-label"
                x="0"
                y={loc.labelY}
                textAnchor="middle"
                opacity={isActive ? 1 : 0.7}
                fill={isActive ? "var(--color-taupe)" : "var(--color-clay)"}
              >
                {loc.area}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function LocationsMap({ eyebrow, heading, mapLabel, itemLabel, locations, ctaLabel, ctaTo }: {
  eyebrow: string;
  heading: string;
  mapLabel: string;
  itemLabel: string;
  locations: MapLocation[];
  ctaLabel?: string;
  ctaTo?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section aria-labelledby="locations-overview-heading" className="bg-sand px-6 pb-16 pt-24 sm:px-14 md:px-20 md:pt-32">
      <div className="flex flex-col items-center text-center">
        {eyebrow && <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">{eyebrow}</p>}
        {heading && (
          <h2
            id="locations-overview-heading"
            className="mt-6 font-serif text-[34px] font-normal leading-[1.15] text-taupe sm:text-[clamp(34px,3.75vw,48px)]"
          >
            {heading}
          </h2>
        )}
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-[1200px] grid-cols-1 items-stretch gap-10 md:mt-16 md:grid-cols-[1.15fr_1fr] md:gap-14">
        <WowMap label={mapLabel} locations={locations} active={active} setActive={setActive} />

        <div className="flex flex-col">
          <ul aria-label={heading} className="m-0 flex list-none flex-col p-0">
            {locations.map((loc, i) => {
              const isActive = active === i;
              return (
                <li
                  key={i}
                  tabIndex={0}
                  className="wow-loc-item cursor-pointer px-6 py-[22px] pl-6"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid oklch(0.62 0.020 70 / 0.22)",
                    background: isActive ? "oklch(0.935 0.010 78 / 0.55)" : "transparent",
                    borderLeft: `2px solid ${isActive ? "var(--color-taupe)" : "transparent"}`,
                  }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                >
                  <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">
                    {[itemLabel, loc.number].filter(Boolean).join(" ")}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-baseline gap-3.5">
                    <h3 className="m-0 font-serif text-[24px] font-normal leading-[1.15] text-taupe sm:text-[26px]">{loc.area}</h3>
                    <span className="text-[13px] font-light text-clay">{loc.address}</span>
                  </div>
                  <p className="mt-1 max-w-[440px] text-[14px] font-light leading-[1.65] text-taupe/85">{loc.descriptor}</p>
                </li>
              );
            })}
          </ul>
          {ctaLabel && ctaTo && (
            <SmartLink
              to={ctaTo}
              className="wow-cta-primary ml-0 mt-7 inline-flex h-12 items-center gap-3.5 self-start rounded-cta bg-taupe px-[30px] text-[11px] font-medium uppercase tracking-[0.28em] text-pearl transition-colors hover:bg-umber md:ml-6"
            >
              <span>{ctaLabel}</span>
            </SmartLink>
          )}
        </div>
      </div>
    </section>
  );
}

export function StatementBand({ lead, statement }: { lead: string; statement: string }) {
  return (
    <section aria-label={lead.split(/\r?\n/)[0]} className="bg-deep-taupe px-6 py-20 text-linen sm:px-14 md:px-20 md:py-24">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col md:pl-10">
        {lead && <p className="m-0 font-serif text-[20px] italic leading-[1.25] md:text-[24px]">{withLineBreaks(lead)}</p>}
        <span aria-hidden="true" className="mt-10 block h-px w-14 bg-linen/50" />
        {statement && (
          <p className="mt-10 max-w-[980px] font-serif text-[32px] italic leading-[1.28] sm:text-[40px] md:text-[52px]">{statement}</p>
        )}
      </div>
    </section>
  );
}

const GETTING_AROUND_BORDERS = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t md:border-t-0 md:border-l",
  "border-t md:border-t-0 sm:border-l",
];

export function GettingAround({ eyebrow, heading, text, columns }: {
  eyebrow: string;
  heading: string;
  text: string;
  columns: { value: string; title: string; body: string }[];
}) {
  return (
    <section aria-labelledby="getting-around-heading" className="bg-sand px-6 py-20 sm:px-14 md:px-20 md:py-32">
      <div className="flex flex-col items-center text-center">
        {eyebrow && <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">{eyebrow}</p>}
        {heading && (
          <h2 id="getting-around-heading" className="mt-6 font-serif text-[34px] font-normal leading-[1.15] text-taupe sm:text-[44px] lg:text-[52px]">
            {heading}
          </h2>
        )}
        {text && <p className="mt-4 max-w-[820px] text-[15px] font-light leading-[1.75] text-taupe/85">{text}</p>}
      </div>

      <ul
        aria-label={heading}
        className="mx-auto mt-12 grid w-full max-w-[1200px] list-none grid-cols-1 p-0 sm:mt-16 sm:grid-cols-2 md:mt-16 md:grid-cols-4"
      >
        {columns.map((col, index) => (
          <li
            key={index}
            className={`wow-ga-col flex flex-col items-center border-clay/[0.22] px-7 py-10 text-center sm:py-12 md:py-0 ${GETTING_AROUND_BORDERS[index] ?? GETTING_AROUND_BORDERS[3]}`}
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
