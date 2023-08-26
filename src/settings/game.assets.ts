export interface Waypoint {
  x: number;
  y: number;
}

const ASSETS = ["game-map"] as const;

export default class GameAssets {
  static readonly assets = new Map<(typeof ASSETS)[number], HTMLImageElement>();
  static readonly waypoints: Waypoint[] = [];
  static readonly tiles: number[][] = [];

  static load = async (): Promise<void> => {
    await Promise.all([
      ASSETS.map(this.loadImage),
      this.loadWaypoints(),
      this.loadTiles(),
    ]);
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

  private static readonly loadTiles = async (): Promise<void> => {
    const response = await fetch("/tiles.json");
    if (!response.ok) {
      throw new Error(`${response.statusText !== "" || response.status}`);
    }
    const json = await response.json();
    (this.tiles as unknown) = json;
  };
}
