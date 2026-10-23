import { useEffect, useRef } from "react";

/*
 * sirvoy.js renders one widget per <script> element it has not seen before,
 * inserted just before that element, and only when the script's src is exactly
 * this URL (so no cache-busting query string). Its global setup runs once per
 * page load. Changing data-form-id on an existing script therefore does
 * nothing: every form needs a fresh script element, and switching forms means
 * removing the old script together with the widget Sirvoy inserted for it.
 */
const SIRVOY_SRC = "https://secured.sirvoy.com/widget/sirvoy.js";

/** Official WOW booking form; Sirvoy owns its content, styling and booking flow. */
export function SirvoyBooking({ formId, lang = "en" }: { formId: string; lang?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !formId) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = SIRVOY_SRC;
    script.dataset.formId = formId;
    script.dataset.lang = lang;
    host.appendChild(script);

    // Removes the script and the widget container (with its iframe) Sirvoy put next to it.
    return () => host.replaceChildren();
  }, [formId, lang]);

  return <div ref={hostRef} data-sirvoy-form={formId} className="min-h-[240px]" />;
}
