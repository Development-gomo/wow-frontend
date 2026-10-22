import { useState } from "react";
import { useSite } from "@/components/cms/site-context";
import { Button } from "@/components/ui/button";
import { list, text } from "@/lib/cms/globals";

/**
 * Contact form. Every label, option and message comes from WordPress ›
 * Site settings › Interface text › Contact form; the recipient is the
 * contact email in Site settings › Contact.
 */
export function ContactForm() {
  const { contactForm, contact } = useSite();
  const t = (key: string) => text(contactForm, key);
  const [status, setStatus] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const purpose = String(form.get("purpose") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus(t("msgIncomplete"));
      return;
    }
    if (checkIn && checkOut && checkOut <= checkIn) {
      setStatus(t("msgDates"));
      return;
    }

    const none = t("notSpecified");
    const subject = encodeURIComponent(t("mailSubject").replace("{name}", name));
    const dates = `${t("checkIn")}: ${checkIn || none}\n${t("checkOut")}: ${checkOut || none}`;
    const body = encodeURIComponent(`${t("name")}: ${name}\n${t("email")}: ${email}\n${t("purpose")}: ${purpose || none}\n${dates}\n\n${message}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setStatus(t("msgOpening"));
  }

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
        className="mt-2 w-full resize-y rounded-[4px] border border-clay/35 bg-pearl px-4 py-3 text-[15px] font-light leading-[1.7] text-taupe outline-none transition-colors placeholder:text-clay/65 focus:border-taupe"
      />

      <Button type="submit" className="mt-8 h-12 self-start rounded-cta bg-taupe px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-pearl shadow-none transition-colors hover:bg-umber">
        {t("submit")}
      </Button>
      <p role="status" aria-live="polite" className="mt-4 min-h-5 text-[13px] font-light text-taupe/75">
        {status}
      </p>
    </form>
  );
}