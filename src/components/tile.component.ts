import { Types, defineComponent } from "bitecs";

export const Tile = defineComponent({
  active: Types.ui8,
  occupied: Types.ui8,
});
