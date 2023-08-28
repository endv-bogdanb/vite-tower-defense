import { Measure, Position } from "../components";

export const center = (eid: number): [number, number] => {
  return [
    Position.x[eid] + Measure.w[eid] / 2,
    Position.y[eid] + Measure.h[eid] / 2,
  ];
};
