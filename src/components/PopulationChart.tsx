"use client";

import { useMemo } from "react";
import Card from "./Card";
import PlotlyChart from "./PlotlyChart";
import { populationPDF, PopulationKind } from "@/lib/distributions";

type Props = {
  kind: PopulationKind;
};

export default function PopulationChart({ kind }: Props) {
  const { x, y } = useMemo(() => populationPDF(kind), [kind]);

  return (
    <Card
      title="Population"
      subtitle="Choose a shape, then start drawing samples"
      className="h-[360px]"
    >
      <div className="min-h-0 flex-1">
        <PlotlyChart
          data={[
            {
              type: "scatter",
              mode: "lines",
              x,
              y,
              fill: "tozeroy",
              line: { color: "#6366f1", width: 2 },
              fillcolor: "rgba(99,102,241,0.12)",
              hovertemplate: "value = %{x:.2f}<extra></extra>",
            },
          ]}
          layout={{
            autosize: true,
            margin: { l: 16, r: 16, t: 8, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(248,250,252,0.9)",
            font: { color: "#334155" },
            showlegend: false,
            xaxis: {
              gridcolor: "#e2e8f0",
              zeroline: false,
            },
            yaxis: {
              gridcolor: "#e2e8f0",
              zeroline: false,
              showticklabels: false,
            },
          }}
          config={{ displayModeBar: false, responsive: true }}
        />
      </div>
    </Card>
  );
}
