"use client";

import {
  BedDouble, Archive, Lamp, ShowerHead, Layers, Droplet, Wifi, Laptop, Sofa, Thermometer, MessageSquare, Key,
  CookingPot, Coffee, Tv, Snowflake, ParkingCircle, Sparkles,
} from "lucide-react";
import { RoomInformation, type RoomInformationProps } from "@/components/room-information";
import { RoomDetailHero, type RoomGalleryImage } from "@/components/room-detail-hero";
import { RoomVariations, type RoomVariation } from "@/components/room-variations";
import { SimilarRooms, type SimilarRoom } from "@/components/similar-rooms";
import { STAY_LOCATION, STAY_CANCELLATION, stayRules } from "@/lib/stay-policies";
import { StayCtaBanner } from "@/components/stay-cta-banner";
import doubleRoom from "@/assets/uploads/IMG_4085.asset.json";
import suiteRoom from "@/assets/uploads/IMG_8884.asset.json";
import superiorRoom from "@/assets/uploads/superior-single-room.jpg.asset.json";
import lowerGroundRoom from "@/assets/uploads/lower-ground-single-room.jpg.asset.json";
import v0 from "@/assets/uploads/single-8c22e420bf49257f0dd09359ff9f2a32.asset.json";
import v1 from "@/assets/uploads/single-88f593e8aa20cbfb05ff669f6315f8ce.asset.json";
import v2 from "@/assets/uploads/single-4d79cd353ba60be2524c805c5d4f6536.asset.json";
import v3 from "@/assets/uploads/single-84854775c7e77fb3b764f69802dad971.asset.json";
import v4 from "@/assets/uploads/single-67bbc866ae7634264714341dfcedfcbd.asset.json";
import v5 from "@/assets/uploads/single-44ce1a43ce07fd8671399f15d6113ef4.asset.json";

const TITLE = "Single Room — WOW Apartments & Rooms";
const DESCRIPTION = "A quiet, comfortable single room in Gothenburg with soft linen bedding, a workspace nook and shared or private bathroom.";


const IMAGES: RoomGalleryImage[] = [
  { url: v0.url, alt: "Single Room with the bed, pendant lamp and window" },
  { url: v1.url, alt: "Bed with fringed cushions and linen throw" },
  { url: v2.url, alt: "Woven rattan pendant lamp" },
  { url: v3.url, alt: "Framed prints above the bed" },
  { url: v4.url, alt: "Bedside lamp beside the bed" },
  { url: v5.url, alt: "Bed corner by the linen-curtained window" },
];

const ROOM_OPTIONS: RoomVariation[] = [
  {
    title: "Superior Single Room", size: "16–18 sqm", area: "16–18 sqm", price: "1.795,50 kr",
    description: "A little more room for a comfortable solo stay, with extra space to relax, work and settle in at your own pace.",
    features: ["More space", "Workspace", "Quiet position"],
    image: superiorRoom.url, imageAlt: "Superior Single Room interior with bed and skylight",
  },
  {
    title: "Classic Single Room", size: "14–15 sqm", area: "14–15 sqm", price: "1.795,50 kr",
    description: "A balanced, practical option for one guest, with a comfortable layout designed for an easy and straightforward stay.",
    features: ["Balanced layout", "Workspace", "Central location"],
    image: v0.url, imageAlt: "Classic Single Room interior with bed and window",
  },
  {
    title: "Lower Ground Single Room", size: "12–14 sqm · Patio", area: "12–14 sqm", price: "1.795,50 kr",
    description: "A compact room with direct access to a patio, giving you a little extra outdoor space to enjoy during your stay.",
    features: ["Private patio", "Lower ground", "Quiet setting"],
    image: lowerGroundRoom.url, imageAlt: "Lower Ground Single Room with patio access",
  },
];

const SIMILAR_ROOMS: SimilarRoom[] = [
  { title: "Double Room", meta: "18–25 sqm · 1–2 guests", description: "More space for one or two guests.", chips: ["Private bathroom", "Seating area"], image: doubleRoom.url, imageAlt: "Double Room interior", href: "/rooms" },
  { title: "Suite", meta: "45–55 sqm · 2–4 guests", description: "Separate living space for a more spacious stay.", chips: ["Kitchenette", "Living area"], image: suiteRoom.url, imageAlt: "Suite living area", href: "/rooms" },
  { title: "Double Room", meta: "18–25 sqm · 1–2 guests", description: "More space for one or two guests.", chips: ["Private bathroom", "Seating area"], image: doubleRoom.url, imageAlt: "Double Room interior", href: "/rooms" },
  { title: "Suite", meta: "45–55 sqm · 2–4 guests", description: "Separate living space for a more spacious stay.", chips: ["Kitchenette", "Living area"], image: suiteRoom.url, imageAlt: "Suite living area", href: "/rooms" },
];

const ROOM_INFO: RoomInformationProps = {
  amenitiesHeading: "Room amenities",
  amenities: [
    { icon: BedDouble, label: "Soft linen bedding" }, { icon: Archive, label: "Storage" }, { icon: Lamp, label: "Bedside lighting" },
    { icon: ShowerHead, label: "Shower" }, { icon: Layers, label: "Towels" }, { icon: Droplet, label: "Bathroom essentials" },
    { icon: Wifi, label: "WiFi" }, { icon: Laptop, label: "Workspace nook" }, { icon: Sofa, label: "Seating / everyday essentials" },
    { icon: Thermometer, label: "Heating" }, { icon: MessageSquare, label: "Direct WOW support" }, { icon: Key, label: "Everyday room basics" },
  ],
  notIncluded: [
    { icon: CookingPot, label: "Kitchen / kitchenette" }, { icon: Coffee, label: "Breakfast" }, { icon: Tv, label: "Television" },
    { icon: Snowflake, label: "Air conditioning" }, { icon: ParkingCircle, label: "Parking" }, { icon: Sparkles, label: "Daily housekeeping" },
  ],
  location: STAY_LOCATION,
  rules: stayRules("Maximum 1 guest", "Treat shared spaces with care"),
  cancellation: STAY_CANCELLATION,
};

export function SingleRoomPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <RoomDetailHero
        breadcrumbParent={{ label: "Rooms", to: "/rooms" }}
        kicker="From 14 sqm · 1 guest"
        title="Single Room"
        description="A quiet, comfortable room for an easy stay in Gothenburg thoughtfully kept, softly lit and ready for a restful night and slow morning."
        location="Available across our Gothenburg homes"
        chips={["Soft linen bedding", "Shared/private bathroom", "Workspace nook"]}
        optionsLabel="3 room options available"
        ctaLabel="Choose your room"
        ctaHref="#room-variations"
        images={IMAGES}
      />
      <RoomVariations title="Single Room" label="3 room options available" options={ROOM_OPTIONS} />
      <RoomInformation {...ROOM_INFO} />
      <SimilarRooms
        rooms={SIMILAR_ROOMS}
        eyebrow="Similar rooms"
        heading="You may also like"
        subheading="Explore other room types that may suit your stay."
        carouselLabel="Similar rooms"
      />
      <StayCtaBanner
        title="Rooms for a few nights. Apartments for longer stays."
        description="Find the right place across our Gothenburg locations, whether you’re staying briefly or for longer."
        secondaryLabel="Book apartment"
      />
    </div>
  );
}
