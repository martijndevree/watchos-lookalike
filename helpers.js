/**
 * Get a random int from a given interval, including min and max.
 *
 * Courtesy of https://stackoverflow.com/a/7228322/9413490
 *
 * @param min
 *   The minimum number.
 * @param max
 *   The maximum number.
 * @returns {number}
 *   The randomly generated number.
 */
export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Returns a random HSL color value within a certain range.
 *
 * Courtesy of https://stackoverflow.com/a/43195379/9413490
 *
 * @returns {string}
 *   The HSL color value.
 */
export function getRandomColor(){
  const [hue, saturation, lightness] = [
    360 * Math.random(),
    randomIntFromInterval(60, 70),
    randomIntFromInterval(60, 70),
  ];
  return `
    hsl(${hue}, ${saturation}%, ${lightness}%)
  `;
}

/**
 * Clamp a numeric value between a min and max.
 *
 * Courtesy of https://stackoverflow.com/a/11409944/9413490
 *
 * @param val
 *   The value that should be clamped.
 * @param min
 *   The minimum value.
 * @param max
 *   The maximum value.
 * @returns {number}
 *   The clamped value.
 */
export function clampValue(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

/**
 * Returns a transform origin value based on a given row length, bubble index,
 * and whether the bubble is moving up or down. The X-axis origin offset makes
 * it look like the bubbles are pulled towards the center of the watch face.
 *
 * @param rowLength
 *   The total number of items in the current row.
 * @param bubbleIndex
 *   The index of the current bubble element.
 * @param isMovingUp
 *   Whether the bubble is moving up or down.
 * @returns {string}
 *   The transform origin value.
 */
export function getBubbleTransformOrigin(rowLength, bubbleIndex, isMovingUp) {
  const yAxisOrigin = isMovingUp ? '100%' : '0%';
  if (rowLength === 3) {
    switch (bubbleIndex) {
      case 0:
        return `65% ${yAxisOrigin}`;
      case 1:
        return `50% ${yAxisOrigin}`;
      case 2:
        return `35% ${yAxisOrigin}`;
    }
  } else {
    switch (bubbleIndex) {
      case 0:
        return `65% ${yAxisOrigin}`;
      case 1:
        return `55% ${yAxisOrigin}`;
      case 2:
        return `45% ${yAxisOrigin}`;
      case 3:
        return `35% ${yAxisOrigin}`;
    }
  }

  return '';
}
