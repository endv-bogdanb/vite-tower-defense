import { GameAssets, GameSettings, GameState, type Position } from ".";
import { Enemy, PlacementTile, Building, Projectile } from "../entities";

export default class GameEntities {
  static readonly enemies: Enemy[] = [];
  static readonly placementTiles: PlacementTile[] = [];
  static readonly buildings: Building[] = [];
  static readonly projectiles: Projectile[] = [];

  static activeTile: PlacementTile | undefined = undefined;

  public static load = async (): Promise<void> => {
    this.loadEnemies();
    this.loadPlacementTiles();
  };

  static placeBuilding = (): void => {
    const { activeTile } = this;
    if (activeTile === undefined || activeTile?.occupied) {
      return;
    }
    this.buildings.push(new Building(activeTile.position));
    activeTile.occupied = true;
  };

  static shoot = (position: Position, enemy: Enemy): void => {
    this.projectiles.push(new Projectile(position, enemy));
  };

  static removeProjectile = (projectile: Projectile): void => {
    const index = this.projectiles.indexOf(projectile);
    if (index > -1) {
      this.projectiles.splice(index, 1);
    }
  };

  static removeEnemy = (enemy: Enemy): void => {
    const index = this.enemies.indexOf(enemy);
    if (index > -1) {
      this.enemies.splice(index, 1);
    }
  };

  static spawnEnemies = (): void => {
    this.loadEnemies(GameSettings.spawnedEnemies + GameState.round);
  };

  private static readonly loadEnemies = (
    enemies: number = GameSettings.spawnedEnemies,
  ): void => {
    const [{ x, y }] = GameAssets.waypoints;
    for (let i = 1; i < enemies + 1; i += 1) {
      const offset = i * 150;
      this.enemies.push(new Enemy({ x: x - offset, y }));
    }
  };

  private static readonly loadPlacementTiles = (): void => {
    GameAssets.tiles.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          this.placementTiles.push(new PlacementTile({ x: x * 64, y: y * 64 }));
        }
      });
    });
  };
}
