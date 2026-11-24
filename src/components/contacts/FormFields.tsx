import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

/** Shared look for inputs, selects and textareas. Pass a different height class for textareas. */
export const controlClass = (invalid: boolean, height = "h-12") =>
  `${height} w-full border bg-white/[0.04] px-4 text-[15px] text-white placeholder:text-white/30 transition-colors ` +
  `focus:border-[#ff9900] focus:bg-white/[0.07] focus:outline-none ` +
  (invalid ? "border-[#ff7a6b]" : "border-white/15 hover:border-white/35");

/** Label + control + reserved error line. `name` becomes the control's id: `contact-${name}`. */
export function Field({
  name,
  label,
  error,
  hint,
  optional,
  className = "",
  children,
}: {
  name: string;
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
        <label
          htmlFor={`contact-${name}`}
          className="text-[13px] font-medium text-white/80"
        >
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
      <p
        id={`contact-${name}-error`}
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
    </div>
  );
}
