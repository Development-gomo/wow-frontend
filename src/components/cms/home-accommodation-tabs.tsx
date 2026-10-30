"use client";

import { Link } from "@/components/localized-link";
import { useState } from "react";

import { AccommodationGrid, type Accommodation } from "@/components/accommodation-listing";
import { Button } from "@/components/ui/button";

/* -------------------- ACCOMMODATION TABS -------------------- */

export function HomeAccommodationTabs({
  eyebrow,
  heading,
  description,
  roomsTabLabel,
  apartmentsTabLabel,
  roomsActionLabel,
  apartmentsActionLabel,
  roomsActionTo,
  apartmentsActionTo,
  roomsViewAllLabel,
  roomsViewAllTo,
  apartmentsViewAllLabel,
  apartmentsViewAllTo,
  rooms,
  apartments,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  roomsTabLabel: string;
  apartmentsTabLabel: string;
  roomsActionLabel: string;
  apartmentsActionLabel: string;
  roomsActionTo?: string;
  apartmentsActionTo?: string;
  roomsViewAllLabel?: string;
  roomsViewAllTo?: string;
  apartmentsViewAllLabel?: string;
  apartmentsViewAllTo?: string;
  rooms: Accommodation[];
  apartments: Accommodation[];
}) {
  const [category, setCategory] = useState<"rooms" | "apartments">("rooms");
  const isRooms = category === "rooms";
  const viewAllLabel = isRooms ? roomsViewAllLabel : apartmentsViewAllLabel;
  const viewAllTo = isRooms ? roomsViewAllTo : apartmentsViewAllTo;

  return (
    <section id="rum" className="overflow-x-clip bg-linen py-32 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto">
          <span className="block text-[10px] uppercase tracking-[0.45em] text-clay">
            {eyebrow}
          </span>
          <h2 className="font-serif text-[42px] md:text-[48px] text-taupe font-normal leading-[1.15] mt-6">
            {heading}
          </h2>
          <p className="text-[15px] leading-[1.8] text-taupe/85 max-w-[560px] mx-auto mt-4">
            {description}
          </p>
          <div role="tablist" aria-label={`${roomsTabLabel} / ${apartmentsTabLabel}`} className="mt-16 flex w-full gap-cta sm:w-auto sm:inline-flex">
            <button
              role="tab"
              id="rooms-tab"
              aria-selected={isRooms}
              aria-controls="accommodation-panel"
              onClick={() => setCategory("rooms")}
              className={`flex-1 sm:flex-none sm:w-[200px] h-12 rounded-cta border font-medium uppercase tracking-[0.28em] cursor-pointer transition-colors duration-200 ${isRooms ? "bg-taupe border-taupe text-ivory hover:bg-umber hover:border-umber" : "bg-taupe/65 border-transparent text-ivory hover:bg-taupe/85"}`}
            >
              {roomsTabLabel}
            </button>
            <button
              role="tab"
              id="apartments-tab"
              aria-selected={!isRooms}
              aria-controls="accommodation-panel"
              onClick={() => setCategory("apartments")}
              className={`flex-1 sm:flex-none sm:w-[200px] h-12 rounded-cta border font-medium uppercase tracking-[0.28em] cursor-pointer transition-colors duration-200 ${!isRooms ? "bg-taupe border-taupe text-ivory hover:bg-umber hover:border-umber" : "bg-taupe/65 border-transparent text-ivory hover:bg-taupe/85"}`}
            >
              {apartmentsTabLabel}
            </button>
          </div>
        </div>

        <div key={category} id="accommodation-panel" role="tabpanel" aria-labelledby={isRooms ? "rooms-tab" : "apartments-tab"} className="w-full mt-12 flex justify-center animate-accommodation-in">
          <AccommodationGrid
            accommodations={isRooms ? rooms : apartments}
            actionLabel={isRooms ? roomsActionLabel : apartmentsActionLabel}
            actionTo={isRooms ? roomsActionTo : apartmentsActionTo}
            hideDivider={!isRooms}
          />
        </div>
        {viewAllLabel && viewAllTo && (
          <Button asChild className="mt-16 h-12 px-8 rounded-cta bg-taupe text-pearl hover:bg-umber text-[11px] uppercase tracking-[0.28em] gap-4">
            <Link href={viewAllTo}>
              {viewAllLabel}
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
