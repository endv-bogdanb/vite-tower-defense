import { Not, defineQuery, defineSystem, hasComponent } from "bitecs";
import { type World } from "../World";
import {
  Arc,
  Color,
  Drawable,
  Enemy,
  Measure,
  Position,
  Sprite,
  Tile,
  rgba,
} from "../components";
import { ASSETS, GameAssets } from "../settings";

const drawableQuery = defineQuery([
  Position,
  Measure,
  Drawable,
  Color,
  Not(Tile),
]);

const tileQuery = defineQuery([Position, Measure, Drawable, Color, Tile]);

export const drawSystem = defineSystem<unknown[], World>((world) => {
  tileQuery(world).forEach((eid) => {
    world.ctx.fillStyle = rgba(eid);
    world.ctx.fillRect(
      Position.x[eid],
      Position.y[eid],
      Measure.w[eid],
      Measure.h[eid],
    );
  });

  drawableQuery(world).forEach((eid) => {
    if (hasComponent(world, Arc, eid)) {
      world.ctx.fillStyle = rgba(eid);
      world.ctx.beginPath();
      world.ctx.arc(
        // TODO: maybe add a component for center
        Position.x[eid] + Measure.w[eid] / 2,
        // Position.x[eid],
        Position.y[eid] + Measure.h[eid] / 2,
        // Position.y[eid],
        Arc.radius[eid],
        Arc.startAngle[eid],
        Arc.endAngle[eid],
      );
      world.ctx.fill();
    } else if (hasComponent(world, Sprite, eid)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const sprite = GameAssets.assets.get(ASSETS[Sprite.src[eid]])!;
      const w = sprite.width / Sprite.frames[eid];
      const h = sprite.height;

      const crop = { x: w * Sprite.currentFrame[eid], y: 0, w, h };

      world.ctx.drawImage(
        sprite,
        crop.x,
        crop.y,
        crop.w,
        crop.h,
        Position.x[eid] + Sprite.offsetX[eid],
        Position.y[eid] + Sprite.offsetY[eid],
        crop.w,
        crop.h,
      );

      if (world.frames % Sprite.hold[eid] === 0) {
        Sprite.currentFrame[eid] =
          (Sprite.currentFrame[eid] + 1) % Sprite.frames[eid];
      }
    } else {
      world.ctx.fillStyle = rgba(eid);
      world.ctx.fillRect(
        Position.x[eid],
        Position.y[eid],
        Measure.w[eid],
        Measure.h[eid],
      );
    }

    if (hasComponent(world, Enemy, eid)) {
      world.ctx.fillStyle = "#ff0000";
      world.ctx.fillRect(
        Position.x[eid],
        Position.y[eid] - 15,
        Measure.w[eid],
        10,
      );

      world.ctx.fillStyle = "#00ff00";
      world.ctx.fillRect(
        Position.x[eid],
        Position.y[eid] - 15,
        Math.max(0, (Measure.w[eid] * Enemy.health[eid]) / 100),
        10,
      );
    }
  });

  return world;
});
