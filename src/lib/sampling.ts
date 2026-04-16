import { PopulationKind, sampleFromPopulation } from "./distributions";

export function drawSample(kind: PopulationKind, sampleSize: number): number[] {
  return Array.from({ length: sampleSize }, () => sampleFromPopulation(kind));
}

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, x) => sum + x, 0) / values.length;
}
