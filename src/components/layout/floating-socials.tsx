// components/layout/floating-socials.tsx
import type { ReactNode } from "react";

type SocialLink = {
  label: string;
  href: string;
  bg: string;
  external?: boolean;
  icon: ReactNode;
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const links: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/swagatatrada/",
    bg: "bg-[#1877F2]",
    external: true,
    icon: (
      <svg {...iconProps}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/639670849492",
    bg: "bg-[#25D366]",
    external: true,
    icon: (
      <svg {...iconProps}>
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z" />
        <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .7a4 4 0 0 1-2-2l.7-1-1-2z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/swagatrada",
    bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    external: true,
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@swagat.at.rada",
    bg: "bg-black ring-1 ring-white/25",
    external: true,
    icon: (
      <svg {...iconProps}>
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:swagatinrada@gmail.com",
    bg: "bg-[#DC2626]",
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
  {
    label: "Call us",
    href: "tel:+639670849492",
    bg: "bg-[#3B82F6]",
    icon: (
      <svg {...iconProps}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
      </svg>
    ),
  },
];

export default function FloatingSocials() {
  return (
    <nav
      aria-label="Contact and social links"
      className="fixed right-3 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 sm:right-5"
    >
      {links.map(({ label, href, bg, external, icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={`${bg} flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg shadow-black/40 transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:w-12`}
        >
          {icon}
        </a>
      ))}
    </nav>
  );
}
