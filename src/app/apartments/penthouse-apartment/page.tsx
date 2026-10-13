import type { Metadata } from "next";

import { PenthouseApartmentPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/apartments_.penthouse-apartment.tsx. */
export const metadata: Metadata = {
  title: "Penthouse Apartment — WOW Apartments & Rooms",
  description: "A spacious top-floor apartment in Gothenburg with a private terrace, full kitchen and panoramic views.",
  openGraph: {
    title: "Penthouse Apartment — WOW Apartments & Rooms",
    description: "A spacious top-floor apartment in Gothenburg with a private terrace, full kitchen and panoramic views.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PenthouseApartmentPage />;
}
