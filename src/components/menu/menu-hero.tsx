import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function MenuHero() {
  return (
    <section className="relative min-h-[44vh] overflow-hidden">
      <Image
        src="/kitchen.png"
        alt="Indian dishes on the table"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#0d0d0b]/60 via-[#0d0d0b]/75 to-[#0d0d0b]" />

      <div className="relative mx-auto flex min-h-[44vh] max-w-[1500px] flex-col justify-end gap-6 px-5 pb-10 pt-16 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="text-sm text-[#ff9900]">
            Lunch &amp; dinner · 11:00 AM — 11:00 PM
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.8rem,8vw,6.5rem)] font-semibold uppercase leading-[0.92]">
            From the kitchen
          </h1>
        </div>

        <Link
          href="/reservation"
          className="group inline-flex h-12 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
        >
          Reserve a table
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
