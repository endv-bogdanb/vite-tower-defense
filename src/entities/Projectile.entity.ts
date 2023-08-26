import { type Enemy } from ".";
import { GameEntities, type Position } from "../settings";
import { Sprite } from "./internals/Sprite.entity";

export default class Projectile extends Sprite {
  private readonly velocity: Position = { x: 0, y: 0 };
  private readonly speed = 5;

  constructor(
    position: Position,
    private readonly enemy: Enemy,
  ) {
    super(position, 10, 10, {
      src: "projectile",
      frames: 1,
      hold: 5,
      offset: { x: 0, y: 0 },
    });
  }

  public override update = (): void => {
    this.draw();

    const angle = Math.atan2(
      this.enemy.center.y - this.y,
      this.enemy.center.x - this.x,
    );

    this.velocity.x = Math.cos(angle);
    this.velocity.y = Math.sin(angle);

    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;

    const distance = Math.hypot(
      this.enemy.center.x - this.x,
      this.enemy.center.y - this.y,
    );

    if (distance < this.enemy.w + this.w) {
      this.enemy.hit();
      GameEntities.removeProjectile(this);
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
