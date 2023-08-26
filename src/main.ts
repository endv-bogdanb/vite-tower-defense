import "./style.css";

import { Game } from "./Game";
import { GameState, GameSettings, GameAssets, GameEntities } from "./settings";

const loop = (): void => {
  GameState.ctx.fillStyle = "#ffffff";
  GameState.ctx.fillRect(
    0,
    0,
    GameSettings.canvas.width,
    GameSettings.canvas.height,
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  GameState.ctx.drawImage(GameAssets.assets.get("game-map")!, 0, 0);

  GameEntities.enemies.forEach((enemy) => {
    enemy.update();
  });
  GameEntities.placements.forEach((placement) => {
    placement.update();
  });
  GameEntities.buildings.forEach((building) => {
    building.update();
  });
};

window.addEventListener("load", () => {
  const canvas = document.querySelector("#app") as HTMLCanvasElement;
  canvas.width = GameSettings.canvas.width;
  canvas.height = GameSettings.canvas.height;

  GameState.context = canvas.getContext("2d") as CanvasRenderingContext2D;

  Game.start(loop).then(() => {
    canvas.addEventListener("click", () => {
      GameEntities.placeBuilding();
    });
  }, console.error);
});
