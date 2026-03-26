import Vector from "./Vector";
import Particle from "./Particle";

export default class Point {
  public position: Vector;
  public p: Particle;

  constructor(position: Vector, p: Particle) {
    this.position = position;
    this.p = p;
  }
}
