import { defineSystem } from "bitecs";
import { type World } from "../World";
import { Game } from "../Game";

export const gameOverSystem = defineSystem<unknown[], World>((world) => {
  if (world.life <= 0) {
    Game.stop();
    const gameOverText = document.querySelector(".game-over");
    gameOverText?.setAttribute("style", "display: block");
  }

  return world;
});
