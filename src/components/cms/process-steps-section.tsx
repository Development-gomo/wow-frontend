import { ProcessSteps, type ProcessStep } from "@/components/process-steps";

/* -------------------- PROCESS STEPS SECTION -------------------- */

/**
 * ProcessSteps renders a bare <div>; on book-apartment the baseline wrapped it
 * in a titled section. That wrapper markup is reproduced verbatim here so the
 * eyebrow and heading become editable without changing the rendered output.
 */
export function ProcessStepsSection({
  eyebrow,
  heading,
  steps,
  variant,
  className,
}: {
  eyebrow?: string | null;
  heading?: string | null;
  steps: ProcessStep[];
  variant?: "hero" | "section";
  className?: string;
}) {
  if (!eyebrow && !heading) {
    return <ProcessSteps steps={steps} variant={variant} className={className} />;
  }

  return (
    <section aria-labelledby="how-it-works-heading" className="bg-white px-5 py-[128px] text-center">
      {eyebrow && <p className="m-0 pl-[0.45em] uppercase tracking-[0.45em] text-clay">{eyebrow}</p>}
      {heading && (
        <h2 id="how-it-works-heading" className="mx-auto mt-6 max-w-[720px] font-serif text-[42px] font-normal leading-[1.15] text-taupe md:text-[48px]">
          {heading}
        </h2>
      )}
      <ProcessSteps steps={steps} variant={variant ?? "section"} className={className ?? "mt-14"} />
    </section>
  );
}
