"use client";

import { useCallback, useEffect, useState } from "react";
import PopulationChart from "@/components/PopulationChart";
import SampleChart from "@/components/SampleChart";
import SamplingDistributionChart from "@/components/SamplingDistributionChart";
import { populationAnalyticalMean, PopulationKind } from "@/lib/distributions";
import { drawSample, mean } from "@/lib/sampling";

const populationLabels: Record<PopulationKind, string> = {
  normal: "Normal",
  uniform: "Uniform",
  bimodal: "Bimodal",
  right_skewed: "Right-Skewed",
};

export default function HomePage() {
  const [populationKind, setPopulationKind] = useState<PopulationKind>("normal");
  const [sampleSize, setSampleSize] = useState(10);
  const [currentSample, setCurrentSample] = useState<number[]>([]);
  const [sampleMeans, setSampleMeans] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const hasData = currentSample.length > 0 || sampleMeans.length > 0;

  const populationMean = populationAnalyticalMean[populationKind];
  const currentSampleMean = currentSample.length ? mean(currentSample) : null;

  // Reset accumulated state when the population or sample size changes
  function handlePopulationChange(kind: PopulationKind) {
    setPopulationKind(kind);
    setCurrentSample([]);
    setSampleMeans([]);
    setIsRunning(false);
    setResetKey((k) => k + 1);
  }

  function handleSampleSizeChange(n: number) {
    setSampleSize(n);
    setCurrentSample([]);
    setSampleMeans([]);
    setIsRunning(false);
    setResetKey((k) => k + 1);
  }

  const drawOne = useCallback(() => {
    const sample = drawSample(populationKind, sampleSize);
    setCurrentSample(sample);
    setSampleMeans((prev) => [...prev, mean(sample)]);
  }, [populationKind, sampleSize]);

  // Continuous run loop
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(drawOne, 120);
    return () => clearInterval(id);
  }, [isRunning, drawOne]);

  function handleDrawOne() {
    setIsRunning(false);
    drawOne();
  }

  function handleDrawHundred() {
    setIsRunning(false);
    const means: number[] = [];
    let lastSample: number[] = [];
    for (let i = 0; i < 100; i += 1) {
      const sample = drawSample(populationKind, sampleSize);
      lastSample = sample;
      means.push(mean(sample));
    }
    setCurrentSample(lastSample);
    setSampleMeans((prev) => [...prev, ...means]);
  }

  function handleReset() {
    setIsRunning(false);
    setCurrentSample([]);
    setSampleMeans([]);
    setResetKey((k) => k + 1);
  }

  return (
    <main className="min-h-screen px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-4">
          <div className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Prototype · Sampling & Distributions
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 bg-clip-text text-transparent">
                Watch sampling behavior emerge
              </span>
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Start with a population, draw repeated samples, and see how the
              distribution of sample means forms over time.
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-white/70 bg-white/85 px-5 py-4 shadow-[0_8px_32px_rgba(15,23,42,0.07),0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm ring-1 ring-slate-900/[0.03]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">

            {/* Population select */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                Population
              </span>
              <select
                className="rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                value={populationKind}
                onChange={(e) => handlePopulationChange(e.target.value as PopulationKind)}
              >
                {(Object.entries(populationLabels) as [PopulationKind, string][]).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div className="hidden h-6 w-px bg-slate-200 sm:block" />

            {/* Sample size slider */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                Sample size
              </span>
              <input
                type="range"
                min={2}
                max={100}
                value={sampleSize}
                onChange={(e) => handleSampleSizeChange(Number(e.target.value))}
                className="w-40 accent-indigo-500"
              />
              <span className="text-xs font-semibold tabular-nums text-slate-600 w-10">n = {sampleSize}</span>
            </div>

            {/* Divider */}
            <div className="hidden h-6 w-px bg-slate-200 sm:block" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700 active:scale-[0.97]"
                onClick={handleDrawOne}
              >
                Draw 1
              </button>
              <button
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.97]"
                onClick={handleDrawHundred}
              >
                Draw 100
              </button>
              <button
                className={[
                  "rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition active:scale-[0.97]",
                  isRunning
                    ? "bg-amber-500 text-white hover:bg-amber-400"
                    : "border border-slate-200 bg-transparent text-slate-600 hover:border-slate-300 hover:text-slate-800",
                ].join(" ")}
                onClick={() => setIsRunning((r) => !r)}
              >
                {isRunning ? "Pause" : "Run"}
              </button>
              <button
                disabled={!hasData}
                className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm font-medium transition active:scale-[0.97] disabled:cursor-not-allowed disabled:text-slate-300 disabled:border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

            {/* Status pills */}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] text-slate-500">
                {populationLabels[populationKind]}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] text-slate-500">
                {sampleMeans.length} means
              </span>
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] text-amber-600" suppressHydrationWarning>
                μ ≈ {populationMean.toFixed(2)}
              </span>
            </div>

          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <PopulationChart kind={populationKind} />
          <SampleChart key={resetKey} sample={currentSample} sampleMean={currentSampleMean} />
          <SamplingDistributionChart
            key={resetKey + 1}
            sampleMeans={sampleMeans}
            populationMean={populationMean}
          />
        </section>
      </div>
    </main>
  );
}
