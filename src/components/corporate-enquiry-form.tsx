"use client";

import { useState, type ComponentProps, type FormEvent } from "react";
import { Calendar, CheckCircle2, ChevronDown, FileUp, X } from "lucide-react";
import { useLang } from "@/components/cms/site-context";
import { Button } from "@/components/ui/button";
import { firstInvalid, submitLead } from "@/lib/leads";
import { CHECKBOX_CLASS, FIELD_CLASS, LABEL_CLASS, SUBMIT_CLASS, TEXTAREA_CLASS } from "@/components/enquiry-form";
import { isAcceptablePdf, type CorporateEnquiryMessage } from "@/lib/corporate-enquiry-rules";

type FieldCopy = { label?: string; placeholder?: string };

export type CorporateEnquiryFormProps = {
  eyebrow: string;
  heading: string;
  description: string;
  noteStrong?: string;
  note?: string;
  formLabel: string;
  fields: Partial<Record<"company" | "contactName" | "email" | "phone" | "employees" | "moveIn" | "lengthOfStay" | "accommodation" | "requirements", FieldCopy>>;
  accommodationOptions: string[];
  pdf: { label?: string; attach?: string; replace?: string; remove?: string; hint?: string };
  optionalSuffix: string;
  consent: string;
  submit: string;
  sending: string;
  success: { heading?: string; text?: string; reference?: string; again?: string };
  messages: Partial<Record<CorporateEnquiryMessage, string>>;
};

const asterisk = <span aria-hidden="true" className="ml-0.5 text-clay">*</span>;

