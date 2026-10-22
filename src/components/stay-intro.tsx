import { StatsBand, type StatItem } from "@/components/stats-band";
import { cn } from "@/lib/utils";

type StayIntroProps = {
  stats?: StatItem[];
  /** Small uppercase line above the heading, styled like the homepage section eyebrows. */
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  /** Overrides the section surface (background, padding) for this page. */
  className?: string;
};

/**
 * Shared intro copy section shown directly below the PageHero on the
 * Rooms and Apartments listing pages. All content is passed in via props.
 */
export function StayIntro({ eyebrow, heading, paragraphs, stats, className }: StayIntroProps) {
  return (
    <section className={cn("bg-sand px-20 py-32 text-center text-taupe", className)}>
      <div className="mx-auto max-w-[940px]">
        <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>
        <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.15] text-taupe md:text-5xl">{heading}</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={cn("title-subtext font-light", index === 0 ? "mt-4" : "mt-8")}>
            {paragraph}
          </p>
        ))}
      </div>
      {stats && stats.length > 0 && <StatsBand stats={stats} className="mt-16" />}
    </section>
  );
}
