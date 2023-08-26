import {
  GameAssets,
  GameEntities,
  GameState,
  type Position,
  type Waypoint,
} from "../settings";
import { isPositionAndWayPointEqual } from "../utils";
import { Sprite } from "./internals/Sprite.entity";

export default class Enemy extends Sprite {
  private waypointIndex = 0;
  private health = 100;

  constructor(position: Position) {
    super(position, 100, 100);
  }

  public override update = (): void => {
    this.draw();
    this.updatePosition();
    this.updateWaypointIndex();
  };

  protected override readonly draw = (): void => {
    GameState.ctx.fillStyle = "#ff0000";
    GameState.ctx.beginPath();
    GameState.ctx.arc(this.center.x, this.center.y, this.w / 2, 0, Math.PI * 2);
    GameState.ctx.fill();

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

  protected override readonly debug = (): void => {};

  public readonly hit = (): void => {
    this.health = Math.max(0, this.health - 20);
    if (this.health === 0) {
      GameEntities.removeEnemy(this);
    }
  };

  private readonly updatePosition = (): void => {
    const angle = Math.atan2(
      this.waypoint.y - this.center.y,
      this.waypoint.x - this.center.x,
    );

    this.x += Math.cos(angle);
    this.y += Math.sin(angle);
  };

  private readonly updateWaypointIndex = (): void => {
    if (isPositionAndWayPointEqual(this.center, this.waypoint)) {
      this.waypointIndex = Math.min(
        this.waypointIndex + 1,
        GameAssets.waypoints.length - 1,
      );
    }
  };

  private get waypoint(): Waypoint {
    return GameAssets.waypoints[this.waypointIndex];
  }
}
