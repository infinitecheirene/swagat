"use client";

import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <main className="pt-[100px]">
            <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <div className="grid gap-12 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">05 / Visit</p>
                        <h1 className="font-display mt-5 text-[clamp(3.2rem,6vw,6rem)] font-semibold uppercase leading-[0.92]">
                            Find us<br />on <span className="italic text-[#ff9900]">Rada</span>
                        </h1>
                        <p className="mt-7 max-w-sm text-sm leading-7 text-white/55">
                            Two minutes from Greenbelt, in the middle of Legazpi Village. Walk in, or call ahead for a table.
                        </p>

                        <div className="mt-10 space-y-6">
                            <div className="flex gap-4">
                                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#ff9900]" />
                                <div><p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">Address</p><p className="mt-2 text-sm">105 Rada Street, Legazpi Village<br />Makati City, Metro Manila 1223</p></div>
                            </div>
                            <div className="flex gap-4">
                                <Clock3 className="mt-1 h-4 w-4 shrink-0 text-[#ff9900]" />
                                <div><p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">Hours</p><p className="mt-2 text-sm">Daily · 11:00 — 23:00</p></div>
                            </div>
                            <div className="flex gap-4">
                                <Phone className="mt-1 h-4 w-4 shrink-0 text-[#ff9900]" />
                                <div><p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">Phone</p><a href="tel:+639670849492" className="mt-2 block text-sm hover:text-[#ff9900]">+63 967 084 9492</a></div>
                            </div>
                        </div>
                        <a href="https://www.google.com/maps/search/?api=1&query=Swagat+at+Rada+105+Rada+Street+Legazpi+Village+Makati+City" target="_blank" rel="noreferrer" className="group mt-10 inline-flex h-12 items-center gap-3 border border-white/15 px-6 text-[10px] uppercase tracking-[0.28em] hover:border-[#ff9900] hover:text-[#ff9900]">
                            Get directions <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="md:col-span-7 md:pl-10">
                        <div className="border border-white/10">
                            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                                <p className="text-[10px] uppercase tracking-[0.3em]">Opening hours</p>
                                <p className="font-mono text-[10px] text-[#c7ad78]">GMT+8</p>
                            </div>
                            <ul className="divide-y divide-white/10">
                                {days.map((day) => (
                                    <li key={day} className="flex items-baseline justify-between px-6 py-3 text-sm">
                                        <span className="text-white/85">{day}</span>
                                        <span className="-translate-y-1 mx-6 flex-1 border-b border-dotted border-white/15" />
                                        <span className="font-mono text-[11px] text-white/55">11:00 — 23:00</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.24em] text-white/55">
                                Kitchen closes 22:30 · Reservations recommended after 19:00
                            </div>
                        </div>

                        <div className="mt-10 border border-white/10 p-6 md:p-8">
                            {submitted ? (
                                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff9900]">Message sent</p>
                                  <h2 className="font-display mt-5 text-4xl">Thank you.</h2>
                                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
                                    We have received your enquiry and will get back to you shortly.
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 border border-white/20 px-6 py-3 text-[10px] uppercase tracking-[0.24em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
                                  >
                                    Send another message
                                  </button>
                                </div>
                            ) : (
                                <>
                                  <div className="mb-8">
                                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">Send us a message</p>
                                    <h2 className="font-display mt-3 text-3xl md:text-4xl">Contact us</h2>
                                  </div>
                                  <form
                                    onSubmit={(event) => {
                                      event.preventDefault();
                                      setSubmitted(true);
                                    }}
                                    className="grid gap-6 sm:grid-cols-2"
                                  >
                                    <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65">
                                      Name
                                      <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        className="mt-3 h-14 w-full border border-white/15 bg-transparent px-4 text-sm normal-case tracking-normal text-white placeholder:text-white/30"
                                      />
                                    </label>
                                    <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65">
                                      Email
                                      <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="mt-3 h-14 w-full border border-white/15 bg-transparent px-4 text-sm normal-case tracking-normal text-white placeholder:text-white/30"
                                      />
                                    </label>
                                    <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65">
                                      Phone
                                      <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+63"
                                        className="mt-3 h-14 w-full border border-white/15 bg-transparent px-4 text-sm normal-case tracking-normal text-white placeholder:text-white/30"
                                      />
                                    </label>
                                    <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65">
                                      Subject
                                      <select
                                        required
                                        name="subject"
                                        defaultValue=""
                                        className="mt-3 h-14 w-full border border-white/15 bg-[#0d0d0b] px-4 text-sm normal-case tracking-normal text-white"
                                      >
                                        <option value="" disabled>Select a subject</option>
                                        <option value="reservation">Reservation</option>
                                        <option value="private-event">Private event</option>
                                        <option value="banquet">Banquet</option>
                                        <option value="general">General enquiry</option>
                                      </select>
                                    </label>
                                    <label className="block text-[10px] uppercase tracking-[0.24em] text-white/65 sm:col-span-2">
                                      Message
                                      <textarea
                                        required
                                        name="message"
                                        rows={5}
                                        placeholder="How can we help?"
                                        className="mt-3 w-full resize-none border border-white/15 bg-transparent p-4 text-sm normal-case leading-6 tracking-normal text-white placeholder:text-white/30"
                                      />
                                    </label>
                                    <button
                                      type="submit"
                                      className="h-12 bg-[#ff9900] text-[10px] uppercase tracking-[0.28em] text-[#0d0d0b] transition-colors hover:bg-white sm:col-span-2"
                                    >
                                      Send message
                                    </button>
                                  </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
