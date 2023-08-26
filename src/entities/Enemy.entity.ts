import { GameState } from "../settings";
import { isPositionAndWayPointEqual } from "../utils";

export interface Position {
  x: number;
  y: number;
}

export default class Enemy {
  private readonly width = 100;
  private readonly height = 100;
  private center!: Position;

  private waypointIndex = 0;

  constructor(private readonly position: Position) {
    this.updateCenter();
  }

  public draw = (): void => {
    GameState.ctx.fillStyle = "#ff0000";
    GameState.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  };

  public update = (): void => {
    this.draw();
    this.updatePosition();
    this.updateCenter();
    this.updateWaypointIndex();
  };

  private readonly updatePosition = (): void => {
    const angle = Math.atan2(
      this.waypoint.y - this.center.y,
      this.waypoint.x - this.center.x,
    );

    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);
  };

  private readonly updateCenter = (): void => {
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
  };

  private readonly updateWaypointIndex = (): void => {
    if (isPositionAndWayPointEqual(this.center, this.waypoint)) {
      this.waypointIndex = Math.min(
        this.waypointIndex + 1,
        GameState.waypoints.length,
      );
    }
  };

  private get waypoint(): (typeof GameState.waypoints)[number] {
    return GameState.waypoints[this.waypointIndex];
  }
}
