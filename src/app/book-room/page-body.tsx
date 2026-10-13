"use client";

import { BedDouble, CalendarDays, MailCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { StayCtaBanner } from "@/components/stay-cta-banner";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { AccommodationListing } from "@/components/accommodation-listing";
import { ROOMS } from "@/data/accommodations";
import heroAsset from "@/assets/book-room-hero.png.asset.json";
import { SirvoyBooking } from "@/components/sirvoy-booking";


const BOOKING_STEPS = [
  {
    icon: CalendarDays,
    label: "Pick your dates",
    text: "Choose your check-in and check-out dates in the form below.",
  },
  {
    icon: BedDouble,
    label: "Choose your room",
    text: "See which rooms are free and pick the one you like best.",
  },
  {
    icon: MailCheck,
    label: "Confirm and relax",
    text: "Pay securely and receive your booking confirmation by email.",
  },
];

const ROOM_BOOKING_FAQS: FaqItem[] = [
  { question: "How do I book a room?", answer: "Choose your dates in the booking form above, pick the room type that suits you and confirm. You will receive your booking confirmation by email." },
  { question: "Do rooms have a private bathroom?", answer: "Most rooms have a private bathroom. Some Single rooms share a bathroom, which is always stated clearly in the room variation before you book." },
  { question: "Is Wi-Fi included?", answer: "Yes. Fast Wi-Fi is included in every room, along with a comfortable place to work." },
  { question: "Are bed linen and towels provided?", answer: "Yes. Every room is move-in ready with soft linen bedding and fresh towels, so you only need to bring your own things." },
  { question: "Can I stay in a room for several weeks?", answer: "Yes. Rooms work well for a few nights as well as longer stays. For extended bookings, get in touch and we will help you find the best fit." },
  { question: "Can I check in late?", answer: "Yes. Contact us before your arrival and we will make sure your check in is simple, whatever time you arrive." },
];

export function RoomBookingPage() {
  return (
    <div className="min-h-screen bg-linen text-foreground">
      <PageHero
        title="Book your stay"
        titleClassName="text-linen drop-shadow-none"
        imageUrl={heroAsset.url}
        imageAlt="A calm, warmly lit WOW guest room by the window"
        overlayClassName="bg-umber/30"
        steps={BOOKING_STEPS}
      />
      <section aria-label="Room booking" className="relative z-10 mx-5 -mt-16 mb-[128px] bg-white md:mx-20 md:-mt-24">
        <SirvoyBooking />
      </section>
      <AccommodationListing
        eyebrow="Explore our rooms"
        heading="Find a room that fits your stay"
        description="Thoughtfully furnished rooms in central Gothenburg, ready from the moment you arrive."
        accommodations={ROOMS}
        actionLabel="Book"
        actionTo="/book-room"
        className="bg-linen pt-0 pb-32 md:pt-0 md:pb-32"
        viewAllTo="/rooms"
        viewAllLabel="View all rooms"
      />
      <FaqSection
        items={ROOM_BOOKING_FAQS}
        description="Everything guests often ask before booking one of our rooms."
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