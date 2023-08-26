import "./style.css";

import { Game } from "./Game";
import { GameState, GameSettings } from "./settings";

const loop = (): void => {
  GameState.ctx.fillStyle = "#ffffff";
  GameState.ctx.fillRect(
    0,
    0,
    GameSettings.canvas.width,
    GameSettings.canvas.height,
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  GameState.ctx.drawImage(GameState.assets.get("game-map")!, 0, 0);

  GameState.enemies.forEach((enemy) => {
    enemy.update();
  });
};

window.addEventListener("load", () => {
  const canvas = document.querySelector("#app") as HTMLCanvasElement;
  GameState.context = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = GameSettings.canvas.width;
  canvas.height = GameSettings.canvas.height;

  GameState.loadAssets().then(() => {
    Game.start(loop);
  }, console.error);
});
