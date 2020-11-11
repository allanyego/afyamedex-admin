/**
 * Delay a certain amount of time
 * @param {Number} delay miliseconds to delay
 */
export default function sleep(delay = 100) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
