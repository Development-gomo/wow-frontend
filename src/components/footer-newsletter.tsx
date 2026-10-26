"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { text, type Globals } from "@/lib/cms/globals";
import { subscribeNewsletter, type NewsletterStatus } from "@/lib/newsletter.functions";

const STATUS_FIELD: Record<NewsletterStatus, string> = {
  subscribed: "msgSubscribed",
  already: "msgAlready",
  invalid: "msgInvalid",
  error: "msgError",
};

/** The footer's newsletter sign-up: the only interactive part of the footer. */
export function FooterNewsletter({ newsletter }: { newsletter: Globals["newsletter"] }) {
  const [signupStatus, setSignupStatus] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    if (typeof email !== "string") return;
    setIsSigningUp(true);
    setSignupStatus("");
    const status = await subscribeNewsletter({ data: { email } });
    setSignupStatus(text(newsletter, STATUS_FIELD[status]));
    if (status === "subscribed" || status === "already") form.reset();
    setIsSigningUp(false);
  }

  return (
    <>
      <form id="wow-footer-newsletter" onSubmit={handleSignup} className="mt-5 flex items-stretch gap-2 max-w-[402px]">
        <label className="min-w-0 flex-1">
          <span className="sr-only">{text(newsletter, "emailLabel")}</span>
          <input name="email" type="email" placeholder={text(newsletter, "placeholder")} autoComplete="email" required className="h-[42px] w-full rounded border border-linen/30 bg-umber px-4 text-[13px] font-light text-linen placeholder:text-linen/45 outline-none transition-colors duration-200 focus:border-linen/60" />
        </label>
        <Button type="submit" disabled={isSigningUp} className="h-[42px] shrink-0 rounded-cta bg-linen px-4 text-[11px] font-medium uppercase tracking-[0.24em] text-taupe shadow-none transition-colors duration-200 hover:bg-sand hover:text-umber sm:px-[22px]">
          {isSigningUp ? text(newsletter, "sendingLabel") : text(newsletter, "submitLabel")}
        </Button>
      </form>
      <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[11px] font-light leading-[1.55] text-linen/60">
        <input type="checkbox" required form="wow-footer-newsletter" className="mt-[3px] h-3 w-3 shrink-0 accent-linen" />
        <span>{text(newsletter, "consent")}</span>
      </label>
      <p role="status" aria-live="polite" className="mt-2 text-[12px] text-linen">{signupStatus}</p>
    </>
  );
}
