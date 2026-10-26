"use client";

import { useEffect, useRef, useState } from "react";

export type StatItem = {
  value: string;
  label: string;
};

type StatsBandProps = {
  stats: StatItem[];
  /** Optional small uppercase heading shown above the numbers. */
  eyebrow?: string;
  className?: string;
};

function CountUp({ value }: { value: string }) {
  const match = value.match(/^([\d,.]+)(.*)$/);
  const raw = match ? match[1] : "0";
  const suffix = match ? match[2] : value;
  const target = parseFloat(raw.replace(/,/g, ""));
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const useComma = raw.includes(",");
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 2000;
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setCurrent(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);

  const text = current.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: useComma,
  });
  return <span ref={ref} aria-label={value}>{text}{suffix}</span>;
}

/**
 * Shared "by the numbers" band: large serif figures with thin dividers
 * that count up as they scroll into view. Used on the homepage and can
 * be reused on any page with page-specific stats passed as props.
 */
export function StatsBand({ stats, eyebrow, className }: StatsBandProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="text-center text-[11px] leading-[17px] uppercase tracking-[0.5em] text-clay">
          {eyebrow}
        </p>
      )}
      <dl className={`mx-auto grid max-w-[900px] grid-cols-2 gap-y-8 md:grid-cols-4 ${eyebrow ? "mt-10" : ""}`}>
        {stats.map((stat, index) => (
          <div
            key={`${stat.label}-${index}`}
            className={`flex min-w-0 flex-col-reverse items-center gap-2 px-2 md:px-4 ${index % 2 !== 0 ? "border-l border-clay/35" : ""} ${index === 2 ? "md:border-l md:border-clay/35" : ""}`}
          >
            <dt className="text-[9px] uppercase leading-snug tracking-[0.18em] text-clay md:text-[10px] md:tracking-[0.24em]">{stat.label}</dt>
            <dd className="font-serif text-[38px] font-light leading-none text-taupe tabular-nums md:text-[50px]">
              <CountUp value={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
