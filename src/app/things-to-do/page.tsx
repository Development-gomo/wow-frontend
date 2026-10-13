import type { Metadata } from "next";

import { ThingsToDoPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/things-to-do.tsx. */
export const metadata: Metadata = {
  title: "Things to do in Gothenburg — WOW Apartments & Rooms",
  description: "Discover things to do in Gothenburg while staying with WOW Apartments & Rooms.",
  openGraph: {
    title: "Things to do in Gothenburg — WOW Apartments & Rooms",
    description: "Discover things to do in Gothenburg while staying with WOW Apartments & Rooms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <ThingsToDoPage />;
}
