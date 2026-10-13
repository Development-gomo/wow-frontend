"use client";

import Link from "next/link";

import { useSite } from "@/components/cms/site-context";
import { text } from "@/lib/cms/globals";

/** Markup from the original NotFoundComponent; copy from Site settings › Page not found. */
export default function NotFound() {
  const { notFound } = useSite();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">{text(notFound, "code")}</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{text(notFound, "heading")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{text(notFound, "text")}</p>
        {text(notFound, "button") && (
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-cta bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {text(notFound, "button")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
