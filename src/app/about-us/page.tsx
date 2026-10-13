import type { Metadata } from "next";

import { AboutUsPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/about-us.tsx. */
export const metadata: Metadata = {
  title: "About Us — WOW Apartments & Rooms",
  description: "Learn about WOW Apartments & Rooms in Gothenburg. Personal, flexible and welcoming accommodation since 2013.",
  openGraph: {
    title: "About Us — WOW Apartments & Rooms",
    description: "Personal, flexible and welcoming accommodation in Gothenburg since 2013.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <AboutUsPage />;
}
