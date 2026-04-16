"use client";

import Card from "./Card";
import PlotlyChart from "./PlotlyChart";

type Props = {
  sample: number[];
  sampleMean: number | null;
};

function jitter(n: number) {
  return Array.from({ length: n }, () => (Math.random() - 0.5) * 0.04);
}

export default function SampleChart({ sample, sampleMean }: Props) {
  const y = jitter(sample.length);

  return (
    <Card
      title="Current Sample"
      subtitle="One sample shown on a single axis"
      className="h-[360px]"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          n = {sample.length}
        </div>
        {sampleMean !== null ? (
          <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            sample mean = {sampleMean.toFixed(2)}
          </div>
        ) : null}
      </div>

      <div className="h-[245px]">
        <PlotlyChart
          data={[
            {
              type: "scatter",
              mode: "markers",
              x: sample,
              y,
              marker: {
                size: 10,
                color: "#6366f1",
                opacity: 0.8,
              },
              hovertemplate: "x=%{x:.2f}<extra></extra>",
            },
          ]}
          layout={{
            autosize: true,
            margin: { l: 40, r: 16, t: 8, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(248,250,252,0.9)",
            font: { color: "#334155" },
            showlegend: false,
            xaxis: {
              gridcolor: "#e2e8f0",
              zeroline: false,
            },
            yaxis: {
              visible: false,
              range: [-0.04, 0.04],
              zeroline: false,
            },
            ...(sampleMean === null
              ? {}
              : {
                  shapes: [
                    {
                      type: "line",
                      x0: sampleMean,
                      x1: sampleMean,
                      y0: 0,
                      y1: 1,
                      yref: "paper",
                      line: {
                        color: "#f59e0b",
                        width: 2,
                      },
                    },
                  ],
                }),
          }}
          config={{ displayModeBar: false, responsive: true }}
        />
      </div>
    </Card>
  );
}
