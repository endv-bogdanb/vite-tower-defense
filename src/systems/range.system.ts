import { defineQuery, defineSystem } from "bitecs";
import { type World } from "../World";
import { Enemy, Measure, Position, Range, Sprite } from "../components";
import { center } from "../utils";
import { makeProjectile } from "../factories";

const enemyQuery = defineQuery([Enemy, Position, Measure]);
const rangeQuery = defineQuery([Range, Sprite, Position, Measure]);

export const rangeSystem = defineSystem<unknown[], World>((world) => {
  const enemies = enemyQuery(world);

  rangeQuery(world).forEach((eid) => {
    const [x, y] = center(eid);
    const enemy = enemies.find((enemyId) => {
      const [enemyX, enemyY] = center(enemyId);

      const distance = Math.hypot(enemyY - y, enemyX - x);
      return distance < Measure.w[enemyId] + Range.range[eid];
    });

    if (enemy != null) {
      Sprite.hold[eid] = 5;
      if (
        Sprite.currentFrame[eid] === 6 &&
        world.frames % Sprite.hold[eid] === 0
      ) {
        makeProjectile(world, eid, enemy);
      }
    } else {
      Sprite.hold[eid] = 0;
      Sprite.currentFrame[eid] = 0;
    }
  });

  return world;
});
