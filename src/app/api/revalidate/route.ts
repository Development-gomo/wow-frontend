import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { CACHE_TAGS } from "@/lib/cms/client";

/**
 * Revalidation webhook.
 *
 * WordPress calls this after a publish so the affected pages refresh without a
 * redeploy. Without it, an editor's change would not appear until the 5-minute
 * ISR window elapsed.
 *
 *   POST /api/revalidate
 *   x-wow-secret: <REVALIDATE_SECRET>
 *   { "slug": "rooms" }        // one page, or omit to refresh everything
 *
 * The shared secret is compared in constant time; without REVALIDATE_SECRET
 * configured the endpoint refuses outright rather than defaulting to open.
 */

export const dynamic = "force-dynamic";

/** Timing-safe string comparison. */
function secretsMatch(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;

  let mismatch = 0;
  for (let i = 0; i < provided.length; i += 1) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }

  return mismatch === 0;
}

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET ?? "";

  if (expected === "") {
    return NextResponse.json(
      { revalidated: false, message: "REVALIDATE_SECRET is not configured." },
      { status: 503 },
    );
  }

  const provided = request.headers.get("x-wow-secret") ?? "";

  if (!secretsMatch(provided, expected)) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret." }, { status: 401 });
  }

  let slug: string | undefined;

  try {
    const body = (await request.json()) as { slug?: unknown };
    if (typeof body.slug === "string") slug = body.slug;
  } catch {
    // An empty body is valid and means "refresh everything".
  }

  const tags = slug === undefined
    ? [CACHE_TAGS.all]
    : [CACHE_TAGS.page(slug), CACHE_TAGS.pages];

  for (const tag of tags) revalidateTag(tag);

  return NextResponse.json({ revalidated: true, tags, at: new Date().toISOString() });
}
