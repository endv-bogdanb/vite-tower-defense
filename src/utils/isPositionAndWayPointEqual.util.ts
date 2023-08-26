import { type Position } from "../entities";
import { type GameState } from "../settings";

export const isPositionAndWayPointEqual = (
  position: Position,
  waypoint: (typeof GameState.waypoints)[number],
): boolean => {
  return (
    Math.round(position.x) === Math.round(waypoint.x) &&
    Math.round(position.y) === Math.round(waypoint.y)
  );
};
