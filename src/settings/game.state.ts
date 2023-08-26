import { Enemy } from "../entities";

export interface GameTime {
  readonly elapsed: number;
  readonly delta: number;
}

const ASSETS = ["game-map"] as const;

export default class GameState {
  private static loopHandle = 0;
  static readonly ctx: CanvasRenderingContext2D;
  static readonly time: GameTime = {
    elapsed: 0,
    delta: 0,
  } as const;

  static readonly assets = new Map<(typeof ASSETS)[number], HTMLImageElement>();
  static readonly waypoints: Array<{ x: number; y: number }> = [];
  static readonly enemies: Enemy[] = [];

  // eslint-disable-next-line accessor-pairs
  static set context(ctx: CanvasRenderingContext2D) {
    (this.ctx as unknown as CanvasRenderingContext2D) = ctx;
  }

  static updateTime = (elapsed: number): void => {
    (this.time.delta as unknown as number) = elapsed - this.time.elapsed;
    (this.time.elapsed as unknown as number) = elapsed;
  };

  static loadAssets = async (): Promise<void> => {
    await Promise.all([ASSETS.map(this.loadImage), this.loadWaypoints()]);
    this.loadEnemies();
  };

  static schedule = (loop: FrameRequestCallback): void => {
    this.loopHandle = requestAnimationFrame(loop);
  };

  static unschedule = (): void => {
    cancelAnimationFrame(this.loopHandle);
  };

  private static readonly loadImage = async (
    src: (typeof ASSETS)[number],
  ): Promise<void> => {
    await new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve();
      };
      image.onerror = reject;
      image.src = `/assets/${src}.png`;
      this.assets.set(src, image);
    });
  };

  private static readonly loadWaypoints = async (): Promise<void> => {
    const response = await fetch("/waypoints.json");
    if (!response.ok) {
      throw new Error(`${response.statusText !== "" || response.status}`);
    }
    const json = await response.json();
    (this.waypoints as unknown) = json;
  };

  private static readonly loadEnemies = (): void => {
    const [{ x, y }] = this.waypoints;
    for (let i = 1; i < 11; i += 1) {
      const offset = i * 150;
      this.enemies.push(new Enemy({ x: x - offset, y }));
    }
  };
}