import Image from "next/image";
import Link from "next/link";

const services = ["Dinner service", "Private parties", "Banquets"];

export default function ReservationSection() {
  return (
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
                className="aspect-[4/3] w-full bg-center object-cover"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>

          <div className="md:col-span-5 md:pl-6">
            <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-light uppercase leading-[0.98] tracking-[0.02em]">
              Modern design,
              <br />
              <span className="italic text-[#ff9900]">Indian hospitality</span>
            </h2>
            <p className="text-md mt-6 leading-relaxed text-white/55">
              A warm room of arched niches, brass light and linen tables — built
              for memorable meals, parties and banquets, with a kitchen that
              keeps serving until eleven.
            </p>

            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {services.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between py-3"
                >
                  <span className="text-md text-white/85">{item}</span>
                  <span className="font-mono text-[16px] tracking-[0.2em] text-[#c7ad78]">
                    available
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/reservation"
              className="group mt-10 inline-flex h-12 items-center gap-3 bg-[#ff9900] px-7 text-[16px] font-medium uppercase tracking-[0.20em] text-[#0d0d0b] transition-colors hover:bg-white"
            >
              Reserve the room
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
