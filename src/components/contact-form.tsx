import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
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
      setStatus("Please complete all fields.");
      return;
    }
    if (checkIn && checkOut && checkOut <= checkIn) {
      setStatus("Check-out must be after check-in.");
      return;
    }

    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const dates = `Check-in: ${checkIn || "Not specified"}\nCheck-out: ${checkOut || "Not specified"}`;
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPurpose of stay: ${purpose || "Not specified"}\n${dates}\n\n${message}`);
    window.location.href = `mailto:anna@wowapartments.se?subject=${subject}&body=${body}`;
    setStatus("Your email app is opening with your message.");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
      <label htmlFor="contact-name" className="pl-[0.32em] text-[10px] font-medium uppercase tracking-[0.32em] text-clay">
        Name
      </label>
      <input
        id="contact-name"
        name="name"
        type="text"
        autoComplete="name"
        required
        className="mt-3 h-12 w-full rounded-[4px] border border-clay/35 bg-pearl px-4 text-[15px] font-light text-taupe outline-none transition-colors placeholder:text-clay/65 focus:border-taupe"
      />

      <label htmlFor="contact-email" className="mt-7 pl-[0.32em] text-[10px] font-medium uppercase tracking-[0.32em] text-clay">
        Email
      </label>
      <input
        id="contact-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="mt-3 h-12 w-full rounded-[4px] border border-clay/35 bg-pearl px-4 text-[15px] font-light text-taupe outline-none transition-colors placeholder:text-clay/65 focus:border-taupe"
      />

      <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-5">
        <div className="flex flex-col">
          <label htmlFor="contact-checkin" className="pl-[0.32em] text-[10px] font-medium uppercase tracking-[0.32em] text-clay">
            Check-in
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
            className="mt-3 h-12 w-full rounded-[4px] border border-clay/35 bg-pearl px-4 text-[15px] font-light text-taupe outline-none transition-colors focus:border-taupe"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="contact-checkout" className="pl-[0.32em] text-[10px] font-medium uppercase tracking-[0.32em] text-clay">
            Check-out
          </label>
          <input
            id="contact-checkout"
            name="checkout"
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-3 h-12 w-full rounded-[4px] border border-clay/35 bg-pearl px-4 text-[15px] font-light text-taupe outline-none transition-colors focus:border-taupe"
          />
        </div>
      </div>


      <label htmlFor="contact-purpose" className="mt-7 pl-[0.32em] text-[10px] font-medium uppercase tracking-[0.32em] text-clay">
        Purpose of stay
      </label>
      <select
        id="contact-purpose"
        name="purpose"
        defaultValue=""
        className="mt-3 h-12 w-full cursor-pointer appearance-none rounded-[4px] border border-clay/35 bg-pearl bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23716a60%22%20stroke-width%3D%221.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat px-4 pr-11 text-[15px] font-light text-taupe outline-none transition-colors focus:border-taupe"
      >
        <option value="">Select an option</option>
        <option value="Leisure">Leisure</option>
        <option value="Business">Business</option>
        <option value="Relocation">Relocation</option>
        <option value="Long-term stay">Long-term stay</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="contact-message" className="mt-7 pl-[0.32em] text-[10px] font-medium uppercase tracking-[0.32em] text-clay">
        Message
      </label>
      <textarea
        id="contact-message"
        name="message"
        rows={7}
        required
        className="mt-3 w-full resize-y rounded-[4px] border border-clay/35 bg-pearl px-4 py-3 text-[15px] font-light leading-[1.7] text-taupe outline-none transition-colors placeholder:text-clay/65 focus:border-taupe"
      />

      <Button type="submit" className="mt-8 h-12 self-start rounded-cta bg-taupe px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-pearl shadow-none transition-colors hover:bg-umber">
        Send message
      </Button>
      <p role="status" aria-live="polite" className="mt-4 min-h-5 text-[13px] font-light text-taupe/75">
        {status}
      </p>
    </form>
  );
}