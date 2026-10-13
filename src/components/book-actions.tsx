import { Link } from "@tanstack/react-router";

import { useSite } from "@/components/cms/site-context";
import { Button } from "@/components/ui/button";

/**
 * The "Book room" / "Book apartment" pair, styled exactly as in the desktop
 * navbar. Labels and destinations come from WordPress › Site settings ›
 * Booking buttons, the same source the navbar uses.
 *
 * Renders just the two buttons; the caller supplies the wrapping element.
 */
export function BookActions({ onNavigate }: { onNavigate?: () => void }) {
  const { booking } = useSite();

  return (
    <>
      <Button asChild className="h-9 rounded-cta bg-taupe px-2 text-[9px] font-medium uppercase tracking-[0.04em] text-ivory shadow-none transition-colors duration-200 hover:bg-umber sm:h-11 sm:px-5 sm:text-[11px] sm:tracking-[0.24em] xl:px-7">
        <Link to={booking.roomTo} onClick={onNavigate}>{booking.roomLabel}</Link>
      </Button>
      <Button asChild className="h-9 rounded-cta bg-taupe/65 px-2 text-[9px] font-medium uppercase tracking-[0.04em] text-ivory shadow-none transition-colors duration-200 hover:bg-taupe/85 sm:h-11 sm:px-5 sm:text-[11px] sm:tracking-[0.24em] xl:px-7">
        <Link to={booking.apartmentTo} onClick={onNavigate}>{booking.apartmentLabel}</Link>
      </Button>
    </>
  );
}
