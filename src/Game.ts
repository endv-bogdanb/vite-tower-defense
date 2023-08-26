import { type GameTime, GameState } from "./settings";

export class Game {
  private static callback: (time: GameTime) => void;

  static readonly start = (callback: typeof this.callback): void => {
    this.callback = callback;
    GameState.schedule(this.loop);
  };

  static readonly stop = (): void => {
    GameState.unschedule();
  };

  private static readonly loop: FrameRequestCallback = (time) => {
    GameState.updateTime(time);
    this.callback(GameState.time);
    GameState.schedule(this.loop);
  };
}
