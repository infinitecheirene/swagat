"use client";

import Image from "next/image";
import { ArrowUpRight, Flame, Plus, Users, X } from "lucide-react";
import { useCart } from "../../components/cart-provider";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    title: "Small Plates",
    items: [
      ["Aloo Nazarat", "₱420", "Spiced potato, yoghurt, tamarind"],
      ["Dahi Puri", "₱420", "Crisp puri, yoghurt, chutneys"],
      ["Butte ki Pankhidiya", "₱420", "Sweet corn, chilli, toasted spices"],
    ],
  },
  {
    title: "From the Tandoor",
    items: [
      ["Amritsari Paneer Tikka", "₱460", "Paneer, ajwain, charred peppers"],
      ["Atishi Murg Tikka", "₱520", "Kashmiri chilli, yoghurt, clay oven char"],
      ["Chicken Seekh Kebab", "₱670", "Minced chicken, ginger, herbs"],
    ],
  },
  {
    title: "Curries & Specialties",
    items: [
      ["Murg Makhni", "₱545", "Butter chicken, tomato, cream, fenugreek"],
      ["Murg Changezi Korma", "₱545", "Chicken, yoghurt, browned onion"],
      ["Murg Tikka Masala", "₱545", "Tandoori chicken, tomato, smoked spices"],
    ],
  },
  {
    title: "Biryani",
    items: [
      ["Chicken Biryani", "₱395", "Aged basmati, saffron, fried onion"],
      ["Mutton Biryani", "₱595", "Slow-cooked mutton, mint, saffron"],
      ["Vegetable Biryani", "₱395", "Garden vegetables, basmati, aromatic spice"],
    ],
  },
];

type Dish = {
  name: string;
  price: string;
  description: string;
  category: string;
};

const dishDetails: Record<string, { ingredients: string; spice: string; dietary: string; serving: string; story: string }> = {
  "Aloo Nazarat": { ingredients: "Baby potato, yoghurt, tamarind, toasted cumin", spice: "Mild", dietary: "Vegetarian", serving: "2–3 guests", story: "A crisp, bright potato plate finished with tangy tamarind and cooling yoghurt." },
  "Dahi Puri": { ingredients: "Puri, yoghurt, chickpea, mint chutney, tamarind", spice: "Mild", dietary: "Vegetarian", serving: "2–3 guests", story: "Classic crisp puri filled at the table for a lively mix of sweet, sour and spice." },
  "Butte ki Pankhidiya": { ingredients: "Sweet corn, chilli, coriander, onion, lemon", spice: "Medium", dietary: "Vegetarian", serving: "2–3 guests", story: "Sweet corn brought to life with herbs, chilli and a squeeze of fresh citrus." },
  "Amritsari Paneer Tikka": { ingredients: "Paneer, ajwain, yoghurt, peppers, spices", spice: "Medium", dietary: "Vegetarian", serving: "2–3 guests", story: "Paneer marinated in ajwain and yoghurt, then charred over the intense heat of the tandoor." },
  "Atishi Murg Tikka": { ingredients: "Chicken, Kashmiri chilli, yoghurt, lime", spice: "Medium–hot", dietary: "Gluten-free", serving: "2–3 guests", story: "A smoky tandoor classic with deep Kashmiri colour and a gently lingering heat." },
  "Chicken Seekh Kebab": { ingredients: "Minced chicken, ginger, herbs, roasted spices", spice: "Medium", dietary: "Gluten-free", serving: "2–3 guests", story: "Seasoned minced chicken grilled on skewers until smoky outside and tender within." },
  "Murg Makhni": { ingredients: "Chicken, tomato, cream, fenugreek, butter", spice: "Mild", dietary: "Gluten-free", serving: "2 guests", story: "Our signature butter chicken: rich tomato, warm spice and a smooth, gently smoky finish." },
  "Murg Changezi Korma": { ingredients: "Chicken, yoghurt, browned onion, cardamom", spice: "Mild", dietary: "Gluten-free", serving: "2 guests", story: "A slow, aromatic korma where yoghurt and browned onion create a deep, mellow sauce." },
  "Murg Tikka Masala": { ingredients: "Tandoori chicken, tomato, spices, cream", spice: "Medium", dietary: "Gluten-free", serving: "2 guests", story: "Charred tikka folded through a vibrant tomato masala balanced with cream." },
  "Chicken Biryani": { ingredients: "Chicken, aged basmati, saffron, fried onion", spice: "Medium", dietary: "Gluten-free", serving: "1–2 guests", story: "Aged basmati and tender chicken layered and sealed under dum until aromatic and fluffy." },
  "Mutton Biryani": { ingredients: "Mutton, aged basmati, mint, saffron, spices", spice: "Medium", dietary: "Gluten-free", serving: "1–2 guests", story: "Slow-cooked mutton layered with fragrant basmati and saffron for a richly spiced biryani." },
  "Vegetable Biryani": { ingredients: "Garden vegetables, basmati, saffron, fried onion", spice: "Medium", dietary: "Vegetarian · Gluten-free", serving: "1–2 guests", story: "Seasonal vegetables and fragrant basmati cooked together over a gentle dum." },
};

