"use client";

// components/layout/chat-widget.tsx
import { useEffect, useRef, useState, type FormEvent } from "react";

/* ---------- Edit these to match your site ---------- */
const ROUTES = {
  order: "/menu",
  menu: "/menu",
  book: "/reservation",
};

const INFO = {
  address: "105 Rada Street, Legazpi Village, Makati",
  hours: "11:00 to 23:00, daily",
  phone: "+63 967 084 9492",
  phoneHref: "tel:+639670849492",
  email: "swagatinrada@gmail.com",
  facebook: "https://www.facebook.com/swagatatrada/",
  instagram: "https://www.instagram.com/swagatrada",
  maps: "https://www.google.com/maps/search/?api=1&query=Swagat+at+Rada+105+Rada+Street+Legazpi+Village+Makati",
};
/* --------------------------------------------------- */

type Action = { label: string; href: string; external?: boolean };
type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  time: string;
  actions?: Action[];
};
type Intent =
  | "order"
  | "book"
  | "menu"
  | "hours"
  | "contact"
  | "browsing"
  | "greeting";

const OPTIONS: { intent: Intent; label: string }[] = [
  { intent: "order", label: "Order Online" },
  { intent: "book", label: "Book a Table" },
  { intent: "menu", label: "View Menu" },
  { intent: "hours", label: "Hours & Location" },
  { intent: "contact", label: "Contact Us" },
  { intent: "browsing", label: "Just Browsing" },
];

const REPLIES: Record<Intent, { text: string; actions?: Action[] }> = {
  greeting: {
    text: "Welcome to Swagat at Rada 🙏\nFlavours rooted in tradition, served in the heart of Makati.\n\nWhat can I help you with today?",
  },
  order: {
    text: "You can order straight from our menu online. Pick your dishes, check out, and we'll take it from there.",
    actions: [{ label: "Start your order", href: ROUTES.order }],
  },
  book: {
    text: "We'd love to host you. Reserve a table online, or call us if you have a big group.",
    actions: [
      { label: "Book a table", href: ROUTES.book },
      { label: `Call ${INFO.phone}`, href: INFO.phoneHref },
    ],
  },
  menu: {
    text: "Our menu is rooted in classic Indian kitchen recipes. Have a look and see what you fancy.",
    actions: [{ label: "Open the menu", href: ROUTES.menu }],
  },
  hours: {
    text: `We're open ${INFO.hours}.\n\nFind us at ${INFO.address}.`,
    actions: [{ label: "Open in Maps", href: INFO.maps, external: true }],
  },
  contact: {
    text: `Reach us any time:\n${INFO.phone}\n${INFO.email}`,
    actions: [
      { label: "Call us", href: INFO.phoneHref },
      { label: "Send an email", href: `mailto:${INFO.email}` },
      { label: "Message on Facebook", href: INFO.facebook, external: true },
      { label: "Follow on Instagram", href: INFO.instagram, external: true },
    ],
  },
  browsing: {
    text: "No problem, take your time. I'm right here if you have questions.",
  },
};

const FALLBACK = {
  text: `I'm not sure about that one. You can pick an option below, or call us on ${INFO.phone} and we'll help right away.`,
  actions: [{ label: "Call us", href: INFO.phoneHref }] as Action[],
};

