"use client";

import PlotlyChart from "./PlotlyChart";

type Props = {
  sampleMeans: number[];
};

export default function SamplingDistributionChart({ sampleMeans }: Props) {
  return (
    <div className="h-72 rounded-2xl border p-2">
      <PlotlyChart
        data={[
          {
            type: "histogram",
            x: sampleMeans,
            nbinsx: 30,
          },
        ]}
        layout={{
          title: { text: "Sampling Distribution of the Mean" },
          margin: { l: 40, r: 20, t: 40, b: 40 },
          autosize: true,
        }}
        config={{ displayModeBar: false, responsive: true }}
      />
    </div>
  );
}
