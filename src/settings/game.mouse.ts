export default class GameMouse {
  static readonly mouse = { x: 0, y: 0 } as const;

  static load = async (): Promise<void> => {
    window.addEventListener("mousemove", this.updateMouse, {
      passive: true,
      capture: true,
    });
  };

  private static readonly updateMouse = (event: MouseEvent): void => {
    (this.mouse.x as unknown as number) = event.clientX;
    (this.mouse.y as unknown as number) = event.clientY;
  };
}
