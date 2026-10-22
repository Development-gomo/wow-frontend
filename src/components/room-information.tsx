import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { MapPin, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconItem = { icon: LucideIcon; label: string };
export type RuleItem = IconItem & { detail: string };
export type NearbyItem = { category: string; icon: LucideIcon; place: string; distance: string };
export type CancellationTier = { window: string; title: string; detail: string };
export type CancellationInfo = { intro: string; tiers: CancellationTier[]; notes: ReactNode[] };

export type RoomInformationProps = {
  eyebrow?: string;
  heading?: string;
  amenitiesHeading: string;
  amenities: IconItem[];
  notIncluded: IconItem[];
  location: {
    heading: string;
    description: string;
    address: string;
    mapsHref: string;
    nearby: NearbyItem[];
  };
  rules: { intro: string; items: RuleItem[] };
  cancellation?: CancellationInfo;
  /** Tab names and fixed labels, edited per page in the Room information section. */
  labels?: RoomInformationLabels;
};

export type RoomInformationLabels = {
  tabAmenities?: string;
  tabLocation?: string;
  tabRules?: string;
  tabCancellation?: string;
  notIncludedHeading?: string;
  notIncludedText?: string;
  mapsLink?: string;
  nearbyHeading?: string;
  timelineStart?: string;
  timelineEnd?: string;
};

// Tier accent colours, from most to least favourable.
const TIER_TONES = ["text-bronze border-bronze bg-bronze", "text-bronze-soft border-bronze-soft bg-bronze-soft", "text-stone border-stone bg-stone"];

const eyebrow = "pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay";
const panelHeading = "m-0 font-serif text-[30px] font-medium leading-[1.15] text-bronze md:text-[36px]";
const bodyText = "text-base font-light leading-[1.7] text-taupe";
const tile = "rounded-[20px] bg-tile";
const grid3 = "m-0 grid list-none grid-cols-1 p-0 sm:grid-cols-2 lg:grid-cols-3";

function Icon({ icon: I, size = 28 }: { icon: LucideIcon; size?: number }) {
  return <I aria-hidden="true" width={size} height={size} strokeWidth={1.5} className="shrink-0 text-bronze" />;
}

export function RoomInformation(props: RoomInformationProps) {
  const { eyebrow: kicker, heading, labels = {} } = props;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const tabs = [labels.tabAmenities, labels.tabLocation, labels.tabRules, ...(props.cancellation ? [labels.tabCancellation] : [])];

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const panels = [
    <AmenitiesPanel key="a" {...props} />,
    <LocationPanel key="l" {...props.location} labels={labels} />,
    <RulesPanel key="r" {...props.rules} title={labels.tabRules} />,
    ...(props.cancellation ? [<CancellationPanel key="c" {...props.cancellation} labels={labels} />] : []),
  ];

  return (
    <section className="flex flex-col items-center bg-sand px-5 py-32 text-taupe md:px-10 lg:px-20">
      <div className="flex flex-col items-center text-center">
        {kicker && <div className={eyebrow}>{kicker}</div>}
        {heading && <h2 className="mt-6 font-serif text-[34px] font-normal leading-[1.15] text-taupe md:text-[48px]">{heading}</h2>}
      </div>

      <div
        role="tablist"
        aria-label={kicker}
        onKeyDown={onKeyDown}
        className="mt-10 flex w-full max-w-[1200px] items-center justify-start gap-8 overflow-x-auto border-b border-clay/22 md:mt-14 md:justify-center md:gap-14"
      >
        {tabs.map((label, i) => (
          <button
            key={i}
            ref={(el) => { tabRefs.current[i] = el; }}
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-controls={`${uid}-panel-${i}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "relative shrink-0 whitespace-nowrap px-1 py-3.5 text-xs font-medium uppercase tracking-[0.32em] text-taupe transition-opacity duration-[220ms] ease-in-out focus-visible:rounded-[2px] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[6px] focus-visible:outline-clay",
              active === i
                ? "opacity-100 after:absolute after:inset-x-1 after:bottom-0 after:h-px after:bg-taupe"
                : "opacity-55 hover:opacity-85",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10 min-h-80 w-full max-w-[1200px] md:mt-14">
        <div key={active} role="tabpanel" id={`${uid}-panel-${active}`} aria-labelledby={`${uid}-tab-${active}`} className="wow-panel">
          {panels[active]}
        </div>
      </div>
    </section>
  );
}

function AmenitiesPanel({ amenitiesHeading, amenities, notIncluded, labels = {} }: RoomInformationProps) {
  return (
    <>
      <h3 className={panelHeading}>{amenitiesHeading}</h3>
      <ul className={cn(grid3, "mt-10 gap-5")}>
        {amenities.map(({ icon, label }) => (
          <li key={label} className={cn(tile, "flex items-center gap-[18px] px-8 py-[26px] text-xl leading-[1.2]")}>
            <Icon icon={icon} />
            {label}
          </li>
        ))}
      </ul>

      {labels.notIncludedHeading && <h3 className="mt-14 font-serif text-[28px] font-medium leading-[1.15] text-muted-taupe">{labels.notIncludedHeading}</h3>}
      {labels.notIncludedText && <p className="mt-2 text-base font-light leading-[1.7] text-muted-taupe/85">{labels.notIncludedText}</p>}
      <ul aria-label={labels.notIncludedHeading} className={cn(grid3, "mt-7 gap-4")}>
        {notIncluded.map(({ icon, label }) => (
          <li key={label} className="flex items-center gap-4 rounded-[20px] border border-dashed border-clay/55 px-7 py-5 text-lg leading-[1.2] text-muted-taupe">
            <Icon icon={icon} size={24} />
            {label}
          </li>
        ))}
      </ul>
    </>
  );
}

function LocationPanel({ heading, description, address, mapsHref, nearby, labels }: RoomInformationProps["location"] & { labels: RoomInformationLabels }) {
  return (
    <div className="grid grid-cols-1 items-start gap-y-12 lg:grid-cols-[560px_1fr] lg:gap-x-[72px]">
      <div>
        <h3 className={cn(panelHeading, "mb-10 md:text-[32px]")}>{heading}</h3>
        <div className="overflow-hidden rounded-[20px]">
          <LocationMap label={heading} />
        </div>
        <p className={cn(bodyText, "mt-3.5 max-w-[520px]")}>{description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-base text-taupe">
          <span className="flex items-center gap-2.5"><Icon icon={MapPin} size={18} />{address}</span>
          {labels.mapsLink && (
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="text-bronze underline underline-offset-4">
              {labels.mapsLink}
            </a>
          )}
        </div>
      </div>

      <div className="lg:mt-[86px]">
        {labels.nearbyHeading && <div className={eyebrow}>{labels.nearbyHeading}</div>}
        <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-11 sm:grid-cols-2">
          {nearby.map(({ category, icon, place, distance }) => (
            <div key={category}>
              <h4 className="m-0 text-xl font-medium leading-[1.2]">{category}</h4>
              <div className="mt-3.5 flex items-center gap-3 text-base">
                <Icon icon={icon} size={20} />
                <span>{place} <span className="text-stone/90">· {distance}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LocationMap({ label }: { label: string }) {
  const roads: [string, number][] = [
    ["M0 70 L560 110", 10], ["M120 0 L180 340", 10], ["M360 0 L330 230", 12], ["M0 160 L560 140", 6], ["M260 0 L250 230", 5],
    ["M460 0 L500 190", 5], ["M40 0 L70 240", 4], ["M0 30 L560 50", 4], ["M0 205 L330 190", 4],
  ];
  return (
    <svg viewBox="0 0 560 340" role="img" aria-label={label} className="block h-auto w-full">
      <rect width="560" height="340" className="fill-map-land" />
      <path d="M-10 250 C 90 220, 160 262, 250 228 S 420 170, 570 196 L 570 240 C 430 214, 330 262, 250 270 S 90 262, -10 292 Z" className="fill-map-water" />
      <g fill="none" strokeLinecap="round" className="stroke-pearl">
        {roads.map(([d, w]) => <path key={d} d={d} strokeWidth={w} />)}
      </g>
      <rect x="385" y="42" width="60" height="50" rx="6" className="fill-map-park" />
      <rect x="190" y="175" width="50" height="30" rx="6" className="fill-map-park" />
      <circle cx="300" cy="126" r="36" className="fill-bronze/14" />
      <g transform="translate(284 92)" className="fill-bronze">
        <path d="M16 36s-13-11.3-13-21a13 13 0 0 1 26 0c0 9.7-13 21-13 21z" />
        <circle cx="16" cy="15" r="5" className="fill-pearl" />
      </g>
      <text x="300" y="312" textAnchor="middle" fontSize="11" letterSpacing="3" className="fill-stone/90 font-sans">GÖTA ÄLV</text>{/* content-exempt: river label drawn into the decorative map artwork */}
    </svg>
  );
}

function RulesPanel({ intro, items, title }: RoomInformationProps["rules"] & { title?: string }) {
  return (
    <>
      {title && <h3 className={panelHeading}>{title}</h3>}
      <p className={cn(bodyText, "mt-3 max-w-[640px]")}>{intro}</p>
      <ul className={cn(grid3, "mt-10 gap-5")}>
        {items.map(({ icon, label, detail }) => (
          <li key={label} className={cn(tile, "flex items-start gap-[18px] px-[30px] py-[26px]")}>
            <Icon icon={icon} />
            <div>
              <div className="text-xl font-medium leading-[1.2]">{label}</div>
              <div className="mt-1.5 text-base font-light leading-normal">{detail}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function CancellationPanel({ intro, tiers, notes, labels }: CancellationInfo & { labels: RoomInformationLabels }) {
  return (
    <>
      {labels.tabCancellation && <h3 className={panelHeading}>{labels.tabCancellation}</h3>}
      <p className={cn(bodyText, "mt-3 max-w-[640px]")}>{intro}</p>
      <div aria-hidden="true" className="mt-11 grid grid-cols-3 gap-5">
        {tiers.map((t, i) => <div key={t.title} className={cn("h-1 rounded-[2px]", TIER_TONES[i].split(" ")[2])} />)}
      </div>
      <div className={cn(eyebrow, "mt-2.5 flex justify-between")}><span>{labels.timelineStart}</span><span>{labels.timelineEnd}</span></div>
      <ol className={cn(grid3, "mt-7 gap-5 sm:grid-cols-1 lg:grid-cols-3")}>
        {tiers.map(({ window, title, detail }, i) => {
          const [text, border] = TIER_TONES[i].split(" ");
          return (
            <li key={title} className={cn(tile, "px-8 pb-[34px] pt-8")}>
              <div className="flex items-center gap-3">
                <span className={cn("flex size-8 items-center justify-center rounded-full border text-[15px] font-medium", text, border)}>{i + 1}</span>
                <span className={eyebrow}>{window}</span>
              </div>
              <div className={cn("mt-[22px] font-serif text-[30px] font-medium leading-[1.15]", text)}>{title}</div>
              <div className="mt-2.5 text-base font-light leading-[1.6]">{detail}</div>
            </li>
          );
        })}
      </ol>
      <div className="mt-10 space-y-2">
        {notes.map((n, i) => <p key={i} className={cn(bodyText, "m-0 max-w-[760px]")}>{n}</p>)}
      </div>
    </>
  );
}
