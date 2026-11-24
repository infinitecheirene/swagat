import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const info = [
  ["Hours", "Daily · 11:00 AM — 11:00 PM"],
  ["Find us", "105 Rada St, Legazpi Village"],
  ["Reservations", "+63 967 084 9492"],
];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden sm:min-h-[94vh]">
      <Image
        src="/hero-banner.png"
        alt="Swagat restaurant interior"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#0d0d0b]/90 via-[#0d0d0b]/50 to-[#0d0d0b]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end border-b border-white/10 px-5 pb-7 pt-28 sm:min-h-[94vh] sm:pb-10 md:px-10 md:pt-36">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#ff9900] sm:text-sm sm:tracking-wider">
          Indian Kitchen &amp; Dining Room · Makati
        </p>
        <h1 className="font-display mt-4 max-w-5xl text-[clamp(2.65rem,13vw,7.4rem)] font-semibold uppercase leading-[0.92] tracking-[0.01em]">
          Flavours rooted
          <br />
          in<span className="italic text-[#ff9900]">tradition</span>
        </h1>
        <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/70 sm:mt-8 sm:text-lg">
          At Swagat at Rada we blend classic Indian spices with modern
          technique, to craft dishes that tell a story with every bite.
        </p>

        <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/menu"
            className="group inline-flex h-12 items-center justify-center gap-3 bg-[#ff9900] px-7 text-[12px] font-medium uppercase tracking-[0.20em] text-[#0d0d0b] transition-colors hover:bg-white sm:text-[14px]"
          >
            Explore the menu
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/reservation"
            className="inline-flex h-12 items-center justify-center border border-white/25 px-7 text-[12px] font-medium uppercase tracking-[0.20em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900] sm:text-[14px]"
          >
            Reserve a table
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 border-t border-white/15 text-center sm:mt-14 sm:grid-cols-3 sm:justify-center sm:gap-6">
          {info.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-white/10 py-3 sm:flex-col sm:justify-start sm:gap-1 sm:border-b-0 sm:pt-8"
            >
              <p className="text-[10px] uppercase text-[#ff9900]">{label}</p>
              <p className="text-xs text-white/80 sm:text-lg">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
