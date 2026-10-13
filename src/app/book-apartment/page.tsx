import type { Metadata } from "next";

import { ApartmentBookingPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/book-apartment.tsx. */
export const metadata: Metadata = {
  title: "Book an Apartment — WOW Apartments & Rooms",
  description: "Enquire about a fully equipped WOW apartment in Gothenburg — penthouse, superior and garden homes for longer stays.",
  openGraph: {
    title: "Book an Apartment — WOW Apartments & Rooms",
    description: "Tell us your dates and we'll find the right WOW apartment for your stay in Gothenburg.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <ApartmentBookingPage />;
}
