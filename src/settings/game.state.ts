export interface GameTime {
  readonly elapsed: number;
  readonly delta: number;
}

export default class GameState {
  private static loopHandle = 0;
  static readonly ctx: CanvasRenderingContext2D;
  static readonly time: GameTime = {
    elapsed: 0,
    delta: 0,
  } as const;

  static readonly assets = new Map<"game-map", HTMLImageElement>();

  // eslint-disable-next-line accessor-pairs
  static set context(ctx: CanvasRenderingContext2D) {
    (this.ctx as unknown as CanvasRenderingContext2D) = ctx;
  }

  static updateTime = (elapsed: number): void => {
    (this.time.delta as unknown as number) = elapsed - this.time.elapsed;
    (this.time.elapsed as unknown as number) = elapsed;
  };

  static loadAssets = async (): Promise<void> => {
    const sources = ["game-map"] as const;

    await Promise.all([
      sources.map(async (src) => {
        await new Promise<void>((resolve, reject) => {
          const image = new Image();
          image.onload = () => {
            resolve();
          };
          image.onerror = reject;
          image.src = `/assets/${src}.png`;
          this.assets.set(src, image);
        });
      }),
    ]);
  };

  static schedule = (loop: FrameRequestCallback): void => {
    this.loopHandle = requestAnimationFrame(loop);
  };

  static unschedule = (): void => {
    cancelAnimationFrame(this.loopHandle);
  };
}
