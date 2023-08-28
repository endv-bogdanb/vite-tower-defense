import { Types, defineComponent } from "bitecs";

export const Arc = defineComponent({
  radius: Types.ui32,
  startAngle: Types.f64,
  endAngle: Types.f64,
});
