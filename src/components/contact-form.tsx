"use client";

import { useState } from "react";
import { useLang, useSite } from "@/components/cms/site-context";
import { Button } from "@/components/ui/button";
import { list, text } from "@/lib/cms/globals";
import { firstInvalid, submitLead } from "@/lib/leads";

/** Form field → its label key in Site settings › Contact form (for error messages). */
const FIELD_LABEL_KEY: Record<string, string> = {
  purpose: "purpose",
  name: "name",
  email: "email",
  checkin: "checkIn",
  checkout: "checkOut",
  message: "message",
};

/**
 * Contact form. Every label, option and message comes from WordPress ›
 * Site settings › Interface text › Contact form. Submissions go to the
 * Contact Form 7 form "Contact" and are stored in wp-admin › Contact Forms.
 */
export function ContactForm() {
  const { contactForm } = useSite();
  const lang = useLang();
  const t = (key: string) => text(contactForm, key);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [invalidField, setInvalidField] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const element = event.currentTarget;
    const form = new FormData(element);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    setInvalidField("");
    if (!name || !email || !message) {
      setStatus(t("msgIncomplete"));
      return;
    }
    if (checkIn && checkOut && checkOut <= checkIn) {
      setStatus(t("msgDates"));
      return;
    }

    setSending(true);
    setStatus("");
    const result = await submitLead("contact", lang, form);
    setSending(false);

    if (result.status === "sent") {
      element.reset();
      setCheckIn("");
      setCheckOut("");
      setStatus(t("msgSent"));
      return;
    }

    // A rejected field: Contact Form 7's message in the page language, named by its label.
    const invalid = firstInvalid(result);
    if (invalid) {
      setInvalidField(invalid.field);
      if (invalid.field === "checkout" && !invalid.message) {
        setStatus(t("msgDates"));
        return;
      }
      const label = FIELD_LABEL_KEY[invalid.field] ? t(FIELD_LABEL_KEY[invalid.field]) : "";
      setStatus([label, invalid.message].filter(Boolean).join(": ") || t("msgError"));
      return;
    }

    setStatus(t("msgError"));
  }

  const invalidProps = (field: string) => (invalidField === field ? { "aria-invalid": true as const } : {});

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
      <label htmlFor="contact-purpose" className="mt-4 pl-[0.32em] text-[12px] font-medium uppercase tracking-[0.32em] text-clay">
        {t("purpose")}
      </label>
      <select
        id="contact-purpose"
        name="purpose"
        defaultValue=""
        className="mt-2 h-12 w-full cursor-pointer appearance-none rounded-[4px] border border-clay/35 bg-pearl bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23716a60%22%20stroke-width%3D%221.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat px-4 pr-11 text-[15px] font-light text-taupe outline-none transition-colors focus:border-taupe"
      >
        <option value="">{t("purposePlaceholder")}</option>
        {list(contactForm, "purposeOptions").map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <label htmlFor="contact-name" className="mt-4 pl-[0.32em] text-[12px] font-medium uppercase tracking-[0.32em] text-clay">
        {t("name")}
      </label>
      <input
        id="contact-name"
        name="name"
        type="text"
        autoComplete="name"
        required
        {...invalidProps("name")}
        className="mt-2 h-12 w-full rounded-[4px] border border-clay/35 bg-pearl px-4 text-[15px] font-light text-taupe outline-none transition-colors placeholder:text-clay/65 focus:border-taupe"
      />

      <label htmlFor="contact-email" className="mt-4 pl-[0.32em] text-[12px] font-medium uppercase tracking-[0.32em] text-clay">
        {t("email")}
      </label>
      <input
        id="contact-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        {...invalidProps("email")}
        className="mt-2 h-12 w-full rounded-[4px] border border-clay/35 bg-pearl px-4 text-[15px] font-light text-taupe outline-none transition-colors placeholder:text-clay/65 focus:border-taupe"
      />

      <div className="mt-4 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-5">
        <div className="flex flex-col">
          <label htmlFor="contact-checkin" className="pl-[0.32em] text-[12px] font-medium uppercase tracking-[0.32em] text-clay">
            {t("checkIn")}
          </label>
          <input
            id="contact-checkin"
            name="checkin"
            type="date"
            min={today}
            value={checkIn}
            {...invalidProps("checkin")}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value && checkOut <= e.target.value) setCheckOut("");
            }}
            className="mt-2 h-12 w-full rounded-[4px] border border-clay/35 bg-pearl px-4 text-[15px] font-light text-taupe outline-none transition-colors focus:border-taupe"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="contact-checkout" className="pl-[0.32em] text-[12px] font-medium uppercase tracking-[0.32em] text-clay">
            {t("checkOut")}
          </label>
          <input
            id="contact-checkout"
            name="checkout"
            type="date"
            min={checkIn || today}
            value={checkOut}
            {...invalidProps("checkout")}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-2 h-12 w-full rounded-[4px] border border-clay/35 bg-pearl px-4 text-[15px] font-light text-taupe outline-none transition-colors focus:border-taupe"
          />
        </div>
      </div>


      <label htmlFor="contact-message" className="mt-4 pl-[0.32em] text-[12px] font-medium uppercase tracking-[0.32em] text-clay">
        {t("message")}
      </label>
      <textarea
        id="contact-message"
        name="message"
        rows={7}
        required
        {...invalidProps("message")}
        className="mt-2 w-full resize-y rounded-[4px] border border-clay/35 bg-pearl px-4 py-3 text-[15px] font-light leading-[1.7] text-taupe outline-none transition-colors placeholder:text-clay/65 focus:border-taupe"
      />

      {/* Spam trap: hidden from people, filled in by bots. */}
      <div className="hidden" aria-hidden="true"><label>Website{/* content-exempt: spam trap, never shown */}<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

      <Button type="submit" disabled={sending} className="mt-8 h-12 self-start rounded-cta bg-taupe px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-pearl shadow-none transition-colors hover:bg-umber disabled:opacity-70">
        {sending && t("sending") ? t("sending") : t("submit")}
      </Button>
      <p role="status" aria-live="polite" className="mt-4 min-h-5 text-[13px] font-light text-taupe/75">
        {status}
      </p>
    </form>
  );
}
