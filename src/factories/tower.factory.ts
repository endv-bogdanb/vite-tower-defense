import { addEntity, addComponent } from "bitecs";
import { type World } from "../World";
import {
  Position,
  Measure,
  Color,
  Sprite,
  Drawable,
  Range,
} from "../components";
import { AssetEnum } from "../settings";

export const makeTower = (world: World, tileId: number): void => {
  const tower = addEntity(world);

  addComponent(world, Position, tower);
  Position.x[tower] = Position.x[tileId];
  Position.y[tower] = Position.y[tileId];

  addComponent(world, Measure, tower);
  Measure.w[tower] = Measure.w[tileId] * 2;
  Measure.h[tower] = Measure.h[tileId];

  addComponent(world, Color, tower);
  Color.r[tower] = 0;
  Color.g[tower] = 0;
  Color.b[tower] = 255;
  Color.a[tower] = 1;

  addComponent(world, Sprite, tower);
  Sprite.src[tower] = AssetEnum.TOWER;
  Sprite.frames[tower] = 19;
  Sprite.hold[tower] = 0;
  Sprite.offsetX[tower] = 0;
  Sprite.offsetY[tower] = -80;

  addComponent(world, Range, tower);
  Range.range[tower] = Measure.w[tower] * 2;

  addComponent(world, Drawable, tower);
};
