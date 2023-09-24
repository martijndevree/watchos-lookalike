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
 * Returns a `translateX` value for a given bubble element index.
 *
 * @param ratio
 *   The `intersectionRatio` of the current row.
 * @param rowLength
 *   The total number of items in the current row.
 * @param bubbleIndex
 *   The index of the current bubble element.
 * @returns {string}
 *   The `translateX` value.
 */
export function getBubbleTranslateXValue(ratio, rowLength, bubbleIndex) {
  let translateValue = '';
  if (rowLength === 3) {
    switch (bubbleIndex) {
      case 0:
        translateValue = `translateX(${30 - (ratio * 30)}%)`;
        break;
      case 2:
        translateValue = `translateX(-${30 - (ratio * 30)}%)`;
        break;
    }
  } else {
    switch (bubbleIndex) {
      case 0:
        translateValue = `translateX(${35 - (ratio * 35)}%)`;
        break;
      case 1:
        translateValue = `translateX(${25 - (ratio * 25)}%)`;
        break;
      case 2:
        translateValue = `translateX(-${25 - (ratio * 25)}%)`;
        break;
      default:
        translateValue = `translateX(-${35 - (ratio * 35)}%)`;
        break;
    }
  }

  return translateValue;
}
