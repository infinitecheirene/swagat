import type { ReactNode } from "react";

/** Big left-aligned message block, used for the empty cart and the order confirmation. */
export default function CartMessage({
  icon,
  title,
  text,
  children,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex min-h-[340px] flex-col justify-center p-6 md:p-12">
      {icon}
      <h2 className="font-display mt-6 text-4xl md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-md text-base leading-7 text-white/60">{text}</p>
      {children}
    </div>
  );
}
