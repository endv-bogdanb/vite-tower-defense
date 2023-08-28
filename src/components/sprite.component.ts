import { Types, defineComponent } from "bitecs";

export const Sprite = defineComponent({
  src: Types.ui8,
  frames: Types.ui8,
  hold: Types.ui8,
  offsetX: Types.f32,
  offsetY: Types.f32,
  currentFrame: Types.ui8,
});
