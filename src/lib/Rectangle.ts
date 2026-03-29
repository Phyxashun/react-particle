/**
 * Axis-aligned bounding box stored as center + half-dimensions.
 * Using half-extents instead of (x, y, w, h) makes intersection
 * and containment checks branch-free.
 */
export default class Rectangle<T extends { x: number; y: number }> {
  public cx: number;
  public cy: number;
  public hw: number;
  public hh: number;

  constructor(
    cx: number, // center x
    cy: number, // center y
    hw: number, // half-width
    hh: number // half-height
  ) {
    this.cx = cx;
    this.cy = cy;
    this.hw = hw;
    this.hh = hh;
  }

  public contains({ x, y }: T): boolean {
    return x >= this.cx - this.hw && x < this.cx + this.hw && y >= this.cy - this.hh && y < this.cy + this.hh;
  }

  public intersects(other: Rectangle<T>): boolean {
    return !(
      other.cx - other.hw >= this.cx + this.hw ||
      other.cx + other.hw <= this.cx - this.hw ||
      other.cy - other.hh >= this.cy + this.hh ||
      other.cy + other.hh <= this.cy - this.hh
    );
  }

  /** Square query region centered at (cx, cy) with half-side r. */
  static circle(cx: number, cy: number, r: number): Rectangle<{ x: number; y: number }> {
    return new Rectangle<{ x: number; y: number }>(cx, cy, r, r);
  }
}
