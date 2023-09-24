import { clampValue, getBubbleTranslateXValue, getRandomColor } from './helpers.js';

let body;
let watchFace;

// The number of bubble elements that should be generated.
const bubbleElements = new Array(52);

// Observer thresholds - will be set programmatically.
const observerThresholds = [];

for (let i = 0; i <= 100; i++) {
  observerThresholds.push(i / 100);
}

const observerOptions = {
  root: document.querySelector("#watchFace"),
  rootMargin: '0px',
  threshold: observerThresholds,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// The margin around the watch face.
const gutterSize = 20;

/**
 * Add the bubble elements programmatically,
 * distributed over rows of alternately 3 and 4 items.
 */
function addBubbles() {
  let itemsPerRow = 3;

  while (bubbleElements.length) {
    // Subtract the row items from the total number of items.
    const rowItems = bubbleElements.splice(0, itemsPerRow);

    // Create a row, and add it to the list of observed elements.
    const rowElement = document.createElement('div');
    rowElement.className = `row row--${itemsPerRow}`;
    observer.observe(rowElement);

    // Add the bubbles to the row.
    for (let i = 0; i < rowItems.length; i++) {
      const bubbleElement = document.createElement('div');
      bubbleElement.className = 'bubble';
      bubbleElement.style.background = getRandomColor();
      rowElement.appendChild(bubbleElement);
    }

    // Set the number of row items for the next row.
    itemsPerRow = itemsPerRow === 3 ? 4 : 3;
    watchFace.appendChild(rowElement);
  }
}

/**
 * Calculate the size of the watch face based on the viewport width or height.
 */
function calculateWatchFaceSize() {
  const [bodyWidth, bodyHeight] = [body.offsetWidth, body.offsetHeight];
  const marginAroundWatchFace = gutterSize * 2;

  // Check if the viewport has a narrower aspect ratio than the watch face.
  const isNarrowBody = bodyWidth / bodyHeight < 41 / 45;

  // Set watch face sizes accordingly.
  if (isNarrowBody) {
    watchFace.style.width = `${bodyWidth - marginAroundWatchFace}px`;
    watchFace.style.height = `${((bodyWidth / 41) * 45) - marginAroundWatchFace}px`;
  } else {
    watchFace.style.width = `${((bodyHeight / 45) * 41) - marginAroundWatchFace}px`;
    watchFace.style.height = `${bodyHeight - marginAroundWatchFace}px`;
  }
}

/**
 * Callback function for observer.
 *
 * @param entries
 *   The observed elements.
 */
function observerCallback(entries) {
  entries.forEach((entry) => {
    const bubbles = entry.target.querySelectorAll('.bubble');
    const { top: elementTop } = entry.boundingClientRect;
    const { top: rootTop } = entry.rootBounds;

    // Get the ratio that tells us how much of the element is intersecting.
    const ratio = entry.intersectionRatio;

    // Set the scale of the bubbles proportionally to the ratio.
    const scaleValue = clampValue(ratio - (0.25 * (1 - ratio)), 0, 1);

    bubbles.forEach((bubble, index) => {
      if (!entry.isIntersecting) {
        if (!!bubble.style.transform) bubble.style.transform = '';
        return;
      }

      // Get a `translateX` value to slightly offset the bubble
      // based on the index of the bubble element.
      const translate = getBubbleTranslateXValue(ratio, bubbles.length, index);
      bubble.style.transform = `scale(${scaleValue}) ${translate}`;

      // Set the transform origin based on whether the element moves up or down.
      bubble.style.transformOrigin = elementTop < rootTop ? 'bottom center' : 'top center';
    });
  });
}

window.addEventListener('resize', () => {
  calculateWatchFaceSize();
});

document.addEventListener('DOMContentLoaded', () => {
  body = document.querySelector('body');
  watchFace = document.querySelector('#watchFace');

  addBubbles();
  calculateWatchFaceSize();
});
