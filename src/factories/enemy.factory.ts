import { addEntity, addComponent } from "bitecs";
import { type World } from "../World";
import {
  Enemy,
  Color,
  Measure,
  Position,
  Velocity,
  Drawable,
  Sprite,
} from "../components";
import { GameAssets, AssetEnum } from "../settings";

export const makeEnemy = (world: World, index: number): number => {
  const enemy = addEntity(world);

  addComponent(world, Enemy, enemy);
  Enemy.health[enemy] = 100;
  Enemy.waypointIndex[enemy] = 1;

  addComponent(world, Color, enemy);
  Color.r[enemy] = 255;
  Color.g[enemy] = 99;
  Color.b[enemy] = 71;
  Color.a[enemy] = 1;

  addComponent(world, Measure, enemy);
  Measure.w[enemy] = 100;
  Measure.h[enemy] = 100;

  addComponent(world, Position, enemy);
  const [{ x, y }] = GameAssets.waypoints;
  Position.x[enemy] = x - index * 150;
  Position.y[enemy] = y;

  addComponent(world, Velocity, enemy);
  Velocity.x[enemy] = 0;
  Velocity.y[enemy] = 0;
  Velocity.speed[enemy] = 3;

  addComponent(world, Drawable, enemy);

  addComponent(world, Sprite, enemy);
  Sprite.src[enemy] = AssetEnum.ORC;
  Sprite.frames[enemy] = 7;
  Sprite.hold[enemy] = 10;
  Sprite.offsetX[enemy] = 0;
  Sprite.offsetY[enemy] = 0;
  Sprite.currentFrame[enemy] = 0;

  return enemy;
};
