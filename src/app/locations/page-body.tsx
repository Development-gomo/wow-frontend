"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { WelcomingLocations } from "@/components/welcoming-locations";
import { StayCtaBanner } from "@/components/stay-cta-banner";
import { PageHero } from "@/components/page-hero";
import locationHeroAsset from "@/assets/uploads/hero-locations.png.asset.json";


type WowLocation = {
  num: string;
  area: string;
  address: string;
  descriptor: string;
  x: number;
  y: number;
  labelY: number;
};

// Positioned to reflect their real geographic relationship:
// Vasastan sits west-central, Örgryte east-southeast, Johanneberg south of Vasastan.
const LOCATIONS: WowLocation[] = [
  {
    num: "01",
    area: "Vasastan",
    address: "Föreningsgatan 7 & 9",
    descriptor: "Central, tree-lined and close to cafés, parks and city life.",
    x: 165,
    y: 215,
    labelY: -30,
  },
  {
    num: "02",
    area: "Örgryte",
    address: "Sankt Sigfridsgatan 64–66",
    descriptor: "A quieter residential setting with easy access to central Gothenburg.",
    x: 385,
    y: 240,
    labelY: -30,
  },
  {
    num: "03",
    area: "Johanneberg",
    address: "Fridkullagatan 2",
    descriptor: "Leafy streets close to Chalmers, Liseberg and the city centre.",
    x: 250,
    y: 330,
    labelY: 36,
  },
];

const GETTING_AROUND = [
  {
    value: "10–15 min",
    title: "Public transport",
    body: "Trams and buses connect all three neighbourhoods with central Gothenburg.",
  },
  {
    value: "5–10 min",
    title: "Walkable areas",
    body: "Each location puts cafés, shops, parks and everyday essentials within easy reach.",
  },
  {
    value: "10–15 min",
    title: "City connections",
    body: "Stay close to key areas including Avenyn, Chalmers, Liseberg and central Gothenburg.",
  },
  {
    value: "5 min",
    title: "For longer stays",
    body: "All locations offer convenient access to grocery stores, services and daily transport.",
  },
];

