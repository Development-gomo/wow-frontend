"use client";

import thingsToDoHero from "@/assets/uploads/things-to-do-hero.webp.asset.json";
import { ExternalGuideCallout } from "@/components/external-guide-callout";
import { StayCtaBanner } from "@/components/stay-cta-banner";
import { PageHero } from "@/components/page-hero";
import hagaImg from "@/assets/uploads/ttd-haga.webp.asset.json";
import slottsskogenImg from "@/assets/uploads/ttd-slottsskogen.webp.asset.json";
import avenynImg from "@/assets/uploads/ttd-avenyn.webp.asset.json";
import museumOfArtImg from "@/assets/uploads/ttd-museum-of-art.webp.asset.json";
import saluhallenImg from "@/assets/uploads/ttd-saluhallen.webp.asset.json";
import linneImg from "@/assets/uploads/ttd-linne.webp.asset.json";
import lisebergImg from "@/assets/uploads/ttd-liseberg.webp.asset.json";
import delsjonImg from "@/assets/uploads/ttd-delsjon.webp.asset.json";
import universeumImg from "@/assets/uploads/ttd-universeum.webp.asset.json";
import orgryteAreaImg from "@/assets/uploads/ttd-orgryte-area.webp.asset.json";
import worldCultureImg from "@/assets/uploads/ttd-world-culture.webp.asset.json";
import skatasImg from "@/assets/uploads/ttd-skatas.webp.asset.json";
import chalmersImg from "@/assets/uploads/ttd-chalmers.webp.asset.json";
import botanicalImg from "@/assets/uploads/ttd-botanical.webp.asset.json";
import scandinaviumImg from "@/assets/uploads/ttd-scandinavium.webp.asset.json";
import jhbCafesImg from "@/assets/uploads/ttd-jhb-cafes.webp.asset.json";
import gotaplatsenImg from "@/assets/uploads/ttd-gotaplatsen.webp.asset.json";
import korsvagenImg from "@/assets/uploads/ttd-korsvagen.webp.asset.json";
import { NeighbourhoodExplorer, type Neighbourhood } from "@/components/neighbourhood-explorer";
import visitGothenburg from "@/assets/uploads/ttd-visit-gothenburg.png.asset.json";


const NEIGHBOURHOODS: Neighbourhood[] = [
  { name: "Vasastan", intro: "Historic streets, independent cafés, shopping and easy access to Gothenburg's cultural highlights.", places: [
    { kicker: "Local culture", title: "Haga", description: "Wander historic cobbled streets and discover charming cafés and independent shops.", image: hagaImg.url, href: "#haga" },
    { kicker: "Nature & outdoors", title: "Slottsskogen", description: "Enjoy green spaces, peaceful walking paths and one of Gothenburg's best-loved parks.", image: slottsskogenImg.url, href: "#slottsskogen" },
    { kicker: "Shopping & city life", title: "Avenyn", description: "Explore Gothenburg's main boulevard, lined with shops, restaurants and lively cafés.", image: avenynImg.url, href: "#avenyn" },
    { kicker: "Art & culture", title: "Gothenburg Museum of Art", description: "Discover Nordic and international artworks in the heart of the city.", image: museumOfArtImg.url, href: "#museum-of-art" },
    { kicker: "Food & drink", title: "Saluhallen", description: "Explore local flavours, delicacies and food stalls in Gothenburg's historic market hall.", image: saluhallenImg.url, href: "#saluhallen" },
    { kicker: "City experiences", title: "Linné", description: "Discover a lively neighbourhood known for its restaurants, relaxed cafés and local character.", image: linneImg.url, href: "#linne" },
  ] },
  { name: "Örgryte", intro: "A quieter side of Gothenburg, with greenery, family-friendly attractions and local neighbourhood charm.", places: [
    { kicker: "Entertainment", title: "Liseberg", description: "Experience one of Scandinavia's best-known amusement parks.", image: lisebergImg.url, href: "#liseberg" },
    { kicker: "Nature & outdoors", title: "Delsjön", description: "Enjoy lakeside walks, nature trails and beautiful outdoor surroundings.", image: delsjonImg.url, href: "#delsjon" },
    { kicker: "Family experiences", title: "Universeum", description: "Discover science, nature and interactive experiences for all ages.", image: universeumImg.url, href: "#universeum" },
    { kicker: "Local life", title: "Örgryte Neighbourhood", description: "Explore peaceful residential streets, historic architecture and local surroundings.", image: orgryteAreaImg.url, href: "#orgryte-area" },
    { kicker: "Culture & events", title: "Museum of World Culture", description: "Explore exhibitions that offer different perspectives on the world around us.", image: worldCultureImg.url, href: "#world-culture" },
    { kicker: "Outdoor experiences", title: "Skatås", description: "Enjoy walking, running and outdoor recreation in a natural setting.", image: skatasImg.url, href: "#skatas" },
  ] },
  { name: "Johanneberg", intro: "A leafy neighbourhood close to university life, cultural attractions and popular Gothenburg destinations.", places: [
    { kicker: "Architecture & culture", title: "Chalmers", description: "Discover the character and architecture of Gothenburg's well-known university campus.", image: chalmersImg.url, href: "#chalmers" },
    { kicker: "Nature & gardens", title: "Gothenburg Botanical Garden", description: "Explore peaceful gardens, beautiful plant collections and scenic walking paths.", image: botanicalImg.url, href: "#botanical" },
    { kicker: "Events & entertainment", title: "Scandinavium", description: "Discover concerts, sporting events and live entertainment.", image: scandinaviumImg.url, href: "#scandinavium" },
    { kicker: "Food & local life", title: "Johanneberg Cafés", description: "Enjoy neighbourhood cafés and relaxed local dining.", image: jhbCafesImg.url, href: "#jhb-cafes" },
    { kicker: "Art & culture", title: "Götaplatsen", description: "Discover one of Gothenburg's cultural landmarks, surrounded by museums and arts venues.", image: gotaplatsenImg.url, href: "#gotaplatsen" },
    { kicker: "City experiences", title: "Korsvägen", description: "Explore a lively area connecting several of Gothenburg's popular attractions.", image: korsvagenImg.url, href: "#korsvagen" },
  ] },
];

export function ThingsToDoPage() {
  return (
    <main className="bg-background">
      <PageHero
        title="Things to do in Gothenburg"
        imageUrl={thingsToDoHero.url}
        imageAlt="Gothenburg skyline in the evening sun, seen from a leafy hilltop"
        overlayClassName="bg-taupe/35"
      />
      <NeighbourhoodExplorer
        eyebrow="Explore Gothenburg"
        title="Find something wonderful nearby."
        description="Choose your WOW neighbourhood to explore local highlights."
        neighbourhoods={NEIGHBOURHOODS}
      />
      <ExternalGuideCallout
        eyebrow="Discover more"
        title="More to explore in Gothenburg."
        description={"From neighbourhood guides and seasonal tips to cultural highlights and archipelago adventures\u00a0 find more inspiration on the official Visit Gothenburg guide."}
        ctaLabel="Visit Gothenburg guide"
        ctaHref="https://www.goteborg.com/"
        image={visitGothenburg.url}
        imageAlt="Gothenburg waterfront at sunset with harbour buildings, boats and the Älvsborg Bridge in the distance"
      />
      <StayCtaBanner
        title="Rooms for a few nights. Apartments for longer stays."
        description="Find the right place across our Gothenburg locations, whether you’re staying briefly or for longer."
        secondaryLabel="Book apartment"
      />
    </main>
  );
}