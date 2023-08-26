import "./style.css";

const canvas = document.querySelector("#app") as HTMLCanvasElement;
canvas.width = 1280;
canvas.height = 768;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const loopId = { id: 0 };

const loop: FrameRequestCallback = (): void => {
  cancelAnimationFrame(loopId.id);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  loopId.id = requestAnimationFrame(loop);
};

window.addEventListener("load", () => {
  loopId.id = requestAnimationFrame(loop);
});
