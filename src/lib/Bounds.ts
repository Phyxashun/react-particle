export default class Bounds<T extends { x: number; y: number }> {
  public x: number; // Center X
  public y: number; // Center Y
  public h: number;
  public w: number;

  constructor(
    h: number,
    w: number,
    { x, y }: { x: number | undefined; y: number | undefined } = { x: undefined, y: undefined }
  ) {
    this.h = h;
    this.w = w;

    if (x && y) {
      this.x = x + w / 2;
      this.y = y + h / 2;
    } else {
      this.x = w / 2;
      this.y = h / 2;
    }
  }

  // Check if a (x, y) coordinate is within these bounds
  public contains(p: T): boolean {
    return (
      p.x >= this.x - this.w / 2 &&
      p.x <= this.x + this.w / 2 &&
      p.y >= this.y - this.h / 2 &&
      p.y <= this.y + this.h / 2
    );
  }

  // Check if another Bounds object overlaps with this one
  public intersects(o: Bounds<T>): boolean {
    return !(
      o.x - o.w / 2 > this.x + this.w / 2 ||
      o.x + o.w / 2 < this.x - this.w / 2 ||
      o.y - o.h / 2 > this.y + this.h / 2 ||
      o.y + o.h / 2 < this.y - this.h / 2
    );
  }
}
