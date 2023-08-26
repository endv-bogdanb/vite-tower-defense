import { GameEntities, type Position } from "../settings";
import { Sprite } from "./internals/Sprite.entity";

export default class Explosion extends Sprite {
  constructor(position: Position) {
    super(position, 10, 10, {
      src: "explosion",
      frames: 4,
      hold: 5,
      offset: { x: 0, y: 0 },
    });
  }

  public override update = (): void => {
    this.draw();
    super.update();
    if (this.currentFrame === this.asset.frames - 1) {
      GameEntities.removeExplosion(this);
    }
  };

  protected override readonly draw = (): void => {
    super.draw();
    if (import.meta.env.DEV) this.debug();
  };

  protected override readonly debug = (): void => {
    // GameState.ctx.fillStyle = "orange";
    // GameState.ctx.beginPath();
    // GameState.ctx.arc(this.x, this.y, this.w, 0, Math.PI * 2);
    // GameState.ctx.fill();
  };
}
