import Point from "./Point";

/**
 * Axis-aligned bounding box stored as center + half-dimensions.
 * Using half-extents instead of (x, y, w, h) makes intersection
 * and containment checks branch-free.
 */
export default class Rectangle {
  public cx: number;
  public cy: number;
  public hw: number;
  public hh: number;

  constructor(
    cx: number, // center x
    cy: number, // center y
    hw: number, // half-width
    hh: number, // half-height
  ) {
    this.cx = cx;
    this.cy = cy;
    this.hw = hw;
    this.hh = hh;
  }

  public contains(point: Point): boolean {
    const pt = point.position;
    return (
      pt.x >= this.cx - this.hw &&
      pt.x < this.cx + this.hw &&
      pt.y >= this.cy - this.hh &&
      pt.y < this.cy + this.hh
    );
  }

  public intersects(other: Rectangle): boolean {
    return !(
      other.cx - other.hw >= this.cx + this.hw ||
      other.cx + other.hw <= this.cx - this.hw ||
      other.cy - other.hh >= this.cy + this.hh ||
      other.cy + other.hh <= this.cy - this.hh
    );
  }

  /** Square query region centered at (cx, cy) with half-side r. */
  static circle(cx: number, cy: number, r: number): Rectangle {
    return new Rectangle(cx, cy, r, r);
  }
}
