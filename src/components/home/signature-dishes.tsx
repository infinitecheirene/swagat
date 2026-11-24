"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "../cart-provider";
import DishModal from "./dish-modal";
import {
  parsePrice,
  signatureDishes,
  type SignatureDish,
} from "./signature-data";

export default function SignatureDishes() {
  const { addItem } = useCart();
  const [selectedDish, setSelectedDish] = useState<SignatureDish | null>(null);

  return (
    <section className="mx-auto max-w-[1500px] px-5 py-16 sm:py-24 md:px-10 md:py-32">
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
        <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.2rem)] font-light uppercase leading-none tracking-[0.02em]">
          What the kitchen is known for
        </h2>
        <Link
          href="/menu"
          className="group inline-flex items-center gap-2 text-[16px] uppercase tracking-[0.26em] text-[#ff9900] hover:underline hover:underline-offset-3"
        >
          Full menu
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {signatureDishes.map((dish) => (
          <figure key={dish.name} className={`group ${dish.offset}`}>
            <div className="relative overflow-hidden bg-[#1b1b16]">
              <button
                type="button"
                onClick={() => setSelectedDish(dish)}
                className="block w-full text-left"
                aria-label={`View details for ${dish.name}`}
              >
                <Image
                  src={dish.image}
                  alt={dish.name}
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </button>
              <span className="absolute left-0 top-0 bg-[#0d0d0b]/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#c7ad78]">
                {dish.category}
              </span>
            </div>

            <figcaption className="mt-5">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                <button
                  type="button"
                  onClick={() => setSelectedDish(dish)}
                  className="font-display text-left text-2xl leading-none hover:text-[#ff9900]"
                >
                  {dish.name}
                </button>
                <span className="whitespace-nowrap font-mono text-[16px] text-[#c7ad78]">
                  {dish.price}
                </span>
              </div>
              <p className="text-md mt-3 leading-relaxed text-white/55">
                {dish.description}
              </p>
              <button
                type="button"
                onClick={() =>
                  addItem({
                    id: dish.name,
                    name: dish.name,
                    price: parsePrice(dish.price),
                  })
                }
                className="mt-5 inline-flex h-10 items-center gap-2 border border-white/15 px-4 text-[10px] uppercase tracking-[0.22em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
              >
                <Plus className="h-3.5 w-3.5" />
                Add to cart
              </button>
            </figcaption>
          </figure>
        ))}
      </div>

      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}
