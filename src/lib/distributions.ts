export type PopulationKind = "normal" | "uniform" | "bimodal" | "right_skewed";

function randnBoxMuller(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function sampleFromPopulation(kind: PopulationKind): number {
  switch (kind) {
    case "normal":
      return randnBoxMuller();

    case "uniform":
      return Math.random() * 2 - 1;

    case "bimodal":
      return Math.random() < 0.5 ? randnBoxMuller() - 2 : randnBoxMuller() + 2;

    case "right_skewed":
      // exponential-ish, shifted toward zero
      return -Math.log(1 - Math.random()) - 1;

    default:
      return randnBoxMuller();
  }
}

/** True analytical mean for each population. */
export const populationAnalyticalMean: Record<PopulationKind, number> = {
  normal: 0,
  uniform: 0,
  bimodal: 0,
  right_skewed: 0, // E[-ln(U) - 1] = 1 - 1 = 0
};

/** Returns evenly-spaced {x, y} points for the true analytical PDF. */
export function populationPDF(
  kind: PopulationKind,
  steps = 300
): { x: number[]; y: number[] } {
  const normalPDF = (x: number, mu = 0, sigma = 1) =>
    Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));

  let xMin: number, xMax: number;
  let fn: (x: number) => number;

  switch (kind) {
    case "normal":
      xMin = -4; xMax = 4;
      fn = (x) => normalPDF(x);
      break;

    case "uniform":
      xMin = -1.5; xMax = 1.5;
      fn = (x) => (x >= -1 && x <= 1 ? 0.5 : 0);
      break;

    case "bimodal":
      xMin = -6; xMax = 6;
      fn = (x) => 0.5 * normalPDF(x, -2) + 0.5 * normalPDF(x, 2);
      break;

    case "right_skewed":
      // shifted exponential: X = -ln(U) - 1, so density = exp(-(x+1)) for x > -1
      xMin = -1; xMax = 5;
      fn = (x) => (x >= -1 ? Math.exp(-(x + 1)) : 0);
      break;

    default:
      xMin = -4; xMax = 4;
      fn = (x) => normalPDF(x);
  }

  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    xs.push(x);
    ys.push(fn(x));
  }
  return { x: xs, y: ys };
}
