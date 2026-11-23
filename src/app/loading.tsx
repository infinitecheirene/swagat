
import Image from "next/image";

export default function Loading() {
    return (
        <main
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-[70] flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#0D0D0B] px-6 text-center"
        >
            {/* Animated Logo */}
            <Image
                src="/swagat-logo.png"
                alt="Swagat at Rada"
                width={110}
                height={110}
                priority
                className="loader-logo mb-10"
            />

            {/* Animated Heading */}
            <h1 className="loader-heading mb-5 font-(family-name:--font-lora) text-5xl font-semibold text-white sm:text-6xl">
                Hello and{" "}
                <span className="text-[#FF8C00] italic">
                    Namaste!
                </span>{" "}
                <span className="loader-flower" aria-hidden="true">
                    🌸
                </span>
            </h1>

            {/* Animated Description */}
            <p className="loader-copy max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                Welcome to Swagat At Rada, where every meal is a
                celebration of India&apos;s rich flavors and hospitality.
            </p>

            {/* Animated Loading Bar */}
            <div
                className="mt-12 h-px w-40 overflow-hidden bg-white/15"
                aria-hidden="true"
            >
                <div className="loading-bar h-full w-1/3 bg-[#FF8C00]" />
            </div>

            <span className="sr-only">Loading</span>
        </main>
    );
}
