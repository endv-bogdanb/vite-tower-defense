import { type Position } from "../settings";

export const isPositionEqual = (
  position: Position,
  waypoint: Position,
): boolean => position.x === waypoint.x && position.y === waypoint.y;
