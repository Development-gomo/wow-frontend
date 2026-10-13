"use client";

import { PageHero } from "@/components/page-hero";
import { StayIntro } from "@/components/stay-intro";
import { AccommodationListing } from "@/components/accommodation-listing";
import { APARTMENTS, STAY_STATS } from "@/data/accommodations";
import { IncludedBenefits, type IncludedBenefit } from "@/components/included-benefits";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { GuestExperiences, type GuestExperienceReview } from "@/components/guest-experiences";
import { RelocationFirms } from "@/components/relocation-firms";

const APARTMENT_TESTIMONIALS: GuestExperienceReview[] = [
  {
    quote: "We lived here for two months and it never stopped feeling like home. The kitchen made everyday life easy, and the apartment stayed light and calm all winter.",
    name: "Elin & Johan",
    stay: "Penthouse Apartment · 2 months",
    location: "Vasastan",
  },
  {
    quote: "A genuinely beautiful apartment with room to breathe. We cooked at home, worked from the table and never once felt we were staying in a hotel.",
    name: "Daniel R.",
    stay: "Superior Apartment · 5 weeks",
    location: "Johanneberg",
  },
  {
    quote: "The private patio was the best part of our days — coffee outside in the morning and quiet evenings after. Everything was spotless and thoughtfully finished.",
    name: "Sofia K.",
    stay: "Garden Apartment · 3 nights",
    location: "Örgryte",
  },
];

const APARTMENT_FAQS: FaqItem[] = [
  { question: "How do I enquire about an apartment?", answer: "Choose the apartment you are interested in and select See Availability. Share your preferred move-in date, length of stay and any wishes, and we will confirm availability." },
  { question: "What is the minimum length of stay?", answer: "Apartments are designed for longer stays. Get in touch with your dates and we will find the option that suits you best." },
  { question: "Do apartments have a full kitchen?", answer: "Yes. Every apartment has a fully equipped kitchen with everything you need to cook and live comfortably." },
  { question: "What is the difference between Penthouse, Superior and Garden?", answer: "Penthouse apartments are on the top floor with a terrace and views, Superior apartments sit on the middle floors with balconies or large windows, and Garden apartments are at ground level with a private patio." },
  { question: "How many guests can stay in an apartment?", answer: "Most apartments comfortably host two to four guests, depending on the layout and variation." },
  { question: "Are utilities and Wi-Fi included?", answer: "Yes. Wi-Fi, electricity, water and heating are included, so there are no extra bills to arrange." },
  { question: "Can companies rent apartments for employees?", answer: "Yes. We regularly host relocating employees and project teams, and can help arrange stays for longer assignments in Gothenburg." },
  { question: "Is cleaning included during longer stays?", answer: "Cleaning options can be arranged for longer stays. Let us know your needs in your enquiry and we will tailor the stay for you." },
];

import { StayCtaBanner } from "@/components/stay-cta-banner";
import heroAsset from "@/assets/uploads/hero-apartments.png.asset.json";




const BENEFITS: IncludedBenefit[] = [
  {
    title: "Thoughtful apartments",
    copy: "Light, furnished spaces with room to settle in, whether you are here for a short visit or a longer stay.",
  },
  {
    title: "Move-in ready",
    copy: "Beds, linen, towels and everyday essentials are ready for your arrival, so you can feel at home from day one.",
  },
  {
    title: "Flexible stays",
    copy: "Settle in for weeks or months and make Gothenburg your home, with a stay length shaped around your plans.",
  },
  {
    title: "Wi-Fi included",
    copy: "Stay connected throughout your apartment, whether you are working, sharing moments or winding down.",
  },
  {
    title: "Space of your own",
    copy: "A private bathroom, full kitchen and dining space give you the freedom to follow your own routines.",
  },
  {
    title: "Direct support",
    copy: "Our local WOW team is here to help before you arrive and throughout your time in Gothenburg.",
  },
];

export function BookApartmentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        title="Apartments"
        imageUrl={heroAsset.url}
        imageAlt="A bright Scandinavian-style WOW apartment"
        overlayClassName="bg-umber/30"
      />

      <StayIntro
        eyebrow="A home of your own in Gothenburg"
        heading="Book your stay and live like a local"
        paragraphs={[
          "Settle into one of our fully equipped apartments, designed for two to six guests with comfortable beds and a sofa bed for extra flexibility. Each space gives you the freedom and comfort of a real home, with the calm of a quiet, well kept building around you. Every apartment is furnished in a light Scandinavian style and includes a fully equipped kitchen, private bathroom with shower and toilet, dining area, comfortable beds with soft linen, TV, washing machine and WiFi. Cook your own breakfast, host a friend for dinner and live at your own pace — for a few nights or several months.",
        ]}
        stats={STAY_STATS}
      />

      <AccommodationListing
        eyebrow="Our apartments"
        heading="Find a home that fits your stay"
        description="Thoughtfully furnished apartments with the space, privacy and comfort needed for a longer stay in Gothenburg."
        accommodations={APARTMENTS}
        actionLabel="See Availability"
        actionTo="/book-apartment"
        className="bg-linen py-32"
        hideDivider
      />

      <IncludedBenefits benefits={BENEFITS} />

      <GuestExperiences
        eyebrow="Apartment reviews"
        title="Apartments that feel like home."
        description="See what guests say about living in a WOW apartment in Gothenburg."
        reviews={APARTMENT_TESTIMONIALS}
        className="pb-[128px]"
      />

      <RelocationFirms
        heading="A home for your employees."
        description="Explore longer-stay accommodation for relocating employees. WOW works with relocation companies to help find the right furnished apartment in Gothenburg."
      />

      <FaqSection items={APARTMENT_FAQS} description="Everything guests often ask before staying in one of our apartments." className="pt-[128px] md:pt-[128px]" />
      <StayCtaBanner
        title="Rooms for a few nights. Apartments for longer stays."
        description="Find the right place across our Gothenburg locations, whether you’re staying briefly or for longer."
        secondaryLabel="Book apartment"
      />
    </div>
  );
}
