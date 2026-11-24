"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/hero-banner.png",
    alt: "The Swagat dining room",
    caption: "The room",
  },
  {
    src: "/kitchen.png",
    alt: "Spices and dishes from the Swagat kitchen",
    caption: "The spice",
  },
  {
    src: "/biryani.png",
    alt: "Biryani sealed and cooked over dum",
    caption: "The dum",
  },
  {
    src: "/tikka.png",
    alt: "Tikka charred in the tandoor",
    caption: "The tandoor",
  },
];

const INTERVAL = 6000;

export default function AboutHero() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(timer);
  }, [index, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Swagat at Rada gallery"
      className="relative h-[calc(100svh-5rem)] min-h-[560px] w-full overflow-hidden"
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(diff) > 50) go(index + (diff < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Legibility overlays */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0d0d0b] via-[#0d0d0b]/45 to-[#0d0d0b]/10" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#0d0d0b]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 pb-8 md:px-10 md:pb-12">
        <p className="text-sm text-[#ff9900]">Our story</p>
        <h1 className="font-display mt-4 max-w-5xl text-[clamp(3rem,9vw,8rem)] font-semibold uppercase leading-[0.92]">
          Tradition,
          <br />
          served <span className="italic text-[#ff9900]">alive</span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/20 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Swagat at Rada brings together the warmth of Indian hospitality and
            the confidence of modern dining.
          </p>

          <div className="flex items-center justify-between gap-6 md:justify-end">
            <p className="text-sm text-white/70" aria-live="polite">
              <span className="text-white">{slides[index].caption}</span>
              <span className="ml-3 font-mono text-xs text-white/50">
                {index + 1} / {slides.length}
              </span>
            </p>

            <div className="flex items-center gap-4">
              <ul className="flex items-center gap-2" aria-label="Choose slide">
                {slides.map((slide, i) => (
                  <li key={slide.src}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show ${slide.caption}`}
                      aria-current={i === index}
                      className="flex h-6 items-center"
                    >
                      <span
                        className={`block h-[3px] transition-all duration-300 ${
                          i === index
                            ? "w-10 bg-[#ff9900]"
                            : "w-6 bg-white/35 hover:bg-white/70"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous slide"
                  className="flex h-11 w-11 items-center justify-center border border-white/30 transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next slide"
                  className="flex h-11 w-11 items-center justify-center border border-white/30 transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
