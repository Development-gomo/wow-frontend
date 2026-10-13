"use client";

/**
 * Routing adapter — TanStack Router -> Next.js App Router.
 *
 * The migrated presentation components import `Link` from "@tanstack/react-router".
 * Rather than editing every one of those files, `@tanstack/react-router` is aliased
 * to this module (see next.config.ts + tsconfig paths), so the component markup and
 * props stay byte-identical to the Lovable original.
 *
 * Translations needed:
 *   - TanStack's `to` prop        -> Next's `href`
 *   - TanStack's `activeProps`    -> merged in when `usePathname()` matches `to`
 */

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

type AnchorProps = Omit<ComponentPropsWithoutRef<"a">, "href">;

export type LinkProps = AnchorProps & {
  /** TanStack Router's destination prop. */
  to?: string;
  href?: string;
  /** Accepted for parity; appended to the final href. */
  hash?: string;
  /** Props merged in while this link's destination is the current route. */
  activeProps?: AnchorProps;
  /** Props merged in while it is not. */
  inactiveProps?: AnchorProps;
  /** TanStack default is prefix matching; `exact` restricts it to the exact path. */
  activeOptions?: { exact?: boolean };
  /** TanStack-only props with no Next equivalent — accepted and ignored. */
  preload?: unknown;
  params?: unknown;
  search?: unknown;
  replace?: boolean;
  resetScroll?: boolean;
};

function isActive(pathname: string | null, target: string, exact?: boolean) {
  if (!pathname) return false;
  const path = target.split(/[?#]/)[0];
  if (exact || path === "/") return pathname === path;
  return pathname === path || pathname.startsWith(`${path}/`);
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    to,
    href,
    hash,
    activeProps,
    inactiveProps,
    activeOptions,
    preload,
    params,
    search,
    replace,
    resetScroll,
    className,
    ...rest
  },
  ref,
) {
  const pathname = usePathname();
  const base = href ?? to ?? "#";
  const target = hash ? `${base}#${hash.replace(/^#/, "")}` : base;

  const state = isActive(pathname, target, activeOptions?.exact)
    ? activeProps
    : inactiveProps;

  // TanStack merges the active/inactive className onto the base one.
  const { className: stateClassName, ...stateRest } = state ?? {};
  const mergedClassName = [className, stateClassName].filter(Boolean).join(" ") || undefined;

  // Hash-only and external destinations bypass the client router, matching how
  // the original markup behaved for in-page anchors.
  if (target.startsWith("#") || /^[a-z]+:/i.test(target)) {
    return <a ref={ref} href={target} className={mergedClassName} {...rest} {...stateRest} />;
  }

  return (
    <NextLink
      ref={ref}
      href={target}
      replace={replace}
      scroll={resetScroll}
      className={mergedClassName}
      {...rest}
      {...stateRest}
    />
  );
});
