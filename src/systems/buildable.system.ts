import { defineQuery, defineSystem } from "bitecs";
import { type World } from "../World";
import { Color, Measure, Position, Tile } from "../components";
import { isPositionContained } from "../utils";

const buildableEntities = defineQuery([Tile, Position, Measure, Color]);

export const buildableSystem = defineSystem<unknown[], World>((world) => {
  buildableEntities(world).forEach((eid) => {
    if (
      isPositionContained(
        world.mouse,
        { x: Position.x[eid], y: Position.y[eid] },
        { x: Measure.w[eid], y: Measure.h[eid] },
      )
    ) {
      Color.a[eid] = 1;
      Tile.active[eid] = 1;
    } else if (Tile.active[eid] === 1) {
      Color.a[eid] = 0.15;
      Tile.active[eid] = 0;
    }
  });

  return world;
});
