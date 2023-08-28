import { defineQuery, defineSystem } from "bitecs";
import { type World } from "../World";
import { Enemy } from "../components";
import { makeEnemy } from "../factories";

const enemiesQuery = defineQuery([Enemy]);

export const spawnSystem = defineSystem<unknown[], World>((world) => {
  if (enemiesQuery(world).length === 0) {
    for (let i = 1; i <= world.round + world.enemiesEveryRound; i += 1) {
      makeEnemy(world, i);
    }
  }

  return world;
});
