"use client";

import { Download, Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    if (standalone) setInstalled(true);

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) {
      alert(
        "To install Swagat: open your browser menu and choose “Add to Home Screen” or “Install app”.",
      );
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setInstallPrompt(null);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#250604]/80 backdrop-blur-sm scroll:opacity-20 transition-opacity duration-300">
      <div className="mx-auto grid h-20 max-w-[1500px] grid-cols-[auto_1fr] items-center px-5 md:grid-cols-[1fr_auto_1fr] md:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Swagat at Rada home"
          className="justify-self-start"
        >
          <Image
            src="/swagat-logo.png"
            alt="Swagat at Rada logo"
            width={64}
            height={64}
            priority
          />
        </Link>

        {/* Desktop links */}
        <nav
          className="hidden items-center gap-8 lg:gap-10 md:flex"
          aria-label="Main navigation"
        >
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-2 text-[13px] uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-[#ff9900] transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-self-end">
          <Link
            href="/cart"
            aria-label={`Shopping cart with ${itemCount} items`}
            aria-current={pathname === "/cart" ? "page" : undefined}
            className={`relative inline-flex h-10 w-10 items-center justify-center border transition-colors hover:border-[#ff9900] hover:text-[#ff9900] ${
              pathname === "/cart"
                ? "border-[#ff9900] text-[#ff9900]"
                : "border-white/20"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff9900] px-1 text-[10px] font-bold text-[#0d0d0b]">
                {itemCount}
              </span>
            )}
          </Link>

          {!installed && (
            <button
              type="button"
              onClick={installApp}
              aria-label="Install app"
              title="Install app"
              className="hidden h-10 items-center justify-center gap-2 border border-white/20 px-3 text-[13px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#ff9900] hover:text-[#ff9900] sm:inline-flex"
            >
              <Download className="h-4 w-4" />
              <span className="hidden xl:inline">Install app</span>
            </button>
          )}

          <Link
            href="/reservation"
            className="hidden h-10 items-center bg-[#ff9900] px-5 text-[13px] font-medium uppercase tracking-[0.2em] text-[#0d0d0b] transition-colors hover:bg-white sm:inline-flex"
          >
            Reserve
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/20 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <nav
        className={`overflow-hidden border-t border-white/10 bg-[#250604] transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          open
            ? "max-h-[520px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="px-5 py-4">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between border-b border-white/10 py-4 text-sm uppercase tracking-[0.2em] ${
                  active ? "text-[#ff9900]" : "text-white/80"
                }`}
              >
                {link.label}
                {active && (
                  <span className="h-2 w-2 rounded-full bg-[#ff9900]" />
                )}
              </Link>
            );
          })}

          <div className="mt-5 grid gap-3">
            <Link
              href="/reservation"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center bg-[#ff9900] text-xs font-medium uppercase tracking-[0.2em] text-[#0d0d0b]"
            >
              Reserve a table
            </Link>
            {!installed && (
              <button
                type="button"
                onClick={() => {
                  installApp();
                  setOpen(false);
                }}
                className="flex h-12 items-center justify-center gap-2 border border-white/20 text-xs uppercase tracking-[0.2em] text-white/80"
              >
                <Download className="h-4 w-4" />
                Install app
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
