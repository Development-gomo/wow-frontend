import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

export const defaultFaqItems: FaqItem[] = [
  { question: "How long can I stay at WOW?", answer: "WOW is designed for both short and extended stays. You can stay for a few nights, several weeks or longer, depending on the accommodation and availability. If you are planning a longer stay, get in touch and we can help you find the most suitable option." },
  { question: "Can I book as a private guest?", answer: "Yes. WOW welcomes both private guests and company bookings. You can book a room directly, while apartment stays are handled through an enquiry so we can match you with the right option." },
  { question: "Can companies book accommodation for employees?", answer: "Yes. WOW provides accommodation for business stays, relocation and longer employee stays in Gothenburg. Companies can enquire about suitable rooms or apartments based on length of stay, location and individual requirements." },
  { question: "What is included in the stay?", answer: "The exact amenities vary by room or apartment, but accommodation is fully furnished and designed for comfortable everyday living. Depending on the property, this can include Wi-Fi, kitchen or kitchenette access, private bathroom facilities and other practical amenities." },
  { question: "What is the difference between rooms and apartments?", answer: "Rooms are suited to shorter or more straightforward stays and can be booked directly. Apartments offer more space and additional living facilities such as a kitchen and separate living areas, making them especially suitable for longer stays. Apartment availability is handled through an enquiry." },
  { question: "How do I book a room?", answer: "Choose the room type that suits you and use the Book option to continue to the booking process. You can review the available room variations before selecting the option that works best for your stay." },
  { question: "How do I enquire about an apartment?", answer: "Choose the apartment you are interested in and select See Availability. Complete the enquiry form with your preferred move-in date, length of stay and other relevant details. The WOW team can then help confirm availability and the most suitable apartment." },
  { question: "Where are WOW Apartments located in Gothenburg?", answer: "WOW has accommodation in three central Gothenburg areas: Vasastan, Örgryte and Johanneberg. The properties include locations around Föreningsgatan, Sankt Sigfridsgatan and Fridkullagatan." },
];

export function FaqSection({ items = defaultFaqItems, description = "Here are a few of the things guests often ask before booking with WOW.", className }: { items?: FaqItem[]; description?: string; className?: string }) {
  const half = Math.ceil(items.length / 2);
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  return (
    <section id="faq" className={cn("bg-sand text-taupe px-6 md:px-10 lg:px-20 pt-20 md:pt-32 pb-24 md:pb-32 scroll-mt-20", className)}>
      <div className="flex flex-col items-center text-center">
        <span className="text-[10px] uppercase tracking-[0.45em] text-clay pl-[0.45em]">Good to know</span>
        <h2 className="mt-6 font-serif text-[38px] md:text-[48px] font-normal leading-[1.15]">Questions before you stay?</h2>
        <p className="mt-4 max-w-[560px] text-[15px] leading-[1.75] text-taupe/85">{description}</p>
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
