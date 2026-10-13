import type { Accommodation } from "@/components/accommodation-listing";
import singleAsset from "@/assets/uploads/IMG_8834.asset.json";
import doubleAsset from "@/assets/uploads/IMG_4085.asset.json";
import suiteAsset from "@/assets/uploads/IMG_8884.asset.json";
import apartmentReference from "@/assets/rooms-apartments/apartment-reference.jpg.asset.json";
import a1Img from "@/assets/uploads/IMG_1256.asset.json";
import a2Img from "@/assets/uploads/IMG_4067.asset.json";
import a3Img from "@/assets/uploads/IMG_4117.asset.json";
import a4Img from "@/assets/uploads/IMG_4137.asset.json";
import a5Img from "@/assets/uploads/IMG_5731.asset.json";
import a6Img from "@/assets/uploads/IMG_8843.asset.json";
import a7Img from "@/assets/uploads/IMG_8848.asset.json";
import s1Img from "@/assets/uploads/single-44ce1a43ce07fd8671399f15d6113ef4.asset.json";
import s2Img from "@/assets/uploads/single-4d79cd353ba60be2524c805c5d4f6536.asset.json";
import s3Img from "@/assets/uploads/single-67bbc866ae7634264714341dfcedfcbd.asset.json";
import s4Img from "@/assets/uploads/single-84854775c7e77fb3b764f69802dad971.asset.json";
import p1Img from "@/assets/uploads/penthouse-1.jpg.asset.json";
import p2Img from "@/assets/uploads/penthouse-2.jpg.asset.json";
import p3Img from "@/assets/uploads/penthouse-3.jpg.asset.json";
import p4Img from "@/assets/uploads/penthouse-4.jpg.asset.json";
import p5Img from "@/assets/uploads/penthouse-5.jpg.asset.json";
import p0Img from "@/assets/uploads/penthouse-0.jpg.asset.json";
import saImg from "@/assets/uploads/superior-apartment.jpg.asset.json";
import srImg from "@/assets/uploads/superior-apartment-recommendation.jpg.asset.json";
import gaImg from "@/assets/uploads/garden-apartment-recommendation.jpg.asset.json";
import aiImg from "@/assets/uploads/apartment-interior.asset.json";
import ahImg from "@/assets/uploads/apartment-hero.jpg.asset.json";
import type { StatItem } from "@/components/stats-band";

/** Shared "by the numbers" figures used by the Rooms and Apartments pages. */
export const STAY_STATS: StatItem[] = [
  { value: "3", label: "Room types" },
  { value: "3,000+", label: "Stays hosted" },
  { value: "3", label: "Room types" },
  { value: "4.8/5", label: "Average guest rating" },
];

/** Single source for room/apartment card content, shared by the homepage tabs and the listing pages. */
export const ROOMS: Accommodation[] = [
  {
    kicker: "From 14 sqm · 1 guest",
    title: "Single Room",
    sub: "Available across our Gothenburg homes",
    image: singleAsset.url,
    images: [s1Img.url, s2Img.url, s3Img.url, s4Img.url],
    chips: ["Soft linen bedding", "Shared/private bathroom", "Workspace nook"],
    price: { prefix: "From", amount: "1.795,50 kr", unit: "/night" },
    detailPath: "/rooms/single-room",
    variations: [
      { name: "Superior Single Room", detail: "16–18 sqm" },
      { name: "Classic Single Room", detail: "14–15 sqm" },
      { name: "Lower Ground Single Room", detail: "12–14 sqm · Patio" },
    ],
  },
  {
    kicker: "18–25 sqm · 1–2 guests",
    title: "Double Room",
    sub: "Available across our Gothenburg homes",
    image: doubleAsset.url,
    images: [a2Img.url, a3Img.url, a4Img.url, a5Img.url],
    chips: ["Queen or king bed", "Private bathroom", "Seating area"],
    price: { prefix: "From", amount: "1.795,50 kr", unit: "/night" },
    variations: [
      { name: "Deluxe Double Room", detail: "22–25 sqm" },
      { name: "Classic Double Room", detail: "18–20 sqm" },
      { name: "Petit Double Room", detail: "15–17 sqm" },
      { name: "Lower Ground Double Room", detail: "16–18 sqm · Patio" },
    ],
  },
  {
    kicker: "45–55 sqm · 2–4 guests",
    title: "Suite",
    sub: "Available across our Gothenburg homes",
    image: suiteAsset.url,
    images: [a1Img.url, a6Img.url, a7Img.url, aiImg.url],
    chips: ["Living room & bedroom", "Kitchenette", "Sofa bed for extra guests"],
    price: { prefix: "From", amount: "1.795,50 kr", unit: "/night" },
    variations: [
      { name: "Penthouse Suite Apartment", detail: "Top floor · 55–60 sqm" },
      { name: "Junior Suite", detail: "35–40 sqm" },
    ],
  },
];

export const APARTMENTS: Accommodation[] = [
  {
    title: "Penthouse Apartment",
    detailPath: "/apartments/penthouse-apartment",
    image: apartmentReference.url,
    images: [p1Img.url, p2Img.url, p3Img.url, p4Img.url],
    kicker: "Top floor · 2–4 guests",
    sub: "In our Gothenburg collection",
    price: { prefix: "From", amount: "1.795,50 kr", unit: "/night" },
    note: "Minimum 1 week stay required",
    location: "Vasastan · Föreningsgatan 7 & 9",
    chips: ["Private terrace", "Full kitchen", "Panoramic views"],
  },
  {
    title: "Superior Apartment",
    image: apartmentReference.url,
    images: [saImg.url, srImg.url, p5Img.url, ahImg.url],
    kicker: "Middle floors · 2–4 guests",
    sub: "In our Gothenburg collection",
    price: { prefix: "From", amount: "1.795,50 kr", unit: "/night" },
    note: "Minimum 1 week stay required",
    location: "Johanneberg · Fridkullagatan 2",
    chips: ["Balcony or large windows", "Full kitchen", "Dining area"],
  },
  {
    title: "Garden Apartment",
    image: apartmentReference.url,
    images: [gaImg.url, p0Img.url, aiImg.url, a1Img.url],
    kicker: "Lower ground · Patio access",
    sub: "In our Gothenburg collection",
    price: { prefix: "From", amount: "1.795,50 kr", unit: "/night" },
    note: "Minimum 1 week stay required",
    location: "Örgryte · Sankt Sigfridsgatan 64–66",
    chips: ["Private patio", "Full kitchen", "Garden access"],
  },
  {
    title: "Penthouse Suite Apartment",
    image: apartmentReference.url,
    images: [p2Img.url, p5Img.url, ahImg.url, aiImg.url],
    kicker: "Top floor · 2–6 guests",
    sub: "In our Gothenburg collection",
    price: { prefix: "From", amount: "1.795,50 kr", unit: "/night" },
    note: "Minimum 1 week stay required",
    location: "Johanneberg · Fridkullagatan 2",
    chips: ["Two bedrooms", "Full kitchen", "Terrace & lounge"],
  },
];
