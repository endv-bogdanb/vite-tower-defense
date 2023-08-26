import {
  GameAssets,
  GameEntities,
  GameSettings,
  GameState,
  type Position,
  type Waypoint,
} from "../settings";
import { isPositionAndWayPointEqual } from "../utils";
import { Sprite } from "./internals/Sprite.entity";

export default class Enemy extends Sprite {
  private waypointIndex = 0;
  private health = 100;
  private readonly velocity: Position = { x: 0, y: 0 };
  private readonly speed = 3;

  constructor(position: Position) {
    super(position, 100, 100, {
      src: "orc",
      frames: 7,
      hold: 5,
      offset: { x: 0, y: 0 },
    });
  }

  public override update = (): void => {
    this.draw();
    super.update();
    this.updatePosition();
    this.updateWaypointIndex();
    this.isOffMap();
  };

  protected override readonly draw = (): void => {
    super.draw();

    GameState.ctx.fillStyle = "#ff0000";
    GameState.ctx.fillRect(this.x, this.y - 15, this.w, 10);

    GameState.ctx.fillStyle = "#00ff00";
    GameState.ctx.fillRect(
      this.x,
      this.y - 15,
      Math.max(0, (this.w * this.health) / 100),
      10,
    );

    if (import.meta.env.DEV) this.debug();
  };

  protected override readonly debug = (): void => {
    // GameState.ctx.fillStyle = "#ff0000";
    // GameState.ctx.beginPath();
    // GameState.ctx.arc(this.center.x, this.center.y, this.w / 2, 0, Math.PI * 2);
    // GameState.ctx.fill();
  };

  public readonly hit = (): void => {
    if (this.health === 0) {
      return;
    }

    this.health = Math.max(0, this.health - 20);
    if (this.health === 0) {
      GameEntities.removeEnemy(this);
      GameState.updateCoins();
    }
  };

  private readonly updatePosition = (): void => {
    const angle = Math.atan2(
      this.waypoint.y - this.center.y,
      this.waypoint.x - this.center.x,
    );

    this.velocity.x = Math.cos(angle) * this.speed;
    this.velocity.y = Math.sin(angle) * this.speed;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

  private readonly updateWaypointIndex = (): void => {
    if (isPositionAndWayPointEqual(this.center, this.waypoint, this.velocity)) {
      this.waypointIndex = Math.min(
        this.waypointIndex + 1,
        GameAssets.waypoints.length - 1,
      );
    }
  };

  private readonly isOffMap = (): void => {
    if (this.x > GameSettings.canvas.width) {
      GameEntities.removeEnemy(this);
      GameState.hit();
    }
  };

  private get waypoint(): Waypoint {
    return GameAssets.waypoints[this.waypointIndex];
  }
}
