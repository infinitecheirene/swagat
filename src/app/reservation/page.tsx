"use client";

import { AlertCircle, Check, ChevronDown, Phone } from "lucide-react";
import { useState, type ReactNode } from "react";

/* ---------- types & constants ---------- */

type Values = {
  name: string;
  email: string;
  phone: string;
  month: string;
  day: string;
  year: string;
  time: string;
  guests: string;
  notes: string;
};

type FieldKey = "name" | "email" | "phone" | "date" | "time" | "guests";
type Errors = Partial<Record<FieldKey, string>>;

const FIELD_ORDER: FieldKey[] = [
  "name",
  "email",
  "phone",
  "guests",
  "date",
  "time",
];
const PHONE_LENGTH = 11;
const LARGE_PARTY = 8; // above this, the restaurant confirms by phone
const MAX_GUESTS = 50; // largest party the form accepts

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const TIMES = ["12:00", "13:30", "18:00", "19:30", "21:00"];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

const INITIAL: Values = {
  name: "",
  email: "",
  phone: "",
  month: "",
  day: "",
  year: "",
  time: "",
  guests: "",
  notes: "",
};

/* ---------- helpers ---------- */

// Builds a real Date from the three selects, or null if incomplete / impossible (e.g. Feb 31)
function buildDate(v: Values): Date | null {
  if (!v.month || !v.day || !v.year) return null;
  const y = Number(v.year);
  const m = Number(v.month);
  const d = Number(v.day);
  const date = new Date(y, m, d);
  return date.getFullYear() === y &&
    date.getMonth() === m &&
    date.getDate() === d
    ? date
    : null;
}

function startOfToday() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-PH", {
    weekday: "short",
    month: "long",
    day: "numeric",
  }).format(date);
}

function validate(v: Values): Errors {
  const errors: Errors = {};

  if (v.name.trim().length < 2) errors.name = "Enter your full name.";

  if (!v.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    errors.email = "Enter a valid email, like you@example.com.";

  if (!v.phone) errors.phone = "Enter your phone number.";
  else if (!/^\d+$/.test(v.phone)) errors.phone = "Use digits only.";
  else if (v.phone.length !== PHONE_LENGTH)
    errors.phone = `Must be exactly ${PHONE_LENGTH} digits (${v.phone.length} entered).`;

  if (!v.guests) errors.guests = "Required.";
  else if (Number(v.guests) < 1) errors.guests = "At least 1.";
  else if (Number(v.guests) > MAX_GUESTS)
    errors.guests = `Max ${MAX_GUESTS} online. Call us.`;

  if (!v.month || !v.day || !v.year)
    errors.date = "Choose a month, day and year.";
  else {
    const date = buildDate(v);
    if (!date)
      errors.date = "That date doesn't exist. Check the day and month.";
    else if (date < startOfToday())
      errors.date = "Choose today or a later date.";
  }

  if (!v.time) errors.time = "Select a time.";

  return errors;
}

/* ---------- small UI pieces ---------- */

const controlBase =
  "h-12 w-full border bg-white/[0.04] px-4 text-[15px] text-white placeholder:text-white/30 transition-colors " +
  "focus:outline-none focus:border-[#ff9900] focus:bg-white/[0.07]";

const controlClass = (invalid: boolean) =>
  `${controlBase} ${invalid ? "border-[#ff7a6b]" : "border-white/15 hover:border-white/35"}`;

function ErrorLine({ id, error }: { id: string; error?: string }) {
  return (
    <p
      id={id}
      role={error ? "alert" : undefined}
      className={`mt-1.5 flex min-h-[1rem] items-start gap-1 text-[11px] leading-4 text-[#ff7a6b] ${error ? "" : "invisible"}`}
    >
      {error && (
        <>
          <AlertCircle className="mt-px h-3 w-3 shrink-0" />
          <span>{error}</span>
        </>
      )}
    </p>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  optional,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-medium text-white/80">
          {label}
          {optional && (
            <span className="ml-2 text-xs font-normal text-white/35">
              optional
            </span>
          )}
        </label>
        {hint && (
          <span className="text-xs tabular-nums text-white/35">{hint}</span>
        )}
      </div>
      {children}
      <ErrorLine id={`${id}-error`} error={error} />
    </div>
  );
}

function Select({
  id,
  label,
  value,
  placeholder,
  invalid,
  describedBy,
  onChange,
  onBlur,
  children,
}: {
  id?: string;
  label: string;
  value: string;
  placeholder: string;
  invalid: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  children: ReactNode;
}) {
  return (
    <span className="relative block min-w-0">
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={`${controlClass(invalid)} appearance-none pr-8 ${value ? "text-white" : "text-white/40"}`}
      >
        <option value="" className="bg-[#0d0d0b]">
          {placeholder}
        </option>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff9900]" />
    </span>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5 last:border-b-0">
      <dt className="text-[13px] text-white/45">{label}</dt>
      <dd
        className={`truncate text-right text-sm ${value ? "text-white" : "text-white/25"}`}
      >
        {value || "Not set"}
      </dd>
    </div>
  );
}

