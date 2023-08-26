export interface Time {
  readonly elapsed: number;
  readonly delta: number;
}

export default class GameTime {
  static readonly time: Time = { elapsed: 0, delta: 0 } as const;

  static updateTime = (elapsed: number): void => {
    (this.time.delta as unknown as number) = elapsed - this.time.elapsed;
    (this.time.elapsed as unknown as number) = elapsed;
  };
}
