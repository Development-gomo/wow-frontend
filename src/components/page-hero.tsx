import { cn } from "@/lib/utils";
import { CmsImage } from "@/components/cms/cms-image";
import { SIZES } from "@/lib/cms/image";
import { ProcessSteps, type ProcessStep } from "@/components/process-steps";

type PageHeroProps = {
  title: string;
  titleClassName?: string;
  overlayClassName?: string;
  /** Optional height override, e.g. for pages that need a shorter banner. */
  className?: string;
  /** Optional short process shown near the bottom of the banner. */
  steps?: ProcessStep[];
  /** Step styling: "hero" = light text with shadows for dark photos, "section" = dark text for pale overlays. */
  stepsVariant?: "hero" | "section";
  imageUrl: string;
  imageAlt: string;
};

/** Full-width media banner with a centred serif title, shared by content pages. */
export function PageHero({
  title,
  titleClassName = "text-linen",
  overlayClassName = "bg-gradient-to-b from-taupe/20 via-transparent to-taupe/40",
  className,
  steps,
  stepsVariant = "hero",
  ...media
}: PageHeroProps) {
  const hasSteps = Boolean(steps && steps.length > 0);

  return (
    <section
      aria-label={title}
      className={cn(
        "relative w-full overflow-hidden",
        // Heroes without the step row keep the photo-driven banner height.
        hasSteps ? "" : "h-[55svh] min-h-[360px] md:h-[70svh] md:min-h-[520px]",
        className,
      )}
    >
      <CmsImage
        src={media.imageUrl}
        alt={media.imageAlt}
        width={1920}
        height={850}
        sizes={SIZES.fullWidth}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div aria-hidden="true" className={cn("absolute inset-0", overlayClassName)} />
      <div
        className={cn(
          "flex flex-col items-center px-5 text-center",
          // With the step row the banner sizes itself to its content, so the three gaps
          // below are exactly 32px each: under the fixed menu (65px phone / 81px desktop),
          // between the title and the steps, and between the steps and the form that
          // pulls itself up by 64px on phones and 96px on desktop.
          hasSteps
            ? "relative gap-8 pb-[96px] pt-[97px] md:pb-[128px] md:pt-[113px]"
            : "absolute inset-0 justify-center py-10",
        )}
      >
        <h1
          className={cn(
            "font-serif text-linen text-5xl md:text-7xl font-light tracking-[-0.01em] leading-[1.1] drop-shadow-lg",
            titleClassName,
          )}
        >
          {title}
        </h1>
        {hasSteps ? <ProcessSteps steps={steps!} variant={stepsVariant} /> : null}
      </div>
    </section>
  );
}
