import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
    return (
        <section className="relative overflow-hidden bg-[#120302]">
            {/* Soft warm glow */}
            <div
                className="pointer-events-none absolute -right-40 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#FF8C00]/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
                <div className="flex flex-col gap-10 border-t border-white/10 py-14 md:flex-row md:items-end md:justify-between md:py-16">
                    <div className="max-w-2xl">
                        <h2 className="font-(family-name:--font-lora) text-5xl font-semibold leading-[0.98] tracking-tight text-white md:text-7xl">
                            Swagat means
                            <br />
                            <span className="italic text-[#FF8C00]">welcome</span>
                        </h2>

                        <p className="mt-6 text-base text-white/70 sm:text-lg">
                            Open daily, 11:00 AM — 11:00 PM. Walk in, or book ahead and we&apos;ll hold your table.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                        <Link
                            href="/reservation"
                            className="group inline-flex h-12 items-center justify-center gap-3 bg-[#FF8C00] px-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0D0B] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
                        >
                            Make a reservation
                            <ArrowUpRight
                                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </Link>
                        <Link
                            href="/menu"
                            className="inline-flex h-12 items-center justify-center border border-white/30 px-7 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#FF8C00] hover:text-[#FF8C00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
                        >
                            See the menu
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}