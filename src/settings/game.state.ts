import { GameAssets, GameEntities, GameMouse } from ".";

export interface Position {
  x: number;
  y: number;
}

export default class GameState {
  private static loopHandle = 0;
  static readonly ctx: CanvasRenderingContext2D;

  // eslint-disable-next-line accessor-pairs
  static set context(ctx: CanvasRenderingContext2D) {
    (this.ctx as unknown as CanvasRenderingContext2D) = ctx;
  }

  static load = async (): Promise<void> => {
    await GameAssets.load();
    await Promise.all([GameEntities.load(), GameMouse.load()]);
  };

  static schedule = (loop: FrameRequestCallback): void => {
    this.loopHandle = requestAnimationFrame(loop);
  };

  static unschedule = (): void => {
    cancelAnimationFrame(this.loopHandle);
  };
}
