import Link from "next/link";

const experiments = [
  {
    href: "/sampling",
    label: "Sampling",
    tag: "Active",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    accent: "from-indigo-500 to-violet-500",
    description: "Draw repeated samples from a population and watch the distribution of sample means emerge over time.",
  },
  {
    href: "/explore",
    label: "Explore",
    tag: "Coming soon",
    tagColor: "bg-slate-100 text-slate-400 border-slate-200",
    accent: "from-violet-400 to-fuchsia-400",
    description: "More experiments — streaks, rare events, and variability — coming soon.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl space-y-14">

        {/* Hero */}
        <header className="space-y-5">
          <div className="space-y-3">
            <h1 className="text-5xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 bg-clip-text text-transparent">
                Feel how randomness works
              </span>
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-500">
              Interactive experiments for building intuition around randomness,
              sampling, and uncertainty. No formulas — just click and observe.
            </p>
          </div>
        </header>

        {/* Experiment cards */}
        <section className="space-y-4">
          {experiments.map(({ href, label, tag, tagColor, accent, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-5 rounded-2xl border border-white/70 bg-white/85 px-6 py-5 shadow-[0_4px_20px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm ring-1 ring-slate-900/[0.03] transition hover:shadow-[0_8px_32px_rgba(99,102,241,0.13)] hover:-translate-y-0.5"
            >
              <span className={`mt-0.5 shrink-0 inline-block h-9 w-9 rounded-xl bg-gradient-to-br ${accent} shadow-sm`} />
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                    {label}
                  </span>
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${tagColor}`}>
                    {tag}
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-500">{description}</p>
              </div>
            </Link>
          ))}
        </section>

      </div>
    </main>
  );
}
