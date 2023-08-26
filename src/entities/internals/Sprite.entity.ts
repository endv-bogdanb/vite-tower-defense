import {
  GameAssets,
  GameState,
  type Asset,
  type Position,
} from "../../settings";
import { Rect } from "./Position.entity";

export abstract class Sprite extends Rect {
  protected currentFrame = 0;

  constructor(
    position: Position,
    width: number,
    height: number,
    protected readonly asset: Asset,
  ) {
    super(position, width, height);
  }

  protected update(): void {
    if (GameState.frames % this.asset.hold === 0) {
      this.currentFrame = (this.currentFrame + 1) % this.asset.frames;
    }
  }

  protected draw(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sprite = GameAssets.assets.get(this.asset.src)!;
    const w = sprite.width / this.asset.frames;
    const h = sprite.height;

    const crop = { x: w * this.currentFrame, y: 0, w, h };

    GameState.ctx.drawImage(
      sprite,
      crop.x,
      crop.y,
      crop.w,
      crop.h,
      this.x + this.asset.offset.x,
      this.y + this.asset.offset.y,
      crop.w,
      crop.h,
    );
  }

  protected abstract debug(): void;
}
