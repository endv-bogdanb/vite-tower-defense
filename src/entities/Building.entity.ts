import { type Enemy } from ".";
import { GameEntities, GameState, type Position } from "../settings";
import { Sprite } from "./internals/Sprite.entity";

export default class Building extends Sprite {
  constructor(position: Position) {
    super(position, 64 * 2, 64, {
      src: "tower",
      frames: 19,
      hold: 5,
      offset: { x: 0, y: -80 },
    });
  }

  public override update = (): void => {
    this.draw();

    const enemy = this.enemy();

    if (enemy != null || this.currentFrame !== 0) {
      super.update();
    }

    if (enemy != null) {
      if (this.currentFrame === 6 && GameState.frames % this.asset.hold === 0) {
        GameEntities.shoot(
          { x: this.center.x - 20, y: this.center.y - 110 },
          enemy,
        );
      }
    }
  };

  protected override readonly draw = (): void => {
    super.draw();
    if (import.meta.env.DEV) this.debug();
  };

  protected override readonly debug = (): void => {
    // GameState.ctx.fillStyle = "#0000ff";
    // GameState.ctx.fillRect(this.x, this.y, this.w, this.h);
    GameState.ctx.beginPath();
    GameState.ctx.arc(this.center.x, this.center.y, this.w * 2, 0, Math.PI * 2);
    GameState.ctx.fillStyle = "rgba(0, 0, 255, 0.15)";
    GameState.ctx.fill();
  };

  private readonly enemy = (): Enemy | undefined => {
    return GameEntities.enemies.find((enemy) => {
      const distance = Math.hypot(
        enemy.center.y - this.center.y,
        enemy.center.x - this.center.x,
      );
      return distance < enemy.w + this.w * 2;
    });
  };
}
