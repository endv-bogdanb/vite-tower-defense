import { defineQuery, defineSystem, removeEntity } from "bitecs";
import { type World } from "../World";
import { Enemy, Position } from "../components";

const velocityQuery = defineQuery([Enemy, Position]);

export const isOffScreen = defineSystem<unknown[], World>((world) => {
  velocityQuery(world).forEach((eid) => {
    if (Position.x[eid] > world.canvas.width) {
      removeEntity(world, eid);

      // NOTE: update world life
      world.life = Math.max(0, world.life - 1);
      const gameLife = document.querySelector("#life");
      gameLife?.setAttribute("count", `${world.life}`);
    }
  });

  return world;
});
