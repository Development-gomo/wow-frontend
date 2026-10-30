"use client";

import NextLink from "next/link";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { useLocalizeHref } from "@/components/cms/site-context";
import { isPlainAnchor } from "@/lib/links";

/*
 * The site's link: Next.js `next/link`, with the destination localized for the
 * page language (/en/... for English; Swedish has no prefix), the same pattern
 * as next-intl's Link. In-page anchors (#id) and other schemes (mailto:, tel:,
 * https:) are plain anchors, because the client router has nothing to do there.
 * Server components that know the language can use next/link directly with
 * localizeHref (see site-footer.tsx).
 */

type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  /** A site path ("/rooms"), an in-page anchor ("#faq") or a full URL. */
  href: string;
};

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link({ href, ...rest }, ref) {
  const localize = useLocalizeHref();
  const target = localize(href ?? "#");

  if (isPlainAnchor(target)) return <a ref={ref} href={target} {...rest} />;

  return <NextLink ref={ref} href={target} {...rest} />;
});
