import "./style.css";
import "./components";

import { Game } from "./Game";
import { GameAssets, GameEntities, GameSettings, GameState } from "./settings";
import { forEachRight } from "./utils";

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

  if (GameState.life === 0) {
    Game.stop();
    const gameOver = document.querySelector("h1");
    gameOver?.setAttribute("style", "display:block");
    return;
  }

  if (GameEntities.enemies.length === 0) {
    GameState.round += 1;
    GameEntities.spawnEnemies();
  }

  forEachRight(GameEntities.enemies, (enemy) => {
    enemy.update();
  });

  forEachRight(GameEntities.explosions, (explosion) => {
    explosion.update();
  });

  GameEntities.placementTiles.forEach((placementTile) => {
    placementTile.update();
  });
  GameEntities.buildings.forEach((building) => {
    building.update();
  });

  forEachRight(GameEntities.projectiles, (projectile) => {
    projectile.update();
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
