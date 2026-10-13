"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StatsBand } from "@/components/stats-band";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/faq-section";
import { StayCtaBanner } from "@/components/stay-cta-banner";
import { WelcomingLocations } from "@/components/welcoming-locations";
import { AccommodationGrid } from "@/components/accommodation-listing";
import { GuestExperiences } from "@/components/guest-experiences";
import { WhyWow, WhyWowIcons, type WhyWowItem } from "@/components/why-wow";

import { ROOMS, APARTMENTS } from "@/data/accommodations";
import heroVideoAsset from "@/assets/uploads/hero-bedroom-video.mp4.asset.json";
import galleryBedroom from "@/assets/gallery/gallery-bedroom.jpg.asset.json";
import galleryLiving from "@/assets/uploads/IMG_1256.asset.json";
import galleryDetail from "@/assets/uploads/IMG_4067.asset.json";
import galleryLounge from "@/assets/uploads/IMG_4117.asset.json";
import galleryKitchen from "@/assets/uploads/IMG_5731.asset.json";
import galleryWindow from "@/assets/uploads/IMG_8843.asset.json";
import galleryBed from "@/assets/uploads/IMG_8848.asset.json";
import gallerySuite from "@/assets/uploads/IMG_8884.asset.json";
import volvoLogo from "@/assets/client-logos/volvo.png.asset.json";
import ericssonLogo from "@/assets/client-logos/ericsson.png.asset.json";
import skfLogo from "@/assets/client-logos/skf.svg.asset.json";


const HEADLINES = [
  {
    title: "Welcome to feel at home.",
    sub: "Book your stay and get a little WOW",
    label: "Not an ordinary hotel in Gothenburg.",
  },
];

