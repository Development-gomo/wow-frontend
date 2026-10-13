import type { Metadata } from "next";

import { GalleryPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/gallery.tsx. */
export const metadata: Metadata = {
  title: "Gallery — WOW Apartments & Rooms",
  description: "A closer look at the rooms, apartments and everyday moments that make a stay with WOW in Gothenburg feel like home.",
  openGraph: {
    title: "Gallery — WOW Apartments & Rooms",
    description: "Explore the rooms, apartments and details of a stay with WOW in Gothenburg.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <GalleryPage />;
}
