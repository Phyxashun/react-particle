import Bounds from './Bounds';
import Particle from './Particle';
import Vector from './Vector';
import {
  makeBounceClass,
  makeBubbleClass,
  makeConfettiClass,
  makeConstellationClass,
  makeFlockClass,
  makeOrbitalClass,
  makeRepulsorClass,
  makeSnowClass,
  makeSparkClass,
} from './decorators';

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const randomAngle = () => Math.random() * Math.PI * 2;

// Renders the decorator stack listing in the right panel.
export type StackEntry = [name: string, args: string];

export interface ModeInfo {
  className: string;
  stack: StackEntry[];
  perfNote: string;
  primary: string;
  makeParticleClass: (bounds: Bounds) => typeof Particle;
  getInitialVelocity: (spawnSpeed: number) => Vector;
  perceptionRadius: number;
}

// This is the data structure holding the UI information for each particle mode.
const MODES: Record<string, ModeInfo> = {
  spark: {
    className: 'SparkParticle',
    primary: '@WithGravity · @WithTrail · @WithShrink',
    stack: [
      ['WithFade', ''],
      ['WithShrink', ''],
      ['WithGravity', '0, 420'],
      ['WithTrail', '16, "rgba(255,160,40,0.18)"'],
      ['WithGlow', '"orange", 9'],
      ['WithColor', '255, 160, 40'],
      ['WithLifetime', '0.8'],
      ['WithSize', '2.5'],
    ],
    perfNote:
      '<b>@WithShrink</b> scales to zero over the lifetime ratio. <b>@WithTrail</b> samples position history each update — no QuadTree needed.',
    perceptionRadius: 0,
    makeParticleClass: (_bounds: Bounds) => makeSparkClass(),
    getInitialVelocity: (spawnSpeed: number) => {
      const angle = randomAngle();
      const speed = rand(60, 160) * spawnSpeed;
      // Sparks always fire upward — negative vy bias
      return new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed - 80);
    },
  },

  bubble: {
    className: 'BubbleParticle',
    primary: '@WithGlow · @WithSize (large)',
    stack: [
      ['WithFade', ''],
      ['WithGlow', '"rgba(100,200,255,1)", 22'],
      ['WithColor', '80, 180, 255, 0.65'],
      ['WithLifetime', '3.5'],
      ['WithSize', '16'],
    ],
    perfNote:
      '<b>@WithGlow</b> sets canvas shadowBlur. Large <b>@WithSize</b> paired with low opacity creates the translucent sphere look.',
    perceptionRadius: 0,
    makeParticleClass: (_bounds: Bounds) => makeBubbleClass(),
    getInitialVelocity: (spawnSpeed: number) => {
      const angle = randomAngle();
      const speed = rand(60, 160) * spawnSpeed;
      return new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed);
    },
  },

  confetti: {
    className: 'ConfettiParticle',
    primary: '@WithRotation · @WithGravity',
    stack: [
      ['WithFade', ''],
      ['WithRotation', 'spin  // random ±2.5π'],
      ['WithGravity', '0, 220'],
      ['WithColor', 'r, g, b  // random per instance'],
      ['WithLifetime', '2.0'],
      ['WithSize', '5'],
    ],
    perfNote:
      '<b>@WithRotation</b> accumulates _state.angle each frame and replaces the circle render with a rotated square. Each instance picks a random color via its factory.',
    perceptionRadius: 0,
    // Each call returns a NEW class with a freshly randomized color
    makeParticleClass: (_bounds: Bounds) => makeConfettiClass(),
    getInitialVelocity: (spawnSpeed: number) => {
      const angle = randomAngle();
      const speed = rand(60, 160) * spawnSpeed;
      return new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed);
    },
  },

  snow: {
    className: 'SnowParticle',
    primary: '@WithDrag · @WithGravity',
    stack: [
      ['WithFade', ''],
      ['WithDrag', '0.94'],
      ['WithGravity', '0, 45'],
      ['WithColor', '220, 235, 255, 0.9'],
      ['WithLifetime', '6'],
      ['WithSize', '3'],
    ],
    perfNote:
      '<b>@WithDrag</b> applies velocity *= coef^(dt×60) each frame — frame-rate independent damping. Low gravity (45) + drag (0.94) produces realistic flutter.',
    perceptionRadius: 0,
    makeParticleClass: (_bounds: Bounds) => makeSnowClass(),
    getInitialVelocity: (spawnSpeed: number) => {
      const angle = randomAngle();
      const speed = rand(60, 160) * spawnSpeed;
      return new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed);
    },
  },

  bouncer: {
    className: 'BouncerParticle',
    primary: '@WithBounce · @WithRotation',
    stack: [
      ['WithSpeedLimit', '280'],
      ['WithBounce', 'bounds, 0.85'],
      ['WithRotation', 'spin  // random ±1.5π'],
      ['WithGlow', '"rgba(255,210,80,0.6)", 14'],
      ['WithColor', '255, 210, 80'],
      ['WithSize', '6'],
    ],
    perfNote:
      '<b>@WithBounce</b> clamps position to boundary and negates the velocity component scaled by restitution (0.85 = 15% energy loss per bounce). No lifetime — bounces forever.',
    perceptionRadius: 0,
    makeParticleClass: (bounds: Bounds) => makeBounceClass(bounds),
    getInitialVelocity: (spawnSpeed: number) => {
      const angle = randomAngle();
      const speed = rand(60, 160) * spawnSpeed;
      return new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed);
    },
  },

  flock: {
    className: 'FlockParticle',
    primary: '@WithFlocking · @WithWrap',
    stack: [
      ['WithWrap', 'bounds'],
      ['WithSpeedLimit', '200'],
      ['WithFlocking', '90, 28, { sep:2.0, align:1.2, coh:1.0 }'],
      ['WithGlow', '"rgba(80,200,255,.5)", 6'],
      ['WithColor', '80, 200, 255'],
      ['WithSize', '3'],
    ],
    perfNote:
      'QuadTree cuts flock neighbor checks from <b>O(n²)</b> → <b>O(n log n)</b>. At 400 particles: ~160k → ~3.6k comparisons per frame.',
    perceptionRadius: 90,
    makeParticleClass: (bounds: Bounds) => makeFlockClass(bounds),
    getInitialVelocity: (spawnSpeed: number) => {
      const angle = randomAngle();
      const speed = rand(60, 160) * spawnSpeed;
      return new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed);
    },
  },

  constellation: {
    className: 'ConstellationParticle',
    primary: '@WithLinkDraw · @WithAttraction',
    stack: [
      ['WithFade', ''],
      ['WithLinkDraw', '110, "rgba(140,185,255,1)", 0.6'],
      ['WithWrap', 'bounds'],
      ['WithSpeedLimit', '80'],
      ['WithDrag', '0.97'],
      ['WithAttraction', '110, 30, 15'],
      ['WithColor', '200, 220, 255, 0.9'],
      ['WithLifetime', '14'],
      ['WithSize', '2'],
    ],
    perfNote:
      '<b>@WithLinkDraw</b> queries _state.qt during render(). Without the QuadTree, link drawing would be O(n²) per render frame.',
    perceptionRadius: 110,
    makeParticleClass: (bounds: Bounds) => makeConstellationClass(bounds),
    getInitialVelocity: (spawnSpeed: number) => {
      const angle = randomAngle();
      const speed = rand(60, 160) * spawnSpeed;
      return new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed);
    },
  },

  repulsor: {
    className: 'RepulsorParticle',
    primary: '@WithRepulsion',
    stack: [
      ['WithBounce', 'bounds, 0.6'],
      ['WithSpeedLimit', '300'],
      ['WithDrag', '0.95'],
      ['WithRepulsion', '55, 350'],
      ['WithGlow', '"rgba(255,100,180,.6)", 10'],
      ['WithColor', '255, 100, 180'],
      ['WithSize', '4'],
    ],
    perfNote:
      'Repulsion queries only within radius=55px. Dense clusters auto-settle to equilibrium. <b>@WithDrag</b> prevents energy runaway.',
    perceptionRadius: 55,
    makeParticleClass: (bounds: Bounds) => makeRepulsorClass(bounds),
    getInitialVelocity: (spawnSpeed: number) => {
      const angle = randomAngle();
      const speed = rand(60, 160) * spawnSpeed;
      return new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed);
    },
  },

  orbital: {
    className: 'OrbitalParticle',
    primary: '@WithAttraction + @WithRepulsion',
    stack: [
      ['WithBounce', 'bounds, 0.5'],
      ['WithSpeedLimit', '250'],
      ['WithDrag', '0.96'],
      ['WithRepulsion', '40, 600'],
      ['WithAttraction', '140, 20, 10'],
      ['WithTrail', '10, "rgba(120,255,180,.1)"'],
      ['WithGlow', '"rgba(120,255,180,.5)", 8'],
      ['WithColor', '120, 255, 180'],
      ['WithSize', '3'],
    ],
    perfNote:
      'Attraction + Repulsion → natural equilibrium distance (~70px). The QuadTree makes it feasible to run <b>both</b> spatial queries every frame.',
    perceptionRadius: 140,
    makeParticleClass: (bounds: Bounds) => makeOrbitalClass(bounds),
    getInitialVelocity: (spawnSpeed: number) => {
      const angle = randomAngle();
      const speed = rand(60, 160) * spawnSpeed;
      return new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed);
    },
  },
};

/**
 * Defines the ParticleMode type by extracting the keys from the MODES object.
 *
 * - `typeof MODES` gets the type of the MODES object.
 * - `keyof` gets a union of all the keys:
 *    - ('spark' | 'bubble' | 'confetti' | 'snow' | 'bouncer' | 'flock' | 'constellation' | 'repulsor' | 'orbital')
 */
export type ParticleMode = keyof typeof MODES;

export default MODES;
