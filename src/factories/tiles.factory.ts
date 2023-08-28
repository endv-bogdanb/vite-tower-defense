import { addEntity, addComponent } from "bitecs";
import { type World } from "../World";
import { Tile, Position, Color, Measure, Drawable } from "../components";
import { GameAssets } from "../settings";

export const makeTiles = (world: World): void => {
  GameAssets.tiles.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 14) {
        const tile = addEntity(world);

        addComponent(world, Tile, tile);
        Tile.active[tile] = 0;
        Tile.occupied[tile] = 0;

        addComponent(world, Position, tile);
        Position.x[tile] = x * 64;
        Position.y[tile] = y * 64;

        addComponent(world, Color, tile);
        Color.r[tile] = 255;
        Color.g[tile] = 255;
        Color.b[tile] = 255;
        Color.a[tile] = 0.15;

        addComponent(world, Measure, tile);
        Measure.w[tile] = 64;
        Measure.h[tile] = 64;

        addComponent(world, Drawable, tile);
      }
    });
  });
};
