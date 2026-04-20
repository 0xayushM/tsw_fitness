import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

const registeredPlugins = new Set<object>();

const MOTION_CORE_EASE_NAME = "motion-core-ease";
const MOTION_CORE_EASE_CURVE = "0.625, 0.05, 0, 1";

let motionCoreEaseRegistered = false;

/**
 * Register one or more GSAP plugins exactly once per client session.
 * Safe to call from multiple components — duplicates are skipped.
 */
export function registerPluginOnce(...plugins: object[]) {
  const unique = plugins.filter((plugin) => !registeredPlugins.has(plugin));
  if (!unique.length) return;
  gsap.registerPlugin(...unique);
  unique.forEach((plugin) => registeredPlugins.add(plugin));
}

/**
 * Lazily creates the shared "motion-core-ease" CustomEase on first call
 * and returns its registered name for reuse in tweens.
 */
export function ensureMotionCoreEase() {
  registerPluginOnce(CustomEase);
  if (!motionCoreEaseRegistered) {
    CustomEase.create(MOTION_CORE_EASE_NAME, MOTION_CORE_EASE_CURVE);
    motionCoreEaseRegistered = true;
  }
  return MOTION_CORE_EASE_NAME;
}

export const MOTION_CORE_EASE = MOTION_CORE_EASE_NAME;
