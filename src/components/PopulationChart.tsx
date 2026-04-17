"use client";

import Card from "./Card";
import PlotlyChart from "./PlotlyChart";

type Props = {
  values: number[];
};

export default function PopulationChart({ values }: Props) {
  return (
    <Card
      title="Population"
      subtitle="Choose a shape, then start drawing samples"
      className="h-[360px]"
    >
      <div className="h-[280px]">
        <PlotlyChart
          data={[
            {
              type: "histogram",
              x: values,
              nbinsx: 40,
              hovertemplate: "x=%{x:.2f}<br>count=%{y}<extra></extra>",
              marker: {
                color: "#94a3b8",
                opacity: 0.85,
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
