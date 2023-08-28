import "./style.css";
import "./web-components";

import { createWorld, defineQuery } from "bitecs";
import { Game } from "./Game";
import { GameAssets } from "./settings";
import { type World } from "./World";
import pipeline from "./systems";
import { Tile } from "./components";
import { makeTower, makeTiles } from "./factories";

// import { Game } from "./Game";
// import {
//   GameAssets,
//   /* GameEntities,  */ GameSettings,
//   GameState,
// } from "./settings";
// import {
//   Types,
//   addComponent,
//   addEntity,
//   createWorld,
//   defineComponent,
//   defineQuery,
//   defineSystem,
//   enterQuery,
//   pipe,
// } from "bitecs";
// // import { forEachRight } from "./utils";

// const world = createWorld({
//   round: 0,
//   life: 10,
//   coins: 50,
// });

// const enemyId = addEntity(world);

// const Enemy = defineComponent({ health: Types.ui16 }, 100);
// addComponent(world, Enemy, enemyId);

// const healthQuery = defineQuery([Enemy]);
// const initEntities = enterQuery(healthQuery);
// const healthSystem = defineSystem((w) => {
//   initEntities(w).forEach((eid) => {
//     Enemy.health[eid] = 100;
//   });
//   return w;
// });

// const pipeline = pipe(healthSystem);

// console.log(enemyId, Enemy);

// pipeline(world);

// const loop = (): void => {
//   GameState.ctx.fillStyle = "#ffffff";
//   GameState.ctx.fillRect(
//     0,
//     0,
//     GameSettings.canvas.width,
//     GameSettings.canvas.height,
//   );

//   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//   GameState.ctx.drawImage(GameAssets.assets.get("game-map")!, 0, 0);

//   // if (GameState.life === 0) {
//   //   Game.stop();
//   //   const gameOver = document.querySelector("h1");
//   //   gameOver?.setAttribute("style", "display:block");
//   //   return;
//   // }

//   // if (GameEntities.enemies.length === 0) {
//   //   GameState.round += 1;
//   //   GameEntities.spawnEnemies();
//   // }

//   // forEachRight(GameEntities.enemies, (enemy) => {
//   //   enemy.update();
//   // });

//   // forEachRight(GameEntities.explosions, (explosion) => {
//   //   explosion.update();
//   // });

//   // GameEntities.placementTiles.forEach((placementTile) => {
//   //   placementTile.update();
//   // });
//   // GameEntities.buildings.forEach((building) => {
//   //   building.update();
//   // });

//   // forEachRight(GameEntities.projectiles, (projectile) => {
//   //   projectile.update();
//   // });
// };

// window.addEventListener("load", () => {
//   const canvas = document.querySelector("#app") as HTMLCanvasElement;
//   canvas.width = GameSettings.canvas.width;
//   canvas.height = GameSettings.canvas.height;

//   GameState.context = canvas.getContext("2d") as CanvasRenderingContext2D;

//   // Game.start(loop).then(() => {
//   //   // canvas.addEventListener("click", () => {
//   //   //   GameEntities.placeBuilding();
//   //   // });
//   // }, console.error);
// });

const world = createWorld<World>({
  round: 1,
  enemiesEveryRound: 3,
  life: 10,
  coins: 50,
  frames: 0,
  mouse: {
    x: 0,
    y: 0,
  },
  canvas: { width: 1280, height: 768 },
  ctx: null as unknown as CanvasRenderingContext2D,
});

const loop = (): void => {
  world.frames += 1;
  pipeline(world);
};

window.addEventListener("load", () => {
  const canvas = document.querySelector("#app") as HTMLCanvasElement;
  canvas.width = world.canvas.width;
  canvas.height = world.canvas.height;

  world.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  GameAssets.load()
    .then(async () => {
      const gameLife = document.querySelector("#life");
      gameLife?.setAttribute("count", `${world.life}`);

      const gameCoins = document.querySelector("#coin");
      gameCoins?.setAttribute("count", `${world.coins}`);

      window.addEventListener(
        "mousemove",
        (event) => {
          world.mouse.x = event.clientX;
          world.mouse.y = event.clientY;
        },
        {
          passive: true,
          capture: true,
        },
      );
      const tilesQuery = defineQuery([Tile]);

      canvas.addEventListener(
        "click",
        () => {
          const tile = tilesQuery(world).find((eid) => Tile.active[eid] === 1);
          if (
            tile != null &&
            Tile.occupied[tile] === 0 &&
            world.coins - 25 >= 0
          ) {
            Tile.occupied[tile] = 1;
            makeTower(world, tile);
            world.coins -= 25;

            const gameCoins = document.querySelector("#coin");
            gameCoins?.setAttribute("count", `${world.coins}`);
          }
        },
        { passive: true },
      );

      makeTiles(world);

      await Game.start(loop);
    })
    .then(console.log, console.error);
});
