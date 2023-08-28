import { defineQuery, defineSystem, hasComponent } from "bitecs";
import { type World } from "../World";
import { Enemy, Position, Projectile, Velocity } from "../components";
import { GameAssets } from "../settings";
import { center, isPositionAndWayPointEqual } from "../utils";

function updateWaypoint(eid: number): void {
  const [x, y] = center(eid);

  if (
    isPositionAndWayPointEqual(
      { x, y },
      GameAssets.waypoints[Enemy.waypointIndex[eid]],
      {
        x: Velocity.x[eid],
        y: Velocity.y[eid],
      },
    )
  ) {
    Enemy.waypointIndex[eid] = Math.min(
      Enemy.waypointIndex[eid] + 1,
      GameAssets.waypoints.length - 1,
    );
  }
}

const velocityQuery = defineQuery([Velocity]);

export const velocitySystem = defineSystem<unknown[], World>((world) => {
  velocityQuery(world).forEach((eid) => {
    if (hasComponent(world, Enemy, eid)) {
      updateWaypoint(eid);
      const waypoint = GameAssets.waypoints[Enemy.waypointIndex[eid]];
      const [x, y] = center(eid);
      const angle = Math.atan2(waypoint.y - y, waypoint.x - x);
      Velocity.x[eid] = Math.cos(angle) * Velocity.speed[eid];
      Velocity.y[eid] = Math.sin(angle) * Velocity.speed[eid];
      return;
    }

    if (hasComponent(world, Projectile, eid)) {
      const [x, y] = center(Projectile.enemy[eid]);
      const angle = Math.atan2(y - Position.y[eid], x - Position.x[eid]);
      Velocity.x[eid] = Math.cos(angle) * Velocity.speed[eid];
      Velocity.y[eid] = Math.sin(angle) * Velocity.speed[eid];
    }
  });

  return world;
});
