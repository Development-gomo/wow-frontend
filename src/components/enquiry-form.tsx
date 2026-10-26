"use client";

import { useState, type FormEvent } from "react";
import { Calendar, ChevronDown } from "lucide-react";

import { useLang, useSite } from "@/components/cms/site-context";
import { text } from "@/lib/cms/globals";
import { firstInvalid, submitLead } from "@/lib/leads";
import { cn } from "@/lib/utils";

/** Form field → its label key in Site settings › Enquiry form (for error messages). */
const FIELD_LABEL_KEY: Record<string, string> = {
  firstName: "firstName",
  surname: "surname",
  phone: "phone",
  email: "email",
  people: "people",
  apartmentSize: "size",
  checkin: "checkIn",
  checkout: "checkOut",
  notes: "other",
};

export type EnquiryFormProps = {
  eyebrow: string;
  heading: string;
  description: string;
  /** Locked field or dropdown shown in the left column, pre-filled from the page. */
  locked: {
    label: string;
    value: string;
    hiddenName: string;
    hiddenValue: string;
    /** When provided, renders a dropdown with these options (plus the default value) instead of the locked field. */
    options?: string[];
  };
  /** Caption under the locked field; falls back to Site settings › Enquiry form. */
  lockedCaption?: string;
  /** Optional add-on checkboxes in the left column. */
  services: string[];
  submitLabel?: string;
  /** Minimum nights between check-in and check-out (earlier check-out dates are disabled). */
  minStayNights?: number;
  /** Largest party the apartment(s) on this page can host; limits the size options and the people count. */
  maxGuests?: number;
  /** Show the people, apartment size and date fields. Defaults to true; pages that are not stay enquiries pass false. */
  stayFields?: boolean;
  /** Heading and note above the add-on checkboxes; fall back to Site settings › Enquiry form. */
  servicesTitle?: string;
  servicesNote?: string;
  /** Label and placeholder for the free-text field; fall back to Site settings › Enquiry form. */
  notesLabel?: string;
  notesPlaceholder?: string;
  /** Accessible name of the form; falls back to Site settings › Enquiry form. */
  formLabel?: string;
  /** Which lead form receives the enquiry: "gift_card" for the gift card enquiry; unset for an apartment enquiry. */
  submitTo?: "gift_card";
  /** Section surface overrides (spacing), merged with cn so the page value wins. */
  className?: string;
};

/** Apartment sizes offered in the size dropdown, by guest capacity. */
const APARTMENT_SIZES = [2, 4, 6];

export const FIELD_CLASS =
  "h-11 w-full rounded-[4px] border border-clay/30 bg-pearl px-3.5 font-sans text-[15px] font-light text-taupe transition-[border-color,box-shadow] duration-[180ms] outline-none placeholder:text-clay/80 focus:border-taupe focus:shadow-[0_0_0_3px_var(--color-clay)/0.14] motion-reduce:transition-none";

/** Shared enquiry-form styles, reused by every enquiry form on the site. */
export const LABEL_CLASS = "mb-2 block text-xs font-normal tracking-[0.02em] text-taupe";
export const TEXTAREA_CLASS =
  "min-h-[100px] w-full resize-y rounded-[4px] border border-clay/30 bg-pearl px-3.5 py-3 font-sans text-[15px] font-light leading-[1.5] text-taupe transition-[border-color,box-shadow] duration-[180ms] outline-none placeholder:text-clay/80 focus:border-taupe focus:shadow-[0_0_0_3px_var(--color-clay)/0.14] motion-reduce:transition-none";
export const CHECKBOX_CLASS =
  "relative h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[3px] border border-clay/55 bg-pearl transition-colors duration-[180ms] checked:border-taupe checked:bg-taupe after:absolute after:left-[5px] after:top-px after:hidden after:h-2.5 after:w-[5px] after:rotate-45 after:border-b-[1.5px] after:border-r-[1.5px] after:border-pearl after:content-[''] checked:after:block motion-reduce:transition-none";
export const SUBMIT_CLASS =
  "inline-flex h-12 cursor-pointer items-center justify-center gap-3.5 rounded-cta bg-taupe px-9 text-[11px] font-medium uppercase tracking-[0.28em] text-pearl transition-colors duration-[180ms] motion-safe:hover:bg-[oklch(0.28_0.010_60)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-clay motion-reduce:transition-none";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className={LABEL_CLASS}>
      {children}
      <span aria-hidden="true" className="ml-0.5 text-clay">*</span>
    </label>
  );
}

function DateField({
  id,
  name,
  label,
  min,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  min?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="date"
          required
          min={min}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
          className={`${FIELD_CLASS} pr-11 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full`}
        />
        <Calendar aria-hidden="true" size={18} strokeWidth={1.2} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-clay" />
      </div>
    </div>
  );
}

