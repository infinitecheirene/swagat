import type { ReactNode } from "react";

export function StubRow({
  label,
  value,
  large,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5 last:border-b-0">
      <dt className="truncate text-[13px] text-white/45">{label}</dt>
      <dd
        className={`shrink-0 text-right tabular-nums ${large ? "text-xl text-[#c7ad78]" : "text-sm text-white"}`}
      >
        {value}
      </dd>
    </div>
  );
}

/** The ticket-stub side of the slip: a titled list of rows plus an action at the bottom. */
export default function CartStub({
  title,
  action,
  children,
}: {
  title: string;
  action: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative flex flex-col justify-between gap-8 border-t border-dashed border-white/25 bg-white/[0.025] p-6 lg:border-l lg:border-t-0 lg:p-8">
      {/* ticket notches, desktop only (match your page background colour) */}
      <span className="absolute -left-3 -top-3 hidden h-6 w-6 rounded-full border border-white/15 bg-[#0d0d0b] lg:block" />
      <span className="absolute -bottom-3 -left-3 hidden h-6 w-6 rounded-full border border-white/15 bg-[#0d0d0b] lg:block" />

      <div>
        <p className="font-display text-2xl text-[#c7ad78]">{title}</p>
        <dl className="mt-3 border-t border-[#c7ad78]/40">{children}</dl>
      </div>
      {action}
    </div>
  );
}
