import { useState } from "react";

// All color groups with their Tailwind prefix
const colorGroups = [
  { name: "Red",      prefix: "red" },
  { name: "Orange",   prefix: "orange" },
  { name: "Amber",    prefix: "amber" },
  { name: "Yellow",   prefix: "yellow" },
  { name: "Lime",     prefix: "lime" },
  { name: "Green",    prefix: "green" },
  { name: "Emerald",  prefix: "emerald" },
  { name: "Teal",     prefix: "teal" },
  { name: "Cyan",     prefix: "cyan" },
  { name: "Sky",      prefix: "sky" },
  { name: "Blue",     prefix: "blue" },
  { name: "Indigo",   prefix: "indigo" },
  { name: "Violet",   prefix: "violet" },
  { name: "Purple",   prefix: "purple" },
  { name: "Fuchsia",  prefix: "fuchsia" },
  { name: "Pink",     prefix: "pink" },
  { name: "Rose",     prefix: "rose" },
  { name: "Slate",    prefix: "slate" },
  { name: "Gray",     prefix: "gray" },
  { name: "Zinc",     prefix: "zinc" },
  { name: "Neutral",  prefix: "neutral" },
  { name: "Stone",    prefix: "stone" },
];

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// ⚠️ IMPORTANT: Tailwind's JIT scanner needs to see complete class strings.
// All bg-* classes are listed below as a static reference so they are included in the build.
// DO NOT REMOVE THIS BLOCK.
/*
bg-red-50 bg-red-100 bg-red-200 bg-red-300 bg-red-400 bg-red-500 bg-red-600 bg-red-700 bg-red-800 bg-red-900 bg-red-950
bg-orange-50 bg-orange-100 bg-orange-200 bg-orange-300 bg-orange-400 bg-orange-500 bg-orange-600 bg-orange-700 bg-orange-800 bg-orange-900 bg-orange-950
bg-amber-50 bg-amber-100 bg-amber-200 bg-amber-300 bg-amber-400 bg-amber-500 bg-amber-600 bg-amber-700 bg-amber-800 bg-amber-900 bg-amber-950
bg-yellow-50 bg-yellow-100 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500 bg-yellow-600 bg-yellow-700 bg-yellow-800 bg-yellow-900 bg-yellow-950
bg-lime-50 bg-lime-100 bg-lime-200 bg-lime-300 bg-lime-400 bg-lime-500 bg-lime-600 bg-lime-700 bg-lime-800 bg-lime-900 bg-lime-950
bg-green-50 bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700 bg-green-800 bg-green-900 bg-green-950
bg-emerald-50 bg-emerald-100 bg-emerald-200 bg-emerald-300 bg-emerald-400 bg-emerald-500 bg-emerald-600 bg-emerald-700 bg-emerald-800 bg-emerald-900 bg-emerald-950
bg-teal-50 bg-teal-100 bg-teal-200 bg-teal-300 bg-teal-400 bg-teal-500 bg-teal-600 bg-teal-700 bg-teal-800 bg-teal-900 bg-teal-950
bg-cyan-50 bg-cyan-100 bg-cyan-200 bg-cyan-300 bg-cyan-400 bg-cyan-500 bg-cyan-600 bg-cyan-700 bg-cyan-800 bg-cyan-900 bg-cyan-950
bg-sky-50 bg-sky-100 bg-sky-200 bg-sky-300 bg-sky-400 bg-sky-500 bg-sky-600 bg-sky-700 bg-sky-800 bg-sky-900 bg-sky-950
bg-blue-50 bg-blue-100 bg-blue-200 bg-blue-300 bg-blue-400 bg-blue-500 bg-blue-600 bg-blue-700 bg-blue-800 bg-blue-900 bg-blue-950
bg-indigo-50 bg-indigo-100 bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500 bg-indigo-600 bg-indigo-700 bg-indigo-800 bg-indigo-900 bg-indigo-950
bg-violet-50 bg-violet-100 bg-violet-200 bg-violet-300 bg-violet-400 bg-violet-500 bg-violet-600 bg-violet-700 bg-violet-800 bg-violet-900 bg-violet-950
bg-purple-50 bg-purple-100 bg-purple-200 bg-purple-300 bg-purple-400 bg-purple-500 bg-purple-600 bg-purple-700 bg-purple-800 bg-purple-900 bg-purple-950
bg-fuchsia-50 bg-fuchsia-100 bg-fuchsia-200 bg-fuchsia-300 bg-fuchsia-400 bg-fuchsia-500 bg-fuchsia-600 bg-fuchsia-700 bg-fuchsia-800 bg-fuchsia-900 bg-fuchsia-950
bg-pink-50 bg-pink-100 bg-pink-200 bg-pink-300 bg-pink-400 bg-pink-500 bg-pink-600 bg-pink-700 bg-pink-800 bg-pink-900 bg-pink-950
bg-rose-50 bg-rose-100 bg-rose-200 bg-rose-300 bg-rose-400 bg-rose-500 bg-rose-600 bg-rose-700 bg-rose-800 bg-rose-900 bg-rose-950
bg-slate-50 bg-slate-100 bg-slate-200 bg-slate-300 bg-slate-400 bg-slate-500 bg-slate-600 bg-slate-700 bg-slate-800 bg-slate-900 bg-slate-950
bg-gray-50 bg-gray-100 bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 bg-gray-600 bg-gray-700 bg-gray-800 bg-gray-900 bg-gray-950
bg-zinc-50 bg-zinc-100 bg-zinc-200 bg-zinc-300 bg-zinc-400 bg-zinc-500 bg-zinc-600 bg-zinc-700 bg-zinc-800 bg-zinc-900 bg-zinc-950
bg-neutral-50 bg-neutral-100 bg-neutral-200 bg-neutral-300 bg-neutral-400 bg-neutral-500 bg-neutral-600 bg-neutral-700 bg-neutral-800 bg-neutral-900 bg-neutral-950
bg-stone-50 bg-stone-100 bg-stone-200 bg-stone-300 bg-stone-400 bg-stone-500 bg-stone-600 bg-stone-700 bg-stone-800 bg-stone-900 bg-stone-950
*/

