import type { Metadata } from "next";

import { BookRoomPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/rooms.tsx. */
export const metadata: Metadata = {
  title: "Book a Room — WOW Apartments & Rooms",
  description: "Choose between our single rooms, double rooms and suites in central Gothenburg. Warm, handpicked stays with a Nordic soul.",
  openGraph: {
    title: "Book a Room — WOW Apartments & Rooms",
    description: "Single rooms, double rooms and suites — handpicked stays in Gothenburg.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <BookRoomPage />;
}
