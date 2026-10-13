"use client";

import { PageHero } from "@/components/page-hero";
import { StayIntro } from "@/components/stay-intro";
import { AccommodationListing } from "@/components/accommodation-listing";
import { ROOMS, STAY_STATS } from "@/data/accommodations";
import { IncludedBenefits, type IncludedBenefit } from "@/components/included-benefits";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { GuestExperiences, type GuestExperienceReview } from "@/components/guest-experiences";

const ROOM_TESTIMONIALS: GuestExperienceReview[] = [
  {
    quote: "A quiet, lovely little room that felt like my own corner of the city. Comfortable bed, beautiful linen and everything I needed close at hand.",
    name: "Hanna M.",
    stay: "Single Room · 6 nights",
    location: "Vasastan",
  },
  {
    quote: "Spotless, calm and thoughtfully put together. We slept wonderfully and loved waking up to the soft morning light coming through the window.",
    name: "Oliver & Mia",
    stay: "Double Room · 4 nights",
    location: "Örgryte",
  },
  {
    quote: "A generous, beautifully kept room with a lovely seating corner. It felt far more like a home than a hotel — we didn’t want to leave.",
    name: "Clara S.",
    stay: "Suite · 10 nights",
    location: "Johanneberg",
  },
];

const ROOM_FAQS: FaqItem[] = [
  { question: "How do I book a room?", answer: "Choose the room type that suits you, review its variations and select Book. You will then continue to the booking process to confirm your dates." },
  { question: "Which room type should I choose?", answer: "Single rooms suit solo travellers, Double rooms give more space for one or two guests, and Suites add a separate living area and kitchenette for longer or shared stays." },
  { question: "Do rooms have a private bathroom?", answer: "Most rooms have a private bathroom. Some Single rooms share a bathroom, which is always stated clearly in the room variation before you book." },
  { question: "Is Wi-Fi included?", answer: "Yes. Fast Wi-Fi is included in every room, along with a comfortable place to work." },
  { question: "Are bed linen and towels provided?", answer: "Yes. Every room is move-in ready with soft linen bedding and fresh towels, so you only need to bring your own things." },
  { question: "Can I stay in a room for several weeks?", answer: "Yes. Rooms work well for a few nights as well as longer stays. For extended bookings, get in touch and we will help you find the best fit." },
  { question: "What are the Lower Ground rooms?", answer: "Lower Ground rooms sit at garden level with access to a patio, offering a calm and private feel at a slightly lower price." },
  { question: "Can I check in late?", answer: "Yes. Contact us before your arrival and we will make sure your check in is simple, whatever time you arrive." },
];

import { StayCtaBanner } from "@/components/stay-cta-banner";
import heroAsset from "@/assets/uploads/hero-rooms.png.asset.json";




const BENEFITS: IncludedBenefit[] = [
  {
    title: "Thoughtful rooms",
    copy: "Carefully prepared rooms designed for comfortable everyday stays in Gothenburg. Nordic materials, soft linen and quiet corners come together in spaces that feel considered rather than styled.",
  },
  {
    title: "Move-in ready",
    copy: "Bed linen, towels and everyday essentials are ready from day one. Drop your bag by the door, open the window and let yourself settle in — there is no checklist to work through.",
  },
  {
    title: "Flexible stays",
    copy: "Stay for a few nights or longer depending on what you need. Whether it is a short break, a business trip or the months between homes, the terms are shaped around the way you actually travel.",
  },
  {
    title: "Wi-Fi included",
    copy: "Reliable Wi-Fi runs through every room, so you can relax, work or stay connected without thinking about it. Strong enough for calls, quiet enough to forget about.",
  },
  {
    title: "Bathroom options",
    copy: "Choose between room types with shared or private bathroom facilities. Every option is finished to the same standard, so the decision is about how you like to stay.",
  },
  {
    title: "Direct support",
    copy: "Reach the WOW team directly before your arrival and during your stay. A small local team, close enough to remember your name and quick to sort out whatever comes up along the way.",
  },
];

export function BookRoomPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <PageHero
        title="Rooms"
        imageUrl={heroAsset.url}
        imageAlt="A calm, warmly lit WOW guest room"
        overlayClassName="bg-umber/30"
      />

      <StayIntro
        eyebrow="Private rooms, shared comforts"
        heading="Book your stay and feel at home"
        paragraphs={[
          "Make yourself at home in one of our cozy and thoughtfully designed rooms, from private single rooms to spacious doubles and generous suites. Here, you get the privacy of your own space combined with the convenience of shared amenities in the house. Each room is furnished in a light Scandinavian style and includes a comfortable continental bed, a private bathroom with shower and toilet, desk, wardrobe, TV, refrigerator and Wi-Fi for added comfort and convenience. You’ll also have access to a shared kitchen and laundry facilities, making it easy for you to settle in and feel at home.",
        ]}
        stats={STAY_STATS}
      />




      <AccommodationListing
        eyebrow="Our rooms"
        heading="Find a space that fits your stay"
        description="Thoughtfully designed rooms with everything you need for a comfortable and effortless stay in Gothenburg."
        accommodations={ROOMS}
        actionLabel="Book"
        actionTo="/book-room"
        className="bg-linen py-32"
      />

      <IncludedBenefits benefits={BENEFITS} />

      <GuestExperiences
        eyebrow="Room reviews"
        title="Rooms that feel like home."
        description="See what guests say about staying in a WOW room in Gothenburg."
        reviews={ROOM_TESTIMONIALS}
        className="bg-linen py-32"
      />

      {/* <RelocationFirms
        heading="A room for your employees."
        description="Explore longer-stay accommodation for relocating employees. WOW works with relocation companies to help find the right furnished room in Gothenburg."
        points={[
          { title: "Longer stays only", text: "Room stays of at least 7 nights for employees relocating or working on longer assignments." },
          { title: "Your company’s requirements", text: "Tell us your preferred dates, number of employees and accommodation needs." },
          { title: "A personal response from WOW", text: "Our team reviews your requirements and gets back to you with availability and next steps." },
        ]}
      /> */}

      <FaqSection items={ROOM_FAQS} description="Everything guests often ask before booking one of our rooms." className="pt-[128px]" />

      <StayCtaBanner
        title="Rooms for a few nights. Apartments for longer stays."
        description="Find the right place across our Gothenburg locations, whether you’re staying briefly or for longer."
        secondaryLabel="Book apartment"
      />

    </div>
  );
}
