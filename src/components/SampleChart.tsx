"use client";

import PlotlyChart from "./PlotlyChart";

type Props = {
  sample: number[];
  sampleMean: number | null;
};

export default function SampleChart({ sample, sampleMean }: Props) {
  return (
    <div className="h-72 rounded-2xl border p-2">
      <PlotlyChart
        data={[
          {
            type: "scatter",
            mode: "markers",
            x: sample,
            y: sample.map(() => 0),
          },
          ...(sampleMean === null
            ? []
            : [
                {
                  type: "scatter",
                  mode: "markers",
                  x: [sampleMean],
                  y: [0],
                  marker: { size: 14, symbol: "diamond" },
                  name: "Sample mean",
                },
              ]),
        ]}
        layout={{
          title: { text: "Current Sample" },
          margin: { l: 40, r: 20, t: 40, b: 40 },
          autosize: true,
          yaxis: { visible: false },
        }}
        config={{ displayModeBar: false, responsive: true }}
      />
    </div>
  );
}
