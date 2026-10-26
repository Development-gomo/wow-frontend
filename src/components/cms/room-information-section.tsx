"use client";

import { RoomInformation, type RoomInformationProps } from "@/components/room-information";
import type { ValidSection } from "@/lib/cms/schema";

import { lucideIcon } from "./icon-map";

type Props = Extract<ValidSection, { type: "room_information" }>["props"];

/**
 * The room information tabs (interactive) with their icons resolved on the
 * client: the server renderer can only pass icon keys, not icon components.
 */
export function RoomInformationSection(p: Props) {
  const props: RoomInformationProps = {
    eyebrow: p.eyebrow,
    heading: p.heading,
    amenitiesHeading: p.amenitiesHeading,
    amenities: p.amenities.map((a) => ({ icon: lucideIcon(a.icon), label: a.label })),
    notIncluded: p.notIncluded.map((a) => ({ icon: lucideIcon(a.icon), label: a.label })),
    location: {
      ...p.location,
      nearby: p.location.nearby.map((n) => ({ category: n.category, icon: lucideIcon(n.icon), place: n.place, distance: n.distance })),
    },
    rules: {
      intro: p.rules.intro,
      items: p.rules.items.map((r) => ({ icon: lucideIcon(r.icon), label: r.label, detail: r.detail })),
    },
    cancellation: p.cancellation,
    labels: p.labels,
  };

  return <RoomInformation {...props} />;
}
