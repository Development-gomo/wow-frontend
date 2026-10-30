import { RoomInformation, type RoomInformationProps } from "@/components/room-information";
import type { ValidSection } from "@/lib/cms/schema";

import { lucideIcon } from "./icon-map";

type Props = Extract<ValidSection, { type: "room_information" }>["props"];

/** One icon as the room information tabs draw it, at the size its list uses. */
function icon(key: string | null | undefined, size = 28) {
  const I = lucideIcon(key);
  return <I aria-hidden="true" width={size} height={size} strokeWidth={1.5} className="shrink-0 text-bronze" />;
}

/**
 * The room information tabs (interactive), with their icons rendered here on
 * the server: the tabs receive finished icon elements, so the icon map and
 * its icons never ship to the browser.
 */
export function RoomInformationSection(p: Props) {
  const props: RoomInformationProps = {
    eyebrow: p.eyebrow,
    heading: p.heading,
    amenitiesHeading: p.amenitiesHeading,
    amenities: p.amenities.map((a) => ({ icon: icon(a.icon), label: a.label })),
    notIncluded: p.notIncluded.map((a) => ({ icon: icon(a.icon, 24), label: a.label })),
    location: {
      ...p.location,
      nearby: p.location.nearby.map((n) => ({ category: n.category, icon: icon(n.icon, 20), place: n.place, distance: n.distance })),
    },
    rules: {
      intro: p.rules.intro,
      items: p.rules.items.map((r) => ({ icon: icon(r.icon), label: r.label, detail: r.detail })),
    },
    cancellation: p.cancellation,
    labels: p.labels,
  };

  return <RoomInformation {...props} />;
}