/* ---------- page ---------- */

export default function ReservationPage() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>(
    {},
  );
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values);
  const show = (key: FieldKey) =>
    (touched[key] || attempted) && errors[key] ? errors[key] : undefined;

  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const blur = (key: FieldKey) =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const thisYear = new Date().getFullYear();
  const years = [String(thisYear), String(thisYear + 1)];

  const date = buildDate(values);
  const guestCount = Number(values.guests);
  const guestsLabel =
    guestCount >= 1
      ? `${guestCount} ${guestCount === 1 ? "guest" : "guests"}`
      : "";
  const dateError = show("date");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setAttempted(true);

    const firstInvalid = FIELD_ORDER.find((key) => errors[key]);
    if (firstInvalid) {
      const id =
        firstInvalid === "date" ? "field-month" : `field-${firstInvalid}`;
      document.getElementById(id)?.focus();
      return;
    }

    // TODO: send `values` to your API / email service here.
    setSubmitted(true);
  }

  function reset() {
    setValues(INITIAL);
    setTouched({});
    setAttempted(false);
    setSubmitted(false);
  }

  /* the stub: live booking summary (right side of the slip) */
  const stub = (action: ReactNode) => (
    <div className="relative flex flex-col justify-between gap-8 border-t border-dashed border-white/25 bg-white/[0.025] p-6 lg:border-l lg:border-t-0 lg:p-8">
      {/* ticket notches, desktop only */}
      <span className="absolute -left-3 -top-3 hidden h-6 w-6 rounded-full border border-white/15 bg-[#0d0d0b] lg:block" />
      <span className="absolute -bottom-3 -left-3 hidden h-6 w-6 rounded-full border border-white/15 bg-[#0d0d0b] lg:block" />

      <div aria-live="polite">
        <p className="font-display text-2xl text-[#c7ad78]">Your booking</p>
        <dl className="mt-3 border-t border-[#c7ad78]/40">
          <SummaryRow label="Date" value={formatDate(date)} />
          <SummaryRow label="Time" value={values.time} />
          <SummaryRow label="Guests" value={guestsLabel} />
          <SummaryRow label="Name" value={values.name.trim()} />
        </dl>
      </div>
      {action}
    </div>
  );

  return (
    <main className="pt-[100px]">
      <section className="mx-auto max-w-[1500px] px-5 py-14 md:px-10 md:py-20">
        {/* ---------- header ---------- */}
        <header className="grid items-end gap-8 lg:grid-cols-12">
          <h1 className="font-display text-[clamp(2.75rem,5.4vw,5rem)] font-semibold leading-[0.98] lg:col-span-7">
            Your table{" "}
            <span className="italic text-[#ff9900]">is waiting.</span>
          </h1>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:col-span-5 lg:justify-end lg:gap-8">
            <p className="max-w-xs text-sm leading-6 text-white/60">
              Reservations are recommended after 19:00. Parties of more than{" "}
              {LARGE_PARTY} are welcome. We will call you to confirm.
            </p>
            <a
              href="tel:+639670849492"
              className="inline-flex shrink-0 items-center gap-3 border border-white/15 px-4 py-3 transition-colors hover:border-[#ff9900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff9900]"
            >
              <Phone className="h-4 w-4 text-[#ff9900]" />
              <span>
                <span className="block text-[11px] text-white/45">
                  Call to reserve
                </span>
                <span className="font-display text-lg">+63 967 084 9492</span>
              </span>
            </a>
          </div>
        </header>

        {/* ---------- the slip ---------- */}
        <div className="mt-10 overflow-hidden border border-white/15 md:mt-14">
          {submitted ? (
            <div className="grid lg:grid-cols-[1fr_340px]">
              <div className="flex min-h-[340px] flex-col justify-center p-6 md:p-12">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff9900] text-[#0d0d0b]">
                  <Check className="h-5 w-5" />
                </span>
                <h2 className="font-display mt-6 text-4xl md:text-5xl">
                  Thank you, {values.name.trim().split(" ")[0]}.
                </h2>
                <p className="mt-4 max-w-md text-base leading-7 text-white/60">
                  We received your request. We will confirm by phone or at{" "}
                  <span className="text-white">{values.email.trim()}</span>{" "}
                  shortly.
                  {guestCount > LARGE_PARTY &&
                    " Because your party is larger than " +
                      LARGE_PARTY +
                      ", we will call you to confirm the table."}
                </p>
              </div>
              {stub(
                <button
                  type="button"
                  onClick={reset}
                  className="h-12 w-full border border-white/25 text-sm transition-colors hover:border-[#ff9900] hover:text-[#ff9900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff9900]"
                >
                  Make another reservation
                </button>,
              )}
            </div>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit}
              className="grid lg:grid-cols-[1fr_340px]"
            >
              {/* fields */}
              <div className="grid grid-cols-6 gap-x-5 p-6 md:p-10">
                <Field
                  id="field-name"
                  label="Name"
                  error={show("name")}
                  className="col-span-6 sm:col-span-3"
                >
                  <input
                    id="field-name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    onBlur={() => blur("name")}
                    aria-invalid={!!show("name")}
                    aria-describedby="field-name-error"
                    className={controlClass(!!show("name"))}
                  />
                </Field>

                <Field
                  id="field-email"
                  label="Email"
                  error={show("email")}
                  className="col-span-6 sm:col-span-3"
                >
                  <input
                    id="field-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    onBlur={() => blur("email")}
                    aria-invalid={!!show("email")}
                    aria-describedby="field-email-error"
                    className={controlClass(!!show("email"))}
                  />
                </Field>

                <Field
                  id="field-phone"
                  label="Phone"
                  error={show("phone")}
                  hint={`${values.phone.length}/${PHONE_LENGTH}`}
                  className="col-span-4"
                >
                  <input
                    id="field-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={PHONE_LENGTH}
                    placeholder="09123456789"
                    value={values.phone}
                    // strip anything that isn't a digit, including pasted spaces, dashes and "+"
                    onChange={(e) =>
                      set(
                        "phone",
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, PHONE_LENGTH),
                      )
                    }
                    onBlur={() => blur("phone")}
                    aria-invalid={!!show("phone")}
                    aria-describedby="field-phone-error"
                    className={`${controlClass(!!show("phone"))} tabular-nums`}
                  />
                </Field>

                <Field
                  id="field-guests"
                  label="Guests"
                  error={show("guests")}
                  className="col-span-2"
                >
                  <input
                    id="field-guests"
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="e.g. 4"
                    value={values.guests}
                    onChange={(e) =>
                      set(
                        "guests",
                        e.target.value.replace(/\D/g, "").slice(0, 2),
                      )
                    }
                    onBlur={() => blur("guests")}
                    aria-invalid={!!show("guests")}
                    aria-describedby="field-guests-error"
                    className={`${controlClass(!!show("guests"))} tabular-nums`}
                  />
                </Field>

                {/* preferred date: month / day / year */}
                <div className="col-span-6 sm:col-span-4">
                  <span
                    id="date-label"
                    className="mb-1.5 block text-[13px] font-medium text-white/80"
                  >
                    Preferred date
                  </span>
                  <div
                    role="group"
                    aria-labelledby="date-label"
                    className="grid grid-cols-[1.5fr_1fr_1fr] gap-2"
                  >
                    <Select
                      id="field-month"
                      label="Month"
                      placeholder="Month"
                      value={values.month}
                      invalid={!!dateError}
                      describedBy="field-date-error"
                      onChange={(v) => set("month", v)}
                      onBlur={() => blur("date")}
                    >
                      {MONTHS.map((name, i) => (
                        <option
                          key={name}
                          value={String(i)}
                          className="bg-[#0d0d0b]"
                        >
                          {name}
                        </option>
                      ))}
                    </Select>
                    <Select
                      label="Day"
                      placeholder="Day"
                      value={values.day}
                      invalid={!!dateError}
                      describedBy="field-date-error"
                      onChange={(v) => set("day", v)}
                      onBlur={() => blur("date")}
                    >
                      {DAYS.map((d) => (
                        <option key={d} value={d} className="bg-[#0d0d0b]">
                          {d}
                        </option>
                      ))}
                    </Select>
                    <Select
                      label="Year"
                      placeholder="Year"
                      value={values.year}
                      invalid={!!dateError}
                      describedBy="field-date-error"
                      onChange={(v) => set("year", v)}
                      onBlur={() => blur("date")}
                    >
                      {years.map((y) => (
                        <option key={y} value={y} className="bg-[#0d0d0b]">
                          {y}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <ErrorLine id="field-date-error" error={dateError} />
                </div>

                <Field
                  id="field-time"
                  label="Preferred time"
                  error={show("time")}
                  className="col-span-6 sm:col-span-2"
                >
                  <Select
                    id="field-time"
                    label="Preferred time"
                    placeholder="Select a time"
                    value={values.time}
                    invalid={!!show("time")}
                    describedBy="field-time-error"
                    onChange={(v) => set("time", v)}
                    onBlur={() => blur("time")}
                  >
                    {TIMES.map((t) => (
                      <option key={t} value={t} className="bg-[#0d0d0b]">
                        {t}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field
                  id="field-notes"
                  label="Special instructions"
                  optional
                  className="col-span-6"
                >
                  <textarea
                    id="field-notes"
                    rows={2}
                    placeholder="Dietary needs, accessibility requests, or anything else we should know"
                    value={values.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    className={`${controlBase} h-auto resize-none border-white/15 py-3 hover:border-white/35`}
                  />
                </Field>
              </div>

              {/* stub: live summary + submit */}
              {stub(
                <div>
                  <button
                    type="submit"
                    className="h-12 w-full bg-[#ff9900] text-[15px] font-semibold text-[#0d0d0b] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Request reservation
                  </button>
                  <p
                    role={
                      attempted && Object.keys(errors).length > 0
                        ? "alert"
                        : undefined
                    }
                    className={`mt-3 min-h-[1rem] text-center text-xs ${
                      attempted && Object.keys(errors).length > 0
                        ? "text-[#ff7a6b]"
                        : "text-white/40"
                    }`}
                  >
                    {attempted && Object.keys(errors).length > 0
                      ? "Fix the highlighted fields to continue."
                      : guestCount > LARGE_PARTY
                        ? "Large party: we will call you to confirm."
                        : "We will confirm your table shortly."}
                  </p>
                </div>,
              )}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
