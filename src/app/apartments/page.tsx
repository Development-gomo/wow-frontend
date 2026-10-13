import type { Metadata } from "next";

import { BookApartmentPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/apartments.tsx. */
export const metadata: Metadata = {
  title: "Book an Apartment — WOW Apartments & Rooms",
  description: "Choose between our penthouse, superior and garden apartments in central Gothenburg. Fully equipped homes with a Nordic soul.",
  openGraph: {
    title: "Book an Apartment — WOW Apartments & Rooms",
    description: "Penthouse, superior and garden apartments — handpicked stays in Gothenburg.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <BookApartmentPage />;
}
