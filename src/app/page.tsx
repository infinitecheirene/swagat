import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";

const signatureDishes = [
  ["Signature", "Murg Makhni", "₱545", "Butter chicken · tomato, cream, fenugreek", "/murg-makhni.png", ""],
  ["Dum", "Biryani Specialties", "from ₱395", "Saffron, fried onion, aged basmati", "/biryani.png", "lg:mt-16"],
  ["Tandoor", "Atishi Murg Tikka", "₱520", "Kashmiri chilli, yoghurt, clay oven char", "/tikka.png", "lg:mt-6"],
  ["Vegetarian", "Dum Aloo Kashmiri", "₱520", "Baby potato, fennel, Kashmiri chilli", "/aloo.png", "lg:mt-24"],
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[94vh] w-full overflow-hidden">
        <Image src="/hero-banner.png"
          alt="Swagat restaurant interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0d0d0b]/90 via-[#0d0d0b]/50 to-[#0d0d0b]" />

        <div className="relative mx-auto flex min-h-[94vh] max-w-[1500px] flex-col justify-end px-5 pb-10 pt-36 md:px-10 border-b border-white/10">
          <p className="text-sm tracking-wider uppercase text-[#ff9900]">Indian Kitchen &amp; Dining Room · Makati</p>
          <h1 className="font-display font-semibold mt-4 max-w-5xl text-[clamp(3rem,8vw,7.4rem)] uppercase leading-[0.92] tracking-[0.01em]">
            Flavours rooted<br />in<span className="italic text-[#ff9900]">tradition</span>
          </h1>
          <p className="mt-8 max-w-xl font-medium text-lg leading-relaxed text-white/70">
            At Swagat at Rada we blend classic Indian spices with modern technique, to craft dishes that tell a story with every bite.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/menu"
              className="group inline-flex h-12 items-center gap-3 bg-[#ff9900] px-7 text-[14px] font-medium uppercase tracking-[0.20em] text-[#0d0d0b] transition-colors hover:bg-white">
              Explore the menu
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/reserve"
              className="inline-flex h-12 items-center border border-white/25 px-7 text-[14px] font-medium uppercase tracking-[0.20em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900]">
              Reserve a table
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 border-t border-white/15 md:grid-cols-3 justify-center gap-6 text-center">
            {[
              ["Hours", "Daily · 11:00 — 23:00"],
              ["Find us", "105 Rada St, Legazpi Village"],
              ["Reservations", "+63 967 084 9492"]].map(([label, value]) => (
                <div key={label} className="flex flex-col pt-8 gap-1">
                  <p className="text-md uppercase text-[#ff9900]">{label}</p>
                  <p className="text-lg text-white/80">{value}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="scroll-mt-24">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
          <div className="flex flex-col gap-6 md:col-span-7">

            <p className="font-display text-[clamp(1.7rem,3.4vw,3.05rem)] font-light leading-[1.16]">
              At Swagat at Rada, classic Indian spices meet modern technique — dishes that tell a story with every bite, from the smoky lure of the tandoor to the comfort of a slow curry.
            </p>
            <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
              {[
                ["The tandoor", "Clay oven, high heat. Breads and kebabs blistered to order, never held."],
                ["Slow curries", "Masalas ground in house and simmered for hours until the spice settles."],
                ["The vegetarian table", "Paneer, potato and lentil dishes treated with the same care as the meat."]].map(([title, copy]) => (
                  <div key={title}>
                    <p className="text-md uppercase text-[#ff9900]">{title}</p>
                    <p className="text-lg text-white/80 max-w-sm">{copy}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative h-[44vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src="/kitchen.png"
          alt="Indian dish being prepared"
          fill className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0d0d0b]/60" />
        <div className="relative flex h-full items-center justify-center px-6">

          <p className="font-display max-w-2xl text-balance text-center text-[clamp(1.4rem,2.6vw,2.3rem)] font-light italic leading-snug">
            “Every specialty is a story of spice, texture and indulgence.”
          </p>
        </div>
      </div>

      {/* SIGNATURE DISHES */}
      <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.2rem)] font-light uppercase leading-none tracking-[0.02em]">What the kitchen is known for</h2>


          <Link href="/menu" className="group inline-flex items-center gap-2 text-[16px] uppercase tracking-[0.26em] text-[#ff9900] hover:underline hover:underline-offset-3">
            Full menu
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {signatureDishes.map(([category, name, price, description, image, offset]) => (
            <figure
              key={name}
              className={`group ${offset}`}>
              <div className="relative overflow-hidden bg-[#1b1b16]">
                <Image
                  src={image}
                  alt={name}
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <span className="absolute left-0 top-0 bg-[#0d0d0b]/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#c7ad78]">{category}</span>
              </div>

              <figcaption className="mt-5">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                  <h3 className="font-display text-2xl leading-none">{name}</h3>
                  <span className="whitespace-nowrap font-mono text-[16px] text-[#c7ad78]">{price}</span>
                </div>
                <p className="mt-3 text-md leading-relaxed text-white/55">{description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* RESERVATION */}
      <section className="scroll-mt-24">
        <div className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10 md:pb-32">
          <div className="grid items-center gap-12 md:grid-cols-12">

            <div className="md:col-span-7">
              <div className="relative overflow-hidden">
                <Image
                  src="/dining-room.png"
                  alt="Swagat dining room"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover bg-center" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            <div className="md:col-span-5 md:pl-6">
              <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-light uppercase leading-[0.98] tracking-[0.02em]">Modern design,<br />
                <span className="italic text-[#ff9900]">Indian hospitality</span>
              </h2>
              <p className="mt-6 text-md leading-relaxed text-white/55">A warm room of arched niches, brass light and linen tables — built for memorable meals, parties and banquets, with a kitchen that keeps serving until eleven.</p>

              <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {["Dinner service", "Private parties", "Banquets"].map((item) =>
                  <li key={item} className="flex items-center justify-between py-3">
                    <span className="text-md text-white/85">{item}</span>
                    <span className="font-mono text-[16px] tracking-[0.2em] text-[#c7ad78]">available</span>
                  </li>
                )}
              </ul>

              <Link
                href="/reserve"
                className="mt-10 group inline-flex h-12 items-center gap-3 bg-[#ff9900] px-7 text-[16px] font-medium uppercase tracking-[0.20em] text-[#0d0d0b] transition-colors hover:bg-white">
                Reserve the room
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-t border-white/10 bg-[#0a0a08]">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light uppercase leading-[0.95] tracking-[0.02em]">Find us on Rada</h2>
              <p className="mt-6 max-w-md text-md leading-relaxed text-white/55">Two minutes from Greenbelt, in the middle of Legazpi Village. Walk in, or call ahead for a table and we will hold it.</p>

              <div className="mt-10 space-y-5">
                <div className="flex gap-4">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#ff9900]" />
                  <div>
                    <p className="text-lg uppercase text-[#ff9900]">Address</p>
                    <p className="mt-1 text-md">105 Rada Street, Legazpi Village<br />Makati City, Metro Manila 1223</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock3 className="mt-1 h-4 w-4 shrink-0 text-[#ff9900]" />
                  <div>
                    <p className="text-lg uppercase text-[#ff9900]">Hours</p>
                    <p className="mt-1 text-md">Daily · 11:00 — 23:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-[#ff9900]" />
                  <div>
                    <p className="text-lg uppercase text-[#ff9900]">Phone</p>
                    <a href="tel:+639670849492" className="mt-1 block text-sm hover:text-[#ff9900]">+63 967 084 9492</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 md:pl-10 flex justify-center items-center">
              <div className="border border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <p className="text-[10px] uppercase tracking-[0.3em]">Opening hours</p>
                  <p className="font-mono text-[10px] text-[#c7ad78]">GMT+8</p>
                </div>

                <ul className="divide-y divide-white/10">
                  {days.map((day) =>
                    <li key={day} className="flex items-baseline justify-between px-6 py-3 text-sm">
                      <span className="text-white/85">{day}</span>
                      <span className="-translate-y-1 mx-6 flex-1 border-b border-dotted border-white/15" />
                      <span className="font-mono text-[11px] text-white/55">11:00 — 23:00</span>
                    </li>
                  )}
                </ul>

                <div className="border-t border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.24em] text-white/55">Kitchen closes 22:30 · Reservations recommended after 19:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
