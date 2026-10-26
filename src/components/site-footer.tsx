import { Fragment } from "react";
import { Link } from "@tanstack/react-router";

import { FooterNewsletter } from "@/components/footer-newsletter";
import { text, type Globals, type MenuItem } from "@/lib/cms/globals";
import { localizeHref, type Lang } from "@/lib/i18n";

/*
 * Footer.
 *
 * Link columns come from WordPress › Appearance → Menus › Footer (top-level
 * items are the column headings). Contact details, social links, newsletter
 * copy and the copyright line come from Site settings. Only presentation and
 * the social icon artwork live here.
 */

/** Server-rendered; site settings and the language come from the layout. */
export function SiteFooter({ site, lang }: { site: Globals; lang: Lang }) {
  const { brand, contact, footer, newsletter, menus } = site;
  return (
    <footer id="kontakt" className="bg-umber px-6 pb-4 pt-16 text-linen md:px-10 xl:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className={footerGridClass}>
          {menus.footer.map((column) => (
            <FCol key={column.id ?? column.label} title={column.label}>
              {(column.children ?? []).map((item) => <FooterLink key={item.id ?? item.label} item={item} lang={lang} />)}
            </FCol>
          ))}
          <FCol title={footer.contactHeading}>
            <li className="font-light leading-[1.75] text-linen/80">
              <span className="mb-3 block pl-[0.32em] text-[10px] font-normal uppercase tracking-[0.32em] text-linen/55">{footer.officeLabel}</span>
              <address className="not-italic">
                {/* "Company, street" on the first line; postcode and phone on the second. */}
                {[contact.companyName, contact.address[0]].filter(Boolean).join(", ")}
                {(contact.address.length > 0 || contact.companyName) && <br />}
                {contact.address.slice(1).join(", ")}
                {contact.phoneDisplay && (
                  <>
                    {contact.address.length > 1 ? " ·" : null}
                    <a href={`tel:${contact.phoneLink}`} className="transition-colors duration-200 hover:text-linen">{contact.phoneDisplay}</a>
                  </>
                )}
              </address>
            </li>
            <li className="mt-6 font-light leading-[1.75] text-linen/80">
              <span className="mb-3 block pl-[0.32em] text-[10px] font-normal uppercase tracking-[0.32em] text-linen/55">{footer.reservationLabel}</span>
              {contact.reservationContact}<br />
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="border-b border-linen/45 pb-0.5 transition-colors duration-200 hover:border-linen">{contact.email}</a>
              )}
            </li>
          </FCol>
        </div>

        <div className={`mt-10 ${footerGridClass}`}>
          <div id="newsletter" className="col-span-2 max-w-md scroll-mt-24 md:col-span-3 lg:col-span-4">
            <h3 className="font-serif text-[22px] font-normal">{text(newsletter, "heading")}</h3>
            <p className="mt-4 text-[13px] font-light leading-[1.65] text-linen/75">{text(newsletter, "text")}</p>
            <FooterNewsletter newsletter={newsletter} />
          </div>
          {/* Same column as Contact Us at every breakpoint, so both left edges line up. */}
          <div className="col-span-2 md:col-span-1 md:col-start-2 lg:col-start-5">
            <h3 className="font-serif text-[22px] font-normal">{footer.socialHeading}</h3>
            <ul aria-label={footer.socialHeading} className="mt-4 flex gap-3">
              {footer.social.map(({ network, label, url }) => {
                const icon = SOCIAL_ICONS[network];
                if (!icon) return null;
                const className = "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-linen/30 text-linen/80 transition-colors duration-200 hover:border-linen/60 hover:text-linen";
                const svg = <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">{icon}</svg>;
                return (
                  <li key={network}>
                    {url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={className}>{svg}</a>
                    ) : (
                      <span aria-label={label} title={label} className={className}>{svg}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-linen/20 pt-4 md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-1 leading-none">
            <span className="font-serif text-[22.4px] tracking-[0.06em]">{brand.name}</span>
            {/* Inline size: the global uppercase-eyebrow rule would otherwise force 12px. */}
            <span className="pl-[0.4em] uppercase tracking-[0.4em] text-linen/60" style={{ fontSize: 8.4, lineHeight: 1 }}>{brand.tagline}</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-linen/55">
            {footer.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-serif text-[22px] font-normal text-linen">{title}</h3>
      <ul className="space-y-[0.75] text-[14px]">{children}</ul>
    </div>
  );
}

const footerGridClass = "grid grid-cols-2 items-start gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1.6fr] lg:gap-x-12";

/** Icon artwork per network; which networks appear, and their links, come from the CMS. */
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  facebook: <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />,
  instagram: <path fillRule="evenodd" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.5-3.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />,
  linkedin: <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />,
};

const footerLinkClass = "font-light text-linen/80 transition-colors duration-200 hover:text-linen focus-visible:outline-offset-4";

/** In-page anchors and placeholders render as plain links; routes use the router. */
function FooterLink({ item, lang }: { item: MenuItem; lang: Lang }) {
  return (
    <li>
      {item.href.includes("#") ? (
        <a href={localizeHref(item.href, lang)} className={footerLinkClass}>{item.label}</a>
      ) : (
        <Link to={item.href} className={footerLinkClass}>{item.label}</Link>
      )}
    </li>
  );
}
