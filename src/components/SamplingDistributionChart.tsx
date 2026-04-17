"use client";

import Card from "./Card";
import PlotlyChart from "./PlotlyChart";

type Props = {
  sampleMeans: number[];
  populationMean: number;
};

function mean(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, x) => sum + x, 0) / values.length;
}

function std(values: number[]) {
  if (values.length < 2) return 0;
  const m = mean(values);
  const variance =
    values.reduce((sum, x) => sum + (x - m) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

export default function SamplingDistributionChart({
  sampleMeans,
  populationMean,
}: Props) {
  const meanOfMeans = mean(sampleMeans);
  const sdOfMeans = std(sampleMeans);

  return (
    <Card
      title="Sampling Distribution"
      subtitle="Sample means accumulate here over repeated draws"
      className="h-[360px]"
    >
      <div className="mb-3 grid grid-cols-3 gap-2">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-2">
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Draws</div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-slate-900">{sampleMeans.length}</div>
        </div>
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-3 py-2">
          <div className="text-[10px] font-medium uppercase tracking-wider text-indigo-400">Mean</div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-indigo-900">{meanOfMeans.toFixed(2)}</div>
        </div>
        <div className="rounded-2xl border border-violet-100 bg-violet-50/60 px-3 py-2">
          <div className="text-[10px] font-medium uppercase tracking-wider text-violet-400">SD</div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-violet-900">{sdOfMeans.toFixed(2)}</div>
        </div>
      </div>

      <div className="h-[220px]">
        <PlotlyChart
          data={[
            {
              type: "histogram",
              x: sampleMeans,
              nbinsx: 30,
              hovertemplate: "mean=%{x:.2f}<br>count=%{y}<extra></extra>",
              marker: {
                color: "#818cf8",
              },
            },
          ]}
          layout={{
            autosize: true,
            margin: { l: 40, r: 16, t: 8, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(248,250,252,0.9)",
            bargap: 0.04,
            font: { color: "#334155" },
            shapes: [
              {
                type: "line",
                x0: populationMean,
                x1: populationMean,
                y0: 0,
                y1: 1,
                yref: "paper",
                line: {
                  color: "#f59e0b",
                  width: 2,
                  dash: "dot",
                },
              },
            ],
            xaxis: {
              gridcolor: "#e2e8f0",
              zeroline: false,
            },
            yaxis: {
              gridcolor: "#e2e8f0",
              zeroline: false,
            },
          }}
          config={{ displayModeBar: false, responsive: true }}
        />
      </div>
    </Card>
  );
}
