import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="pt-[100px]">
            <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">01 / Our story</p>
                <div className="mt-6 grid items-end gap-10 md:grid-cols-12">
                    <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-semibold uppercase leading-[0.92] md:col-span-8">
                        Tradition,<br />served <span className="italic text-[#ff9900]">alive</span>
                    </h1>
                    <p className="text-sm leading-7 text-white/55 md:col-span-4 md:pb-2">
                        Swagat at Rada brings together the warmth of Indian hospitality and the confidence of modern dining.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10 md:pb-32">
                <div className="grid items-stretch gap-6 md:grid-cols-12">
                    <div className="relative min-h-[420px] overflow-hidden md:col-span-7">
                        <Image src="/dining-room.png" alt="The Swagat dining room" fill className="object-cover" sizes="(max-width: 768px) 100vw, 58vw" />
                    </div>
                    <div className="flex flex-col justify-between border border-white/10 p-8 md:col-span-5 md:p-10">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff9900]">The kitchen</p>
                            <p className="font-display mt-6 text-3xl leading-tight md:text-4xl">
                                Classic recipes, grounded in spice and shaped by the fire.
                            </p>
                        </div>
                        <p className="mt-10 text-sm leading-7 text-white/55">
                            From breads blistered in the tandoor to masalas simmered slowly, every dish is prepared with patience,
                            balance and a respect for the ingredients.
                        </p>
                        <a href="/menu" className="mt-10 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#ff9900]">
                            Explore the menu <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="border-y border-white/10 bg-[#0a0a08]">
                <div className="mx-auto grid max-w-[1500px] gap-px px-5 py-20 md:grid-cols-3 md:px-10 md:py-28">
                    {[
                        ["01", "The tandoor", "Clay oven, high heat and breads and kebabs blistered to order."],
                        ["02", "Slow curries", "Masalas ground and simmered until every spice finds its place."],
                        ["03", "The warm table", "A generous dining room for long dinners, parties and banquets."],
                    ].map(([number, title, copy]) => (
                        <div key={number} className="border-t border-white/10 py-8 md:border-l md:px-8 md:first:border-l-0">
                            <p className="font-mono text-[10px] text-[#ff9900]">{number}</p>
                            <h2 className="font-display mt-5 text-3xl">{title}</h2>
                            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">{copy}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
