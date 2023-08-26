import { GameAssets } from ".";
import { Enemy, Placement, Building } from "../entities";

export default class GameEntities {
  static readonly enemies: Enemy[] = [];
  static readonly placements: Placement[] = [];
  static readonly buildings: Building[] = [];

  static activeTile: Placement | undefined = undefined;

  public static load = async (): Promise<void> => {
    this.loadEnemies();
    this.loadPlacements();
  };

  static placeBuilding = (): void => {
    const { activeTile } = this;
    if (activeTile === undefined || activeTile?.occupied) {
      return;
    }
    this.buildings.push(new Building(activeTile.position));
    activeTile.occupied = true;
  };

  private static readonly loadEnemies = (): void => {
    const [{ x, y }] = GameAssets.waypoints;
    for (let i = 1; i < 11; i += 1) {
      const offset = i * 150;
      this.enemies.push(new Enemy({ x: x - offset, y }));
    }
  };

  private static readonly loadPlacements = (): void => {
    GameAssets.tiles.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          this.placements.push(new Placement({ x: x * 64, y: y * 64 }));
        }
      });
    });
  };
}
