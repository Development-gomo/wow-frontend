"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSite, useLocalizeHref, useA11y } from "@/components/cms/site-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { MenuItem } from "@/lib/cms/globals";

/*
 * Header and slide-out menu.
 *
 * Links come from WordPress › Appearance → Menus ("Header" and "Full menu";
 * the full menu's top-level items are the group headings). Brand and the two
 * booking buttons come from Site settings. Only presentation lives here.
 */

function MenuLink({ item, onNavigate }: { item: MenuItem; onNavigate: () => void }) {
  const localize = useLocalizeHref();
  const className = "font-medium uppercase tracking-[0.2em] text-linen/80 transition-colors hover:text-linen";
  return item.href.includes("#") ? (
    <a href={localize(item.href)} onClick={onNavigate} className={className}>{item.label}</a>
  ) : (
    <Link to={item.href} onClick={onNavigate} className={className}>{item.label}</Link>
  );
}

export function SiteNavbar() {
  const a11y = useA11y();
  const { brand, booking, menus } = useSite();
  const desktopLinks = menus.header;
  const menuGroups = menus.menu;
  const homeLabel = `${[brand.name, brand.tagline].filter(Boolean).join(" ")} — ${a11y.home}`;

  const [menuMounted, setMenuMounted] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(menuGroups[0]?.label ?? null);

  const openMenu = () => {
    setMenuMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setMenuVisible(true)));
  };

  const closeMenu = () => {
    setMenuVisible(false);
    window.setTimeout(() => setMenuMounted(false), 350);
  };

  useEffect(() => {
    if (!menuMounted) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuMounted]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-40 border-b border-pearl/40 bg-sand/45 text-taupe shadow-[0_1px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-5 md:gap-8 px-3 sm:h-20 sm:px-4 md:gap-3 md:px-6 xl:px-10">
        <div className="flex shrink-0 items-center gap-5 md:gap-8">
          <Link to="/" aria-label={homeLabel} className="flex shrink-0 flex-col items-start leading-none text-taupe">
            <span className="pl-[0.18em] font-serif tracking-[0.18em]" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, lineHeight: "28px", fontWeight: 500, fontStyle: "normal", color: "lab(28.0658 2.08874 4.94074)" }}>{brand.name}</span>
            <span className="mt-[6px] pl-[0.32em] uppercase tracking-[0.32em]" style={{ fontFamily: '"Barlow Condensed", Inter, sans-serif', fontSize: 8, lineHeight: "8px", fontWeight: 300, fontStyle: "normal", color: "oklab(0.38 0.00591253 0.0126966 / 0.75)" }}>{brand.tagline}</span>
          </Link>
          <Button type="button" variant="ghost" size="icon" aria-label={a11y.openMenu} aria-expanded={menuMounted} aria-controls="wow-full-menu" onClick={openMenu} className="h-11 w-6 shrink-0 rounded-none p-0 text-taupe hover:bg-transparent hover:text-umber">
            <svg viewBox="2 0 24 22" width="24" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="butt" aria-hidden="true" className="!h-[22px] !w-6"><path d="M2 4H26 M2 11H26 M2 18H26" /></svg>
          </Button>
        </div>

        <nav aria-label={a11y.primaryNavigation} className="hidden items-center gap-5 lg:flex xl:gap-7">
          {desktopLinks.map((item) => (
            <Link
              key={item.id ?? item.label}
              to={item.href}
              className="whitespace-nowrap text-[10px] font-normal uppercase tracking-[0.14em] text-taupe transition-colors duration-200 hover:text-umber xl:text-[11px] xl:tracking-[0.18em]"
              activeProps={{ className: "text-umber" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-cta">
          <LanguageSwitcher className="mr-2 hidden sm:flex" />
          <Button asChild className="h-9 rounded-cta bg-taupe px-2 text-[9px] font-medium uppercase tracking-[0.04em] text-ivory shadow-none transition-colors duration-200 hover:bg-umber sm:h-11 sm:px-5 sm:text-[11px] sm:tracking-[0.24em] xl:px-7">
            <Link to={booking.roomTo}>{booking.roomLabel}</Link>
          </Button>
          <Button asChild className="h-9 rounded-cta bg-taupe/65 px-2 text-[9px] font-medium uppercase tracking-[0.04em] text-ivory shadow-none transition-colors duration-200 hover:bg-taupe/85 sm:h-11 sm:px-5 sm:text-[11px] sm:tracking-[0.24em] xl:px-7">
            <Link to={booking.apartmentTo}>{booking.apartmentLabel}</Link>
          </Button>
        </div>
      </div>

    </header>
    {menuMounted && (
      <div className="fixed inset-0 z-50" id="wow-full-menu" role="dialog" aria-modal="true" aria-label={a11y.fullMenu} aria-hidden={!menuVisible}>
        <div className={`absolute inset-0 bg-umber/55 backdrop-blur-sm transition-opacity duration-300 ease-out ${menuVisible ? "opacity-100" : "opacity-0"}`} onClick={closeMenu} aria-hidden="true" />
        <div className={`absolute inset-y-0 left-0 flex w-[min(85vw,340px)] flex-col overflow-y-auto bg-taupe px-7 pb-5 pt-5 text-linen shadow-2xl transition-transform duration-300 ease-out sm:px-9 [@media(max-height:604px)]:pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${menuVisible ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-start justify-between gap-5">
            <Link to="/" onClick={closeMenu} aria-label={homeLabel} className="flex flex-col leading-none text-linen">
              <span className="font-serif text-[28px]">{brand.name}</span>
              <span className="mt-1 text-[8px] uppercase tracking-[0.25em]">{brand.tagline}</span>
            </Link>
            <LanguageSwitcher dark className="ml-auto flex h-10 sm:hidden" />
            <Button type="button" variant="ghost" size="icon" aria-label={a11y.closeMenu} onClick={closeMenu} className="h-10 w-10 shrink-0 text-linen hover:bg-linen/10 hover:text-linen">
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true"><path d="M4 4L20 20 M20 4L4 20" /></svg>
            </Button>
          </div>
          <nav aria-label={a11y.menu} className="flex min-h-0 flex-1 flex-col pt-10">
            <div className="flex flex-col">
              {menuGroups.map((group) => {
                const isOpen = openGroup === group.label;
                const panelId = `menu-group-${group.label.toLowerCase().replace(/\s+/g, "-")}`;
                const links = group.children ?? [];
                return (
                  <div key={group.id ?? group.label}>
                    <h3 className="m-0">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenGroup(isOpen ? null : group.label)}
                        className="flex w-full cursor-pointer items-center justify-between py-[8px] text-left uppercase tracking-[0.2em] text-linen"
                      >
                        {group.label}
                        {/* Same width as the close button, so the chevron centres under the X. */}
                        <span className="flex w-10 shrink-0 justify-center">
                          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`text-linen/80 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}><path d="M3 6l5 5 5-5" /></svg>
                        </span>
                      </button>
                    </h3>
                    <div id={panelId} className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <ul inert={!isOpen} className="min-h-0 list-none space-y-[10px] overflow-hidden p-0 pl-1">
                        {links.map((item, i) => (
                          <li key={item.id ?? item.label} className={`${i === 0 ? "pt-2.5" : ""} ${i === links.length - 1 ? "pb-6" : ""}`}><MenuLink item={item} onNavigate={closeMenu} /></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-auto pt-4 [@media(max-height:604px)]:pt-3 [@media(min-height:800px)]:pt-5">
              <div className="flex flex-col gap-1.5">
                <Button asChild className="h-12 border border-linen/25 rounded-cta bg-umber/25 px-2 text-[9px] font-medium uppercase tracking-[0.04em] text-ivory shadow-none transition-colors duration-200 hover:bg-taupe sm:h-12 sm:px-5 sm:text-[11px] sm:tracking-[0.24em] xl:px-7">
                  <Link to={booking.roomTo} onClick={closeMenu}>{booking.roomLabel}</Link>
                </Button>
                <Button asChild className="h-12 w-full rounded-cta border border-linen/25 bg-taupe/65 px-5 text-[10px] font-medium uppercase tracking-[0.24em] text-ivory shadow-none transition-colors duration-200 hover:bg-umber/25">
                  <Link to={booking.apartmentTo} onClick={closeMenu}>{booking.apartmentLabel}</Link>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    )}
    </>
  );
}
