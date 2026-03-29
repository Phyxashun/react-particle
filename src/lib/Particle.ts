/* eslint-disable @typescript-eslint/no-explicit-any */
import type QuadTree from './QuadTree';
import Vector from './Vector';

/**
 * Per-instance state bag shared across all decorator layers.
 * Because @decorators compose through prototype chains rather than
 * holding references to each other, cross-decorator communication
 * (e.g. WithFade reading WithLifetime's age) flows through here.
 */
export interface ParticleState {
  age?: number;
  maxAge?: number;
  angle?: number;
  history?: Vector[];
  radius?: number;
  quadtree?: QuadTree<Particle>; // current frame's tree, set by update()
  queryBuffer?: Particle[]; // pre-allocated — never reallocated after WithSize init
  color?: string;
  [key: string]: unknown;
}

/**
 * Base Particle — physics only.
 * position, velocity, acceleration + Euler integration.
 * Every other characteristic is applied via a decorator.
 */
export default class Particle {
  _state: ParticleState = {};

  public position: Vector;
  public velocity: Vector;
  public acceleration: Vector;

  constructor(p: Vector, v: Vector, a: Vector = Vector.zero()) {
    this.position = p;
    this.velocity = v;
    this.acceleration = a;
  }

  get isAlive(): boolean {
    return true;
  }

  /**
   * Integrate physics.
   * The quadtree built by ParticleSystem is passed in each frame
   * so spatial decorators can query neighbors without O(n²) iteration.
   */
  update(dt: number, quadtree?: QuadTree<Particle>): void {
    if (quadtree) this._state.quadtree = quadtree;
    this.velocity = this.velocity.add(this.acceleration.scale(dt));
    this.position = this.position.add(this.velocity.scale(dt));
    this.acceleration = Vector.zero();
  }

  render(ctx: CanvasRenderingContext2D): void {
    const radius = this._state.radius ?? 4;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Convenience type used by all decorator factories. */
export type ParticleCtor<T extends Particle = Particle> = new (...args: any[]) => T;
