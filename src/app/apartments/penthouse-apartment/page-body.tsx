"use client";

import {
  BedDouble,
  Archive,
  Lamp,
  ShowerHead,
  Layers,
  Droplet,
  Wifi,
  Fence,
  CookingPot,
  Thermometer,
  MessageSquare,
  Mountain,
  Plane,
  Coffee,
  Tv,
  Snowflake,
  ParkingCircle,
  Sparkles,
} from "lucide-react";
import { RoomInformation, type RoomInformationProps } from "@/components/room-information";
import { EnquiryForm } from "@/components/enquiry-form";
import { STAY_LOCATION, stayRules } from "@/lib/stay-policies";
import { RoomDetailHero, type RoomGalleryImage } from "@/components/room-detail-hero";
import { SimilarRooms } from "@/components/similar-rooms";
import { RelocationFirms } from "@/components/relocation-firms";
import { StayCtaBanner } from "@/components/stay-cta-banner";
import v0 from "@/assets/uploads/penthouse-0.jpg.asset.json";
import v1 from "@/assets/uploads/penthouse-1.jpg.asset.json";
import v2 from "@/assets/uploads/penthouse-2.jpg.asset.json";
import v3 from "@/assets/uploads/penthouse-3.jpg.asset.json";
import v4 from "@/assets/uploads/penthouse-4.jpg.asset.json";
import v5 from "@/assets/uploads/penthouse-5.jpg.asset.json";
import superiorApartment from "@/assets/uploads/superior-apartment-recommendation.jpg.asset.json";
import gardenApartment from "@/assets/uploads/garden-apartment-recommendation.jpg.asset.json";

const TITLE = "Penthouse Apartment — WOW Apartments & Rooms";
const DESCRIPTION =
  "A spacious top-floor apartment in Gothenburg with a private terrace, full kitchen and panoramic views.";


const IMAGES: RoomGalleryImage[] = [
  { url: v0.url, alt: "Open-plan kitchen and living space under white-painted roof beams" },
  { url: v1.url, alt: "Kitchen island with dark bar stools on wide oak floorboards" },
  { url: v2.url, alt: "Built-in white cabinetry with oven and wine rack under the sloped ceiling" },
  { url: v3.url, alt: "Stainless steel cooker hood and framed print above the kitchen counter" },
  { url: v4.url, alt: "Doorway through to the bedroom, beside a tall potted grass" },
  { url: v5.url, alt: "Exposed white beams and ceiling spotlights over the kitchen" },
];

const APARTMENT_INFO: RoomInformationProps = {
  eyebrow: "Apartment information",
  amenitiesHeading: "Apartment amenities",
  amenities: [
    { icon: BedDouble, label: "Soft linen bedding" },
    { icon: Archive, label: "Storage" },
    { icon: Lamp, label: "Bedside lighting" },
    { icon: ShowerHead, label: "Shower" },
    { icon: Layers, label: "Towels" },
    { icon: Droplet, label: "Bathroom essentials" },
    { icon: Wifi, label: "WiFi" },
    { icon: Fence, label: "Private terrace" },
    { icon: CookingPot, label: "Full kitchen" },
    { icon: Thermometer, label: "Heating" },
    { icon: MessageSquare, label: "Direct WOW support" },
    { icon: Mountain, label: "Panoramic views" },
  ],
  notIncluded: [
    { icon: Plane, label: "Airport transfer" },
    { icon: Coffee, label: "Breakfast" },
    { icon: Tv, label: "Television" },
    { icon: Snowflake, label: "Air conditioning" },
    { icon: ParkingCircle, label: "Parking" },
    { icon: Sparkles, label: "Daily housekeeping" },
  ],
  location: STAY_LOCATION,
  rules: stayRules("Maximum 4 guests", "Treat the apartment and terrace with care"),
};

const SIMILAR_APARTMENTS = [
  {
    meta: "Middle floors · 2–4 guests",
    title: "Superior Apartment",
    description: "Johanneberg · Fridkullagatan 2",
    chips: ["Balcony or large windows", "Full kitchen", "Dining area"],
    image: superiorApartment.url,
    imageAlt: "Superior Apartment kitchen and dining area",
    href: "/apartments",
  },
  {
    meta: "Lower ground · Patio access",
    title: "Garden Apartment",
    description: "Örgryte · Sankt Sigfridsgatan 64–66",
    chips: ["Private patio", "Full kitchen", "Garden access"],
    image: gardenApartment.url,
    imageAlt: "Garden Apartment interior with garden view",
    href: "/apartments",
  },
  {
    meta: "Middle floors · 2–4 guests",
    title: "Superior Apartment",
    description: "Johanneberg · Fridkullagatan 2",
    chips: ["Balcony or large windows", "Full kitchen", "Dining area"],
    image: superiorApartment.url,
    imageAlt: "Superior Apartment kitchen and dining area",
    href: "/apartments",
  },
  {
    meta: "Lower ground · Patio access",
    title: "Garden Apartment",
    description: "Örgryte · Sankt Sigfridsgatan 64–66",
    chips: ["Private patio", "Full kitchen", "Garden access"],
    image: gardenApartment.url,
    imageAlt: "Garden Apartment interior with garden view",
    href: "/apartments",
  },
];

export function PenthouseApartmentPage() {
  return (
    <>
      <RoomDetailHero
        breadcrumbParent={{ label: "Apartments", to: "/apartments" }}
        kicker="Top floor · 2–4 guests"
        title="Penthouse Apartment"
        description="A spacious top-floor apartment with generous living space, a private terrace and panoramic views, designed for a comfortable stay in Gothenburg."
        location="Vasastan · Föreningsgatan 7 & 9"
        chips={["Private terrace", "Full kitchen", "Panoramic views"]}
        note={{
          label: "Minimum stay policy",
          content: (
            <>
              Apartment booking requires a{" "}
              <strong className="font-medium">minimum stay of 7 nights</strong>.
            </>
          ),
        }}
        ctaLabel="Enquire now"
        ctaHref="#enquire"
        images={IMAGES}
      />
      <EnquiryForm
        eyebrow="Enquire about your stay"
        heading="Plan your stay with WOW"
        description="Tell us a little about your stay and we’ll get back to you with availability and next steps."
        locked={{
          label: "Apartment type",
          value: "Penthouse Apartment",
          hiddenName: "apartmentType",
          hiddenValue: "penthouse",
        }}
        services={["Parking", "Cleaning"]}
        maxGuests={4}
      />
      <RoomInformation {...APARTMENT_INFO} />
      <RelocationFirms
        heading="A home for your employees."
        description="Booking on behalf of a relocation company? Let WOW help you arrange comfortable apartments in Gothenburg for employees who need a longer stay."
      />
      <SimilarRooms
        rooms={SIMILAR_APARTMENTS}
        eyebrow="Similar apartments"
        heading="You may also like"
        subheading="Explore other apartment types that may suit your stay."
        carouselLabel="Similar apartments"
      />
      <StayCtaBanner
        title="Rooms for a few nights. Apartments for longer stays."
        description="Find the right place across our Gothenburg locations, whether you’re staying briefly or for longer."
        secondaryLabel="Book apartment"
      />
    </>
  );
}
