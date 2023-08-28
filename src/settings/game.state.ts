import { GameAssets, GameEntities, GameMouse } from ".";

export interface Position {
  x: number;
  y: number;
}

export default class GameState {
  private static loopHandle = 0;
  static readonly ctx: CanvasRenderingContext2D;
  static readonly frames = 0;
  static round = 0;
  static life = 10;
  static coins = 50;

  // eslint-disable-next-line accessor-pairs
  static set context(ctx: CanvasRenderingContext2D) {
    (this.ctx as unknown as CanvasRenderingContext2D) = ctx;
  }

  static tick = (): void => {
    (this.frames as unknown as number) += 1;
  };

  static load = async (): Promise<void> => {
    await GameAssets.load();
    await Promise.all([GameEntities.load(), GameMouse.load()]);
  };

  static hit = (): void => {
    this.life = Math.max(0, this.life - 1);

    const gameLife = document.querySelector("#life");
    gameLife?.setAttribute("count", `${GameState.life}`);
  };

  static updateCoins = (value = 25): void => {
    this.coins += value;

    const gameCoins = document.querySelector("#coin");
    gameCoins?.setAttribute("count", `${GameState.coins}`);
  };

  static schedule = (loop: FrameRequestCallback): void => {
    this.loopHandle = requestAnimationFrame(loop);
  };

  static unschedule = (): void => {
    cancelAnimationFrame(this.loopHandle);
  };
}
