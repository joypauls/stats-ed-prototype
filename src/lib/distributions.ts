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

export function generatePopulationPreview(kind: PopulationKind, n = 3000): number[] {
  return Array.from({ length: n }, () => sampleFromPopulation(kind));
}
