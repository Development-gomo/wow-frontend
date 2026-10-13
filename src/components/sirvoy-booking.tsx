import { useEffect, useRef } from "react";

/** Official WOW booking form; Sirvoy owns its content, styling and booking flow. */
export function SirvoyBooking() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://secured.sirvoy.com/widget/sirvoy.js";
    script.dataset.formId = "5abcd0b9a1235";
    script.dataset.lang = "en";
    host.appendChild(script);
    return () => { host.replaceChildren(); };
  }, []);

  return <div ref={hostRef} className="min-h-[240px]" />;
}