function detectIntent(input: string): Intent | null {
  const t = input.toLowerCase();
  if (/\b(hi|hello|hey|kamusta|namaste)\b/.test(t)) return "greeting";
  if (/(order|deliver|pick ?up|take ?out|takeaway)/.test(t)) return "order";
  if (/(book|reserv|table|seat|group|party)/.test(t)) return "book";
  if (/(menu|food|dish|veg|curry|biryani|naan|price)/.test(t)) return "menu";
  if (
    /(hour|open|close|when|where|address|locat|map|direction|parking)/.test(t)
  )
    return "hours";
  if (/(phone|call|contact|email|number|facebook|instagram|tiktok)/.test(t))
    return "contact";
  if (/(browse|browsing|just looking)/.test(t)) return "browsing";
  return null;
}

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");

  const nextId = useRef(1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const push = (m: Omit<Msg, "id" | "time">) =>
    setMessages((prev) => [
      ...prev,
      { ...m, id: nextId.current++, time: now() },
    ]);

  // Greeting on first open (created client-side to avoid hydration mismatch)
  useEffect(() => {
    if (open && messages.length === 0) {
      push({ from: "bot", text: REPLIES.greeting.text });
    }
    if (open) inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keep the latest message in view
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  // Escape closes the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const respond = (userText: string, intent: Intent | null) => {
    push({ from: "user", text: userText });
    setTyping(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const r = intent ? REPLIES[intent] : FALLBACK;
      push({ from: "bot", text: r.text, actions: r.actions });
      setTyping(false);
    }, 650);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || typing) return;
    setDraft("");
    respond(text, detectIntent(text));
  };

  const last = messages[messages.length - 1];
  const showOptions = !typing && last?.from === "bot";

  return (
    <>
      {open && (
        <section
          role="dialog"
          aria-label="Swagat at Rada assistant"
          className="fixed bottom-24 right-3 z-50 flex h-[min(36rem,calc(100dvh-8rem))] w-[min(23rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#14130F] shadow-2xl shadow-black/60 sm:right-5"
        >
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-white/10 bg-[#1D1B14] px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8A33D] font-[family-name:--font-lora] text-lg font-semibold text-[#14130F]">
              S
            </div>
            <div className="flex-1">
              <p className="font-[family-name:--font-lora] text-base font-semibold leading-tight text-white">
                Swagat Assistant
              </p>
              <p className="flex items-center gap-1.5 text-xs text-white/60">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Online
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#E8A33D]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          {/* Messages */}
          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-sm bg-[#E8A33D] text-[#14130F]"
                      : "rounded-bl-sm bg-[#25231B] text-white"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {m.actions && (
                    <div className="mt-3 flex flex-col gap-2">
                      {m.actions.map((a) => (
                        <a
                          key={a.label}
                          href={a.href}
                          {...(a.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="rounded-lg bg-[#E8A33D] px-3 py-2 text-center text-sm font-semibold text-[#14130F] transition-colors hover:bg-[#F2B658] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          {a.label}
                        </a>
                      ))}
                    </div>
                  )}

                  <p
                    className={`mt-1 text-[11px] ${
                      m.from === "user" ? "text-[#14130F]/60" : "text-white/40"
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div
                  className="flex gap-1 rounded-2xl rounded-bl-sm bg-[#25231B] px-4 py-3"
                  aria-label="Assistant is typing"
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 motion-reduce:animate-none"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {showOptions && (
              <div className="pt-1">
                <p className="mb-2 text-center text-xs text-white/50">
                  Choose an option:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {OPTIONS.map((o) => (
                    <button
                      key={o.intent}
                      type="button"
                      onClick={() => respond(o.label, o.intent)}
                      className="rounded-lg border border-[#E8A33D]/60 px-2 py-2.5 text-sm text-[#E8A33D] transition-colors hover:bg-[#E8A33D] hover:text-[#14130F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A33D]"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-white/10 bg-[#1D1B14] p-3"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message..."
              aria-label="Type your message"
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-[#14130F] px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#E8A33D] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim() || typing}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8A33D] text-[#14130F] transition-opacity disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4z" />
              </svg>
            </button>
          </form>
        </section>
      )}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="fixed bottom-5 right-3 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8A33D] text-[#14130F] shadow-lg shadow-black/50 transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {open ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M21 11.5a8.4 8.4 0 0 1-12 7.6L3 21l1.9-5.6A8.4 8.4 0 1 1 21 11.5z" />
          )}
        </svg>
      </button>
    </>
  );
}
