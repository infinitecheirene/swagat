/**
 * First-visit splash for Swagat at Rada: a bowl of curry on a plate, steam rising, spices on the rim.
 *
 * - Server component, pure CSS animation. No client JavaScript besides a tiny inline script.
 * - Shows once per browser session (sessionStorage). For "once ever", change both
 *   `sessionStorage` words in the script below to `localStorage`.
 * - Fades itself out after ~3s. Skipped for visitors who prefer reduced motion.
 */
const KEY = "swagat-splash";

const css = `
    #swagat-splash { animation: swagat-out 500ms ease-in 2.6s forwards; }
    #swagat-splash[data-seen] { display: none; }
    .swagat-in { animation: swagat-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both; }
    .swagat-steam { stroke-dasharray: 60 140; animation: swagat-steam 2.4s ease-in-out infinite; }
    @keyframes swagat-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    @keyframes swagat-steam {
        0% { stroke-dashoffset: 60; opacity: 0; }
        20% { opacity: 0.9; }
        80% { opacity: 0.5; }
        100% { stroke-dashoffset: -100; opacity: 0; }
    }
    @keyframes swagat-out { to { opacity: 0; visibility: hidden; } }
    @media (prefers-reduced-motion: reduce) { #swagat-splash { display: none; } }
`;

// Runs right after the overlay is parsed, so returning visitors never see it flash.
const script = `try{var e=document.getElementById("swagat-splash");if(sessionStorage.getItem("${KEY}")){e.setAttribute("data-seen","")}else{sessionStorage.setItem("${KEY}","1")}}catch(_){}`;

const STEAM = [
  { d: "M100 106 C92 92 108 82 100 68 C92 54 108 44 100 28", delay: "0.7s" },
  { d: "M120 104 C128 90 112 78 120 62 C128 46 112 36 120 18", delay: "1.3s" },
  { d: "M140 106 C132 92 148 82 140 68 C132 54 148 44 140 30", delay: "1.0s" },
];

const gold = "#c7ad78";

export default function SplashScreen() {
  return (
    <>
      <style>{css}</style>

      <div
        id="swagat-splash"
        aria-hidden="true"
        suppressHydrationWarning
        className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-8 bg-[#0D0D0B] px-5 text-center"
      >
        <svg viewBox="0 0 240 200" className="swagat-in h-auto w-60 md:w-72">
          {/* plate */}
          <ellipse
            cx="120"
            cy="170"
            rx="96"
            ry="12"
            fill="#161613"
            stroke={gold}
            strokeWidth="2"
          />
          <ellipse
            cx="120"
            cy="170"
            rx="78"
            ry="8"
            fill="none"
            stroke={gold}
            strokeOpacity="0.35"
          />

          {/* bowl + curry */}
          <path
            d="M64 120 H176 C176 152 152 166 120 166 C88 166 64 152 64 120Z"
            fill="#161613"
            stroke={gold}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <ellipse
            cx="120"
            cy="120"
            rx="56"
            ry="8"
            fill="#161613"
            stroke={gold}
            strokeWidth="2"
          />
          <ellipse cx="120" cy="121" rx="50" ry="6" fill="#ff9900" />
          <ellipse
            cx="108"
            cy="119.5"
            rx="22"
            ry="2"
            fill="#ffd27a"
            fillOpacity="0.4"
          />

          {/* star anise */}
          <g transform="translate(44 171)">
            <polygon
              points="0,-12 1.9,-4.6 8.5,-8.5 4.6,-1.9 12,0 4.6,1.9 8.5,8.5 1.9,4.6 0,12 -1.9,4.6 -8.5,8.5 -4.6,1.9 -12,0 -4.6,-1.9 -8.5,-8.5 -1.9,-4.6"
              fill={gold}
              fillOpacity="0.25"
              stroke={gold}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle r="2" fill={gold} />
          </g>

          {/* cardamom pods */}
          {[
            { t: "translate(192 173) rotate(-20)" },
            { t: "translate(205 168) rotate(15)" },
          ].map(({ t }) => (
            <g key={t} transform={t}>
              <ellipse
                rx="7"
                ry="3.8"
                fill={gold}
                fillOpacity="0.25"
                stroke={gold}
                strokeWidth="1.5"
              />
              <path d="M-5 0 H5" stroke={gold} strokeOpacity="0.7" />
            </g>
          ))}

          {/* steam */}
          {STEAM.map(({ d, delay }) => (
            <path
              key={d}
              d={d}
              pathLength={100}
              className="swagat-steam"
              style={{ animationDelay: delay }}
              fill="none"
              stroke="#f0e3c0"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </svg>

        <div className="swagat-in" style={{ animationDelay: "250ms" }}>
          <p className="font-display text-3xl md:text-4xl">Swagat at Rada</p>
          <p className="mt-2 text-sm text-white/50">Swagat means welcome.</p>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
