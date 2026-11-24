"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../cart-provider";
import { categories } from "./menu-data";

export default function CategoryNav() {
  const { itemCount } = useCart();
  const [active, setActive] = useState(categories[0].slug);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.slug))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-180px 0px -55% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-20 z-40 border-b border-white/10 bg-[#0d0d0b]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 md:px-10">
        <nav aria-label="Menu categories" className="min-w-0">
          <ul className="flex gap-7 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const isActive = active === category.slug;
              return (
                <li key={category.slug}>
                  <a
                    href={`#${category.slug}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block py-4 text-[13px] uppercase tracking-[0.18em] transition-colors ${
                      isActive ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {category.title}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-[2px] bg-[#ff9900] transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/cart"
          className="inline-flex h-10 shrink-0 items-center gap-2 bg-[#ff9900] px-4 text-xs font-medium uppercase tracking-[0.18em] text-[#0d0d0b] transition-colors hover:bg-white"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0d0d0b] px-1 text-[10px] text-white">
            {itemCount}
          </span>
        </Link>
      </div>
    </div>
  );
}
