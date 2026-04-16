"use client";

import { useMemo, useState } from "react";
import PopulationChart from "@/components/PopulationChart";
import SampleChart from "@/components/SampleChart";
import SamplingDistributionChart from "@/components/SamplingDistributionChart";
import { generatePopulationPreview, PopulationKind } from "@/lib/distributions";
import { drawSample, mean } from "@/lib/sampling";

const populationLabels: Record<PopulationKind, string> = {
  normal: "Normal",
  uniform: "Uniform",
  bimodal: "Bimodal",
  right_skewed: "Right skewed",
};

export default function HomePage() {
  const [populationKind, setPopulationKind] = useState<PopulationKind>("normal");
  const [sampleSize, setSampleSize] = useState(10);
  const [currentSample, setCurrentSample] = useState<number[]>([]);
  const [sampleMeans, setSampleMeans] = useState<number[]>([]);

  const populationPreview = useMemo(
    () => generatePopulationPreview(populationKind, 10000),
    [populationKind]
  );

  const populationMean = useMemo(() => mean(populationPreview), [populationPreview]);
  const currentSampleMean = currentSample.length ? mean(currentSample) : null;

  function handleDrawOne() {
    const sample = drawSample(populationKind, sampleSize);
    const sampleMean = mean(sample);
    setCurrentSample(sample);
    setSampleMeans((prev) => [...prev, sampleMean]);
  }

  function handleDrawHundred() {
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
    setCurrentSample([]);
    setSampleMeans([]);
  }

  return (
    <main className="min-h-screen px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-4">
          <div className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Prototype · Sampling & Distributions
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              Watch sampling behavior emerge
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Start with a population, draw repeated samples, and see how the
              distribution of sample means forms over time.
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Population
                </span>
                <select
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-300"
                  value={populationKind}
                  onChange={(e) => setPopulationKind(e.target.value as PopulationKind)}
                >
                  <option value="normal">Normal</option>
                  <option value="uniform">Uniform</option>
                  <option value="bimodal">Bimodal</option>
                  <option value="right_skewed">Right skewed</option>
                </select>
              </label>

              <label className="flex min-w-[260px] flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Sample size
                </span>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">n = {sampleSize}</span>
                    <span className="text-slate-500">larger n → tighter means</span>
                  </div>
                  <input
                    className="w-full"
                    type="range"
                    min={2}
                    max={100}
                    value={sampleSize}
                    onChange={(e) => setSampleSize(Number(e.target.value))}
                  />
                </div>
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
                onClick={handleDrawOne}
              >
                Draw 1 sample
              </button>

              <button
                className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
                onClick={handleDrawHundred}
              >
                Draw 100 samples
              </button>

              <button
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              population: {populationLabels[populationKind]}
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              sample means collected: {sampleMeans.length}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <PopulationChart values={populationPreview} />
          <SampleChart sample={currentSample} sampleMean={currentSampleMean} />
          <SamplingDistributionChart
            sampleMeans={sampleMeans}
            populationMean={populationMean}
          />
        </section>
      </div>
    </main>
  );
}
