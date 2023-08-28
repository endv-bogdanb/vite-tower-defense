import { defineQuery, defineSystem, hasComponent, removeEntity } from "bitecs";
import { type World } from "../World";
import { Enemy, Measure, Position, Projectile, Velocity } from "../components";
import { center } from "../utils";
import { GameState } from "../settings";

const movableQuery = defineQuery([Velocity, Position]);

export const moveSystem = defineSystem<unknown[], World>((world) => {
  movableQuery(world).forEach((eid) => {
    Position.x[eid] += Velocity.x[eid];
    Position.y[eid] += Velocity.y[eid];

    if (
      hasComponent(world, Projectile, eid) &&
      hasComponent(world, Measure, eid)
    ) {
      const enemyId = Projectile.enemy[eid];
      const [x, y] = center(enemyId);
      const distance = Math.hypot(x - Position.x[eid], y - Position.y[eid]);
      if (distance < Measure.w[enemyId] + Measure.w[eid]) {
        Enemy.health[enemyId] = Math.max(0, Enemy.health[enemyId] - 20);
        removeEntity(world, eid);

        if (Enemy.health[enemyId] === 0) {
          removeEntity(world, enemyId);
          world.coins += 25;

          const gameCoins = document.querySelector("#coin");
          gameCoins?.setAttribute("count", `${GameState.coins}`);
        }
      }
    }
  });

  return world;
});
