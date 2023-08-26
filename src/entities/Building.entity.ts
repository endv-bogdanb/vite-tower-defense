import { GameState, type Position } from "../settings";
import { Sprite } from "./internals/Sprite.entity";

export default class Building extends Sprite {
  constructor(position: Position) {
    super(position, 64 * 2, 64);
  }

  public update = (): void => {
    this.draw();
  };

  private readonly draw = (): void => {
    GameState.ctx.fillStyle = "#0000ff";
    GameState.ctx.fillRect(this.x, this.y, this.w, this.h);
  };
}
