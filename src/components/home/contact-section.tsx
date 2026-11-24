import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { days } from "./signature-data";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=105+Rada+Street+Legazpi+Village+Makati";

export default function ContactSection() {
  return (
    <section className="scroll-mt-24 border-t border-white/10 bg-[#0a0a08]">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          {/* Left: intro + actions */}
          <div className="md:col-span-5">
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light uppercase leading-[0.95] tracking-[0.02em]">
              Find us on <span className="italic text-[#ff9900]">Rada</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
              Two minutes from Greenbelt, in the middle of Legazpi Village. Walk
              in, or call ahead for a table and we will hold it.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-3 bg-[#ff9900] px-7 text-[12px] font-medium uppercase tracking-[0.20em] text-[#0d0d0b] transition-colors hover:bg-white"
              >
                Get directions
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/reservation"
                className="inline-flex h-12 items-center justify-center border border-white/25 px-7 text-[12px] font-medium uppercase tracking-[0.20em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
              >
                Reserve a table
              </Link>
            </div>
          </div>

          {/* Right: details panel */}
          <div className="md:col-span-7 md:pl-10">
            <div className="border border-white/10 bg-white/[0.02]">
              <div className="flex items-start gap-5 border-b border-white/10 p-6 sm:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 text-[#ff9900]">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#c7ad78]">
                    Address
                  </p>
                  <p className="mt-2 text-lg leading-snug text-white sm:text-xl">
                    105 Rada Street, Legazpi Village
                    <br />
                    <span className="text-white/60">
                      Makati City, Metro Manila 1223
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 border-b border-white/10 p-6 sm:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 text-[#ff9900]">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#c7ad78]">
                    Reservations
                  </p>
                  <a
                    href="tel:+639670849492"
                    className="mt-2 block text-lg text-white hover:text-[#ff9900] sm:text-xl"
                  >
                    +63 967 084 9492
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 p-6 sm:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 text-[#ff9900]">
                  <Clock3 className="h-5 w-5" />
                </span>
                <div className="w-full">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#c7ad78]">
                      Open daily
                    </p>
                    <p className="font-mono text-[11px] text-white/40">GMT+8</p>
                  </div>
                  <p className="mt-2 text-lg text-white sm:text-xl">
                    11:00 AM — 11:00 PM
                  </p>

                  <ul className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
                    {days.map((day) => (
                      <li
                        key={day}
                        className="border border-[#ff9900]/30 py-2 text-center text-[11px] uppercase tracking-[0.12em] text-[#ff9900]"
                      >
                        {day.slice(0, 3)}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-sm text-white/55">
                    Kitchen closes at 10:30 PM. Reservations recommended after
                    7:00 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
