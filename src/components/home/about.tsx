const highlights = [
  [
    "The tandoor",
    "Clay oven, high heat. Breads and kebabs blistered to order, never held.",
  ],
  [
    "Slow curries",
    "Masalas ground in house and simmered for hours until the spice settles.",
  ],
  [
    "The vegetarian table",
    "Paneer, potato and lentil dishes treated with the same care as the meat.",
  ],
];

export default function About() {
  return (
    <section className="scroll-mt-24">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-6 md:col-span-7">
          <p className="font-display text-[clamp(1.7rem,3.4vw,3.05rem)] font-light leading-[1.16]">
            At Swagat at Rada, classic Indian spices meet modern technique —
            dishes that tell a story with every bite, from the smoky lure of the
            tandoor to the comfort of a slow curry.
          </p>
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
            {highlights.map(([title, copy]) => (
              <div key={title}>
                <p className="text-md uppercase text-[#ff9900]">{title}</p>
                <p className="max-w-sm text-lg text-white/80">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
