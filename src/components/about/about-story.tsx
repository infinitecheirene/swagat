import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutStory() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-16 sm:py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <div className="relative min-h-[360px] overflow-hidden md:col-span-6 md:min-h-[520px]">
          <Image
            src="/kitchen.png"
            alt="A dish being prepared in the Swagat kitchen"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>

        <div className="md:col-span-6 md:pl-6">
          <p className="text-sm text-[#ff9900]">The kitchen</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.1]">
            Classic recipes, grounded in spice and shaped by the fire.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            From breads blistered in the tandoor to masalas simmered slowly,
            every dish is prepared with patience, balance and a respect for the
            ingredients.
          </p>

          <Link
            href="/menu"
            className="group mt-10 inline-flex h-12 items-center gap-3 bg-[#ff9900] px-7 text-xs font-medium uppercase tracking-[0.2em] text-[#0d0d0b] transition-colors hover:bg-white"
          >
            Explore the menu
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
