import { type Position } from "../settings";

export const isPositionContained = (
  point: Position,
  position: Position,
  offset: Position = { x: 0, y: 0 },
): boolean => {
  return (
    point.x > position.x &&
    point.x < position.x + offset.x &&
    point.y > position.y &&
    point.y < position.y + offset.y
  );
};
