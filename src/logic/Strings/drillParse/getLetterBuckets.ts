import { GetFirstWord, GetLastWord } from "./getWords";


export const LetterGroups5: string[] = [ 'abcde', 'fghijk', 'lmnop', 'qrst', 'uvwxyz'];
export const LetterGroups5Label: string[] = [ 'A-E', 'F-K', 'L-P', 'Q-T', 'U-Z'];

/**
 * Added for https://github.com/mikezimm/drilldown7/issues/140, Thanks McDKirra for the idea!  BM
 * @param str 
 * @param firstOrLast 
 * @returns 
 */

export function getLetterBuckets( str: string, firstOrLast: 'FirstInFirst5Buckets' | 'FirstInLast5Buckets', ): string {

  let bucket: string = 'Unknown';
  const groups: number = parseInt( firstOrLast );
  
  if ( !str || groups !== 5) {
    return bucket;

  } else {

    let letter = '';
    if ( firstOrLast === 'FirstInFirst5Buckets' ) {
      letter = GetFirstWord( str.trim(), false, true, false);

    } else if ( firstOrLast === 'FirstInLast5Buckets' ) {
      letter = GetLastWord( str.trim(), false, true, false);
    }

    const UseLetters = groups === 5 ? LetterGroups5 : [];
    const UseLabels = groups === 5 ? LetterGroups5Label : [];
    UseLetters.map( ( group, index ) => {
      if ( group.indexOf( letter ) > -1 ) { bucket = UseLabels[ index ] ; }
    });
    return bucket;
  }

}