function WowMap({ active, setActive }: { active: number | null; setActive: (i: number | null) => void }) {
  return (
    <div
      role="img"
      aria-label="Map of Gothenburg with three WOW locations marked"
      className="overflow-hidden rounded shadow-accommodation bg-map-land"
    >
      <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
        {/* Base */}
        <rect width="500" height="400" className="fill-map-land" />

        {/* River (Göta älv) at top */}
        <path
          d="M-10 20 Q 120 40 220 30 Q 340 20 500 45 L 510 0 L -10 0 Z"
          className="fill-map-water"
          opacity="0.35"
        />
        <path
          d="M-10 20 Q 120 40 220 30 Q 340 20 500 45"
          fill="none"
          className="stroke-map-water"
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Parks: Slottsskogen (near Vasastan), Delsjön area (near Örgryte), a smaller green south */}
        <ellipse cx="90" cy="230" rx="70" ry="45" className="fill-map-park" opacity="0.45" />
        <ellipse cx="440" cy="290" rx="75" ry="55" className="fill-map-park" opacity="0.45" />
        <ellipse cx="210" cy="370" rx="55" ry="30" className="fill-map-park" opacity="0.4" />

        {/* Roads (thin) */}
        <path d="M 0 170 Q 130 150 260 175 Q 370 195 500 180" className="stroke-tile" strokeWidth="2" fill="none" />
        <path d="M 220 40 Q 235 200 260 400" className="stroke-tile" strokeWidth="1.5" fill="none" />
        <path d="M 120 100 L 430 320" className="stroke-tile" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M 350 80 L 200 400" className="stroke-tile" strokeWidth="1" fill="none" opacity="0.45" />

        {/* Compass rose (small, top-right corner) */}
        <g transform="translate(465 65)" opacity="0.5">
          <circle r="10" fill="none" className="stroke-clay" strokeWidth="0.5" />
          <path d="M0 -7 L2 0 L0 7 L-2 0 Z" className="fill-clay" />
          <text
            x="0"
            y="-14"
            textAnchor="middle"
            fontFamily="Barlow Condensed"
            fontSize="7"
            letterSpacing="1"
            className="fill-clay"
          >
            N
          </text>
        </g>

        {/* Markers */}
        {LOCATIONS.map((loc, i) => {
          const isActive = active === i;
          return (
            <g
              key={loc.num}
              className="wow-marker"
              transform={`translate(${loc.x} ${loc.y})`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(isActive ? null : i)}
            >
              {/* Halo (only visible when active) */}
              <circle
                r={isActive ? 30 : 0}
                className="fill-taupe"
                opacity={isActive ? 0.12 : 0}
                style={{ transition: "all 220ms ease" }}
              />
              {/* Main marker */}
              <circle
                r={isActive ? 20 : 17}
                className={isActive ? "fill-taupe stroke-taupe" : "fill-pearl stroke-clay"}
                strokeWidth="1.5"
                style={{ transition: "all 220ms ease" }}
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontFamily="Barlow Condensed"
                fontSize="11"
                fontWeight="500"
                letterSpacing="0.8"
                className={isActive ? "fill-pearl" : "fill-taupe"}
                style={{ transition: "all 220ms ease" }}
              >
                {loc.num}
              </text>
              {/* Area label (floats above marker) */}
              <text
                className="wow-marker-label"
                x="0"
                y={loc.labelY}
                textAnchor="middle"
                opacity={isActive ? 1 : 0.7}
                fill={isActive ? "var(--color-taupe)" : "var(--color-clay)"}
              >
                {loc.area}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function LocationsPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        title="Our Locations"
        imageUrl={locationHeroAsset.url}
        imageAlt="A sunlit residential street sloping down towards the water at golden hour"
        overlayClassName="bg-taupe/25"
      />

      <section
        aria-labelledby="locations-overview-heading"
        className="bg-sand px-6 pb-16 pt-24 sm:px-14 md:px-20 md:pt-32"
      >
        {/* Section intro */}
        <div className="flex flex-col items-center text-center">
          <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">
            Where to find us
          </p>
          <h2
            id="locations-overview-heading"
            className="mt-6 font-serif text-[34px] font-normal leading-[1.15] text-taupe sm:text-[clamp(34px,3.75vw,48px)]"
          >
            Explore WOW across Gothenburg
          </h2>
        </div>

        {/* Grid: map + list */}
        <div className="mx-auto mt-12 grid w-full max-w-[1200px] grid-cols-1 items-stretch gap-10 md:mt-16 md:grid-cols-[1.15fr_1fr] md:gap-14">
          <WowMap active={active} setActive={setActive} />

          <div className="flex flex-col">
            <ul aria-label="WOW locations in Gothenburg" className="m-0 flex list-none flex-col p-0">
              {LOCATIONS.map((loc, i) => {
                const isActive = active === i;
                return (
                  <li
                    key={loc.num}
                    tabIndex={0}
                    className="wow-loc-item cursor-pointer px-6 py-[22px] pl-6"
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid oklch(0.62 0.020 70 / 0.22)",
                      background: isActive ? "oklch(0.935 0.010 78 / 0.55)" : "transparent",
                      borderLeft: `2px solid ${isActive ? "var(--color-taupe)" : "transparent"}`,
                    }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                  >
                    <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">
                      Location {loc.num}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-baseline gap-3.5">
                      <h3 className="m-0 font-serif text-[24px] font-normal leading-[1.15] text-taupe sm:text-[26px]">
                        {loc.area}
                      </h3>
                      <span className="text-[13px] font-light text-clay">{loc.address}</span>
                    </div>
                    <p className="mt-1 max-w-[440px] text-[14px] font-light leading-[1.65] text-taupe/85">
                      {loc.descriptor}
                    </p>
                  </li>
                );
              })}
            </ul>
            <Link
              to="/contact"
              className="wow-cta-primary ml-0 mt-7 inline-flex h-12 items-center gap-3.5 self-start rounded-cta bg-taupe px-[30px] text-[11px] font-medium uppercase tracking-[0.28em] text-pearl transition-colors hover:bg-umber md:ml-6"
            >
              <span>Contact us</span>
            </Link>
          </div>
        </div>
      </section>

      <WelcomingLocations showViewAll={false} />

      <section aria-label="Close to the city" className="bg-deep-taupe px-6 py-20 text-linen sm:px-14 md:px-20 md:py-24">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col md:pl-10">
          <p className="m-0 font-serif text-[20px] italic leading-[1.25] md:text-[24px]">
            Close to the city.
            <br />
            Calm enough to settle in.
          </p>
          <span aria-hidden="true" className="mt-10 block h-px w-14 bg-linen/50" />
          <p className="mt-10 max-w-[980px] font-serif text-[32px] italic leading-[1.28] sm:text-[40px] md:text-[52px]">
            Three welcoming neighbourhoods across Gothenburg. Thoughtful rooms and apartments, chosen
            for the way you want to stay.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="getting-around-heading"
        className="bg-sand px-6 py-20 sm:px-14 md:px-20 md:py-32"
      >
        <div className="flex flex-col items-center text-center">
          <p className="pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">
            Getting around
          </p>
          <h2
            id="getting-around-heading"
            className="mt-6 font-serif text-[34px] font-normal leading-[1.15] text-taupe sm:text-[44px] lg:text-[52px]"
          >
            Easy to reach. Easy to explore.
          </h2>
          <p className="mt-4 max-w-[820px] text-[15px] font-light leading-[1.75] text-taupe/85">
            All three WOW locations are well connected to central Gothenburg, public transport and the
            places guests use most during their stay.
          </p>
        </div>

        <ul
          aria-label="Travel times and connectivity"
          className="mx-auto mt-12 grid w-full max-w-[1200px] list-none grid-cols-1 p-0 sm:mt-16 sm:grid-cols-2 md:mt-16 md:grid-cols-4"
        >
          {GETTING_AROUND.map((col, index) => (
            <li
              key={col.title}
              className={`wow-ga-col flex flex-col items-center border-clay/[0.22] px-7 py-10 text-center sm:py-12 md:py-0 ${
                index === 0
                  ? ""
                  : index === 1
                    ? "border-t sm:border-t-0 sm:border-l"
                    : index === 2
                      ? "border-t md:border-t-0 md:border-l"
                      : "border-t md:border-t-0 sm:border-l"
              }`}
            >
              <div className="font-serif text-[36px] font-normal leading-[1.1] text-taupe sm:text-[40px]">
                {col.value}
              </div>
              <h3 className="mt-6 font-serif text-[22px] font-normal leading-[1.2] text-taupe">
                {col.title}
              </h3>
              <p className="mt-2 max-w-[240px] text-[14px] font-light leading-[1.65] text-taupe/85">
                {col.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <StayCtaBanner
        title="Rooms for a few nights. Apartments for longer stays."
        description="Find the right place across our Gothenburg locations, whether you’re staying briefly or for longer."
        secondaryLabel="Book apartment"
      />
    </div>
  );
}
