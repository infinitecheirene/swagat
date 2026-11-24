import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";

const ROWS = [
  {
    icon: MapPin,
    label: "Address",
    lines: [
      "105 Rada Street, Legazpi Village",
      "Makati City, Metro Manila 1223",
    ],
  },
  {
    icon: Clock3,
    label: "Open daily",
    lines: [
      "11:00 – 23:00 (GMT+8)",
      "Kitchen closes 22:30",
      "Reservations recommended after 19:00",
    ],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+63 967 084 9492"],
    href: "tel:+639670849492",
  },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Swagat+at+Rada+105+Rada+Street+Legazpi+Village+Makati+City";

export default function ContactInfo() {
  return (
    <div className="flex flex-col border border-white/15">
      <ul className="divide-y divide-white/10">
        {ROWS.map(({ icon: Icon, label, lines, href }) => {
          const body = lines.map((line, i) => (
            <span
              key={line}
              className={`block ${i === 0 ? "text-[15px] text-white" : "text-sm text-white/55"}`}
            >
              {line}
            </span>
          ));
          return (
            <li key={label} className="flex gap-4 p-6">
              <Icon className="mt-1 h-4 w-4 shrink-0 text-[#ff9900]" />
              <div>
                <p className="font-display text-lg text-[#c7ad78]">{label}</p>
                <div className="mt-1.5 space-y-0.5">
                  {href ? (
                    <a
                      href={href}
                      className="block transition-colors hover:text-[#ff9900]"
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <a
        href={MAPS_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-auto flex h-14 items-center justify-between border-t border-white/15 px-6 text-[15px] transition-colors hover:text-[#ff9900] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#ff9900]"
      >
        Get directions
        <ArrowUpRight className="h-4 w-4 text-[#ff9900]" />
      </a>
    </div>
  );
}
