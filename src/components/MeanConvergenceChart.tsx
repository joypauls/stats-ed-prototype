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

function tCritical(df: number) {
  // Approximation accurate to ~0.01 for df >= 3
  return 1.96 + 2.2 / Math.sqrt(df) + 2.0 / df;
}

export default function MeanConvergenceChart({ sampleMeans, populationMean }: Props) {
  const xs = sampleMeans.map((_, i) => i + 1);
  const cumMeans = cumulativeMeans(sampleMeans);
  const runningAvg = cumMeans.at(-1) ?? null;

  // Mirror of cumMeans filled down to populationMean, for the error-band fill
  const fillTop = cumMeans.map((v) => Math.max(v, populationMean));
  const fillBottom = cumMeans.map((v) => Math.min(v, populationMean));
  const fillXs = [...xs, ...[...xs].reverse()];
  const fillYs = [...fillTop, ...[...fillBottom].reverse()];

  // 95% CI ribbon around running average: SE = running_std / sqrt(k)
  // Only start computing once we have at least 3 draws
  const ciUpper: number[] = [];
  const ciLower: number[] = [];
  for (let i = 0; i < sampleMeans.length; i++) {
    if (i < 3) {
      ciUpper.push(NaN);
      ciLower.push(NaN);
    } else {
      const m = cumMeans[i];
      const variance =
        sampleMeans.slice(0, i + 1).reduce((s, v) => s + (v - m) ** 2, 0) / i;
      const se = Math.sqrt(variance) / Math.sqrt(i + 1);
      const t = tCritical(i);
      ciUpper.push(m + t * se);
      ciLower.push(m - t * se);
    }
  }
  const ciXs = [...xs, ...[...xs].reverse()];
  const ciYs = [...ciUpper, ...[...ciLower].reverse()];

  const currentCIWidth =
    ciUpper.length > 0 && !isNaN(ciUpper.at(-1)!)
      ? ciUpper.at(-1)! - ciLower.at(-1)!
      : null;

  return (
    <Card
      title="Law of Large Numbers"
      subtitle="The running mean converges to the true population mean as draws accumulate"
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
          <div className="text-[10px] font-medium uppercase tracking-wider text-indigo-400">Running mean</div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-indigo-900">
            {runningAvg !== null ? runningAvg.toFixed(3) : "—"}
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-3 py-2">
          <div className="text-[10px] font-medium uppercase tracking-wider text-emerald-500">95% CI width</div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-emerald-800">
            {currentCIWidth !== null ? currentCIWidth.toFixed(3) : "—"}
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
                hovertemplate: "draw %{x}<br>mean = %{y:.3f}<extra></extra>",
              },
              // Gap to true mean fill
              {
                type: "scatter",
                mode: "none",
                x: fillXs,
                y: fillYs,
                fill: "toself",
                fillcolor: "rgba(99,102,241,0.06)",
                line: { width: 0 },
                name: "Gap to true mean",
                hoverinfo: "skip",
                showlegend: false,
              },
              // 95% CI ribbon
              {
                type: "scatter",
                mode: "none",
                x: ciXs,
                y: ciYs,
                fill: "toself",
                fillcolor: "rgba(16,185,129,0.13)",
                line: { width: 0 },
                name: "95% CI",
                hoverinfo: "skip",
              },
              // CI boundary lines
              {
                type: "scatter",
                mode: "lines",
                x: xs,
                y: ciUpper,
                showlegend: false,
                line: { color: "rgba(16,185,129,0.45)", width: 1, dash: "dot" },
                hoverinfo: "skip",
              },
              {
                type: "scatter",
                mode: "lines",
                x: xs,
                y: ciLower,
                showlegend: false,
                line: { color: "rgba(16,185,129,0.45)", width: 1, dash: "dot" },
                hoverinfo: "skip",
              },
              // Running average line
              {
                type: "scatter",
                mode: "lines",
                x: xs,
                y: cumMeans,
                name: "Running average",
                line: { color: "#6366f1", width: 2.5, shape: "spline", smoothing: 0.4 },
                hovertemplate: "draw %{x}<br>mean = %{y:.3f}<extra></extra>",
              },
            ]}
            layout={{
              autosize: true,
              margin: { l: 32, r: 12, t: 4, b: 28 },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(248,250,252,0.9)",
              font: { color: "#334155", family: "inherit" },
              showlegend: false,
              xaxis: {
                gridcolor: "#f1f5f9",
                zeroline: false,
              },
              yaxis: {
                gridcolor: "#f1f5f9",
                zeroline: false,
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
            }}
            config={{ displayModeBar: false, responsive: true }}
          />
        )}
      </div>
    </Card>
  );
}
