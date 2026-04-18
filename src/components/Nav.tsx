"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/sampling", label: "Sampling" },
  { href: "/explore", label: "Explore" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-14 items-center px-6 border-b border-white/60 bg-white/70 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-800 hover:text-indigo-700 transition-colors"
        >
          <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500" />
          uncertainty lab
        </Link>

        {/* Page links */}
        <ul className="flex items-center gap-1">
          {/* Home icon */}
          <li>
            <Link
              href="/"
              aria-label="Home"
              className={[
                "flex items-center rounded-lg px-2.5 py-1.5 transition-colors",
                pathname === "/"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-100/70",
              ].join(" ")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
              </svg>
            </Link>
          </li>

          <li className="h-4 w-px bg-slate-200 mx-1" aria-hidden="true" />

          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/70",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
