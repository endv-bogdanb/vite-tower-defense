import { pipe } from "bitecs";
import { backgroundSystem } from "./background.system";
import { drawSystem } from "./draw.system";
import { gameOverSystem } from "./gameOver.system";
import { isOffScreen } from "./isOffScreen.system";
import { moveSystem } from "./move.system";
import { spawnSystem } from "./spawn.system";
import { velocitySystem } from "./velocity.system";
import { buildableSystem } from "./buildable.system";
import { rangeSystem } from "./range.system";

export default pipe(
  backgroundSystem,
  spawnSystem,
  drawSystem,
  velocitySystem,
  moveSystem,
  rangeSystem,
  buildableSystem,
  isOffScreen,
  gameOverSystem,
);
