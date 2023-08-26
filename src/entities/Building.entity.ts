import { GameEntities, GameState, type Position } from "../settings";
import { Sprite } from "./internals/Sprite.entity";

export default class Building extends Sprite {
  constructor(position: Position) {
    super(position, 64 * 2, 64);
  }

  public override update = (): void => {
    this.draw();

    const enemy = GameEntities.enemies.find((enemy) => {
      return (
        Math.hypot(
          enemy.center.y - this.center.y,
          enemy.center.x - this.center.x,
        ) <
        enemy.w + this.w * 2
      );
    });

    if (enemy != null && GameState.frames % 100 === 0) {
      GameEntities.shoot(this.center, enemy);
    }
  };

  protected override readonly draw = (): void => {
    GameState.ctx.fillStyle = "#0000ff";
    GameState.ctx.fillRect(this.x, this.y, this.w, this.h);

    GameState.ctx.beginPath();
    GameState.ctx.arc(this.center.x, this.center.y, this.w * 2, 0, Math.PI * 2);
    GameState.ctx.fillStyle = "rgba(0, 0, 255, 0.15)";
    GameState.ctx.fill();

    if (import.meta.env.DEV) this.debug();
  };

  protected override readonly debug = (): void => {};
}
