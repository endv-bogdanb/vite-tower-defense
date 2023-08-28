import { addEntity, addComponent } from "bitecs";
import { type World } from "../World";
import { Sprite } from "../components";

export const makeExplosion = (world: World): void => {
  const explosion = addEntity(world);

  addComponent(world, Sprite, explosion);
};