/** Returns the ISO date `days` after `iso` (UTC-safe), or undefined when no date is set. */
function addDays(iso: string, days: number): string | undefined {
  if (!iso) return undefined;
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return undefined;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function EnquiryForm({
  eyebrow,
  heading,
  description,
  locked,
  lockedCaption,
  services,
  submitLabel,
  minStayNights = 7,
  maxGuests = 6,
  stayFields = true,
  servicesTitle,
  servicesNote,
  notesLabel,
  notesPlaceholder,
  formLabel,
  submitTo,
  className,
}: EnquiryFormProps) {
  // Field labels and placeholders: WordPress › Site settings › Interface text › Enquiry form.
  const { enquiryForm } = useSite();
  const t = (key: string) => text(enquiryForm, key);
  const [checkin, setCheckin] = useState("");
  const [size, setSize] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [invalid, setInvalid] = useState("");
  const lang = useLang();
  const sizes = APARTMENT_SIZES.filter((guests) => guests <= maxGuests);

  // Typing the party size preselects the smallest apartment that fits, unless the
  // guest already picked a size that is big enough.
  const handlePeopleChange = (value: string) => {
    const people = Number(value);
    if (!people) return;
    const fit = sizes.find((guests) => guests >= people);
    if (fit && (!size || Number(size) < people)) setSize(String(fit));
  };

  // Sends the enquiry to Contact Form 7 (gift card or apartment enquiry, by page);
  // the labels shown come from Site settings.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const chosen = services.filter((service) => data.get(service.toLowerCase().replace(/\s+/g, "-")) === "on").join(", ");
    const gift = submitTo === "gift_card";

    // One field per question, named as the Contact Form 7 form expects.
    const lead = new FormData();
    for (const name of ["firstName", "surname", "phone", "email", "notes", "website"]) lead.set(name, String(data.get(name) ?? ""));
    if (gift) {
      lead.set("giftFor", String(data.get(locked.hiddenName) ?? ""));
      lead.set("extras", chosen);
    } else {
      for (const name of ["people", "apartmentSize", "checkin", "checkout"]) lead.set(name, String(data.get(name) ?? ""));
      // The name the visitor saw: the chosen option, else the page's apartment.
      lead.set("apartment", (locked.options && String(data.get(locked.hiddenName) ?? "")) || locked.value);
      lead.set("services", chosen);
    }

    setStatus("sending");
    setInvalid("");
    const result = await submitLead(gift ? "giftCardEnquiry" : "apartmentEnquiry", lang, lead);
    if (result.status === "sent") {
      form.reset();
      setCheckin("");
      setSize("");
      setStatus("sent");
      return;
    }
    // A rejected field: Contact Form 7's message in the page language, named by its label.
    const rejected = firstInvalid(result);
    if (rejected) {
      const label = FIELD_LABEL_KEY[rejected.field] ? t(FIELD_LABEL_KEY[rejected.field]) : "";
      setInvalid([label, rejected.message].filter(Boolean).join(": "));
    }
    setStatus("error");
  }

  return (
    <section id="enquire" aria-labelledby="enquire-heading" className={cn("bg-sand px-5 py-16 text-taupe md:px-10 lg:px-20 lg:py-20", className)}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
        {/* Left: context column */}
        <aside className="flex flex-col gap-10">
          <div>
            <p className="m-0 pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">{eyebrow}</p>
            <h2 id="enquire-heading" className="mt-6 font-serif text-[40px] font-normal leading-[1.15]">{heading}</h2>
            <p className="mt-5 text-[15px] font-light leading-[1.75] text-taupe/85">{description}</p>
          </div>

          <div>
            <span className={LABEL_CLASS}>{locked.label}</span>
            {locked.options ? (
              <div className="relative">
                <select
                  name={locked.hiddenName}
                  form="wow-enquire-form"
                  defaultValue=""
                  className={`${FIELD_CLASS} h-11 cursor-pointer appearance-none pr-11`}
                >
                  <option value="">{locked.value}</option>
                  {locked.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" size={16} strokeWidth={1.2} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-clay" />
              </div>
            ) : (
              <div
                role="textbox"
                aria-readonly="true"
                tabIndex={0}
                className="flex h-11 w-full items-center justify-between gap-3 rounded-[4px] border border-clay/30 bg-pearl px-3.5 text-[15px] text-taupe"
              >
                <span>{locked.value}</span>
              </div>
            )}
            {!locked.options && <input type="hidden" name={locked.hiddenName} value={locked.hiddenValue} form="wow-enquire-form" />}
            <p className="mt-1.5 text-[11px] text-clay/85">{lockedCaption || t("lockedCaption")}</p>
          </div>

          <div>
            <p className="m-0 pl-[0.32em] text-[10px] font-normal uppercase tracking-[0.32em] text-clay">{servicesTitle || t("servicesHeading")}</p>
            {(servicesNote || t("servicesNote")) && <p className="mt-2 pl-[0.32em] text-[12px] font-light text-clay">{servicesNote || t("servicesNote")}</p>}
            <div className="mt-4 flex flex-col gap-3">
              {services.map((service) => (
                <label key={service} className="inline-flex cursor-pointer select-none items-center gap-3 text-[15px] text-taupe">
                  <input
                    type="checkbox"
                    name={service.toLowerCase().replace(/\s+/g, "-")}
                    form="wow-enquire-form"
                    className={CHECKBOX_CLASS}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right: form */}
        <form
          id="wow-enquire-form"
          aria-label={formLabel || t("ariaLabel")}
          onSubmit={handleSubmit}
        >
          <div className="hidden" aria-hidden="true"><label>Website{/* content-exempt: spam trap, never shown */}<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-[22px] sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="wow-first">{t("firstName")}</FieldLabel>
              <input id="wow-first" name="firstName" type="text" required placeholder={t("firstNamePlaceholder")} autoComplete="given-name" className={FIELD_CLASS} />
            </div>
            <div>
              <FieldLabel htmlFor="wow-surname">{t("surname")}</FieldLabel>
              <input id="wow-surname" name="surname" type="text" required placeholder={t("surnamePlaceholder")} autoComplete="family-name" className={FIELD_CLASS} />
            </div>

            <div>
              <FieldLabel htmlFor="wow-phone">{t("phone")}</FieldLabel>
              <input id="wow-phone" name="phone" type="tel" required placeholder={t("phonePlaceholder")} autoComplete="tel" className={FIELD_CLASS} />
            </div>
            <div>
              <FieldLabel htmlFor="wow-email">{t("email")}</FieldLabel>
              <input id="wow-email" name="email" type="email" required placeholder={t("emailPlaceholder")} autoComplete="email" className={FIELD_CLASS} />
            </div>

            {stayFields && (
              <>
            <div>
              <FieldLabel htmlFor="wow-people">{t("people")}</FieldLabel>
              <input id="wow-people" name="people" type="number" min={1} max={maxGuests} required placeholder={t("peoplePlaceholder")} onChange={(event) => handlePeopleChange(event.target.value)} className={FIELD_CLASS} />
            </div>
            <div>
              <FieldLabel htmlFor="wow-size">{t("size")}</FieldLabel>
              <div className="relative">
                <select
                  id="wow-size"
                  name="apartmentSize"
                  required
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                  className={`${FIELD_CLASS} cursor-pointer appearance-none pr-11 ${size ? "" : "text-clay/80"}`}
                >
                  <option value="" disabled>
                    {t("sizePlaceholder")}
                  </option>
                  {sizes.map((guests) => (
                    <option key={guests} value={guests} className="text-taupe">
                      {[t("sizeUpTo"), guests, t("sizeGuests")].filter((part) => part !== "").join(" ")}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" size={16} strokeWidth={1.2} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-clay" />
              </div>
            </div>

            <DateField id="wow-checkin" name="checkin" label={t("checkIn")} onChange={setCheckin} />
            <DateField id="wow-checkout" name="checkout" label={t("checkOut")} min={addDays(checkin, minStayNights)} />
              </>
            )}
          </div>

          <div className="mt-[22px]">
            <label htmlFor="wow-notes" className={LABEL_CLASS}>
              {notesLabel || t("other")}
            </label>
            <textarea
              id="wow-notes"
              name="notes"
              rows={3}
              placeholder={notesPlaceholder || t("otherPlaceholder")}
              className={TEXTAREA_CLASS}
            />
          </div>

          <p className="mt-4 text-xs text-clay">{t("requiredNote")}</p>

          <div className="mt-8">
            <button
              type="submit"
              disabled={status === "sending"}
              className={`${SUBMIT_CLASS} disabled:opacity-70`}
            >
              <span>{status === "sending" && t("sending") ? t("sending") : submitLabel || t("submit")}</span>
            </button>
          </div>
          {status === "sent" && t("msgSent") ? <p role="status" className="mt-4 text-[15px] text-taupe">{t("msgSent")}</p> : null}
          {status === "error" && (invalid || t("msgError")) ? <p role="alert" className="mt-4 text-[15px] text-destructive">{invalid || t("msgError")}</p> : null}
        </form>
      </div>
    </section>
  );
}
