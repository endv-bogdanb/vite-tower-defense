import { type Time, GameState, GameTime } from "./settings";

export class Game {
  private static callback: (time: Time) => void;

  static readonly start = async (
    callback: typeof this.callback,
  ): Promise<void> => {
    await GameState.load();
    this.callback = callback;
    GameState.schedule(this.loop);
  };

  static readonly stop = (): void => {
    GameState.unschedule();
  };

  private static readonly loop: FrameRequestCallback = (time) => {
    GameTime.updateTime(time);
    GameState.tick();
    this.callback(GameTime.time);
    GameState.schedule(this.loop);
  };
}
