import {
  Archive, BedDouble, BedSingle, Building2, Calendar, CalendarDays, Car, CigaretteOff, ClipboardList, Coffee,
  CookingPot, Droplet, Fence, Gift, Home, IdCard, Key, Lamp, Laptop, Layers, Lock, LogIn, LogOut,
  Mail, MailCheck, MapPin, MessageCircle, MessageSquare, Moon, Mountain, ParkingCircle, PartyPopper, PawPrint,
  Phone, Plane, Search, Send, ShowerHead, Snowflake, Sofa, Sparkles, SquareParking, Thermometer, TrainFront,
  TramFront, Tv, User, UserRound, Users, Wifi, Zap,
  type LucideIcon,
} from "lucide-react";
import { Fragment, type ReactNode } from "react";

import { WhyWowIcons } from "@/components/why-wow";

/**
 * Icon keys -> the icons the components already use.
 *
 * A React component cannot travel over JSON, so the CMS stores an allowlisted
 * string key (see Support\Icons in wow-cms) and it is resolved back here. The
 * two allowlists must agree; `npm run validate` in wow-cms fails if the CMS
 * ever references a key this map does not have.
 */

/** lucide icons, keyed exactly as the CMS stores them. */
const LUCIDE: Record<string, LucideIcon> = {
  Archive, BedDouble, BedSingle, Building2, Calendar, CalendarDays, Car, CigaretteOff, ClipboardList, Coffee,
  CookingPot, Droplet, Fence, Gift, Home, IdCard, Key, Lamp, Laptop, Layers, Lock, LogIn, LogOut,
  Mail, MailCheck, MapPin, MessageCircle, MessageSquare, Moon, Mountain, ParkingCircle, PartyPopper, PawPrint,
  Phone, Plane, Search, Send, ShowerHead, Snowflake, Sofa, Sparkles, SquareParking, Thermometer, TrainFront,
  TramFront, Tv, User, UserRound, Users, Wifi, Zap,
};

/** The bespoke WOW icons, which are JSX elements rather than components. */
const WHY_WOW: Record<string, ReactNode> = WhyWowIcons;

/**
 * Resolve a key to a lucide component.
 *
 * Falls back to a neutral icon rather than crashing, so a stale key in the CMS
 * degrades to a visible-but-harmless default.
 */
export function lucideIcon(key: string | null | undefined): LucideIcon {
  if (key && key in LUCIDE) return LUCIDE[key];

  if (key) console.warn(`[cms] unknown lucide icon key "${key}"`);

  return Sparkles;
}

/** Resolve a key to one of the bespoke WhyWow icons. */
export function whyWowIcon(key: string | null | undefined): ReactNode {
  if (key && key in WHY_WOW) return WHY_WOW[key];

  if (key) console.warn(`[cms] unknown WhyWow icon key "${key}"`);

  return WHY_WOW.flexibleStays;
}

/**
 * Render CMS text that may contain line breaks.
 *
 * Several headings are authored across two lines (the homepage's "Stay for a
 * night / or settle for months."). The CMS stores plain text with newlines;
 * this turns them back into <br /> without allowing arbitrary markup.
 */
export function withLineBreaks(text: string): ReactNode {
  const lines = text.split(/\r?\n/);

  if (lines.length === 1) return text;

  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}
