"use client";

import PlotlyChart from "./PlotlyChart";

type Props = {
  values: number[];
};

export default function PopulationChart({ values }: Props) {
  return (
    <div className="h-72 rounded-2xl border p-2">
      <PlotlyChart
        data={[
          {
            type: "histogram",
            x: values,
            nbinsx: 40,
          },
        ]}
        layout={{
          title: { text: "Population" },
          margin: { l: 40, r: 20, t: 40, b: 40 },
          autosize: true,
        }}
        config={{ displayModeBar: false, responsive: true }}
      />
    </div>
  );
}
