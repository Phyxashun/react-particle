/**
 * Returns a random integer between min and max.
 * If only one argument is provided, it returns a number between 0 and that argument.
 *
 * @param min - The minimum value (or maximum if only one argument is given)
 * @param max - The maximum value (optional)
 * @returns A random integer within the specified range
 */
export const Random = (min: number, max?: number): number => {
  // If max is not present, max = min and min = 0
  const start = max === undefined ? 0 : min;
  const end = max === undefined ? min : max;

  // Ensure inputs are valid numbers
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    throw new Error('Parameters must be finite numbers.');
  }

  // Ensure start is always the smaller number
  const actualMin = Math.min(start, end);
  const actualMax = Math.max(start, end);

  // Inclusive of both min and max
  return Math.floor(Math.random() * (actualMax - actualMin + 1)) + actualMin;
};
