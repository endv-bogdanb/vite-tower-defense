import { addEntity, addComponent } from "bitecs";
import { type World } from "../World";
import {
  Projectile,
  Position,
  Measure,
  Velocity,
  Color,
  Sprite,
  Drawable,
} from "../components";
import { AssetEnum } from "../settings";
import { center } from "../utils";

export const makeProjectile = (
  world: World,
  towerId: number,
  enemyId: number,
): void => {
  const projectile = addEntity(world);

  addComponent(world, Projectile, projectile);
  Projectile.enemy[projectile] = enemyId;

  addComponent(world, Position, projectile);
  const [x, y] = center(towerId);
  Position.x[projectile] = x - 20;
  Position.y[projectile] = y - 110;

  addComponent(world, Measure, projectile);
  Measure.w[projectile] = 10;
  Measure.h[projectile] = 10;

  addComponent(world, Velocity, projectile);
  Velocity.x[projectile] = 0;
  Velocity.y[projectile] = 0;
  Velocity.speed[projectile] = 5;

  addComponent(world, Color, projectile);
  Color.r[projectile] = 0;
  Color.g[projectile] = 255;
  Color.b[projectile] = 0;
  Color.a[projectile] = 1;

  addComponent(world, Sprite, projectile);
  Sprite.src[projectile] = AssetEnum.PROJECTILE;
  Sprite.frames[projectile] = 1;
  Sprite.hold[projectile] = 5;
  Sprite.offsetX[projectile] = 0;
  Sprite.offsetY[projectile] = 0;

  addComponent(world, Drawable, projectile);
};
