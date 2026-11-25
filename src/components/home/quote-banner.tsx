import Image from "next/image";

export default function QuoteBanner() {
  return (
    <div className="relative h-[44vh] min-h-[300px] w-full overflow-hidden">
      <Image
        src="/kitchen.png"
        alt="Indian dish being prepared"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#120302]/60" />
      <div className="relative flex h-full items-center justify-center px-6">
        <p className="font-display max-w-2xl text-balance text-center text-[clamp(1.4rem,2.6vw,2.3rem)] font-light italic leading-snug">
          “Every specialty is a story of spice, texture and indulgence.”
        </p>
      </div>
    </div>
  );
}
