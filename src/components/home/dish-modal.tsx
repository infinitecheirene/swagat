"use client";

import Image from "next/image";
import { Flame, Plus, Users, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "../cart-provider";
import {
  parsePrice,
  signatureDetails,
  type SignatureDish,
} from "./signature-data";

type Props = {
  dish: SignatureDish | null;
  onClose: () => void;
};

export default function DishModal({ dish, onClose }: Props) {
  const { addItem } = useCart();

  useEffect(() => {
    if (!dish) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [dish, onClose]);

  if (!dish) return null;
  const details = signatureDetails[dish.name];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm md:items-center md:p-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
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
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center border border-white/15 bg-[#0d0d0b]/80 hover:border-[#ff9900] hover:text-[#ff9900]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-7 md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[280px] overflow-hidden md:min-h-[420px]">
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="pr-14 text-[10px] uppercase tracking-[0.28em] text-[#ff9900]">
              {dish.category}
            </p>
            <h2
              id="signature-dish-modal-title"
              className="font-display mt-4 pr-10 text-4xl leading-tight md:text-5xl"
            >
              {dish.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              {details?.story || dish.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
              <div className="bg-[#0d0d0b] p-4">
                <Flame className="h-4 w-4 text-[#ff9900]" />
                <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">
                  Spice
                </p>
                <p className="mt-1 text-sm">{details?.spice}</p>
              </div>
              <div className="bg-[#0d0d0b] p-4">
                <Users className="h-4 w-4 text-[#ff9900]" />
                <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">
                  Serving
                </p>
                <p className="mt-1 text-sm">{details?.serving}</p>
              </div>
              <div className="col-span-2 bg-[#0d0d0b] p-4">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">
                  Dietary
                </p>
                <p className="mt-2 text-sm">{details?.dietary}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[#c7ad78]">
                Ingredients
              </p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                {details?.ingredients}
              </p>
            </div>

            <div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-xl text-[#c7ad78]">{dish.price}</p>
              <button
                type="button"
                onClick={() => {
                  addItem({
                    id: dish.name,
                    name: dish.name,
                    price: parsePrice(dish.price),
                  });
                  onClose();
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
  );
}
