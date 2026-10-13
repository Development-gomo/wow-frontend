import {
  Plane,
  TrainFront,
  TramFront,
  SquareParking,
  Zap,
  Car,
  LogIn,
  LogOut,
  Moon,
  CigaretteOff,
  PartyPopper,
  PawPrint,
  User,
  IdCard,
  Home,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CancellationInfo, RoomInformationProps, RuleItem } from "@/components/room-information";

/** Location, house rules and cancellation shared by every WOW room and apartment page. */
export const STAY_LOCATION: RoomInformationProps["location"] = {
  heading: "Central Gothenburg",
  description:
    "A calm base within easy reach of the city's trams, restaurants and waterfront, with cafés and everyday shops just a short walk away.",
  address: "Föreningsgatan 7 to 9, Gothenburg",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=F%C3%B6reningsgatan+7%2C+Gothenburg",
  nearby: [
    { category: "Airports", icon: Plane, place: "Göteborg Landvetter Airport", distance: "25 km" },
    {
      category: "Train stations",
      icon: TrainFront,
      place: "Göteborg Centralstation",
      distance: "2.5 km",
    },
    { category: "Tram stops", icon: TramFront, place: "Vasaplatsen", distance: "0.3 km" },
    {
      category: "Parking",
      icon: SquareParking,
      place: "Nearby public car park",
      distance: "0.5 km",
    },
    { category: "EV charging", icon: Zap, place: "Nearby charging point", distance: "0.6 km" },
    { category: "Car rental", icon: Car, place: "Central Gothenburg rental", distance: "2 km" },
  ],
};

export function stayRules(occupancy: string, respect: string): RoomInformationProps["rules"] {
  const items: RuleItem[] = [
    { icon: LogIn, label: "Check-in", detail: "From 15:00" },
    { icon: LogOut, label: "Check-out", detail: "By 11:00" },
    { icon: Moon, label: "Quiet hours", detail: "22:00 to 07:00" },
    { icon: CigaretteOff, label: "No smoking", detail: "Not permitted anywhere in the building" },
    {
      icon: PartyPopper,
      label: "No parties or events",
      detail: "Gatherings and events are not allowed",
    },
    { icon: PawPrint, label: "Pets", detail: "Please ask us before booking" },
    { icon: User, label: "Occupancy", detail: occupancy },
    { icon: IdCard, label: "ID on arrival", detail: "Valid photo ID required at check-in" },
    { icon: Home, label: "Respect the home", detail: respect },
  ];
  return {
    intro: "A few simple guidelines so every guest enjoys a calm, comfortable stay.",
    items,
  };
}

export const STAY_CANCELLATION: CancellationInfo = {
  intro: "Plans change. Here's how refunds work depending on when you cancel before check-in.",
  tiers: [
    {
      window: "More than 14 days before",
      title: "Free cancellation",
      detail: "Full refund of the amount paid.",
    },
    {
      window: "14 to 3 days before",
      title: "Partial refund",
      detail: "50% refund of the booking total.",
    },
    {
      window: "Under 3 days, or no-show",
      title: "Non-refundable",
      detail: "No refund. The full stay is charged.",
    },
  ],
  notes: [
    "Cancellation deadlines use local Gothenburg time. Refunds go back to the original payment method within 5 to 10 working days.",
    <>
      Need to change your dates instead?{" "}
      <Link to="/contact" className="text-bronze underline underline-offset-4">
        Contact WOW
      </Link>{" "}
      and we'll help where we can.
    </>,
  ],
};
