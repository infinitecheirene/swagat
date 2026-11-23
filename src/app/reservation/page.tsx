"use client";

import { CalendarDays, Clock3, Users } from "lucide-react";
import { useState } from "react";

export default function ReservationPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="pt-[100px]">
      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">Reservations</p>
            <h1 className="font-display mt-5 text-[clamp(3rem,6vw,5.8rem)] font-semibold uppercase leading-[0.92]">
              Your table<br />is <span className="italic text-[#ff9900]">waiting</span>
            </h1>
            <p className="mt-8 max-w-md text-sm leading-7 text-white/55">
              Reservations are recommended after 19:00. For parties of more than eight guests,
              please contact the restaurant directly.
            </p>
            <div className="mt-10 border-y border-white/10 py-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">Direct reservations</p>
              <a href="tel:+639670849492" className="mt-3 block font-display text-2xl hover:text-[#ff9900]">
                +63 967 084 9492
              </a>
            </div>
          </div>

          <div className="md:col-span-7 md:pl-10">
            {submitted ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center border border-white/10 p-8 text-center">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff9900]">Request received</p>
                <h2 className="font-display mt-5 text-4xl">Thank you.</h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
                  We will confirm your table shortly.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-8 border border-white/20 px-6 py-3 text-[10px] uppercase tracking-[0.24em] hover:border-[#ff9900]">
                  Make another reservation
                </button>
              </div>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="border border-white/10 p-6 md:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65">
                    Date
                    <span className="relative mt-3 block">
                      <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff9900]" />
                      <input required type="date" className="h-14 w-full border border-white/15 bg-transparent pl-12 pr-4 text-sm text-white [color-scheme:dark]" />
                    </span>
                  </label>
                  <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65">
                    Time
                    <span className="relative mt-3 block">
                      <Clock3 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff9900]" />
                      <select required className="h-14 w-full border border-white/15 bg-[#0d0d0b] pl-12 pr-4 text-sm text-white">
                        <option value="">Select time</option>
                        <option>12:00</option><option>13:30</option><option>18:00</option><option>19:30</option><option>21:00</option>
                      </select>
                    </span>
                  </label>
                  <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65">
                    Guests
                    <span className="relative mt-3 block">
                      <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff9900]" />
                      <select required className="h-14 w-full border border-white/15 bg-[#0d0d0b] pl-12 pr-4 text-sm text-white">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => <option key={number}>{number} {number === 1 ? "guest" : "guests"}</option>)}
                      </select>
                    </span>
                  </label>
                  <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65">
                    Phone
                    <input required type="tel" placeholder="+63" className="mt-3 h-14 w-full border border-white/15 bg-transparent px-4 text-sm text-white placeholder:text-white/30" />
                  </label>
                  <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65 sm:col-span-2">
                    Name
                    <input required type="text" placeholder="Your name" className="mt-3 h-14 w-full border border-white/15 bg-transparent px-4 text-sm text-white placeholder:text-white/30" />
                  </label>
                  <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65 sm:col-span-2">
                    Special requests
                    <textarea rows={4} placeholder="Dietary requirements or occasion" className="mt-3 w-full resize-none border border-white/15 bg-transparent p-4 text-sm text-white placeholder:text-white/30" />
                  </label>
                </div>
                <button type="submit" className="mt-8 h-12 w-full bg-[#ff9900] text-[10px] uppercase tracking-[0.28em] text-[#0d0d0b] transition-colors hover:bg-white">
                  Request reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
