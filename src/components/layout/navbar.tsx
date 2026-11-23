"use client";

import { Download, Menu, Phone, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../cart-provider";

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const links = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
    { label: "The Room", href: "/reservation" },
    { label: "Visit", href: "/contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { itemCount } = useCart();
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [installed, setInstalled] = useState(() =>
        typeof window !== "undefined"
            && (window.matchMedia("(display-mode: standalone)").matches
                || ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone)))
    );

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setInstallPrompt(event as BeforeInstallPromptEvent);
        };
        const handleAppInstalled = () => {
            setInstalled(true);
            setInstallPrompt(null);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);
        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const installApp = async () => {
        if (!installPrompt) {
            alert("To install Swagat: open your browser menu and choose “Add to Home Screen” or “Install app”.");
            return;
        }

        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === "accepted") setInstalled(true);
        setInstallPrompt(null);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0d0d0b]/75 backdrop-blur-md">
            <div className="mx-auto flex h-[100px] w-full items-center justify-between px-5 md:px-10">
                <Link href="/" className="flex gap-3" aria-label="Swagat at Rada home">
                    <Image
                        src="/swagat-logo.png"
                        alt="Swagat at Rada logo"
                        width={80}
                        height={80}
                    />
                </Link>

                <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm uppercase tracking-[0.28em] text-white/70 transition-colors hover:text-[#ff9900]">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        href="/cart"
                        aria-label={`Shopping cart with ${itemCount} items`}
                        className="relative inline-flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        {itemCount > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff9900] px-1 text-[9px] font-bold text-[#0d0d0b]">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                    <a
                        href="/reservation"
                        className="hidden h-10 items-center gap-2 border border-white/15 px-4 text-[13px] uppercase tracking-[0.24em] transition-colors hover:border-[#ff9900] hover:text-[#ff9900] sm:inline-flex"
                    >
                        <Phone className="h-3.5 w-3.5" />
                        Reserve
                    </a>
                    {!installed && (
                        <button
                            type="button"
                            onClick={installApp}
                            className="hidden h-10 items-center gap-2 border border-[#ff9900]/70 px-4 text-[13px] uppercase tracking-[0.24em] text-[#ff9900] transition-colors hover:bg-[#ff9900] hover:text-[#0d0d0b] sm:inline-flex"
                        >
                            <Download className="h-3.5 w-3.5" />
                            Install app
                        </button>
                    )}
                    <button
                        type="button"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        onClick={() => setOpen((value) => !value)}
                        className="inline-flex h-10 w-10 items-center justify-center border border-white/15 md:hidden"
                    >
                        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <nav
                className={`overflow-hidden border-t border-white/10 bg-[#0d0d0b] transition-[max-height,opacity,transform] duration-300 ease-out md:hidden ${
                    open
                        ? "max-h-[420px] opacity-100 translate-y-0"
                        : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
                }`}
                aria-label="Mobile navigation"
                aria-hidden={!open}
                inert={!open}
            >
                <div className="px-5 py-5">
                    {!installed && (
                        <button
                            type="button"
                            onClick={() => {
                                installApp();
                                setOpen(false);
                            }}
                            className="mb-3 flex h-12 w-full items-center justify-center gap-2 border border-[#ff9900]/70 text-[11px] uppercase tracking-[0.28em] text-[#ff9900]"
                        >
                            <Download className="h-4 w-4" />
                            Install app
                        </button>
                    )}
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block border-b border-white/10 py-4 text-[11px] uppercase tracking-[0.28em]"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    );
}