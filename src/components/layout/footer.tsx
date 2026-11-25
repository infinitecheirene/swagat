import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Swagat+at+Rada+105+Rada+Street+Legazpi+Village+Makati+City";

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.2em] text-[#ff9900]";
const linkClass =
  "inline-flex items-center gap-1.5 underline decoration-[#f3e8d6]/30 underline-offset-4 transition-colors hover:text-[#ff9900] hover:decoration-[#ff9900]";

export default function Footer() {
  return (
    <footer className="bg-[#250604] text-[#f3e8d6]">
      <div className="mx-auto max-w-[1500px] px-5 pt-14 md:px-10 md:pt-16">
        {/* Details */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/swagat-logo.png"
              alt="Swagat at Rada logo"
              width={96}
              height={96}
            />
            <p className="mt-5 max-w-xs text-base leading-relaxed text-[#f3e8d6]/70">
              Indian kitchen and dining room in Legazpi Village. Classic spices,
              modern technique.
            </p>
          </div>

          <div>
            <p className={labelClass}>Visit</p>
            <p className="mt-4 text-lg leading-snug">
              105 Rada Street, Legazpi Village
              <br />
              Makati City, Metro Manila 1223
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className={`${linkClass} mt-4 text-base`}
            >
              Get directions <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div>
            <p className={labelClass}>Open daily</p>
            <p className="mt-4 text-lg leading-snug">
              11:00 AM — 11:00 PM
              <br />
              <span className="text-[#f3e8d6]/70">
                Kitchen closes at 10:30 PM
              </span>
            </p>
          </div>

          <div>
            <p className={labelClass}>Reservations</p>
            <a href="tel:+639670849492" className={`${linkClass} mt-4 text-lg`}>
              +63 967 084 9492
            </a>
            <p className="mt-2 text-base text-[#f3e8d6]/70">
              Recommended after 7:00 PM
            </p>
          </div>
        </div>

        {/* Welcome + CTA */}
        <div className="mt-12 flex flex-col gap-5 border-t border-[#f3e8d6]/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-light uppercase tracking-[0.02em] md:text-3xl">
            Swagat means <span className="italic text-[#ff9900]">welcome.</span>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/reservation"
              className="group inline-flex h-11 items-center justify-center gap-2 bg-[#ff9900] px-6 text-xs font-medium uppercase tracking-[0.2em] text-[#2a0f0a] transition-colors hover:bg-[#f3e8d6]"
            >
              Reserve a table
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/menu"
              className="inline-flex h-11 items-center justify-center border border-[#f3e8d6]/30 px-6 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
            >
              See the menu
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-2 border-t border-[#f3e8d6]/15 py-6 text-sm text-[#f3e8d6]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Swagat at Rada</p>
          <p>Legazpi Village · Makati City</p>
        </div>
      </div>
    </footer>
  );
}
