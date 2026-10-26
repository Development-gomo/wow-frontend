import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Gift, Mail, Phone } from "lucide-react";

import { AboutStory as StorySection } from "@/components/about-story";
import { InfoColumns } from "@/components/info-columns";
import { ResponsibleHosting } from "@/components/responsible-hosting";
import { BookActions } from "@/components/book-actions";
import { ContactForm } from "@/components/contact-form";
import type { Globals } from "@/lib/cms/globals";
import { Button } from "@/components/ui/button";
import { WorkWithUs } from "@/components/work-with-us";
import { cn } from "@/lib/utils";

import { withLineBreaks } from "./icon-map";
import { SmartLink } from "./smart-link";
import { CmsImage } from "@/components/cms-image";

/*
 * Sections for the pages whose bodies used to be one-off markup: About us,
 * Contact, Gift card, Gallery and Locations. Each is the original markup with
 * its copy, images and links swapped for props from the matching page-builder
 * layout in WordPress. Empty fields render nothing.
 */

const ArrowRight = () => (
  <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    <path d="M1 6 H14 M10 2 L14 6 L10 10" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/* About us                                                                   */
/* -------------------------------------------------------------------------- */

export function AboutStory({ imageUrl, imageAlt, captionName, captionRole, eyebrow, lead, paragraphs, className }: {
  imageUrl: string;
  imageAlt: string;
  captionName: string;
  captionRole: string;
  eyebrow: string;
  lead: string;
  paragraphs: string[];
  className?: string;
}) {
  return (
    <StorySection
      image={imageUrl}
      imageAlt={imageAlt}
      eyebrow={eyebrow}
      lead={lead}
      paragraphs={paragraphs}
      caption={captionName || captionRole ? { left: captionName, right: captionRole } : undefined}
      className={className}
    />
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

export function LocationCards({ eyebrow, heading, description, linkLabel, linkTo, cards, className }: {
  eyebrow: string;
  heading: string;
  description?: string;
  linkLabel?: string;
  linkTo?: string;
  cards: { area: string; name: string; image: string; imageAlt: string; description: string }[];
  className?: string;
}) {
  return (
    <section className={cn("bg-background px-6 pt-20 sm:px-10 sm:pt-24 lg:px-20 lg:pt-32", className)}>
      <div className="flex flex-col items-center text-center">
        {eyebrow && <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>}
        {heading && (
          <h2 className="mt-6 font-serif text-[34px] font-normal leading-[1.15] text-taupe sm:text-[clamp(34px,3.75vw,48px)]">{heading}</h2>
        )}
        {description ? <p className="mt-4 max-w-[640px] text-title-subtext text-taupe/85">{description}</p> : null}
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
                <CmsImage sizes="(min-width: 1024px) 33vw, 100vw"
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

/** Text left, photo right (About "Responsible hosting", Sustainability "Thoughtful living"). */
export function EditorialSplit({ eyebrow, lead, text, linkLabel, linkTo, imageUrl, imageAlt, className }: {
  eyebrow: string;
  lead: string;
  text: string;
  linkLabel?: string;
  linkTo?: string;
  imageUrl: string;
  imageAlt: string;
  className?: string;
}) {
  return (
    <ResponsibleHosting
      eyebrow={eyebrow}
      lead={lead}
      description={text}
      ctaLabel={linkLabel}
      ctaTo={linkTo}
      image={imageUrl}
      imageAlt={imageAlt}
      className={className}
    />
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
  const internal = Boolean(linkTo && linkTo.startsWith("/"));
  return (
    <WorkWithUs
      image={imageUrl}
      imageAlt={imageAlt}
      eyebrow={eyebrow}
      title={responsiveLines(heading)}
      description={text}
      contactLabel={emailLabel}
      email={email}
      ctaLabel={linkLabel && linkTo ? linkLabel : undefined}
      ctaTo={internal ? linkTo : undefined}
      ctaHref={internal ? undefined : linkTo}
    />
  );
}

/** Eyebrow and heading on the left, a lead and body paragraphs on the right. */
export function SplitIntro({ eyebrow, heading, lead, paragraphs, className }: {
  eyebrow: string;
  heading: string;
  lead?: string;
  paragraphs: string[];
  className?: string;
}) {
  return (
    <section className={cn("px-6 py-32 text-taupe md:px-10 lg:px-20", className)} aria-label={heading || undefined}>
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:gap-24">
        <div>
          {eyebrow && <p className="text-eyebrow font-light uppercase text-clay tracking-[0.3em]">{eyebrow}</p>}
          {heading && <h2 className="mt-6 font-serif text-heading-two font-light">{heading}</h2>}
        </div>
        <div className="space-y-5 font-sans font-light">
          {lead && <p className="text-body">{lead}</p>}
          {paragraphs.map((paragraph, i) => <p key={i} className="text-body-copy">{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}

/** The shared "Meet Anna" section; its content is edited once in Site settings › Guest contact. */
export function GuestContact({ className, guestContact: g }: { className?: string; guestContact: Globals["guestContact"] }) {
  const value = (key: string) => (typeof g[key] === "string" ? (g[key] as string) : "");

  if (!value("imageUrl") && !value("title")) return null;

  return (
    <WorkWithUs
      image={value("imageUrl")}
      imageAlt={value("imageAlt")}
      imageClassName={value("imageClassName") || undefined}
      eyebrow={value("eyebrow")}
      title={value("title")}
      quote={value("quote") || undefined}
      description={value("description")}
      contactLabel={value("emailLabel") || undefined}
      email={value("email") || undefined}
      phoneLabel={value("phoneLabel") || undefined}
      phone={value("phone") || undefined}
      phoneHref={value("phoneLink") ? `tel:${value("phoneLink")}` : undefined}
      className={className}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Contact and gift card                                                      */
/* -------------------------------------------------------------------------- */

export function ContactDetails({ eyebrow, heading, text, contactHeading, contacts, formEyebrow, formHeading, contact }: {
  eyebrow: string;
  heading: string;
  text: string;
  contactHeading: string;
  contacts?: { heading: string; name: string; email: string }[];
  formEyebrow: string;
  formHeading: string;
  contact: Globals["contact"];
}) {

  return (
    <section className="px-6 pb-0 pt-20 text-taupe sm:px-10 sm:pt-24 lg:px-20 lg:pt-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="order-2 lg:order-1">
          {eyebrow && <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</p>}
          {heading && <h2 className="mt-6 max-w-[460px] font-serif text-[36px] font-normal leading-[1.15] sm:text-[48px]">{heading}</h2>}
          {text && <p className="mt-5 max-w-[430px] text-[15px] font-light leading-[1.75] text-taupe/85">{text}</p>}

          <div className="mt-12 grid gap-9">
            {contacts && contacts.length > 0 ? (
              contacts.map((c) => (
                <div key={c.heading || c.email}>
                  {c.heading && <h3 className="pl-[0.32em] text-[12px] font-medium uppercase tracking-[0.32em] text-clay">{c.heading}</h3>}
                  <div className="mt-4 flex flex-col items-start gap-2 text-[15px] font-light leading-[1.75]">
                    {c.name && <span>{c.name}</span>}
                    {c.email && (
                      <a href={`mailto:${c.email}`} className="border-b border-clay/55 pb-0.5 transition-colors hover:border-taupe">
                        {c.email}
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>
                {contactHeading && (
                  <h3 className="pl-[0.32em] text-[12px] font-medium uppercase tracking-[0.32em] text-clay">{contactHeading}</h3>
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
            )}
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

export function GiftCardSection({ eyebrow, heading, paragraphs, panelEyebrow, panelHeading, panelText, emailLabel, callLabel, emailSubject, contact }: {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  panelEyebrow: string;
  panelHeading: string;
  panelText: string;
  emailLabel: string;
  callLabel: string;
  emailSubject: string;
  contact: Globals["contact"];
}) {
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
      <header className="mx-auto max-w-[780px] px-6 pt-16 text-center sm:pt-24">
        {eyebrow && <p className="font-medium uppercase tracking-[0.32em] text-clay" style={{ fontSize: 12 }}>{eyebrow}</p>}
        {title && <h1 className="mt-6 font-serif text-[48px] font-normal leading-none sm:text-[70px]">{title}</h1>}
        {subtitle && (
          <p className="mx-auto mt-4 max-w-[540px] text-[17px] font-light leading-relaxed text-muted-taupe sm:text-[19px]">{subtitle}</p>
        )}
        {text && <p className="mx-auto mt-5 max-w-[600px] text-[15px] font-light leading-[1.8] text-muted-taupe">{text}</p>}
      </header>
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

/** Centred intro with up to four divided figure columns (Locations "Getting around", Offers "How to claim"). */
export function GettingAround({ headingId, eyebrow, heading, text, columns, listLabel, className }: {
  headingId: string;
  eyebrow: string;
  heading: string;
  text: string;
  columns: { value: string; title: string; body: string }[];
  listLabel?: string;
  className?: string;
}) {
  return (
    <InfoColumns
      id={headingId}
      eyebrow={eyebrow}
      title={heading}
      description={text}
      items={columns}
      listLabel={listLabel || heading}
      className={className || undefined}
    />
  );
}
