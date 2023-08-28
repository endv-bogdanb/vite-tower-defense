import { Types, defineComponent } from "bitecs";

export const Enemy = defineComponent({
  health: Types.ui16,
  waypointIndex: Types.ui8,
});
