
/**
 * This will get the next zero-based index based on the length of an array
 *    by default it looks forward but if back===true looks backwards
 *    if going forward past the end it cycles back to zero
 * 
 * @param length 
 * @param current 
 * @param back 
 * @returns 
 */
export function getNextIndex(length: number, current: number, back: boolean = false): number {
  if (back === false) {
    return current === length - 1 ? 0 : current + 1;
  } else {
    return current === 0 ? length - 1 : current - 1;
  }
}
