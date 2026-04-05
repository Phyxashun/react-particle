// src/lib/ParticleSystem.ts
import type Bounds from './Bounds';
import Particle from './Particle';
import Point from './Point';
import QuadTree from './QuadTree';
import { Random } from './Random';
import Rectangle from './Rectangle';
import Vector from './Vector';

export default class ParticleSystem {
  private particles: Particle[] = [];
  private quadtree: QuadTree<Particle>;
  public bounds: Bounds<{ x: number; y: number }>;

  constructor(bounds: Bounds<{ x: number; y: number }>) {
    this.bounds = bounds;
    this.quadtree = this.makeTree(this.bounds);
  }

  add(particle: Particle): this {
    this.particles.push(particle);
    return this;
  }

  get randX() {
    return Random(0, this.bounds.w);
  }

  get randY() {
    return Random(0, this.bounds.h);
  }

  addRandom(): this {
    // Get random position
    const p = new Vector(this.randX, this.randY);
    // Get random velocity
    const v = new Vector(this.randX, this.randY);
    // Set acceleration to zero
    const a = new Vector(); // zero Vector
    // Create new particle with random parameters
    const particle = new Particle(p, v, a);
    // Add particle to the system
    this.particles.push(particle);
    return this;
  }

  get count(): number {
    return this.particles.length;
  }

  clear(): void {
    this.particles = [];
  }

  resize(bounds: Bounds<{ x: number; y: number }>): void {
    this.bounds = bounds;
    this.quadtree = this.makeTree(bounds);
  }

  update(dt: number): void {
    this.quadtree.clear();
    for (const particle of this.particles) {
      // Create a new Point object for the QuadTree
      const point = new Point(particle.position, particle);
      this.quadtree.insert(point);
    }

    for (const particle of this.particles) {
      particle.update(dt, this.quadtree);
    }

    this.particles = this.particles.filter((particle) => particle.isAlive);
  }

  render(ctx: CanvasRenderingContext2D, showQt = false, showLinks = true): void {
    if (showQt) this.quadtree.draw(ctx);
    for (const particle of this.particles) {
      // Stamp showLinks onto _state each frame so WithLinkDraw can read it
      // without needing changes to the Particle.render() signature.
      particle._state.showLinks = showLinks;
      particle.render(ctx);
    }
  }

  get quadTree(): QuadTree<Particle> {
    return this.quadtree;
  }

  get all(): Particle[] {
    return this.particles;
  }

  private makeTree(bounds: Bounds<{ x: number; y: number }>): QuadTree<Particle> {
    const w = bounds.w / 2;
    const h = bounds.h / 2;
    const rect = new Rectangle(w, h, w, h);
    return new QuadTree(rect, 4, 32);
  }
}
