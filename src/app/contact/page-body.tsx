"use client";

import contactBedroom from "@/assets/uploads/hero-contact.png.asset.json";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";


export function ContactPage() {
  return (
    <main className="bg-background text-taupe">
      <PageHero
        title="Contact us"
        imageUrl={contactBedroom.url}
        imageAlt="A sunlit reception lounge with fresh flowers in one of our WOW homes"
        overlayClassName="bg-umber/40"
      />

      <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-20 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div className="order-2 lg:order-1">
            <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">Get in touch</p>
            <h2 className="mt-6 max-w-[460px] font-serif text-[36px] font-normal leading-[1.15] sm:text-[48px]">
              How can we help?
            </h2>
            <p className="mt-5 max-w-[430px] text-[15px] font-light leading-[1.75] text-taupe/85">
              Contact us for more information, help with a booking or advice on finding the right room or apartment for your stay.
            </p>

            <div className="mt-12 grid gap-9">
              <div>
                <h3 className="pl-[0.32em] text-[10px] font-medium uppercase tracking-[0.32em] text-clay">Information &amp; booking</h3>
                <div className="mt-4 flex flex-col items-start gap-2 text-[15px] font-light leading-[1.75]">
                  <a href="mailto:anna@wowapartments.se" className="border-b border-clay/55 pb-0.5 transition-colors hover:border-taupe">
                    anna@wowapartments.se
                  </a>
                  <a href="tel:+46764007711" className="transition-colors hover:text-umber">
                    +46 (0)76 400 77 11
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 border-b border-clay/30 pb-16 lg:order-2 lg:border-b-0 lg:border-l lg:pb-0 lg:pl-24">
            <p className="pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">Send a message</p>
            <h2 className="mt-6 font-serif text-[32px] font-normal leading-[1.15] sm:text-[40px]">Tell us about your stay.</h2>
            <div className="mt-9">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}