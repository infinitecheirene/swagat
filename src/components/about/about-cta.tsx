import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Phone } from "lucide-react";

const services = [
  ["Dinner service", "Walk in, or book ahead for a table."],
  ["Private parties", "Celebrate in the dining room."],
  ["Banquets", "Long tables for larger groups."],
];

export default function AboutCta() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-16 sm:py-24 md:px-10 md:py-28">
      <div className="grid overflow-hidden border border-white/10 md:grid-cols-2">
        {/* Image */}
        <div className="relative min-h-[340px] md:min-h-[580px]">
          <Image
            src="/murg-makhni.png"
            alt="Murg Makhni, the Swagat signature butter chicken"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0b]/70 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:via-transparent md:to-[#0d0d0b]/30" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center bg-[#0a0a08] p-8 sm:p-12 lg:p-16">
          <p className="text-sm text-[#ff9900]">Reservations</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,4.5vw,4rem)] font-light uppercase leading-[0.98]">
            A table <span className="italic text-[#ff9900]">is waiting</span>
          </h2>

          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {services.map(([name, copy]) => (
              <li
                key={name}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-lg text-white">{name}</span>
                <span className="text-base text-white/60">{copy}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-start gap-4 text-white/80">
            <Clock3 className="mt-1 h-5 w-5 shrink-0 text-[#ff9900]" />
            <p className="text-base leading-relaxed">
              Daily, 11:00 AM — 11:00 PM
              <br />
              <span className="text-white/55">Kitchen closes at 10:30 PM</span>
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/reservation"
              className="group inline-flex h-12 items-center justify-center gap-3 bg-[#ff9900] px-7 text-xs font-medium uppercase tracking-[0.2em] text-[#0d0d0b] transition-colors hover:bg-white"
            >
              Reserve a table
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="tel:+639670849492"
              className="inline-flex h-12 items-center justify-center gap-2 border border-white/25 px-7 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
            >
              <Phone className="h-4 w-4" />
              +63 967 084 9492
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
