"use client";

import type { Section, ValidSection } from "@/lib/cms/schema";

import { AccommodationListing, type Accommodation } from "@/components/accommodation-listing";
import { EnquiryForm } from "@/components/enquiry-form";
import { ExternalGuideCallout } from "@/components/external-guide-callout";
import { FaqSection } from "@/components/faq-section";
import { GuestExperiences } from "@/components/guest-experiences";
import { IncludedBenefits } from "@/components/included-benefits";
import { NeighbourhoodExplorer } from "@/components/neighbourhood-explorer";
import { PageHero } from "@/components/page-hero";
import { RelocationFirms } from "@/components/relocation-firms";
import { RoomDetailHero } from "@/components/room-detail-hero";
import { RoomInformation } from "@/components/room-information";
import { RoomVariations } from "@/components/room-variations";
import { SimilarRooms } from "@/components/similar-rooms";
import { StatsBand } from "@/components/stats-band";
import { StayCtaBanner } from "@/components/stay-cta-banner";
import { StayIntro } from "@/components/stay-intro";
import { WelcomingLocations } from "@/components/welcoming-locations";
import { WhyWow } from "@/components/why-wow";

import {
  HomeAccommodationTabs,
  HomeGallery,
  HomeHero,
  HomeIntro,
  ProcessStepsSection,
  SirvoyBookingSection,
} from "./home-sections";
import { lucideIcon, whyWowIcon, withLineBreaks } from "./icon-map";
import {
  AboutStory,
  BookingCta,
  CareersCallout,
  ContactDetails,
  EditorialSplit,
  GalleryGrid,
  GettingAround,
  GiftCardSection,
  LocationCards,
  LocationsMap,
  PageIntro,
  QuoteBand,
  StatementBand,
} from "./page-sections";

/**
 * Renders the ordered sections a page returns from the CMS.
 *
 * Every branch hands the stored props straight to the component that already
 * existed before the CMS, so the markup is untouched. The only work done here
 * is turning JSON-safe values (icon keys, newline-separated headings) back into
 * the React values those components expect.
 */

/** A section type the frontend does not know how to render. */
function UnknownSection({ section }: { section: Section }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="border-2 border-dashed border-destructive/50 bg-destructive/5 p-6 text-center text-sm text-destructive">
      <strong>CMS section not rendered:</strong> {section.type}{/* content-exempt: development-only diagnostic, hidden in production */}
      {!section.valid && <> — {section.reason}</>}
    </div>
  );
}

