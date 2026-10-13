import type { Metadata } from "next";

import { GiftCardPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/gift-card.tsx. */
export const metadata: Metadata = {
  title: "Gift Cards — WOW Apartments & Rooms",
  description: "Purchase a WOW Apartments & Rooms gift card by contacting our Gothenburg team by email or phone.",
  openGraph: {
    title: "Gift Cards — WOW Apartments & Rooms",
    description: "Give someone a stay with WOW. Contact our team by email or phone to purchase a gift card.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <GiftCardPage />;
}
