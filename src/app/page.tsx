"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Flame, MapPin, Phone, Plus, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../components/cart-provider";

const signatureDishes = [
  ["Signature", "Murg Makhni", "₱545", "Butter chicken · tomato, cream, fenugreek", "/murg-makhni.png", ""],
  ["Dum", "Biryani Specialties", "from ₱395", "Saffron, fried onion, aged basmati", "/biryani.png", "lg:mt-16"],
  ["Tandoor", "Atishi Murg Tikka", "₱520", "Kashmiri chilli, yoghurt, clay oven char", "/tikka.png", "lg:mt-6"],
  ["Vegetarian", "Dum Aloo Kashmiri", "₱520", "Baby potato, fennel, Kashmiri chilli", "/aloo.png", "lg:mt-24"],
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const signatureDetails: Record<string, { ingredients: string; spice: string; dietary: string; serving: string; story: string }> = {
  "Murg Makhni": { ingredients: "Chicken, tomato, cream, fenugreek, butter", spice: "Mild", dietary: "Gluten-free", serving: "2 guests", story: "Our signature butter chicken: rich tomato, warm spice and a smooth, gently smoky finish." },
  "Biryani Specialties": { ingredients: "Aged basmati, saffron, fried onion, spices", spice: "Medium", dietary: "Gluten-free", serving: "1–2 guests", story: "Aged basmati layered with saffron and slow-cooked spices, sealed over dum until fragrant and fluffy." },
  "Atishi Murg Tikka": { ingredients: "Chicken, Kashmiri chilli, yoghurt, lime", spice: "Medium–hot", dietary: "Gluten-free", serving: "2–3 guests", story: "A smoky tandoor classic with deep Kashmiri colour and a gently lingering heat." },
  "Dum Aloo Kashmiri": { ingredients: "Baby potato, fennel, Kashmiri chilli, yoghurt", spice: "Medium", dietary: "Vegetarian · Gluten-free", serving: "2 guests", story: "Baby potatoes gently cooked with fennel and Kashmiri chilli in a fragrant, lightly spiced sauce." },
};

type SignatureDish = {
  category: string;
  name: string;
  price: string;
  description: string;
  image: string;
  offset: string;
};

export default function Home() {
  const { addItem } = useCart();
  const [selectedDish, setSelectedDish] = useState<SignatureDish | null>(null);

  useEffect(() => {
    if (!selectedDish) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedDish(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedDish]);

  return (
    <main>
      <section className="relative min-h-[100svh] w-full overflow-hidden sm:min-h-[94vh]">
        <Image src="/hero-banner.png"
          alt="Swagat restaurant interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0d0d0b]/90 via-[#0d0d0b]/50 to-[#0d0d0b]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end px-5 pb-7 pt-28 sm:min-h-[94vh] sm:pb-10 md:px-10 md:pt-36 border-b border-white/10">
          <p className="text-[10px] tracking-[0.22em] sm:text-sm sm:tracking-wider uppercase text-[#ff9900]">Indian Kitchen &amp; Dining Room · Makati</p>
          <h1 className="font-display font-semibold mt-4 max-w-5xl text-[clamp(2.65rem,13vw,7.4rem)] uppercase leading-[0.92] tracking-[0.01em]">
            Flavours rooted<br />in<span className="italic text-[#ff9900]">tradition</span>
          </h1>
          <p className="mt-5 max-w-xl font-medium text-sm leading-relaxed text-white/70 sm:mt-8 sm:text-lg">
            At Swagat at Rada we blend classic Indian spices with modern technique, to craft dishes that tell a story with every bite.
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/menu"
              className="group inline-flex h-12 items-center justify-center gap-3 bg-[#ff9900] px-7 text-[12px] font-medium uppercase tracking-[0.20em] text-[#0d0d0b] transition-colors hover:bg-white sm:text-[14px]">
              Explore the menu
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/reservation"
              className="inline-flex h-12 items-center justify-center border border-white/25 px-7 text-[12px] font-medium uppercase tracking-[0.20em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900] sm:text-[14px]">
              Reserve a table
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 border-t border-white/15 text-center sm:mt-14 sm:grid-cols-3 sm:justify-center sm:gap-6">
            {[
              ["Hours", "Daily · 11:00 — 23:00"],
              ["Find us", "105 Rada St, Legazpi Village"],
              ["Reservations", "+63 967 084 9492"]].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-white/10 py-3 sm:flex-col sm:justify-start sm:border-b-0 sm:gap-1 sm:pt-8">
                  <p className="text-[10px] uppercase text-[#ff9900]">{label}</p>
                  <p className="text-xs text-white/80 sm:text-lg">{value}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="scroll-mt-24">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:py-24 md:px-10 md:py-32">
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
      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:py-24 md:px-10 md:py-32">
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
                <button
                  type="button"
                  onClick={() => setSelectedDish({ category, name, price, description, image, offset })}
                  className="block w-full text-left"
                  aria-label={`View details for ${name}`}
                >
                  <Image
                    src={image}
                    alt={name}
                    width={800}
                    height={1000}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                </button>
                <span className="absolute left-0 top-0 bg-[#0d0d0b]/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#c7ad78]">{category}</span>
              </div>

              <figcaption className="mt-5">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                  <button
                    type="button"
                    onClick={() => setSelectedDish({ category, name, price, description, image, offset })}
                    className="font-display text-left text-2xl leading-none hover:text-[#ff9900]"
                  >
                    {name}
                  </button>
                  <span className="whitespace-nowrap font-mono text-[16px] text-[#c7ad78]">{price}</span>
                </div>
                <p className="mt-3 text-md leading-relaxed text-white/55">{description}</p>
                <button
                  type="button"
                  onClick={() => addItem({ id: name, name, price: Number(price.replace("from ₱", "").replace("₱", "")) })}
                  className="mt-5 inline-flex h-10 items-center gap-2 border border-white/15 px-4 text-[10px] uppercase tracking-[0.22em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add to cart
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* RESERVATION */}
      <section className="scroll-mt-24">
        <div className="mx-auto max-w-[1500px] px-5 pb-16 sm:pb-24 md:px-10 md:pb-32">
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
                href="/reservation"
                className="mt-10 group inline-flex h-12 items-center gap-3 bg-[#ff9900] px-7 text-[16px] font-medium uppercase tracking-[0.20em] text-[#0d0d0b] transition-colors hover:bg-white">
                Reserve the room
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="scroll-mt-24 border-t border-white/10 bg-[#0a0a08]">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:py-24 md:px-10 md:py-32">
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

            <div className="flex items-center justify-center md:col-span-7 md:pl-10">
              <div className="w-full border border-white/10">
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

      {selectedDish && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm md:items-center md:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedDish(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="signature-dish-modal-title"
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto border border-white/15 bg-[#0d0d0b] p-4 shadow-2xl sm:p-6 md:max-h-[90vh] md:p-8"
          >
            <button
              type="button"
              aria-label="Close dish details"
              onClick={() => setSelectedDish(null)}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center border border-white/15 bg-[#0d0d0b]/80 hover:border-[#ff9900] hover:text-[#ff9900]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid gap-7 md:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[280px] overflow-hidden md:min-h-[420px]">
                <Image
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="pr-14 text-[10px] uppercase tracking-[0.28em] text-[#ff9900]">
                  {selectedDish.category}
                </p>
                <h2 id="signature-dish-modal-title" className="font-display mt-4 pr-10 text-4xl leading-tight md:text-5xl">
                  {selectedDish.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  {signatureDetails[selectedDish.name]?.story || selectedDish.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
                  <div className="bg-[#0d0d0b] p-4">
                    <Flame className="h-4 w-4 text-[#ff9900]" />
                    <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">Spice</p>
                    <p className="mt-1 text-sm">{signatureDetails[selectedDish.name]?.spice}</p>
                  </div>
                  <div className="bg-[#0d0d0b] p-4">
                    <Users className="h-4 w-4 text-[#ff9900]" />
                    <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">Serving</p>
                    <p className="mt-1 text-sm">{signatureDetails[selectedDish.name]?.serving}</p>
                  </div>
                  <div className="col-span-2 bg-[#0d0d0b] p-4">
                    <p className="text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">Dietary</p>
                    <p className="mt-2 text-sm">{signatureDetails[selectedDish.name]?.dietary}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">Ingredients</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {signatureDetails[selectedDish.name]?.ingredients}
                  </p>
                </div>

                <div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-xl text-[#c7ad78]">{selectedDish.price}</p>
                  <button
                    type="button"
                    onClick={() => {
                      addItem({
                        id: selectedDish.name,
                        name: selectedDish.name,
                        price: Number(selectedDish.price.replace("from ₱", "").replace("₱", "")),
                      });
                      setSelectedDish(null);
                    }}
                    className="inline-flex h-12 items-center justify-center gap-2 bg-[#ff9900] px-6 text-[10px] uppercase tracking-[0.28em] text-[#0d0d0b] hover:bg-white"
                  >
                    <Plus className="h-4 w-4" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
