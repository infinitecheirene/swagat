import { Flame, Users, Utensils } from "lucide-react";

const pillars = [
  {
    icon: Flame,
    title: "The tandoor",
    copy: "Clay oven, high heat. Breads and kebabs blistered to order.",
  },
  {
    icon: Utensils,
    title: "Slow curries",
    copy: "Masalas ground and simmered until every spice finds its place.",
  },
  {
    icon: Users,
    title: "The warm table",
    copy: "A generous dining room for long dinners, parties and banquets.",
  },
];

export default function AboutPillars() {
  return (
    <section className="border-y border-white/10 bg-[#0a0a08]">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:py-24 md:px-10 md:py-28">
        <h2 className="font-display max-w-2xl text-[clamp(2rem,4vw,3.2rem)] font-light uppercase leading-[1]">
          What we hold on to
        </h2>

        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="bg-[#0a0a08] p-8 md:p-10">
              <Icon className="h-6 w-6 text-[#ff9900]" />
              <h3 className="font-display mt-8 text-3xl">{title}</h3>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-white/65">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
