import {
  GameAssets,
  GameState,
  type Position,
  type Waypoint,
} from "../settings";
import { isPositionAndWayPointEqual } from "../utils";
import { Sprite } from "./internals/Sprite.entity";

export default class Enemy extends Sprite {
  private center!: Position;

  private waypointIndex = 0;

  constructor(position: Position) {
    super(position, 100, 100);
    this.updateCenter();
  }

  public update = (): void => {
    this.draw();
    this.updatePosition();
    this.updateCenter();
    this.updateWaypointIndex();
  };

  private readonly draw = (): void => {
    GameState.ctx.fillStyle = "#ff0000";
    GameState.ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  private readonly updatePosition = (): void => {
    const angle = Math.atan2(
      this.waypoint.y - this.center.y,
      this.waypoint.x - this.center.x,
    );

    this.x += Math.cos(angle);
    this.y += Math.sin(angle);
  };

  private readonly updateCenter = (): void => {
    this.center = {
      x: this.x + this.w / 2,
      y: this.y + this.h / 2,
    };
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
