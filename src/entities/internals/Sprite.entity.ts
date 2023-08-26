import { type Position } from "../../settings";

export class Sprite {
  constructor(
    protected readonly _position: Position,
    protected readonly width: number,
    protected readonly height: number,
  ) {}

  public get position(): Position {
    return { ...this._position };
  }

  public get x(): number {
    return this._position.x;
  }

  public set x(value: number) {
    this._position.x = value;
  }

  public get y(): number {
    return this._position.y;
  }

  public set y(value: number) {
    this._position.y = value;
  }

  public get w(): number {
    return this.width;
  }

  public get h(): number {
    return this.height;
  }
}
