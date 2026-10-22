import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  /** Icon shown inside the step's circle, e.g. a calendar for the dates step. */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Short step name, e.g. "Pick your dates". */
  label: string;
  /** Optional one-line explanation, shown on larger screens. */
  text?: string;
};

type ProcessStepsProps = {
  steps: ProcessStep[];
  /** "hero" = light text over a photo (PageHero); "section" = dark text on a light background. */
  variant?: "hero" | "section";
  className?: string;
};

/** A connected row of up-to-three steps joined by a hairline, shared by heroes and content sections. */
export function ProcessSteps({ steps, variant = "hero", className }: ProcessStepsProps) {
  const isHero = variant === "hero";

  return (
    <div className={cn("relative mx-auto w-full max-w-[880px]", className)}>
      {/* Hairline through the circles, so the steps read as one path. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-[16%] top-[18px] h-px md:top-[22px]",
          isHero ? "bg-linen/35" : "bg-clay/30",
        )}
      />
      <ol className="relative grid w-full grid-cols-3 gap-3 md:gap-8">
        {steps.map((step) => (
          <li key={step.label} className="flex flex-col items-center gap-2 md:gap-3">
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border md:h-11 md:w-11",
                isHero
                  ? "border-linen/45 bg-umber/45 text-linen backdrop-blur-[3px]"
                  : "border-clay/30 bg-white text-taupe",
              )}
            >
              <step.icon
                aria-hidden="true"
                strokeWidth={1.5}
                className={cn("h-4 w-4 md:h-5 md:w-5", isHero && "drop-shadow-[0_1px_8px_rgba(38,30,24,0.55)]")}
              />
            </span>
            <span className="flex flex-col gap-2">
              <span
                className={cn(
                  "text-[10px] font-medium uppercase tracking-[0.16em] md:text-[12px] md:tracking-[0.2em]",
                  isHero
                    ? "text-linen"
                    : "text-taupe",
                )}
              >
                {step.label}
              </span>
              {step.text ? (
                <span
                  className={cn(
                    // Heroes keep the row label-only on phones; content sections always
                    // show the one-line explanation under each step name.
                    "wow-process-step max-w-[250px] text-balance",
                    isHero ? "hidden md:block" : "block",
                    isHero
                      ? "text-linen"
                      : "text-taupe/75",
                  )}
                >
                  {step.text}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
