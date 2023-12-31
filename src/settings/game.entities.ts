import { GameAssets, GameSettings, GameState, type Position } from ".";
import {
  Building,
  Enemy,
  Explosion,
  PlacementTile,
  Projectile,
} from "../entities";

export default class GameEntities {
  static readonly enemies: Enemy[] = [];
  static readonly placementTiles: PlacementTile[] = [];
  static readonly buildings: Building[] = [];
  static readonly projectiles: Projectile[] = [];
  static readonly explosions: Explosion[] = [];

  static activeTile: PlacementTile | undefined = undefined;

  public static load = async (): Promise<void> => {
    this.loadEnemies();
    this.loadPlacementTiles();
  };

  static placeBuilding = (): void => {
    const { activeTile } = this;
    if (
      activeTile === undefined ||
      activeTile?.occupied ||
      GameState.coins - 25 < 0
    ) {
      return;
    }
    this.buildings.push(new Building(activeTile.position));
    this.buildings.sort((a, b) => a.y - b.y);
    activeTile.occupied = true;
    GameState.updateCoins(-25);
  };

  static shoot = (position: Position, enemy: Enemy): void => {
    this.projectiles.push(new Projectile(position, enemy));
  };

  static removeProjectile = (projectile: Projectile): void => {
    const index = this.projectiles.indexOf(projectile);
    if (index > -1) {
      this.projectiles.splice(index, 1);
      this.explosions.push(new Explosion(projectile.position));
    }
  };

  static removeEnemy = (enemy: Enemy): void => {
    const index = this.enemies.indexOf(enemy);
    if (index > -1) {
      this.enemies.splice(index, 1);
    }
  };

  static removeExplosion = (explosion: Explosion): void => {
    const index = this.explosions.indexOf(explosion);
    if (index > -1) {
      this.explosions.splice(index, 1);
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
