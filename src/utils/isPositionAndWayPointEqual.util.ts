import { type Position, type Waypoint } from "../settings";

export const isPositionAndWayPointEqual = (
  position: Position,
  waypoint: Waypoint,
): boolean => {
  return (
    Math.round(position.x) === Math.round(waypoint.x) &&
    Math.round(position.y) === Math.round(waypoint.y)
  );
};