function ColorSwatch({ prefix, shade }) {
  const [state, setState] = useState("idle"); // idle | copied
  const bgClass = `bg-${prefix}-${shade}`;
  const textClass = shade >= 500 ? "text-white" : "text-gray-900";
  const label = `${prefix}-${shade}`;

  const handleClick = () => {
    navigator.clipboard.writeText(bgClass).catch(() => {});
    setState("copied");
    setTimeout(() => setState("idle"), 1300);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleClick}
        className={`${bgClass} rounded-xl w-full aspect-square flex items-center justify-center cursor-pointer group relative transition-all duration-150 hover:scale-110 hover:z-10 shadow-sm hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50`}
        title={`Click to copy: ${bgClass}`}
        aria-label={`Copy ${bgClass}`}
      >
        <span
          className={`${textClass} text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-100 select-none leading-tight text-center px-0.5`}
        >
          {state === "copied" ? "✓" : shade}
        </span>
      </button>
    </div>
  );
}

function ColorRow({ group, search }) {
  const matchesGroup = group.name.toLowerCase().includes(search.toLowerCase()) || group.prefix.includes(search.toLowerCase());
  if (search && !matchesGroup) return null;

  return (
    <div className="flex items-center gap-4 py-1">
      {/* Group label */}
      <span className="text-custom-text-secondary text-xs font-semibold w-16 shrink-0 text-right capitalize tracking-widest select-none">
        {group.name}
      </span>
      {/* Swatches */}
      <div className="grid gap-1.5 flex-1" style={{ gridTemplateColumns: `repeat(${shades.length}, 1fr)` }}>
        {shades.map((shade) => (
          <ColorSwatch key={shade} prefix={group.prefix} shade={shade} />
        ))}
      </div>
    </div>
  );
}

export default function TailwindColors() {
  const [search, setSearch] = useState("");
  const [copiedSpecial, setCopiedSpecial] = useState(null);

  const handleCopySpecial = (label) => {
    navigator.clipboard.writeText(`bg-${label}`).catch(() => {});
    setCopiedSpecial(label);
    setTimeout(() => setCopiedSpecial(null), 1300);
  };

  const totalSwatches = colorGroups.length * shades.length + 3;

  return (
    <div className="min-h-screen bg-custom px-4 sm:px-8 py-10 selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white font-mono">
              Tailwind <span className="text-blue-400">Colors</span>
            </h1>
            <p className="text-custom-text-muted text-sm mt-1 font-mono">
              {colorGroups.length} palettes · {totalSwatches} swatches · click to copy class name
            </p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search palette…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-custom-light border border-custom-border text-white text-sm rounded-xl px-4 py-2.5 pl-9 placeholder-custom-text-secondary focus:outline-none focus:border-blue-500 w-56 transition-colors font-mono"
            />
            <svg className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 13.65 6.15z" />
            </svg>
          </div>
        </div>

        {/* ── Shade header row ── */}
        <div className="flex items-center gap-4 mb-2 sticky top-0 bg-custom/95 backdrop-blur py-2 z-20">
          <span className="w-16 shrink-0" />
          <div className="grid flex-1 gap-1.5" style={{ gridTemplateColumns: `repeat(${shades.length}, 1fr)` }}>
            {shades.map((s) => (
              <div key={s} className="text-center text-[9px] text-custom-text-secondary font-bold font-mono">
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* ── Color rows ── */}
        <div className="space-y-0.5">
          {colorGroups.map((group) => (
            <ColorRow key={group.prefix} group={group} search={search} />
          ))}
        </div>

        {/* ── Special colors ── */}
        {!search && (
          <div className="mt-8 pt-6 border-t border-custom-border">
            <p className="text-custom-text-secondary text-xs font-bold font-mono mb-4 text-left mr-4 tracking-widest uppercase">Special</p>
            <div className="flex items-center gap-4">
              <span className="w-16 shrink-0" />
              <div className="flex gap-4">
                {[
                  { label: "black", extra: "bg-black" },
                  { label: "white", extra: "bg-white border border-custom-border" },
                  { label: "transparent", extra: "bg-transparent border-2 border-dashed border-custom-text-muted" },
                ].map(({ label, extra }) => (
                  <button
                    key={label}
                    onClick={() => handleCopySpecial(label)}
                    className={`${extra} rounded-xl w-14 h-14 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:shadow-xl focus:outline-none group`}
                    title={`Copy bg-${label}`}
                  >
                    <span className={`text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity font-mono ${label === "white" ? "text-custom-text-secondary" : "text-white"}`}>
                      {copiedSpecial === label ? "✓" : label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 ml-0">
                {["black", "white", "transparent"].map((l) => (
                  <div key={l} className="w-14 text-center text-[9px] text-custom-text-muted font-mono truncate">
                    {copiedSpecial === l ? <span className="text-green-400">copied!</span> : l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <p className="text-custom-text-secondary text-xs mt-10 text-center font-mono">
          hover → reveal shade · click → copy <code className="text-custom-text-muted">bg-color-shade</code> to clipboard
        </p>
      </div>
    </div>
  );
}
