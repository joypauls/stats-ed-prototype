"use client";

import Card from "./Card";
import PlotlyChart from "./PlotlyChart";

type Props = {
  sampleMeans: number[];
  populationMean: number;
};

function cumulativeMeans(values: number[]): number[] {
  const result: number[] = [];
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    result.push(sum / (i + 1));
  }
  return result;
}

export default function MeanConvergenceChart({ sampleMeans, populationMean }: Props) {
  const xs = sampleMeans.map((_, i) => i + 1);
  const cumMeans = cumulativeMeans(sampleMeans);
  const runningAvg = cumMeans.at(-1) ?? null;
  const error = runningAvg !== null ? Math.abs(runningAvg - populationMean) : null;

  // Mirror of cumMeans filled down to populationMean, for the error-band fill
  const fillTop = cumMeans.map((v) => Math.max(v, populationMean));
  const fillBottom = cumMeans.map((v) => Math.min(v, populationMean));
  const fillXs = [...xs, ...[...xs].reverse()];
  const fillYs = [...fillTop, ...[...fillBottom].reverse()];

  return (
    <Card
      title="Law of Large Numbers"
      subtitle="The running average locks onto the true population mean as draws accumulate"
      className="h-[400px]"
    >
      {/* Stat pills */}
      <div className="shrink-0 grid grid-cols-3 gap-2">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-2">
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Draws</div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-slate-900">
            {sampleMeans.length}
          </div>
        </div>
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-3 py-2">
          <div className="text-[10px] font-medium uppercase tracking-wider text-indigo-400">Running avg</div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-indigo-900">
            {runningAvg !== null ? runningAvg.toFixed(3) : "—"}
          </div>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 px-3 py-2">
          <div className="text-[10px] font-medium uppercase tracking-wider text-amber-500">|error|</div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-amber-700">
            {error !== null ? error.toFixed(3) : "—"}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="min-h-0 flex-1">
        {sampleMeans.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-300">
            Draw a sample to begin
          </div>
        ) : (
          <PlotlyChart
            data={[
              // Individual draw dots
              {
                type: "scatter",
                mode: "markers",
                x: xs,
                y: sampleMeans,
                name: "Sample mean",
                marker: {
                  color: "#a5b4fc",
                  size: sampleMeans.length > 200 ? 3 : 5,
                  opacity: 0.55,
                  line: { width: 0 },
                },
                hovertemplate: "draw %{x}<br>x̄ = %{y:.3f}<extra></extra>",
              },
              // Error fill between running avg and μ
              {
                type: "scatter",
                mode: "none",
                x: fillXs,
                y: fillYs,
                fill: "toself",
                fillcolor: "rgba(99,102,241,0.08)",
                line: { width: 0 },
                name: "Gap to μ",
                hoverinfo: "skip",
                showlegend: false,
              },
              // Running average line
              {
                type: "scatter",
                mode: "lines",
                x: xs,
                y: cumMeans,
                name: "Running average",
                line: { color: "#6366f1", width: 2.5, shape: "spline", smoothing: 0.4 },
                hovertemplate: "draw %{x}<br>avg = %{y:.3f}<extra></extra>",
              },
            ]}
            layout={{
              autosize: true,
              margin: { l: 44, r: 20, t: 8, b: 44 },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(248,250,252,0.9)",
              font: { color: "#334155", family: "inherit" },
              legend: {
                orientation: "h",
                x: 0,
                y: 1.07,
                font: { size: 11 },
                bgcolor: "rgba(0,0,0,0)",
              },
              xaxis: {
                title: { text: "Draw #", font: { size: 11, color: "#94a3b8" }, standoff: 8 },
                gridcolor: "#f1f5f9",
                zerolinecolor: "#e2e8f0",
                tickfont: { size: 10, color: "#94a3b8" },
              },
              yaxis: {
                title: { text: "x̄", font: { size: 12, color: "#94a3b8" }, standoff: 4 },
                gridcolor: "#f1f5f9",
                zerolinecolor: "#e2e8f0",
                tickfont: { size: 10, color: "#94a3b8" },
              },
              shapes: [
                {
                  type: "line",
                  x0: 0,
                  x1: 1,
                  xref: "paper",
                  y0: populationMean,
                  y1: populationMean,
                  line: { color: "#f59e0b", width: 1.5, dash: "dot" },
                },
              ],
              annotations: [
                {
                  x: 0.01,
                  xref: "paper",
                  y: populationMean,
                  text: `μ = ${populationMean.toFixed(2)}`,
                  showarrow: false,
                  xanchor: "left",
                  yanchor: "bottom",
                  font: { size: 10, color: "#b45309" },
                  bgcolor: "rgba(255,251,235,0.85)",
                  borderpad: 2,
                },
              ],
            }}
            config={{ displayModeBar: false, responsive: true }}
          />
        )}
      </div>
    </Card>
  );
}