export function HomePage() {
  const [headlineIdx, setHeadlineIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeadlineIdx((i) => (i + 1) % HEADLINES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-clay/30">
      <Hero headline={HEADLINES[headlineIdx]} idx={headlineIdx} />
      <Intro />
      <Accommodations />
      <WelcomingLocations />
      <WhyWow
        heading={<>Stay for a night<br />or settle for months.</>}
        description="Business stays, relocation, longer visits and company bookings in Gothenburg."
        items={WHY_WOW_ITEMS}
        ctaLabel="Learn more about WOW"
        ctaTo="/about-us"
      />
      <GuestExperiences
        eyebrow="Guest experiences"
        title="Feel at home, from the first night."
        description="See what guests say about staying with WOW in Gothenburg."
        rating={4.5}
        reviewSource="Google Reviews"
        reviewCount={137}
        reviews={guestTestimonials}
        className="pt-32 pb-32 md:pt-32 md:pb-32"
      />

      <Gallery />
      <FaqSection className="pt-32 pb-32 md:pt-32 md:pb-32" />
      <StayCtaBanner
        title="Rooms for a few nights. Apartments for longer stays."
        description="Find the right place across our Gothenburg locations, whether you’re staying briefly or for longer."
        secondaryLabel="Book apartment"
      />
    </div>
  );
}

/* -------------------- HERO -------------------- */
function Hero({ headline, idx }: { headline: { title: string; sub: string; label: string }; idx: number }) {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <video
        src={heroVideoAsset.url}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-taupe/30 via-taupe/10 to-taupe/60" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div key={idx} className="animate-fadein max-w-3xl">
          <span className="block text-linen/85 text-[10.5px] md:text-[11px] uppercase tracking-[0.45em] mb-6">
            {headline.label}
          </span>
          <h1 className="font-serif text-linen text-[34px] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-light tracking-[-0.005em]">
            {headline.title}
          </h1>
          <p className="mt-6 text-linen/90 text-base md:text-lg italic font-serif tracking-wide">
            {headline.sub}
          </p>
        </div>

        <div className="relative z-10 mt-10 flex flex-col sm:flex-row gap-cta">
          <Button asChild className="inline-flex items-center justify-center px-8 h-12 text-[11px] uppercase tracking-[0.28em] font-medium text-taupe bg-linen/95 hover:bg-sand hover:text-umber shadow-none transition-colors duration-200 rounded-cta">
            <Link to="/book-room">Book Room</Link>
          </Button>
          <Button asChild className="inline-flex items-center justify-center px-8 h-12 text-[11px] uppercase tracking-[0.28em] font-medium text-linen border border-linen/80 bg-transparent hover:bg-linen hover:text-taupe shadow-none transition-colors rounded-cta">
            <Link to="/book-apartment">Book Apartment</Link>
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadein { animation: fadein 1.1s ease-out both; }
      `}</style>
    </section>
  );
}

/* -------------------- INTRO -------------------- */
const CLIENT_LOGOS = [
  { name: "Volvo", src: volvoLogo.url, size: "max-h-[19px] max-w-[96px]" },
  { name: "Ericsson", src: ericssonLogo.url, size: "max-h-[44px] max-w-[50px]" },
  { name: "SKF", src: skfLogo.url, size: "max-h-[17px] max-w-[74px]" },
];

const STATS = [
  { value: "15+", label: "Years welcoming guests" },
  { value: "3,000+", label: "Stays hosted" },
  { value: "45+", label: "Companies accommodated" },
  { value: "4.8/5", label: "Guest rating" },
];


function Intro() {
  return (
    <section className="px-6 pt-16 pb-16 md:px-10 text-center">
      {/* Logo strip hidden on the homepage. Markup kept here — restore by uncommenting
          this block together with CLIENT_LOGOS above and the three logo asset imports.
      <div
        className="wow-logo-marquee-viewport -mx-6 md:-mx-10"
        aria-label="Companies and organisations that have stayed with us"
      >
        <div className="wow-logo-marquee-track">
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="wow-logo-marquee-set" aria-hidden={setIndex === 1 ? true : undefined}>
              {Array.from({ length: 4 }, () => CLIENT_LOGOS).flat().map((logo, i) => (
                <div key={`${setIndex}-${i}-${logo.name}`} className="flex min-h-14 shrink-0 items-center justify-center">
                  <img src={logo.src} alt={setIndex === 0 ? logo.name : ""} aria-hidden={setIndex === 1 ? true : undefined} className={`h-auto w-auto object-contain opacity-70 ${logo.size}`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      */}



      <div className="mx-auto max-w-4xl">
        <span className="block text-[10px] uppercase tracking-[0.35em] text-clay mb-6">
          A warm welcome
        </span>
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] font-light text-taupe">
          Stay for a night or settle for months.
        </h2>
        <p className="mt-4 text-[15px] md:text-base leading-[1.85] text-taupe/80 max-w-3xl mx-auto">
          WOW Apartments &amp; Rooms is a small collection of carefully kept apartments and rooms
          in some of Gothenburg's finest locations. Nordic design, soft linen, slow mornings and a
          private kitchen if you want one. We are here when you need us, and out of the way when you don't.
          Welcome to stay as long as you want.
        </p>
      </div>

      <StatsBand stats={STATS} className="mt-16" />
    </section>
  );
}

/* -------------------- ACCOMMODATIONS -------------------- */
function Accommodations() {
  const [category, setCategory] = useState<"rooms" | "apartments">("rooms");
  const isRooms = category === "rooms";
  const bookingPath = isRooms ? "/rooms" : "/apartments";
  return (
    <section id="rum" className="overflow-x-clip bg-linen py-32 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto">
          <span className="block text-[10px] uppercase tracking-[0.45em] text-clay">
            Home comfort with hotel freedom
          </span>
          <h2 className="font-serif text-[42px] md:text-[48px] text-taupe font-normal leading-[1.15] mt-6">
            Rooms &amp; Apartments
          </h2>
          <p className="text-[15px] leading-[1.8] text-taupe/85 max-w-[560px] mx-auto mt-4">
            A small, handpicked collection on Föreningsgatan in Vasastan.
            Choose a private room, a generous suite or a fully equipped apartment —
            all made to feel like home.
          </p>
          <div role="tablist" aria-label="Choose room or apartment" className="mt-16 flex w-full gap-cta sm:w-auto sm:inline-flex">
            <button
              role="tab"
              id="rooms-tab"
              aria-selected={isRooms}
              aria-controls="accommodation-panel"
              onClick={() => setCategory("rooms")}
              className={`flex-1 sm:flex-none sm:w-[200px] h-12 rounded-cta border font-medium uppercase tracking-[0.28em] cursor-pointer transition-colors duration-200 ${isRooms ? "bg-taupe border-taupe text-ivory hover:bg-umber hover:border-umber" : "bg-taupe/65 border-transparent text-ivory hover:bg-taupe/85"}`}
            >
              Rooms
            </button>
            <button
              role="tab"
              id="apartments-tab"
              aria-selected={!isRooms}
              aria-controls="accommodation-panel"
              onClick={() => setCategory("apartments")}
              className={`flex-1 sm:flex-none sm:w-[200px] h-12 rounded-cta border font-medium uppercase tracking-[0.28em] cursor-pointer transition-colors duration-200 ${!isRooms ? "bg-taupe border-taupe text-ivory hover:bg-umber hover:border-umber" : "bg-taupe/65 border-transparent text-ivory hover:bg-taupe/85"}`}
            >
              Apartments
            </button>
          </div>
        </div>

        <div key={category} id="accommodation-panel" role="tabpanel" aria-labelledby={isRooms ? "rooms-tab" : "apartments-tab"} className="w-full mt-12 flex justify-center animate-accommodation-in">
          <AccommodationGrid
            accommodations={isRooms ? ROOMS : APARTMENTS}
            actionLabel={isRooms ? "Book" : "See Availability"}
            actionTo={isRooms ? "/book-room" : "/book-apartment"}
            hideDivider={!isRooms}
          />
        </div>
        <Button asChild className="mt-16 h-12 px-8 rounded-cta bg-taupe text-pearl hover:bg-umber text-[11px] uppercase tracking-[0.28em] gap-4">
          <Link to={bookingPath}>
            View all {isRooms ? "rooms" : "apartments"}
          </Link>
        </Button>
      </div>
    </section>
  );
}

/* -------------------- WHY WOW -------------------- */
const WHY_WOW_ITEMS: WhyWowItem[] = [
  {
    icon: WhyWowIcons.flexibleStays,
    title: "Flexible stays",
    text: "Stay for a few nights, several weeks or longer depending on what you need.",
  },
  {
    icon: WhyWowIcons.fullyFurnished,
    title: "Fully furnished",
    text: "Thoughtfully furnished spaces designed for comfortable everyday living.",
  },
  {
    icon: WhyWowIcons.everythingYouNeed,
    title: "Everything you need",
    text: "Wi-Fi, kitchen access and essential amenities are ready when you arrive.",
  },
  {
    icon: WhyWowIcons.personalService,
    title: "Personal service",
    text: "A local team is here to help before, during and throughout your stay.",
  },
];

const guestTestimonials = [
  {
    quote: "Beautiful, calm and thoughtfully furnished. It really felt like a home from the first night.",
    name: "Emma L.",
    stay: "Business stay · 8 weeks",
    location: "Föreningsgatan",
  },
  {
    quote: "Perfect for our relocation. Spacious, well equipped and in a great neighbourhood. We couldn’t have asked for more.",
    name: "James T.",
    stay: "Relocation stay · 2 months",
    location: "Sankt Sigfridsgatan",
  },
  {
    quote: "Stylish, spotless and in a fantastic location. We had a wonderful weekend and will definitely be back.",
    name: "Sophie K.",
    stay: "Weekend stay · 5 nights",
    location: "Fridkullagatan",
  },
];

/* -------------------- GALLERY -------------------- */
const GALLERY_PHOTOS = [
  { src: galleryBedroom.url, alt: "Bedroom with woven pendant light, soft linen and framed art" },
  { src: galleryLiving.url, alt: "Bright living area with comfortable seating and soft daylight" },
  { src: galleryDetail.url, alt: "Detail of the bedroom with crisp white bedding" },
  { src: galleryLounge.url, alt: "Calm seating nook beside the window" },
  { src: galleryKitchen.url, alt: "Light-filled apartment corner with dining table" },
  { src: galleryWindow.url, alt: "Bedroom with soft curtains and gentle morning light" },
  { src: galleryBed.url, alt: "Double bed dressed in white linen with bedside lamp" },
  { src: gallerySuite.url, alt: "Suite bedroom with generous space and warm tones" },
];

function Gallery() {
  return (
    <section id="galleri" className="bg-linen text-taupe py-32 overflow-hidden">
      <div className="flex flex-col items-center text-center px-6">
        <span className="text-[10px] uppercase tracking-[0.45em] text-clay pl-[0.45em]">Glimpses</span>
        <h2 className="font-serif text-[38px] md:text-[48px] font-normal leading-[1.15] mt-[30px]">
          Moments from our homes
        </h2>
        <Link to="/gallery" className="mt-[26px] inline-flex items-center gap-3.5 pb-1.5 pl-[0.32em] text-[11px] font-medium uppercase tracking-[0.32em] border-b border-clay/55 hover:text-umber hover:border-umber/60 focus-visible:outline focus-visible:outline-clay focus-visible:outline-offset-4 transition-colors">
          Full gallery
          <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M1 6h13m-4-4 4 4-4 4" /></svg>
        </Link>
      </div>
      <div id="gallery-photos" role="region" aria-label="Moments from our homes" className="wow-gallery-viewport mt-16 w-full overflow-hidden scroll-mt-24">
        <div className="wow-gallery-track">
          {[0, 1].map((pass) => (
            <div key={pass} className="wow-gallery-set" aria-hidden={pass === 1 ? true : undefined}>
              {GALLERY_PHOTOS.map((photo, i) => (
                <img key={i} src={photo.src} alt={pass === 0 ? photo.alt : ""} loading="lazy" className="w-[220px] md:w-[340px] aspect-[3/4] object-cover shrink-0" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



