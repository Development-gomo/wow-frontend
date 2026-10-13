"use client";

import { Link } from "@tanstack/react-router";
import { StayCtaBanner } from "@/components/stay-cta-banner";
import { PageHero } from "@/components/page-hero";
import heroAboutAsset from "@/assets/uploads/hero-about.png.asset.json";
import foreningsgatanFacade from "@/assets/locations/foreningsgatan-facade.jpg";
import sanktSigfridsgatanAvenue from "@/assets/locations/sankt-sigfridsgatan-avenue.jpg";
import fridkullagatanBuilding from "@/assets/locations/fridkullagatan-building.jpg";
import ceciliaPortraitAsset from "@/assets/uploads/IMG_4137.asset.json";
import responsibleHostingAsset from "@/assets/uploads/responsible-hosting.jpg.asset.json";
import workWithUsPeople from "@/assets/about/work-with-us-people.jpg";


export function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <PageHero
        title="About WOW"
        imageUrl={heroAboutAsset.url}
        imageAlt="A sunlit Scandinavian lounge with cream sofas, wooden tables and golden afternoon light"
        overlayClassName="bg-umber/35"
      />

      {/* Our Story */}
      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div className="flex min-w-0 flex-col gap-6">
            <div className="aspect-[1/1.08] w-full overflow-hidden lg:h-[480px] lg:aspect-auto">
              <img
                src={ceciliaPortraitAsset.url}
                alt="Cecilia standing by the window of a WOW apartment"
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex items-center gap-[18px] px-1">
              <span className="shrink-0 pl-[0.4em] text-[10px] uppercase tracking-[0.4em] text-clay">Cecilia</span>
              <span className="h-px flex-1 bg-clay/50" />
              <span className="shrink-0 pl-[0.4em] text-[10px] uppercase tracking-[0.4em] text-clay">Founder &amp; Owner</span>
            </div>
          </div>

          <div className="min-w-0">
            <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">
              About — Our story
            </span>
            <p className="mt-6 max-w-[560px] font-serif text-[28px] italic font-normal leading-[1.3] text-taupe sm:text-[32px]">
              When I created WOW in 2013, my idea was simple. To offer furnished apartments and rooms in Gothenburg that truly feel like home.
            </p>
            <div className="mt-8 h-px w-11 bg-clay" />
            <div className="mt-8 flex max-w-[520px] flex-col gap-3 text-[15px] font-light leading-[1.8] text-taupe/90">
              <p>
                Behind WOW Apartments is Cecilia, who has carefully transformed three properties in central Gothenburg into intimate apartment hotels.
              </p>
              <p>
                The work has always been about preserving the character and charm of each building, while quietly adding every comfort a modern business or leisure traveller needs. The result is personal, flexible and welcoming accommodation — shaped around the way you actually live.
              </p>
              <p>
                We are one of few in the industry to offer both apartments and rooms, for companies and private guests alike — for stays ranging from a few nights to several months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy — dark quote band */}
      <section className="bg-taupe px-6 py-16 text-linen sm:px-10 md:py-16 lg:px-20">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:flex-row md:items-center md:gap-[88px]">
          {/* LEFT: eyebrow + body */}
          <div className="flex max-w-[460px] min-w-0 flex-1 flex-col">
            <span className="block pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-linen/70">
              Our philosophy
            </span>
            <p className="mt-6 text-[15px] font-light leading-[1.8] text-linen/90">
              We treat our guests as friends of the family. Whether you stay for a few nights or several months, we do everything we can to make your stay feel safe, smooth and comfortable.
            </p>
            <p className="mt-3 text-[15px] font-light leading-[1.8] text-linen/90">
              You will always reach us directly; we are responsive, professional and genuinely engaged in making your stay smooth and comfortable.
            </p>
          </div>

          {/* Vertical divider */}
          <div aria-hidden="true" className="hidden w-px shrink-0 self-center bg-linen/25 md:block md:h-[300px]" />

          {/* RIGHT: quote + attribution */}
          <div className="flex max-w-[500px] min-w-0 flex-1 flex-col">
            <blockquote className="font-serif text-[34px] font-normal italic leading-[1.2] text-linen sm:text-[42px] md:text-[52px]">
              &ldquo;An accommodation that feels like home&rdquo;
            </blockquote>
            <div className="mt-8 pl-[0.4em] text-[11px] font-normal uppercase tracking-[0.4em] text-linen/70">
              // Cecilia
            </div>
          </div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="bg-background px-6 pt-20 sm:px-10 sm:pt-24 lg:px-20 lg:pt-32">
        <div className="flex flex-col items-center text-center">
          <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">
            Our locations
          </span>
          <h2 className="mt-6 font-serif text-[34px] font-normal leading-[1.15] text-taupe sm:text-[clamp(34px,3.75vw,48px)]">
            Three neighbourhoods. One warm welcome.
          </h2>

          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-[14px] border-b border-clay/55 pb-[6px] pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70 motion-safe:hover:gap-[20px] sm:mt-12"
          >
            <span>View all locations</span>
            <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path d="M1 6 H14 M10 2 L14 6 L10 10" />
            </svg>
          </Link>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1200px] grid-cols-1 gap-10 sm:mt-16 md:grid-cols-3 md:gap-8">
          <LocationCard
            area="Vasastan"
            name="Föreningsgatan 7 & 9"
            image={foreningsgatanFacade}
            imageAlt="Föreningsgatan in Vasastan"
            description="Tree-lined boulevard with cafés, bakeries and parks just around the corner."
          />
          <LocationCard
            area="Örgryte"
            name="Sankt Sigfridsgatan 64–66"
            image={sanktSigfridsgatanAvenue}
            imageAlt="Sankt Sigfridsgatan in Örgryte"
            description="A calm residential neighbourhood close to Chalmers and the city centre."
          />
          <LocationCard
            area="Johanneberg"
            name="Fridkullagatan 2"
            image={fridkullagatanBuilding}
            imageAlt="Fridkullagatan in Johanneberg"
            description="Leafy streets, historic villas and walking distance to Liseberg."
          />
        </div>
      </section>

      {/* Responsible Hosting */}
      <section className="bg-background px-6 pt-[128px] sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-24">
          {/* LEFT: text */}
          <div className="flex min-w-0 flex-col">
            <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">
              Responsible hosting
            </span>
            <p className="mt-6 max-w-[520px] font-serif text-[28px] font-normal leading-[1.3] text-taupe sm:text-[32px]">
              We believe responsible hosting starts with caring for our homes, making thoughtful choices, and supporting the neighbourhood.
            </p>
            <p className="mt-4 max-w-[460px] text-[14px] font-light leading-[1.75] text-taupe/80">
              Our approach is simple: create comfortable, well-considered places to live while respecting the character of each property and the city around it.
            </p>
            <Link
              to="/"
              className="mt-12 inline-flex items-center gap-[14px] self-start border-b border-clay/55 pb-[6px] pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70"
            >
              <span>Our sustainability</span>
              <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                <path d="M1 6 H14 M10 2 L14 6 L10 10" />
              </svg>
            </Link>
          </div>

          {/* RIGHT: photo */}
          <div className="aspect-[1/0.88] w-full overflow-hidden lg:self-center">
            <img
              src={responsibleHostingAsset.url}
              alt="Lifestyle interior at a WOW apartment, windowsill with plants and a view toward the neighbourhood"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Work with us */}
      <section className="bg-background px-6 pb-[128px] pt-[128px] sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:flex-row md:gap-[96px]">
          {/* LEFT: photo — stretches to match the content column */}
          <div className="aspect-[4/5] w-full min-w-0 flex-1 overflow-hidden md:aspect-auto md:h-auto">
            <img
              src={workWithUsPeople}
              alt="Two colleagues working together at a table in a sunlit WOW lounge"
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* RIGHT: intro + mail + apply */}
          <div className="flex max-w-[620px] min-w-0 flex-[1.4] flex-col">
            <span className="block pl-[0.45em] text-[10px] uppercase tracking-[0.45em] text-clay">
              Work with us
            </span>
            <h2 className="mt-6 font-serif text-[36px] font-normal leading-[1.15] text-taupe sm:text-[clamp(36px,4.1vw,52px)]">
              Looking for your next
              <br className="hidden sm:block" /> place to grow?
            </h2>
            <p className="mt-4 max-w-[500px] text-[15px] font-light leading-[1.75] text-taupe/85">
              We&rsquo;re always interested in meeting people who care about thoughtful hospitality, good service and creating a warm experience for every guest.
            </p>
            <div className="mt-12 text-[14px] font-light leading-[1.6] text-taupe/80">
              Mail us at
            </div>
            <a
              href="mailto:careers@wowapartments.se"
              className="mt-2 self-start border-b border-clay/60 pb-[4px] font-serif text-[22px] font-normal leading-[1.2] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70 sm:text-[26px]"
            >
              careers@wowapartments.se
            </a>
            <a
              href="mailto:careers@wowapartments.se"
              className="mt-[48px] inline-flex items-center gap-[14px] self-start border-b border-clay/55 pb-[6px] pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] text-taupe transition-colors duration-200 hover:border-clay hover:text-taupe/70"
            >
              <span>View all openings</span>
              <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                <path d="M1 6 H14 M10 2 L14 6 L10 10" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <StayCtaBanner
        title="Rooms for a few nights. Apartments for longer stays."
        description="Find the right place across our Gothenburg locations, whether you’re staying briefly or for longer."
        secondaryLabel="Book apartment"
      />

    </div>
  );
}

function LocationCard({
  name,
  area,
  image,
  imageAlt,
  description,
}: {
  name: string;
  area: string;
  image: string;
  imageAlt: string;
  description: string;
}) {
  return (
    <article className="group flex min-w-0 flex-col">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="mt-6 pl-[0.4em] text-[10px] uppercase tracking-[0.4em] text-clay">
        {area}
      </div>
      <h3 className="mt-3 font-serif text-[22px] font-normal leading-[1.2] text-taupe md:text-[26px]">
        {name}
      </h3>
      <p className="mt-2 max-w-[320px] text-[14px] font-light leading-[1.65] text-taupe/80">
        {description}
      </p>
    </article>
  );
}
