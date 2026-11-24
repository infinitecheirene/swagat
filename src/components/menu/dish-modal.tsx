"use client";

import { Flame, Plus, Users, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { dishDetails, formatPrice, type SelectedDish } from "./menu-data";

type Props = {
  dish: SelectedDish | null;
  onClose: () => void;
  onAdd: (dish: SelectedDish) => void;
};

export default function DishModal({ dish, onClose, onAdd }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!dish) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [dish, onClose]);

  if (!dish) return null;
  const details = dishDetails[dish.name];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm md:items-center md:p-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
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
          ref={closeRef}
          aria-label="Close dish details"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="pr-14 text-xs uppercase tracking-[0.24em] text-[#ff9900]">
          {dish.category}
        </p>
        <h2
          id="dish-modal-title"
          className="font-display mt-4 pr-12 text-4xl leading-tight md:text-5xl"
        >
          {dish.name}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/65">
          {details?.story || dish.description}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
          <div className="bg-[#0d0d0b] p-4">
            <Flame className="h-4 w-4 text-[#ff9900]" />
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#c7ad78]">
              Spice
            </p>
            <p className="mt-1 text-base">{details?.spice || "Medium"}</p>
          </div>
          <div className="bg-[#0d0d0b] p-4">
            <Users className="h-4 w-4 text-[#ff9900]" />
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#c7ad78]">
              Serving
            </p>
            <p className="mt-1 text-base">{details?.serving || "2 guests"}</p>
          </div>
          <div className="col-span-2 bg-[#0d0d0b] p-4 sm:col-span-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#c7ad78]">
              Dietary
            </p>
            <p className="mt-3 text-base">
              {details?.dietary || "Please ask us"}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c7ad78]">
            Ingredients
          </p>
          <p className="mt-3 text-base leading-7 text-white/70">
            {details?.ingredients || dish.description}
          </p>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-2xl text-[#c7ad78]">
            {formatPrice(dish.price)}
          </p>
          <button
            type="button"
            onClick={() => {
              onAdd(dish);
              onClose();
            }}
            className="inline-flex h-12 items-center justify-center gap-2 bg-[#ff9900] px-6 text-xs font-medium uppercase tracking-[0.2em] text-[#0d0d0b] transition-colors hover:bg-white"
          >
            <Plus className="h-4 w-4" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
