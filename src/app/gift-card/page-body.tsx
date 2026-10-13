"use client";

import { Gift, Mail, Phone } from "lucide-react";
import contactBedroom from "@/assets/contact/contact-callout-bedroom.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";


export function GiftCardPage() {
  return (
    <main className="bg-background text-taupe">
      <PageHero
        title="Gift cards"
        imageUrl={contactBedroom.url}
        imageAlt="A warm bedroom in one of WOW's Gothenburg homes"
        overlayClassName="bg-umber/45"
      />

      <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-20 lg:py-32">
        <div className="mx-auto grid max-w-[1120px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <div>
            <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">A thoughtful gift</p>
            <h2 className="mt-6 max-w-[620px] font-serif text-[38px] font-normal leading-[1.12] sm:text-[52px]">
              Give someone time away in Gothenburg.
            </h2>
            <div className="mt-7 max-w-[620px] space-y-5 text-[15px] font-light leading-[1.8] text-taupe/85 sm:text-[16px]">
              <p>
                A WOW gift card is a personal way to celebrate a birthday, anniversary, new beginning or simply give someone a well deserved stay.
              </p>
              <p>
                To purchase a gift card, contact our team by email or phone. Tell us what you have in mind and we will guide you through the available options and answer any questions before your purchase.
              </p>
            </div>
          </div>

          <div className="border-t border-clay/30 pt-10 lg:border-l lg:border-t-0 lg:pl-20 lg:pt-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-clay/45 text-clay" aria-hidden="true">
              <Gift className="h-5 w-5" strokeWidth={1.4} />
            </div>
            <p className="mt-7 pl-[0.35em] text-[10px] font-medium uppercase tracking-[0.35em] text-clay">Purchase a gift card</p>
            <h2 className="mt-5 font-serif text-[32px] font-normal leading-[1.15] sm:text-[40px]">Contact our team.</h2>
            <p className="mt-5 max-w-[430px] text-[15px] font-light leading-[1.75] text-taupe/85">
              We will help you with the current gift card choices and purchase details.
            </p>
            <div className="mt-8 flex flex-col items-start gap-cta sm:flex-row sm:flex-wrap">
              <Button asChild className="h-12 rounded-cta bg-taupe px-6 text-[11px] font-medium uppercase tracking-[0.24em] text-pearl shadow-none hover:bg-umber">
                <a href="mailto:anna@wowapartments.se?subject=Gift%20card%20enquiry">
                  <Mail aria-hidden="true" />
                  Email us
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-cta border-clay/55 bg-transparent px-6 text-[11px] font-medium uppercase tracking-[0.24em] text-taupe shadow-none hover:bg-sand">
                <a href="tel:+46764007711">
                  <Phone aria-hidden="true" />
                  Call us
                </a>
              </Button>
            </div>
            <div className="mt-8 space-y-2 text-[15px] font-light leading-[1.7]">
              <a href="mailto:anna@wowapartments.se?subject=Gift%20card%20enquiry" className="block underline decoration-clay/55 underline-offset-4 transition-colors hover:text-umber">
                anna@wowapartments.se
              </a>
              <a href="tel:+46764007711" className="block transition-colors hover:text-umber">
                +46 (0)76 400 77 11
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}