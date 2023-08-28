import { defineSystem } from "bitecs";
import { type World } from "../World";
import { GameAssets } from "../settings";

export const backgroundSystem = defineSystem<unknown[], World>((world) => {
  world.ctx.fillStyle = "#ffffff";
  world.ctx.fillRect(0, 0, world.canvas.width, world.canvas.height);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  world.ctx.drawImage(GameAssets.assets.get("game-map")!, 0, 0);

  return world;
});
