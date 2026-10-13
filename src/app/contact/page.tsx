import type { Metadata } from "next";

import { ContactPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/contact.tsx. */
export const metadata: Metadata = {
  title: "Contact Us — WOW Apartments & Rooms",
  description: "Contact WOW Apartments & Rooms for information, reservations and help planning your stay in Gothenburg.",
  openGraph: {
    title: "Contact Us — WOW Apartments & Rooms",
    description: "Contact WOW Apartments & Rooms for information, reservations and help planning your stay in Gothenburg.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <ContactPage />;
}