function renderSection(section: ValidSection) {
  switch (section.type) {
    case "hero_video":
      return <HomeHero {...section.props} />;

    case "intro_stats":
      return <HomeIntro {...section.props} />;

    case "gallery_marquee":
      return <HomeGallery {...section.props} />;

    case "accommodation_tabs": {
      const p = section.props;
      return (
        <HomeAccommodationTabs
          {...p}
          rooms={p.rooms as Accommodation[]}
          apartments={p.apartments as Accommodation[]}
        />
      );
    }

    case "page_hero": {
      const { steps, ...rest } = section.props;
      return (
        <PageHero
          {...rest}
          steps={steps?.map((s) => ({ icon: lucideIcon(s.icon), label: s.label, text: s.text }))}
        />
      );
    }

    case "stay_intro":
      return <StayIntro {...section.props} />;

    case "stats_band":
      return <StatsBand {...section.props} />;

    case "process_steps": {
      const { steps, ...rest } = section.props;
      return (
        <ProcessStepsSection
          {...rest}
          steps={steps.map((s) => ({ icon: lucideIcon(s.icon), label: s.label, text: s.text }))}
        />
      );
    }

    case "accommodation_listing": {
      const { accommodations, ...rest } = section.props;
      return (
        <AccommodationListing
          {...(rest as Omit<Parameters<typeof AccommodationListing>[0], "accommodations">)}
          accommodations={accommodations as Accommodation[]}
        />
      );
    }

    case "included_benefits":
      return <IncludedBenefits {...section.props} />;

    case "guest_experiences":
      return <GuestExperiences {...section.props} />;

    case "faq_section":
      return <FaqSection {...section.props} />;

    case "why_wow": {
      const { heading, items, ...rest } = section.props;
      return (
        <WhyWow
          {...rest}
          heading={withLineBreaks(heading)}
          items={items.map((item) => ({
            icon: whyWowIcon(item.icon),
            title: item.title,
            text: item.text,
          }))}
        />
      );
    }

    case "stay_cta_banner":
      return <StayCtaBanner {...section.props} />;

    case "relocation_firms":
      return <RelocationFirms {...section.props} />;

    case "enquiry_form":
      return <EnquiryForm {...section.props} />;

    case "sirvoy_booking":
      return <SirvoyBookingSection />;

    case "welcoming_locations":
      return <WelcomingLocations {...section.props} showViewAll={section.props.showViewAll ?? true} />;

    case "neighbourhood_explorer":
      return <NeighbourhoodExplorer {...section.props} />;

    case "external_guide_callout":
      return <ExternalGuideCallout {...section.props} />;

    case "rich_text": {
      const { eyebrow, heading, html, width, className } = section.props;
      return (
        <section className={className ?? "bg-sand px-6 py-24 text-taupe md:px-10"}>
          <div className={width === "wide" ? "mx-auto max-w-[1200px]" : "mx-auto max-w-[760px]"}>
            {eyebrow && (
              <span className="block text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>
            )}
            {heading && (
              <h2 className="mt-6 font-serif text-[38px] font-normal leading-[1.15] md:text-[48px]">
                {heading}
              </h2>
            )}
            {/* Sanitised server-side with wp_kses_post() before it leaves WordPress. */}
            <div className="wow-rich-text mt-6" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>
      );
    }

    case "room_detail_hero": {
      const { breadcrumbParent, images, ...rest } = section.props;
      return (
        <RoomDetailHero
          {...rest}
          breadcrumbParent={breadcrumbParent as Parameters<typeof RoomDetailHero>[0]["breadcrumbParent"]}
          images={images}
        />
      );
    }

    case "room_variations":
      return <RoomVariations {...section.props} />;

    case "similar_rooms":
      return <SimilarRooms {...section.props} />;

    case "room_information": {
      const p = section.props;
      return (
        <RoomInformation
          eyebrow={p.eyebrow}
          heading={p.heading}
          amenitiesHeading={p.amenitiesHeading}
          amenities={p.amenities.map((a) => ({ icon: lucideIcon(a.icon), label: a.label }))}
          notIncluded={p.notIncluded.map((a) => ({ icon: lucideIcon(a.icon), label: a.label }))}
          location={{
            ...p.location,
            nearby: p.location.nearby.map((n) => ({
              category: n.category,
              icon: lucideIcon(n.icon),
              place: n.place,
              distance: n.distance,
            })),
          }}
          rules={{
            intro: p.rules.intro,
            items: p.rules.items.map((r) => ({
              icon: lucideIcon(r.icon),
              label: r.label,
              detail: r.detail,
            })),
          }}
          cancellation={p.cancellation}
          labels={p.labels}
        />
      );
    }

    case "about_story":
      return <AboutStory {...section.props} />;

    case "quote_band":
      return <QuoteBand {...section.props} />;

    case "location_cards":
      return <LocationCards {...section.props} />;

    case "editorial_split":
      return <EditorialSplit {...section.props} />;

    case "careers_callout":
      return <CareersCallout {...section.props} />;

    case "contact_details":
      return <ContactDetails {...section.props} />;

    case "gift_card":
      return <GiftCardSection {...section.props} />;

    case "page_intro":
      return <PageIntro {...section.props} />;

    case "gallery_grid":
      return <GalleryGrid {...section.props} />;

    case "booking_cta":
      return <BookingCta {...section.props} />;

    case "locations_map":
      return <LocationsMap {...section.props} />;

    case "statement_band":
      return <StatementBand {...section.props} />;

    case "getting_around":
      return <GettingAround {...section.props} />;

    default: {
      // Exhaustiveness guard: adding a layout to the CMS without a branch here
      // becomes a compile error rather than a silently missing section.
      const _never: never = section;
      void _never;
      return null;
    }
  }
}

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) =>
        section.valid ? (
          <div key={section.id} id={section.anchor ?? undefined}>
            {renderSection(section)}
          </div>
        ) : (
          <UnknownSection key={section.id} section={section} />
        ),
      )}
    </>
  );
}
