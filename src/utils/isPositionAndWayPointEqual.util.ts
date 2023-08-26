import { type Position, type Waypoint } from "../settings";

export const isPositionAndWayPointEqual = (
  position: Position,
  waypoint: Waypoint,
  velocity: Position,
): boolean => {
  const xDiff = Math.abs(Math.round(position.x) - Math.round(waypoint.x));
  const yDiff = Math.abs(Math.round(position.y) - Math.round(waypoint.y));
  return xDiff < Math.abs(velocity.x) && yDiff < Math.abs(velocity.y);
};
