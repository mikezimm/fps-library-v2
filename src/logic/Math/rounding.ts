

/**
 * This was created to pass in screen ratios like 3440 / 1440 and get rounded value for comparison.
 * You have to adjust the decimals depending on if it's landscape or portrait to be able to do a comparison.
 * That way you can group screen sizes in buckets like 16 x 9 when the actual ratio is fractionally different
 * @param num 
 */

export function roundRatio( num: number ) {
  if ( num < 1 ) {
    return round3decimals( num );
  } else {
    return round1decimals( num );
  }
}

export function round5decimals( num: number ) {
  return Math.round(num * 100000) / 100000;
}
export function round4decimals( num: number ) {
  return Math.round(num * 10000) / 10000;
}
export function round3decimals( num: number ) {
  return Math.round(num * 1000) / 1000;
}
export function round2decimals( num: number ) {
  return Math.round(num * 100) / 100;
}
export function round1decimals( num: number ) {
  return Math.round(num * 10) / 10;
}
