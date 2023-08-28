import { type Time, GameState, GameTime } from "./settings";

export class Game {
  private static run = true;
  private static callback: (time: Time) => void;

  static readonly start = async (
    callback: typeof this.callback,
  ): Promise<void> => {
    await GameState.load();
    this.run = true;
    this.callback = callback;
    GameState.schedule(this.loop);
  };

  static readonly stop = (): void => {
    this.run = false;
    GameState.unschedule();
  };

  private static readonly loop: FrameRequestCallback = (time) => {
    if (!this.run) {
      return;
    }
    GameTime.updateTime(time);
    GameState.tick();
    this.callback(GameTime.time);
    GameState.schedule(this.loop);
  };
}
