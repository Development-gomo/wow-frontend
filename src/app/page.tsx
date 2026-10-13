import type { Metadata } from "next";

import { HomePage } from "./home-page";

/** Ported from the `head()` of the original src/routes/index.tsx. */
export const metadata: Metadata = {
  title: "WOW Apartments & Rooms — Gothenburg",
  description:
    "A handpicked collection of apartments and rooms in central Gothenburg. Not an ordinary hotel. Feel at home, and get a little WOW.",
  openGraph: {
    title: "WOW Apartments & Rooms — Gothenburg",
    description: "Feel at home in Gothenburg. Apartments and rooms with a warm nordic soul.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <HomePage />;
}
