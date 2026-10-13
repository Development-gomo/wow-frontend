"use client";

import { Building2, CalendarDays, MailCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProcessSteps } from "@/components/process-steps";
import { EnquiryForm } from "@/components/enquiry-form";
import { RelocationFirms } from "@/components/relocation-firms";
import { AccommodationListing } from "@/components/accommodation-listing";
import { WhyWow, WhyWowIcons, type WhyWowItem } from "@/components/why-wow";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { StayCtaBanner } from "@/components/stay-cta-banner";
import { APARTMENTS } from "@/data/accommodations";
import heroAsset from "@/assets/uploads/hero-book-apartment.png.asset.json";


const HOW_IT_WORKS_STEPS = [
  {
    icon: CalendarDays,
    label: "Share your dates",
    text: "Tell us your arrival dates. Apartments need a minimum stay of 7 nights.",
  },
  {
    icon: Building2,
    label: "Choose your apartment",
    text: "We check availability for your dates and help you choose the right home.",
  },
  {
    icon: MailCheck,
    label: "Confirm and settle in",
    text: "We finalise every detail so your apartment is ready when you arrive.",
  },
];

const WHY_WOW_ITEMS: WhyWowItem[] = [
  {
    icon: WhyWowIcons.flexibleStays,
    title: "Made for longer stays",
    text: "Apartments with a full kitchen, living space and room to settle in for weeks or months.",
  },
  {
    icon: WhyWowIcons.fullyFurnished,
    title: "Fully furnished",
    text: "Move-in ready homes with comfortable beds, soft linen and everything already in place.",
  },
  {
    icon: WhyWowIcons.everythingYouNeed,
    title: "Everything you need",
    text: "Fast Wi-Fi, a washing machine and a private bathroom from the moment you arrive.",
  },
  {
    icon: WhyWowIcons.personalService,
    title: "Personal service",
    text: "A local team helps you find the right apartment and supports you throughout your stay.",
  },
];

const APARTMENT_BOOKING_FAQS: FaqItem[] = [
  { question: "How do I enquire about an apartment?", answer: "Fill in the enquiry form above with your dates, party size and any wishes. We will get back to you with availability and the next steps." },
  { question: "What is the minimum length of stay?", answer: "Apartments are designed for longer stays, with a minimum of 7 nights. Get in touch with your dates and we will find the option that suits you best." },
  { question: "Which apartment types can I choose from?", answer: "Penthouse apartments sit on the top floor with a terrace and views, Superior apartments on the middle floors with balconies or large windows, and Garden apartments at ground level with a private patio." },
  { question: "Do apartments have a full kitchen?", answer: "Yes. Every apartment has a fully equipped kitchen with everything you need to cook and live comfortably." },
  { question: "Are utilities and Wi-Fi included?", answer: "Yes. Wi-Fi, electricity, water and heating are included, so there are no extra bills to arrange." },
  { question: "Can companies rent apartments for employees?", answer: "Yes. We regularly host relocating employees and project teams, and can help arrange stays for longer assignments in Gothenburg." },
];

export function ApartmentBookingPage() {
  return (
    <div className="min-h-screen bg-linen text-foreground">
      <PageHero
        title="Book your apartment"
        titleClassName="text-linen drop-shadow-none"
        imageUrl={heroAsset.url}
        imageAlt="A WOW apartment bedroom in warm late-afternoon light, with linen bedding and an adjoining living area"
        className="h-[46svh] min-h-[420px] md:h-[60svh] md:min-h-[460px]"
        overlayClassName="bg-umber/30"
      />

      <section aria-labelledby="how-it-works-heading" className="bg-white px-5 py-24 text-center md:py-28">
        <p className="m-0 pl-[0.45em] uppercase tracking-[0.45em] text-clay">How it works</p>
        <h2 id="how-it-works-heading" className="mx-auto mt-6 max-w-[720px] font-serif text-[42px] font-normal leading-[1.15] text-taupe md:text-[48px]">
          Booking an apartment is simple
        </h2>
        <ProcessSteps steps={HOW_IT_WORKS_STEPS} variant="section" className="mt-14" />
      </section>

      <EnquiryForm
        eyebrow="Apartment enquiry"
        heading="Tell us about your stay"
        description="Share your dates and preferences and we will get back to you with availability and next steps."
        locked={{
          label: "Apartment type",
          value: "Any apartment",
          hiddenName: "apartmentType",
          hiddenValue: "any",
          options: APARTMENTS.map((apartment) => apartment.title),
        }}
        lockedCaption="We will help you choose the right apartment"
        services={["Parking", "Cleaning"]}
      />

      <AccommodationListing
        eyebrow="Explore our apartments"
        heading="Find a home that fits your stay"
        description="Thoughtfully furnished apartments with the space, privacy and comfort needed for a longer stay in Gothenburg."
        accommodations={APARTMENTS}
        actionLabel="See Availability"
        actionTo="/book-apartment"
        className="bg-linen py-32"
        viewAllTo="/apartments"
        viewAllLabel="Find your apartment"
      />

      <WhyWow
        heading={<>An apartment that<br />feels like home.</>}
        description="Fully equipped homes in central Gothenburg, ready for longer stays from the moment you arrive."
        items={WHY_WOW_ITEMS}
      />

      <RelocationFirms
        heading="A home for your employees."
        description="Arranging accommodation for relocating employees? WOW helps relocation companies find furnished apartments in Gothenburg for longer assignments."
      />

      <FaqSection
        items={APARTMENT_BOOKING_FAQS}
        description="Everything guests often ask before booking one of our apartments."
        className="pt-[128px]"
      />

      <StayCtaBanner
        title="Rooms for a few nights. Apartments for longer stays."
        description="Find the right place across our Gothenburg locations, whether you’re staying briefly or for longer."
        secondaryLabel="Book apartment"
      />
    </div>
  );
}
