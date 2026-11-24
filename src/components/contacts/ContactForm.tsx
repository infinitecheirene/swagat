"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Field, controlClass } from "./FormFields";

const SUBJECTS = [
  { value: "reservation", label: "Reservation" },
  { value: "private-event", label: "Private event" },
  { value: "banquet", label: "Banquet" },
  { value: "general", label: "General enquiry" },
];

const PHONE_LENGTH = 11;

type Key = "name" | "email" | "phone" | "subject" | "message";
const KEYS: Key[] = ["name", "email", "phone", "subject", "message"];

// One rule per field: return an error message, or undefined when valid.
const rules: Record<Key, (v: string) => string | undefined> = {
  name: (v) => (v.trim().length < 2 ? "Enter your full name." : undefined),
  email: (v) =>
    !v.trim()
      ? "Enter your email address."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
        ? "Enter a valid email, like you@example.com."
        : undefined,
  // optional, but if filled it must be exactly 11 digits (non-digits are stripped as you type)
  phone: (v) =>
    v && v.length !== PHONE_LENGTH
      ? `Must be exactly ${PHONE_LENGTH} digits (${v.length} entered).`
      : undefined,
  subject: (v) => (v ? undefined : "Select a subject."),
  message: (v) =>
    v.trim().length < 10
      ? "Tell us a little more (at least 10 characters)."
      : undefined,
};

const EMPTY: Record<Key, string> = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: Key, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));
  const err = (key: Key) =>
    touched[key] || attempted ? rules[key](values[key]) : undefined;

  // Props every input / select / textarea shares.
  const bind = (key: Key) => ({
    id: `contact-${key}`,
    name: key,
    value: values[key],
    onChange: (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => set(key, e.target.value),
    onBlur: () => setTouched((prev) => ({ ...prev, [key]: true })),
    "aria-invalid": !!err(key),
    "aria-describedby": `contact-${key}-error`,
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setAttempted(true);
    const firstInvalid = KEYS.find((key) => rules[key](values[key]));
    if (firstInvalid)
      return void document.getElementById(`contact-${firstInvalid}`)?.focus();

    // TODO: send `values` to your API / email service here.
    setSubmitted(true);
  }

  function reset() {
    setValues(EMPTY);
    setTouched({});
    setAttempted(false);
    setSubmitted(false);
  }

  if (submitted)
    return (
      <div className="flex min-h-[420px] flex-col justify-center border border-white/15 p-6 md:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff9900] text-[#0d0d0b]">
          <Check className="h-5 w-5" />
        </span>
        <h2 className="font-display mt-6 text-4xl md:text-5xl">
          Thank you, {values.name.trim().split(" ")[0]}.
        </h2>
        <p className="mt-4 max-w-md text-base leading-7 text-white/60">
          We received your message and will reply to{" "}
          <span className="text-white">{values.email.trim()}</span> shortly.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 h-12 self-start border border-white/25 px-6 text-sm transition-colors hover:border-[#ff9900] hover:text-[#ff9900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff9900]"
        >
          Send another message
        </button>
      </div>
    );

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid grid-cols-6 gap-x-5 border border-white/15 p-6 md:p-10"
    >
      <p className="font-display col-span-6 mb-6 text-2xl text-[#c7ad78]">
        Send us a message
      </p>

      <Field
        name="name"
        label="Name"
        error={err("name")}
        className="col-span-6 sm:col-span-3"
      >
        <input
          {...bind("name")}
          type="text"
          autoComplete="name"
          className={controlClass(!!err("name"))}
        />
      </Field>

      <Field
        name="email"
        label="Email"
        error={err("email")}
        className="col-span-6 sm:col-span-3"
      >
        <input
          {...bind("email")}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={controlClass(!!err("email"))}
        />
      </Field>

      <Field
        name="phone"
        label="Phone"
        optional
        error={err("phone")}
        hint={
          values.phone ? `${values.phone.length}/${PHONE_LENGTH}` : undefined
        }
        className="col-span-6 sm:col-span-3"
      >
        <input
          {...bind("phone")}
          // strip anything that isn't a digit, including pasted spaces, dashes and "+"
          onChange={(e) =>
            set(
              "phone",
              e.target.value.replace(/\D/g, "").slice(0, PHONE_LENGTH),
            )
          }
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={PHONE_LENGTH}
          placeholder="09123456789"
          className={`${controlClass(!!err("phone"))} tabular-nums`}
        />
      </Field>

      <Field
        name="subject"
        label="Subject"
        error={err("subject")}
        className="col-span-6 sm:col-span-3"
      >
        <span className="relative block">
          <select
            {...bind("subject")}
            className={`${controlClass(!!err("subject"))} appearance-none pr-10 ${values.subject ? "" : "text-white/40"}`}
          >
            <option value="" className="bg-[#0d0d0b]">
              Select a subject
            </option>
            {SUBJECTS.map(({ value, label }) => (
              <option key={value} value={value} className="bg-[#0d0d0b]">
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff9900]" />
        </span>
      </Field>

      <Field
        name="message"
        label="Message"
        error={err("message")}
        className="col-span-6"
      >
        <textarea
          {...bind("message")}
          rows={4}
          placeholder="How can we help?"
          className={`${controlClass(!!err("message"), "")} resize-none py-3`}
        />
      </Field>

      <button
        type="submit"
        className="col-span-6 mt-1 h-12 bg-[#ff9900] text-[15px] font-semibold text-[#0d0d0b] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Send message
      </button>
    </form>
  );
}
