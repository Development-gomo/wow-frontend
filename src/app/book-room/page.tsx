import type { Metadata } from "next";

import { RoomBookingPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/book-room.tsx. */
export const metadata: Metadata = {
  title: "Reserve Your Room in Gothenburg — WOW Apartments & Rooms",
  description: "Plan your stay at WOW in Gothenburg and explore our thoughtfully furnished single rooms, double rooms and suites.",
  openGraph: {
    title: "Reserve Your Room — WOW Apartments & Rooms",
    description: "Book your Gothenburg stay and find a WOW room that feels like home.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <RoomBookingPage />;
}
