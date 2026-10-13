import type { Metadata } from "next";

import { LocationsPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/locations.tsx. */
export const metadata: Metadata = {
  title: "Our Locations — WOW Apartments & Rooms",
  description: "Explore WOW's welcoming locations in Gothenburg. Furnished rooms and apartments in Vasastan, Johanneberg and Örgryte.",
  openGraph: {
    title: "Our Locations — WOW Apartments & Rooms",
    description: "Explore WOW's welcoming locations in Gothenburg. Furnished rooms and apartments in Vasastan, Johanneberg and Örgryte.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <LocationsPage />;
}
