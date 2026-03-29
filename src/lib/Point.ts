import Particle from './Particle';
import Vector from './Vector';

export default class Point<T extends Particle> {
  public x: number;
  public y: number;
  public p: T;

  constructor({ x, y }: Vector, p: T) {
    this.x = x;
    this.y = y;
    this.p = p;
  }
}
