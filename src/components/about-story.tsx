import { cn } from "@/lib/utils";
import { CmsImage } from "@/components/cms-image";

type AboutStoryProps = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  lead: string;
  paragraphs: string[];
  /** Optional caption row under the photo (e.g. name and role). */
  caption?: { left: string; right: string };
  /** Extra classes for this page's band, e.g. to change its vertical padding. */
  className?: string;
};

/** Shared editorial "story" section: photo (with optional caption) beside an eyebrow, italic serif lead and body copy. */
export function AboutStory({ image, imageAlt, eyebrow, lead, paragraphs, caption, className }: AboutStoryProps) {
  return (
    <section className={cn("px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-32", className)}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="aspect-[1/1.08] w-full overflow-hidden lg:h-[480px] lg:aspect-auto">
            <CmsImage sizes="(min-width: 1024px) 50vw, 100vw" src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover object-center" />
          </div>
          {caption && (
            <div className="flex items-center gap-[18px] px-1">
              <span className="shrink-0 pl-[0.4em] text-[10px] uppercase tracking-[0.4em] text-clay">{caption.left}</span>
              <span className="h-px flex-1 bg-clay/50" />
              <span className="shrink-0 pl-[0.4em] text-[10px] uppercase tracking-[0.4em] text-clay">{caption.right}</span>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">{eyebrow}</span>
          <p className="mt-6 max-w-[560px] font-serif text-[28px] italic font-normal leading-[1.3] text-taupe sm:text-[32px]">{lead}</p>
          <div className="mt-8 h-px w-11 bg-clay" />
          <div className="mt-8 flex max-w-[520px] flex-col gap-3 text-[15px] font-light leading-[1.8] text-taupe/90">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
