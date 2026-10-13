import { useState } from "react";
import { Calendar, ChevronDown, Lock } from "lucide-react";

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
  /** Caption under the locked field. Defaults to "Selected from this page". */
  lockedCaption?: string;
  /** Optional add-on checkboxes in the left column. */
  services: string[];
  submitLabel?: string;
  /** Minimum nights between check-in and check-out (earlier check-out dates are disabled). */
  minStayNights?: number;
  /** Largest party the apartment(s) on this page can host; limits the size options and the people count. */
  maxGuests?: number;
};

/** Apartment sizes offered in the size dropdown, by guest capacity. */
const APARTMENT_SIZES = [2, 4, 6];

const FIELD_CLASS =
  "h-11 w-full rounded-[4px] border border-clay/30 bg-pearl px-3.5 font-sans text-[15px] font-light text-taupe transition-[border-color,box-shadow] duration-[180ms] outline-none placeholder:text-clay/80 focus:border-taupe focus:shadow-[0_0_0_3px_var(--color-clay)/0.14] motion-reduce:transition-none";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-xs font-normal tracking-[0.02em] text-taupe">
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
  lockedCaption = "Selected from this page",
  services,
  submitLabel = "Send enquiry",
  minStayNights = 7,
  maxGuests = 6,
}: EnquiryFormProps) {
  const [checkin, setCheckin] = useState("");
  const [size, setSize] = useState("");
  const sizes = APARTMENT_SIZES.filter((guests) => guests <= maxGuests);

  // Typing the party size preselects the smallest apartment that fits, unless the
  // guest already picked a size that is big enough.
  const handlePeopleChange = (value: string) => {
    const people = Number(value);
    if (!people) return;
    const fit = sizes.find((guests) => guests >= people);
    if (fit && (!size || Number(size) < people)) setSize(String(fit));
  };

  return (
    <section id="enquire" aria-labelledby="enquire-heading" className="bg-sand px-5 py-16 text-taupe md:px-10 lg:px-20 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
        {/* Left: context column */}
        <aside className="flex flex-col gap-10">
          <div>
            <p className="m-0 pl-[0.45em] text-[10px] font-normal uppercase tracking-[0.45em] text-clay">{eyebrow}</p>
            <h2 id="enquire-heading" className="mt-6 font-serif text-[40px] font-normal leading-[1.15]">{heading}</h2>
            <p className="mt-5 text-[15px] font-light leading-[1.75] text-taupe/85">{description}</p>
          </div>

          <div>
            <span className="mb-2 block text-xs font-normal tracking-[0.02em] text-taupe">{locked.label}</span>
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
                <Lock aria-hidden="true" size={13} strokeWidth={1.2} className="shrink-0 text-clay" />
              </div>
            )}
            {!locked.options && <input type="hidden" name={locked.hiddenName} value={locked.hiddenValue} form="wow-enquire-form" />}
            <p className="mt-1.5 text-[11px] text-clay/85">{lockedCaption}</p>
          </div>

          <div>
            <p className="m-0 pl-[0.32em] text-[10px] font-normal uppercase tracking-[0.32em] text-clay">Optional services</p>
            <div className="mt-4 flex flex-col gap-3">
              {services.map((service) => (
                <label key={service} className="inline-flex cursor-pointer select-none items-center gap-3 text-[15px] text-taupe">
                  <input
                    type="checkbox"
                    name={service.toLowerCase().replace(/\s+/g, "-")}
                    form="wow-enquire-form"
                    className="relative h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[3px] border border-clay/55 bg-pearl transition-colors duration-[180ms] checked:border-taupe checked:bg-taupe after:absolute after:left-[5px] after:top-px after:hidden after:h-2.5 after:w-[5px] after:rotate-45 after:border-b-[1.5px] after:border-r-[1.5px] after:border-pearl after:content-[''] checked:after:block motion-reduce:transition-none"
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
          aria-label="Enquire about your stay"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-[22px] sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="wow-first">First name</FieldLabel>
              <input id="wow-first" name="firstName" type="text" required placeholder="e.g. Anna" autoComplete="given-name" className={FIELD_CLASS} />
            </div>
            <div>
              <FieldLabel htmlFor="wow-surname">Surname</FieldLabel>
              <input id="wow-surname" name="surname" type="text" required placeholder="e.g. Andersson" autoComplete="family-name" className={FIELD_CLASS} />
            </div>

            <div>
              <FieldLabel htmlFor="wow-phone">Phone</FieldLabel>
              <input id="wow-phone" name="phone" type="tel" required placeholder="e.g. +46 70 123 45 67" autoComplete="tel" className={FIELD_CLASS} />
            </div>
            <div>
              <FieldLabel htmlFor="wow-email">Email</FieldLabel>
              <input id="wow-email" name="email" type="email" required placeholder="e.g. anna@company.com" autoComplete="email" className={FIELD_CLASS} />
            </div>

            <div>
              <FieldLabel htmlFor="wow-people">Number of people</FieldLabel>
              <input id="wow-people" name="people" type="number" min={1} max={maxGuests} required placeholder="e.g. 4" onChange={(event) => handlePeopleChange(event.target.value)} className={FIELD_CLASS} />
            </div>
            <div>
              <FieldLabel htmlFor="wow-size">Apartment size</FieldLabel>
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
                    Select size
                  </option>
                  {sizes.map((guests) => (
                    <option key={guests} value={guests} className="text-taupe">
                      Up to {guests} guests
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" size={16} strokeWidth={1.2} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-clay" />
              </div>
            </div>

            <DateField id="wow-checkin" name="checkin" label="Check in" onChange={setCheckin} />
            <DateField id="wow-checkout" name="checkout" label="Check out" min={addDays(checkin, minStayNights)} />
          </div>

          <div className="mt-[22px]">
            <label htmlFor="wow-notes" className="mb-2 block text-xs font-normal tracking-[0.02em] text-taupe">
              Other information we need to know
            </label>
            <textarea
              id="wow-notes"
              name="notes"
              rows={3}
              placeholder="e.g. purpose of stay, company, special requests..."
              className="min-h-[100px] w-full resize-y rounded-[4px] border border-clay/30 bg-pearl px-3.5 py-3 font-sans text-[15px] font-light leading-[1.5] text-taupe transition-[border-color,box-shadow] duration-[180ms] outline-none placeholder:text-clay/80 focus:border-taupe focus:shadow-[0_0_0_3px_var(--color-clay)/0.14] motion-reduce:transition-none"
            />
          </div>

          <p className="mt-4 text-xs text-clay">* Required fields</p>

          <div className="mt-8">
            <button
              type="submit"
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-3.5 rounded-cta bg-taupe px-9 text-[11px] font-medium uppercase tracking-[0.28em] text-pearl transition-colors duration-[180ms] motion-safe:hover:bg-[oklch(0.28_0.010_60)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-clay motion-reduce:transition-none"
            >
              <span>{submitLabel}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
