export default function ExplorePage() {
  return (
    <main className="min-h-screen px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-4">
          <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            Coming soon
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-violet-900 to-slate-800 bg-clip-text text-transparent">
                More to explore
              </span>
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Additional experiments — streaks, rare events, variability — will live here.
            </p>
          </div>
        </header>

        <div className="rounded-3xl border border-white/70 bg-white/85 px-8 py-16 text-center shadow-[0_8px_32px_rgba(15,23,42,0.07),0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm ring-1 ring-slate-900/[0.03]">
          <p className="text-slate-400 text-sm">Placeholder — nothing here yet.</p>
        </div>
      </div>
    </main>
  );
}
