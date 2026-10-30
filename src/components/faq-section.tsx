"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

/** Questions, eyebrow, heading and description all come from the page's FAQ section in WordPress. */
export function FaqSection({ eyebrow, heading, items = [], description, className }: { eyebrow?: string; heading?: string; items?: FaqItem[]; description?: string; className?: string }) {
  const half = Math.ceil(items.length / 2);
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  return (
    <section id="faq" className={cn("bg-sand text-taupe px-6 md:px-10 lg:px-20 pt-20 md:pt-32 pb-24 md:pb-32 scroll-mt-20", className)}>
      <div className="flex flex-col items-center text-center">
        {eyebrow && <span className="text-[10px] uppercase tracking-[0.45em] text-clay pl-[0.45em]">{eyebrow}</span>}
        {heading && <h2 className="mt-6 font-serif text-[38px] md:text-[48px] font-normal leading-[1.15]">{heading}</h2>}
        {description && <p className="mt-4 max-w-[560px] text-[15px] leading-[1.75] text-taupe/85">{description}</p>}
      </div>
      <div className="max-w-[1160px] mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-20 xl:gap-24 items-start">
        {[items.slice(0, half), items.slice(half)].map((column, columnIndex) => (
          <ul key={columnIndex} className="border-b border-clay/30">
            {column.map((item, rowIndex) => {
              const index = columnIndex * half + rowIndex;
              const isOpen = openQuestions.includes(index);
              return (
                <li key={item.question} className="border-t border-clay/30">
                  <Button
                    type="button"
                    variant="ghost"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenQuestions((current) => isOpen ? current.filter((value) => value !== index) : [...current, index])}
                    className="w-full h-auto min-h-20 py-[26px] px-0 justify-between gap-6 rounded-none text-left whitespace-normal hover:bg-transparent hover:text-umber focus-visible:ring-clay"
                  >
                    <span className="font-serif text-[20px] font-normal leading-[1.3]">{item.question}</span>
                    <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true" className="shrink-0">
                      <path d="M1 7h12" />
                      <path d="M7 1v12" className={`wow-faq-plus-v ${isOpen ? "opacity-0" : "opacity-100"}`} />
                    </svg>
                  </Button>
                  <div id={`faq-answer-${index}`} aria-hidden={!isOpen} className={`wow-faq-answer ${isOpen ? "max-h-[400px] opacity-100 pb-7" : "max-h-0 opacity-0 pb-0"}`}>
                    <p className="max-w-[500px] text-[15px] font-light leading-[1.75] text-taupe/80">{item.answer}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}
