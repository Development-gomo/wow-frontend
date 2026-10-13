export type IncludedBenefit = { title: string; copy: string };

export function IncludedBenefits({ benefits }: { benefits: IncludedBenefit[] }) {
  return (
    <section className="bg-deep-taupe px-6 py-24 md:px-20 md:py-32">
      <div className="flex flex-col items-center text-center">
        <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-warm-clay">Included with your stay</span>
        <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.15] text-linen/85 md:text-5xl">Everything, thoughtfully included</h2>
      </div>

      <ul aria-label="Included with your stay" className="included-benefits mx-auto mt-16 grid w-full max-w-[1200px] list-none grid-cols-1 gap-x-12 gap-y-14 p-0 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-16">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="animate-accommodation-in flex flex-col gap-4 motion-reduce:animate-none">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-warm-clay">
              <path d="M4 12.5 L10 18 L20 6" />
            </svg>
            <h3 className="m-0 font-serif text-[26px] font-normal leading-[1.15] text-linen md:text-[28px]">{benefit.title}</h3>
            <p className="m-0 max-w-[320px] text-[14px] font-light leading-[1.7] text-linen/78">{benefit.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}