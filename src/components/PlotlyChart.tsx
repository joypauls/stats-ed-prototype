"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

type PlotlyChartProps = React.ComponentProps<typeof Plot>;

export default function PlotlyChart(props: PlotlyChartProps) {
  return <Plot useResizeHandler style={{ width: "100%", height: "100%" }} {...props} />;
}