/** Corporate (relocation) enquiry form. Every visible string comes from its WordPress section. */
export function CorporateEnquiryForm({ eyebrow, heading, description, noteStrong, note, formLabel, fields, accommodationOptions, pdf, optionalSuffix, consent, submit, sending, success, messages }: CorporateEnquiryFormProps) {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState("");
  const lang = useLang();

  const message = (key: CorporateEnquiryMessage) => messages[key] ?? messages.error ?? "";
  const copy = (name: keyof CorporateEnquiryFormProps["fields"]) => fields[name] ?? {};

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    // The zod schema loads on submit, so zod is not in the page's JavaScript.
    let schema: typeof import("@/lib/corporate-enquiry-schema");
    try {
      schema = await import("@/lib/corporate-enquiry-schema");
    } catch {
      setError(message("error"));
      return;
    }
    const { corporateEnquirySchema, firstMessage } = schema;
    const parsed = corporateEnquirySchema.safeParse({
      ...Object.fromEntries([...data.entries()].filter(([, value]) => typeof value === "string")),
      consent: data.get("consent") === "on",
    });
    if (!parsed.success) { setError(message(firstMessage(parsed.error))); return; }
    if (file) data.set("pdf", file); else data.delete("pdf");
    setPending(true);
    setError("");
    const result = await submitLead("corporateEnquiry", lang, data);
    setPending(false);
    if (result.status === "sent") {
      setReference(result.reference);
      form.reset();
      setFile(undefined);
      return;
    }
    // A rejected field: this section's own message when it has one, else Contact Form 7's.
    const rejected = firstInvalid(result);
    const own = rejected && rejected.field in messages ? messages[rejected.field as CorporateEnquiryMessage] : undefined;
    setError(own || rejected?.message || message("error"));
  }

  return (
    <section aria-labelledby="corporate-enquiry-heading" className="scroll-mt-24 bg-sand px-6 py-32 text-taupe md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
        <div>
          {eyebrow && <p className="uppercase text-eyebrow font-light text-clay tracking-[0.45em]">{eyebrow}</p>}
          <h2 id="corporate-enquiry-heading" className="mt-6 font-serif text-heading-two font-light">{heading}</h2>
          {description && <p className="mt-5 title-subtext font-sans font-light">{description}</p>}
          {(noteStrong || note) && (
            <p className="mt-6 text-body-copy font-sans font-light">
              {noteStrong && <span className="font-medium">{noteStrong}</span>}
              {noteStrong && note ? " " : null}
              {note}
            </p>
          )}
        </div>
        {reference ? (
          <div role="status" className="border-y border-clay/30 py-10">
            <CheckCircle2 aria-hidden="true" className="size-8 text-taupe" strokeWidth={1.2} />
            <h3 className="mt-5 font-serif text-[32px]">{success.heading}</h3>
            {success.text && <p className="mt-3">{success.text}</p>}
            <p className="mt-3 break-all text-clay">{[success.reference, reference].filter(Boolean).join(" ")}</p>
            {success.again && (
              <Button variant="outline" className="mt-8 h-12 rounded-cta border-taupe bg-transparent px-8" onClick={() => setReference("")}>{success.again}</Button>
            )}
          </div>
        ) : (
          <form aria-label={formLabel || undefined} onSubmit={handleSubmit}>
            <fieldset disabled={pending} className="space-y-[22px]">
              <div className="grid grid-cols-1 gap-x-8 gap-y-[22px] sm:grid-cols-2">
                <FormField copy={copy("company")} optionalSuffix={optionalSuffix} name="company" autoComplete="organization" maxLength={200} />
                <FormField copy={copy("contactName")} optionalSuffix={optionalSuffix} name="contactName" autoComplete="name" maxLength={150} />
                <FormField copy={copy("email")} optionalSuffix={optionalSuffix} name="email" type="email" autoComplete="email" maxLength={255} />
                <FormField copy={copy("phone")} optionalSuffix={optionalSuffix} name="phone" type="tel" autoComplete="tel" maxLength={50} optional />
                <FormField copy={copy("employees")} optionalSuffix={optionalSuffix} name="employees" type="number" min={1} max={1000} />
                <FormField copy={copy("moveIn")} optionalSuffix={optionalSuffix} name="moveIn" type="date" icon={Calendar} className={`${FIELD_CLASS} pr-11 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`} />
                <FormField copy={copy("lengthOfStay")} optionalSuffix={optionalSuffix} name="lengthOfStay" maxLength={200} />
                {accommodationOptions.length > 0 && (
                  <div>
                    <label htmlFor="corporate-accommodation" className={LABEL_CLASS}>{copy("accommodation").label}</label>
                    <div className="relative"><select id="corporate-accommodation" name="accommodation" className={`${FIELD_CLASS} cursor-pointer appearance-none pr-11`} defaultValue={accommodationOptions[0]}>
                      {accommodationOptions.map((value) => <option key={value}>{value}</option>)}
                    </select><ChevronDown aria-hidden="true" size={16} strokeWidth={1.2} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-clay" /></div>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="corporate-requirements" className={LABEL_CLASS}>{copy("requirements").label}{asterisk}</label>
                <textarea id="corporate-requirements" name="requirements" required maxLength={5000} rows={3} placeholder={copy("requirements").placeholder} className={TEXTAREA_CLASS} />
              </div>
              <div>
                <label htmlFor="corporate-pdf" className={LABEL_CLASS}>{pdf.label}</label>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <label htmlFor="corporate-pdf" className="inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-[4px] border border-clay/30 bg-pearl px-3.5 font-sans text-[15px] font-light text-taupe transition-colors duration-[180ms] hover:border-taupe motion-reduce:transition-none"><FileUp aria-hidden="true" size={18} strokeWidth={1.2} className="shrink-0 text-clay" />{file ? pdf.replace : pdf.attach}</label>
                  <input id="corporate-pdf" name="pdf" type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(event) => {
                    const next = event.target.files?.[0];
                    if (next && !isAcceptablePdf(next)) {
                      setError(message("pdf")); event.target.value = ""; setFile(undefined); return;
                    }
                    setError(""); setFile(next);
                  }} />
                  {file ? <span className="flex min-w-0 items-center gap-2"><span className="break-all text-[15px] font-light">{file.name}</span><Button type="button" size="icon" variant="ghost" aria-label={pdf.remove} className="shrink-0" onClick={() => setFile(undefined)}><X className="size-4" /></Button></span> : <span className="text-xs text-clay">{pdf.hint}</span>}
                </div>
              </div>
              <div className="hidden" aria-hidden="true"><label>Website{/* content-exempt: spam trap, never shown */}<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <label className="flex cursor-pointer select-none items-start gap-3 text-[15px] font-light leading-[1.5] text-taupe"><input type="checkbox" name="consent" required className={`${CHECKBOX_CLASS} mt-[2px]`} /><span>{consent}</span></label>
              {error ? <p role="alert" className="text-destructive">{error}</p> : null}
              <button type="submit" disabled={pending} className={`${SUBMIT_CLASS} disabled:opacity-70`}><span>{pending ? sending : submit}</span></button>
            </fieldset>
          </form>
        )}
      </div>
    </section>
  );
}

function FormField({ copy, optionalSuffix, name, optional, icon: Icon, className, ...props }: ComponentProps<"input"> & { copy: FieldCopy; optionalSuffix: string; name: string; optional?: boolean; icon?: typeof Calendar }) {
  const id = `corporate-${name}`;
  return <div><label htmlFor={id} className={LABEL_CLASS}>{copy.label}{optional ? ` ${optionalSuffix.trim()}` : asterisk}</label><div className="relative"><input id={id} name={name} required={!optional} placeholder={copy.placeholder} className={className ?? FIELD_CLASS} {...props} />{Icon ? <Icon aria-hidden="true" size={18} strokeWidth={1.2} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-clay" /> : null}</div></div>;
}
