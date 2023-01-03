

// Function based on this post:  https://codereview.stackexchange.com/a/56627

/**
 * thinArray will take an array of elements and
 *    return 'relatively' evenly spaced elements at for total of 'count' items.
 *    NOTE that the spacing may not seem very even when the length is smaller
 *
 * example:  array = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], count === 2:
 *  return:  [ 0, 9 ]
 *  if count === 3:  return:  [0,4,9]
 *  if count === 4:  return:  [0,2,5,9]
 *
 * FRINGE CASE:
 *    Added pushEven for when 1 < ratio < 2 where it would return [0] instead of every other element.
      As an example if length === 99 and count === 51, it would return [0] but of count were 50 it would give every other item.
      So now, if the ratio of length / count < 2, it will just return the first, every other one and the last.
      So if you had an array of length 99 and asked for 98 back, it would only give you an array with 50 items... 0,2,4,6,8,10..., 98 so every other item.
      This means in this case, you could get far less items back than the count, but then the logic would not have to decide which ones to skip.
 *
 *
 * @param array
 * @param count
 * @returns
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function thinArray( array: any[], count: number = 2): any[] {

  const originalLength = array.length;

  if (originalLength === 0) {
      return [];

  } else if (originalLength <= count) {
      return array;

  } else if ( count === 2 ) {
    return [ array[0], array[ originalLength - 1] ];

  }

  const targetSections = count -1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output: any[]= [];
  const ratio = originalLength / targetSections;

  array.map( ( e, i ) => {
    const iPush = Math.floor(output.length * ( ratio ) -1);

    // Added pushEven for when 1 < ratio < 2 where it would return [0] instead of every other element.
    // As an example if length === 99 and count === 51, it would return [0] but of count were 50 it would give every other item.
    const isEven = (i % 2) === 0 ? true : false;
    const pushEven = ratio < 2 && isEven === true ? true : false;

    if ( iPush === i || i === 0 || i === array.length || pushEven === true ) {
      output.push( e );
    }
  });

  return output;

}

/**
 * getSpreadIndexes will take the length (of an array) and
 *    return evenly spaced zero-based indexes for total of 'count' indexes.
 *
 * example:  array = [ A, B, C, D, E, F, G, H, I, J,  ] ( length === 10 ), count === 2:
 *  return:  [ 0, 9 ]                     =>>> if you map these indexes, the result would be:  [ A, J ]
 *  if count === 3:  return:  [0,4,9]     =>>> if you map these indexes, the result would be:  [  A, E, J ]
 *  if count === 4:  return:  [0,2,5,9]   =>>> if you map these indexes, the result would be:  [  A, C, F, J ]
 *
 * NOTE FRINGE CASE MENTIONED IN thinArray function where the 1 < ( length / count ) < 2
 *  You may not get the total count of items back in that case.  but every other item instead.
 *
 * @param array
 * @param count
 * @returns
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSpreadIndexes( arrayLength: number,  count: number ): number[] {

  if (arrayLength === 0) { return []; }

  const indexes = Array.from({ length: arrayLength }, (_, i) => i );

  if ( arrayLength <= count) { 
    return indexes; 

  } else {
    const keepIndexes = thinArray( indexes, count );
    return keepIndexes;
  }

}


/**
 * The following commented code is what I tested in code pen for reference and testing if needed
 */

// const arrLength = 99;

// const numbers = Array.from({ length: arrLength }, (_, i) => i );

// function thinArray(array, count ) {

//   const originalLength = array.length;

//   if (originalLength === 0) {
//       console.log('first if')
//       return [];
//   } else if (originalLength <= count) {
//       console.log('first else')
//       return array;
//   } else if ( count === 2 ) {
//     console.log('second else')
//     return [ array[0], array[ originalLength - 1] ];
//   }
 
//   const targetSections = count -1;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const output= [];
//   const ratio = originalLength / targetSections;
//   console.log('test',targetSections);
//   array.map( ( e, i ) => {
//     const iPush = Math.floor(output.length * ( ratio ) -1);
//     const isEven = (i % 2) == 0 ? true : false;
//     const iPushEven = ratio < 2 && isEven === true ? true : false;
//     if ( iPush === i || i === 0 || i === array.length || iPushEven === true ) { 
//       output.push( e );
//     }
//     console.log( 'iPush',iPushEven, i, iPush, output )
//   });
//   console.log( 'ratio',ratio )
//   return output;
// }

// const base = 51;

// const result = thinArray( numbers,base)

// console.log( `${( arrLength + 1 )} / ${base-1}`, ( arrLength + 1 ) / ( base-1 ) )
// console.log(`${( arrLength + 1 )} / ${base}`, ( arrLength + 1 ) / base)
// console.log( `${( arrLength + 1 )} / ${base+1}`, ( arrLength + 1 ) / ( base + 1 ) )
// console.log( result )
