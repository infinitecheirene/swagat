"use client";

import { useCallback, useState } from "react";
import { useCart } from "../cart-provider";
import CategoryNav from "./category-nav";
import DishModal from "./dish-modal";
import MenuCategory from "./menu-category";
import { categories, type MenuItem, type SelectedDish } from "./menu-data";

export default function MenuBrowser() {
  const { addItem } = useCart();
  const [selected, setSelected] = useState<SelectedDish | null>(null);

  const add = (item: MenuItem) =>
    addItem({ id: item.name, name: item.name, price: item.price });
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <CategoryNav />

      <div className="mx-auto max-w-[1500px] px-5 pb-20 md:px-10 md:pb-28">
        <p className="flex items-center gap-5 py-6 text-sm text-white/55">
          <span className="inline-flex items-center gap-2">
            <span className="flex h-3.5 w-3.5 items-center justify-center border border-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Vegetarian
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="flex h-3.5 w-3.5 items-center justify-center border border-red-500">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            Non-vegetarian
          </span>
        </p>

        {categories.map((category) => (
          <MenuCategory
            key={category.slug}
            category={category}
            onSelect={(item, categoryTitle) =>
              setSelected({ ...item, category: categoryTitle })
            }
            onAdd={add}
          />
        ))}
      </div>

      <DishModal dish={selected} onClose={close} onAdd={add} />
    </>
  );
}
