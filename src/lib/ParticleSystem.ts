// src/lib/ParticleSystem.ts
import type Bounds from './Bounds';
import Particle from './Particle';
import Point from './Point';
import QuadTree from './QuadTree';
import Rectangle from './Rectangle';

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

  render(ctx: CanvasRenderingContext2D, showQt = false): void {
    if (showQt) this.quadtree.draw(ctx);
    for (const particle of this.particles) particle.render(ctx);
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
    return new QuadTree(rect, 24, 12);
  }
}