export default function MenuPage() {
  const { addItem, itemCount } = useCart();
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedDish) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedDish(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedDish]);

  return (
    <main className="pt-[100px]">
      <section className="relative min-h-[52vh] overflow-hidden">
        <Image src="/kitchen.png" alt="Indian dishes on the table" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0d0d0b]/60 via-[#0d0d0b]/75 to-[#0d0d0b]" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-[1500px] items-end px-5 pb-12 md:px-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#ff9900]">The complete menu</p>
            <h1 className="font-display mt-5 text-[clamp(3.2rem,8vw,7rem)] font-semibold uppercase leading-[0.9]">From the kitchen</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-14 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">Lunch &amp; dinner</p>
            <h2 className="font-display mt-4 text-4xl md:text-6xl">A table set for the evening</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/reservation" className="group inline-flex h-12 items-center gap-3 border border-white/15 px-6 text-[10px] uppercase tracking-[0.28em] hover:border-[#ff9900] hover:text-[#ff9900]">
              Reserve a table <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="/cart" className="inline-flex h-12 items-center gap-3 bg-[#ff9900] px-6 text-[10px] uppercase tracking-[0.28em] text-[#0d0d0b] hover:bg-white">
              View cart <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0d0d0b] px-1 text-[9px] text-white">{itemCount}</span>
            </a>
          </div>
        </div>

        <div className="grid gap-14 lg:grid-cols-2">
          {categories.map((category, categoryIndex) => (
            <div key={category.title} className="border-t border-white/10 pt-6">
              <div className="mb-7 flex items-baseline gap-4">
                <span className="font-mono text-[10px] text-[#ff9900]">0{categoryIndex + 1}</span>
                <h3 className="text-[11px] uppercase tracking-[0.3em]">{category.title}</h3>
              </div>
              <div className="divide-y divide-white/10">
                {category.items.map(([name, price, description]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[1fr_auto] gap-4 py-5"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDish({ name, price, description, category: category.title })}
                      className="group text-left"
                    >
                      <h4 className="font-display text-2xl">{name}</h4>
                      <p className="mt-2 text-sm text-white/50">{description}</p>
                    </button>
                    <div className="flex flex-col items-end gap-3">
                      <span className="font-mono text-[11px] text-[#c7ad78]">{price}</span>
                      <button
                        type="button"
                        onClick={() => addItem({ id: name, name, price: Number(price.replace("₱", "")) })}
                        className="inline-flex h-9 items-center gap-2 border border-white/15 px-4 text-[9px] uppercase tracking-[0.22em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
            aria-labelledby="dish-modal-title"
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-white/15 bg-[#0d0d0b] p-6 shadow-2xl md:p-10"
          >
            <button
              type="button"
              ref={closeButtonRef}
              aria-label="Close dish details"
              onClick={() => setSelectedDish(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="pr-14 text-[10px] uppercase tracking-[0.28em] text-[#ff9900]">
              {selectedDish.category}
            </p>
            <h2 id="dish-modal-title" className="font-display mt-4 pr-12 text-4xl leading-tight md:text-5xl">
              {selectedDish.name}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
              {dishDetails[selectedDish.name]?.story || selectedDish.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
              <div className="bg-[#0d0d0b] p-4">
                <Flame className="h-4 w-4 text-[#ff9900]" />
                <p className="mt-3 text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">Spice</p>
                <p className="mt-1 text-sm">{dishDetails[selectedDish.name]?.spice || "Medium"}</p>
              </div>
              <div className="bg-[#0d0d0b] p-4">
                <Users className="h-4 w-4 text-[#ff9900]" />
                <p className="mt-3 text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">Serving</p>
                <p className="mt-1 text-sm">{dishDetails[selectedDish.name]?.serving || "2 guests"}</p>
              </div>
              <div className="col-span-2 bg-[#0d0d0b] p-4 sm:col-span-1">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">Dietary</p>
                <p className="mt-3 text-sm">{dishDetails[selectedDish.name]?.dietary || "Please ask us"}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">Ingredients</p>
              <p className="mt-3 text-sm leading-7 text-white/65">
                {dishDetails[selectedDish.name]?.ingredients || selectedDish.description}
              </p>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-xl text-[#c7ad78]">{selectedDish.price}</p>
              <button
                type="button"
                onClick={() => {
                  addItem({
                    id: selectedDish.name,
                    name: selectedDish.name,
                    price: Number(selectedDish.price.replace("₱", "")),
                  });
                  setSelectedDish(null);
                }}
                className="inline-flex h-12 items-center justify-center gap-2 bg-[#ff9900] px-6 text-[10px] uppercase tracking-[0.28em] text-[#0d0d0b] transition-colors hover:bg-white"
              >
                <Plus className="h-4 w-4" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
