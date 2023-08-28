export interface World {
  round: number;
  enemiesEveryRound: number;
  life: number;
  coins: number;
  frames: number;
  mouse: {
    x: number;
    y: number;
  };
  canvas: {
    width: number;
    height: number;
  };
  ctx: CanvasRenderingContext2D;
}
