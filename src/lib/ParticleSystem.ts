// src/lib/ParticleSystem.ts
import Particle from "./Particle";
import type Bounds from "./Bounds";
import QuadTree from "./QuadTree";
import Rectangle from "./Rectangle";
import Point from "./Point";

export default class ParticleSystem {
  private particles: Particle[] = [];
  private quadtree: QuadTree;
  public bounds: Bounds;

  constructor(bounds: Bounds) {
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

  resize(bounds: Bounds): void {
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

  get quadTree(): QuadTree {
    return this.quadtree;
  }

  get all(): Particle[] {
    return this.particles;
  }

  private makeTree(bounds: Bounds): QuadTree {
    const w = bounds.width / 2;
    const h = bounds.height / 2;
    const rect = new Rectangle(w, h, w, h);
    return new QuadTree(rect, 8, 8);
  }
}
