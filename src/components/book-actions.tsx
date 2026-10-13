import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

/**
 * The "Book room" / "Book apartment" button pair, exactly as it appears in
 * the desktop navbar. Shared so every place that offers this same call to
 * action — the navbar, the gallery page's closing CTA, and anywhere else —
 * stays visually and behaviourally identical by construction.
 *
 * Renders just the two buttons; the caller supplies the wrapping element and
 * its own layout classes (gap, justification, margins).
 */
export function BookActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Button asChild className="h-9 rounded-cta bg-taupe px-2 text-[9px] font-medium uppercase tracking-[0.04em] text-ivory shadow-none transition-colors duration-200 hover:bg-umber sm:h-11 sm:px-5 sm:text-[11px] sm:tracking-[0.24em] xl:px-7">
        <Link to="/book-room" onClick={onNavigate}>Book room</Link>
      </Button>
      <Button asChild className="h-9 rounded-cta bg-taupe/65 px-2 text-[9px] font-medium uppercase tracking-[0.04em] text-ivory shadow-none transition-colors duration-200 hover:bg-taupe/85 sm:h-11 sm:px-5 sm:text-[11px] sm:tracking-[0.24em] xl:px-7">
        <Link to="/book-apartment" onClick={onNavigate}>Book apartment</Link>
      </Button>
    </>
  );
}
