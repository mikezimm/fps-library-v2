
/***
 *    .88b  d88.  .d8b.  db   dD d88888b      d888888b d8888b. 
 *    88'YbdP`88 d8' `8b 88 ,8P' 88'            `88'   88  `8D 
 *    88  88  88 88ooo88 88,8P   88ooooo         88    88   88 
 *    88  88  88 88~~~88 88`8b   88~~~~~         88    88   88 
 *    88  88  88 88   88 88 `88. 88.            .88.   88  .8D 
 *    YP  YP  YP YP   YP YP   YD Y88888P      Y888888P Y8888D' 
 *                                                             
 *                                                             
 */

    //https://stackoverflow.com/a/1349426
    export function makeid(length: number): string {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

/***
 *    d888888b .d8888.       d888b  db    db d888888b d8888b. 
 *      `88'   88'  YP      88' Y8b 88    88   `88'   88  `8D 
 *       88    `8bo.        88      88    88    88    88   88 
 *       88      `Y8b.      88  ooo 88    88    88    88   88 
 *      .88.   db   8D      88. ~8~ 88b  d88   .88.   88  .8D 
 *    Y888888P `8888Y'       Y888P  ~Y8888P' Y888888P Y8888D' 
 *                                                            
 *                                                            
 */
 
    /**
     * Regex courtesy of:  https://stackoverflow.com/a/13653180/4210807
     * 
     * NOTES:  
     *    ^ at the beginning denotes the test string must START with that:  ^ asserts position at start of the string
     *    ^ at the beginning denotes the test string must END with that:  $ asserts position at the end of the string, or before the line terminator right at the end of the string (if any)
     *    [0-9a-f]{8} - 8 characters between 0-9 and a-f
     *    [0-9a-f]{4} - 4 characters between 0-9 and a-f
     *    [1-5][0-9a-f]{3} - one character between 1-5 and 3 between 0-9 and a-f
     *    [1-5][0-9a-f]{3} - one character between 1-5 and 3 between 0-9 and a-f
     *    [0-9a-f]{12} - 12 characters between 0-9 and a-f
     * 
     */

    export const ValidGuidRegexExact = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    export const  ValidGuidRegexStart = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
    export const  ValidGuidRegexEnd = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    export const  ValidGuidRegexContains = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;

    export const ValidGuidRegexExactGlobal = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/ig;
    export const  ValidGuidRegexStartGlobal = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/ig;
    export const  ValidGuidRegexEndGlobal = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/ig;
    export const  ValidGuidRegexContainsGlobal = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/ig;

 export type IIsGuidTestLocation = 'exact' | 'start' | 'end' | 'contains';

export function isGuid( input: any, compareType : IIsGuidTestLocation = 'exact'  ): boolean {  //c456c008-5cc7-455e-90dc-ebb67d4496ec

  const testMe: string = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';

  let result : boolean = false;

  if ( testMe === undefined || testMe === null || testMe.length < 22 ) {
      result = false;

  } else {
    if ( compareType === 'exact' ) {
        result = ValidGuidRegexExact.exec(testMe) ? true : false;

    } else if ( compareType === 'start' ) {
        result = ValidGuidRegexStart.exec(testMe) ? true : false;

    } else if ( compareType === 'end' ) {
        result = ValidGuidRegexEnd.exec(testMe) ? true : false;

    } else if ( compareType === 'contains' ) {
        result = ValidGuidRegexContains.exec(testMe) ? true : false;

    }
  }

  return result;  

}

/**
 * getGuidsFromString is similar to isGuid except it returns the guid(s) found in the string
 * 
 * https://regex101.com/
 * 
 * Returns null if no guid is found.
 * Returns array of string containing the first guid found in the string ( g modifier: global. All matches (don't return after first match) )
 * 
 * @param testMe 
 * @param compareType 
 */
export function getGuidsFromString( input: any, compareType : IIsGuidTestLocation = 'exact'  ): string {  //c456c008-5cc7-455e-90dc-ebb67d4496ec

  const testMe: string = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';

    let result : string[] | any = null;
  
    if ( testMe === undefined || testMe === null || testMe.length < 22 ) {
        result = null;
  
    } else {
      if ( compareType === 'exact' ) {
          result = ValidGuidRegexExactGlobal.exec(testMe);
  
      } else if ( compareType === 'start' ) {
          result = ValidGuidRegexStartGlobal.exec(testMe);
  
      } else if ( compareType === 'end' ) {
          result = ValidGuidRegexEndGlobal.exec(testMe);
  
      } else if ( compareType === 'contains' ) {
          result = ValidGuidRegexContainsGlobal.exec(testMe);
  
      }
    }
  
    return result;  
  
  }
