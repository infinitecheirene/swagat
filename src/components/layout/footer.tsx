import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0a0a08]">
            <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-20">
                <div className="grid gap-12 md:grid-cols-12">
                    <div className="md:col-span-5 flex flex-col">
                        <Image src="/swagat-logo.png" alt="Swagat at Rada logo" width={130} height={130} className="pt-4" />
                        <p className="w-auto text-sm leading-relaxed text-white/55">
                            Indian kitchen and dining room in Legazpi Village. Classic spices, modern technique,
                            and a table kept warm until eleven.
                        </p>
                    </div>
                    <div className="md:col-span-3">
                        <p className="label">Visit</p>
                        <p className="mt-4 text-sm leading-relaxed">
                            105 Rada Street, Legazpi Village
                            <br />
                            Makati City, Metro Manila 1223
                        </p>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Swagat+at+Rada+105+Rada+Street+Legazpi+Village+Makati+City"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[#ff9900]"
                        >
                            Directions <ArrowUpRight className="h-3 w-3" />
                        </a>
                    </div>
                    <div className="md:col-span-2">
                        <p className="label">Hours</p>
                        <p className="mt-4 text-sm leading-relaxed">
                            Monday — Sunday
                            <br />
                            11:00 — 23:00
                        </p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="label">Contact</p>
                        <a href="tel:+639670849492" className="mt-4 block text-sm hover:text-[#ff9900]">
                            +63 967 084 9492
                        </a>
                        <a href="/menu" className="mt-3 block text-sm hover:text-[#ff9900]">
                            The menu
                        </a>
                    </div>
                </div>
                <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.24em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 Swagat at Rada</p>
                    <p>Makati City · Philippines</p>
                </div>
            </div>
        </footer>
    );
}