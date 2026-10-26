import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { ProcessSteps, type ProcessStep } from "@/components/process-steps";
import { CmsImage } from "@/components/cms-image";

type PageHeroProps = {
  title: string;
  description?: string;
  action?: ReactNode;
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
  description,
  action,
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
        hasSteps ? "" : "flex flex-col min-h-[max(55svh,360px)] md:min-h-[max(70svh,520px)]",
        className,
      )}
    >
      <CmsImage sizes="100vw"
        src={media.imageUrl}
        alt={media.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        priority
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
            : "relative flex-1 justify-center py-[97px] md:py-[113px]",
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
        {description ? <p className="mt-5 max-w-[600px] text-title-subtext text-linen">{description}</p> : null}
        {action ? <div className="mt-8">{action}</div> : null}
        {hasSteps && steps ? <ProcessSteps steps={steps} variant={stepsVariant} /> : null}
      </div>
    </section>
  );
}
