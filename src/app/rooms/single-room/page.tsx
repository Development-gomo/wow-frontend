import type { Metadata } from "next";

import { SingleRoomPage } from "./page-body";

/** Ported from the `head()` of the original src/routes/rooms_.single-room.tsx. */
export const metadata: Metadata = {
  title: "Single Room — WOW Apartments & Rooms",
  description: "A quiet, comfortable single room in Gothenburg with soft linen bedding, a workspace nook and shared or private bathroom.",
  openGraph: {
    title: "Single Room — WOW Apartments & Rooms",
    description: "A quiet, comfortable single room in Gothenburg with soft linen bedding, a workspace nook and shared or private bathroom.",
    type: "website",
    images: ["/__l5e/assets-v1/51ff4cbf-58fd-4863-8450-9c7fdcc04d9a/single-8c22e420bf49257f0dd09359ff9f2a32.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/__l5e/assets-v1/51ff4cbf-58fd-4863-8450-9c7fdcc04d9a/single-8c22e420bf49257f0dd09359ff9f2a32.jpg"],
  },
};

export default function Page() {
  return <SingleRoomPage />;
}
