import { Types, defineComponent } from "bitecs";

export const Color = defineComponent({
  r: Types.ui32,
  g: Types.ui32,
  b: Types.ui32,
  a: Types.f32,
});

export function rgba(entity: number): string {
  const r = Color.r[entity];
  const g = Color.g[entity];
  const b = Color.b[entity];
  const a = Color.a[entity];
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
