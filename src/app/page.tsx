"use client";

import { useMemo, useState } from "react";
import PopulationChart from "@/components/PopulationChart";
import SampleChart from "@/components/SampleChart";
import SamplingDistributionChart from "@/components/SamplingDistributionChart";
import { generatePopulationPreview, PopulationKind } from "@/lib/distributions";
import { drawSample, mean } from "@/lib/sampling";

export default function HomePage() {
  const [populationKind, setPopulationKind] = useState<PopulationKind>("normal");
  const [sampleSize, setSampleSize] = useState(10);
  const [currentSample, setCurrentSample] = useState<number[]>([]);
  const [sampleMeans, setSampleMeans] = useState<number[]>([]);

  const populationPreview = useMemo(
    () => generatePopulationPreview(populationKind, 3000),
    [populationKind]
  );

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
    <main className="min-h-screen bg-white px-6 py-8 text-black">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Sampling Prototype</h1>
          <p className="text-sm text-neutral-600">
            Explore populations, samples, and the sampling distribution of the mean.
          </p>
        </header>

        <section className="flex flex-wrap items-center gap-4 rounded-2xl border p-4">
          <label className="flex items-center gap-2">
            <span className="text-sm">Population</span>
            <select
              className="rounded-md border px-3 py-2"
              value={populationKind}
              onChange={(e) => setPopulationKind(e.target.value as PopulationKind)}
            >
              <option value="normal">Normal</option>
              <option value="uniform">Uniform</option>
              <option value="bimodal">Bimodal</option>
              <option value="right_skewed">Right skewed</option>
            </select>
          </label>

          <label className="flex items-center gap-3">
            <span className="text-sm">Sample size: {sampleSize}</span>
            <input
              type="range"
              min={2}
              max={100}
              value={sampleSize}
              onChange={(e) => setSampleSize(Number(e.target.value))}
            />
          </label>

          <button
            className="rounded-xl border px-4 py-2"
            onClick={handleDrawOne}
          >
            Draw 1 sample
          </button>

          <button
            className="rounded-xl border px-4 py-2"
            onClick={handleDrawHundred}
          >
            Draw 100 samples
          </button>

          <button
            className="rounded-xl border px-4 py-2"
            onClick={handleReset}
          >
            Reset
          </button>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PopulationChart values={populationPreview} />
          <SampleChart sample={currentSample} sampleMean={currentSampleMean} />
          <SamplingDistributionChart sampleMeans={sampleMeans} />
        </section>
      </div>
    </main>
  );
}
