import { GameEntities, GameMouse, GameState, type Position } from "../settings";
import { isPositionContained } from "../utils";
import { Rect } from "./internals/Position.entity";

export default class PlacementTile extends Rect {
  constructor(
    position: Position,
    private color = "rgba(255, 255, 255, .15)",
    public occupied = false,
  ) {
    super(position, 64, 64);
  }

  public update = (): void => {
    this.draw();

    if (
      isPositionContained(GameMouse.mouse, this.position, {
        x: this.w,
        y: this.h,
      })
    ) {
      this.color = "rgba(255, 255, 255, 1)";
      GameEntities.activeTile = this;
    } else {
      this.color = "rgba(255, 255, 255, .15)";
      if (GameEntities.activeTile === this) {
        GameEntities.activeTile = undefined;
      }
    }
  };

  protected readonly draw = (): void => {
    GameState.ctx.fillStyle = this.color;
    GameState.ctx.fillRect(this.x, this.y, this.w, this.h);
    if (import.meta.env.DEV) this.debug();
  };

  protected readonly debug = (): void => {};
}
