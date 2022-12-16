
/***
 *    .d8888. d888888b d8888b. d888888b d8b   db  d888b  .d8888. 
 *    88'  YP `~~88~~' 88  `8D   `88'   888o  88 88' Y8b 88'  YP 
 *    `8bo.      88    88oobY'    88    88V8o 88 88      `8bo.   
 *      `Y8b.    88    88`8b      88    88 V8o88 88  ooo   `Y8b. 
 *    db   8D    88    88 `88.   .88.   88  V888 88. ~8~ db   8D 
 *    `8888Y'    YP    88   YD Y888888P VP   V8P  Y888P  `8888Y' 
 *                                                               
 *                                                               

import { cleanSPListURL, cleanURL, encodeDecodeString, } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';
import { makeid, isGuidgetStringArrayFromString, cleanEmptyElementsFromString } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';
import { camelToSentanceCase, camelize, randomizeCase, upperFirstLetter, lowerFirstLetter } from '@mikezimm/npmfunctions/dist/Services/Strings/stringCase';

*/

import { ISeriesSort } from '../Arrays/sorting/Interfaces';
import { sortNumberArray } from '../Arrays/sorting/numbers';
import { sortStringArray } from '../Arrays/sorting/strings';


/***
 *     d888b  d88888b d888888b      .d8888. d888888b d8888b. d888888b d8b   db  d888b        .d8b.  d8888b. d8888b.  .d8b.  db    db 
 *    88' Y8b 88'     `~~88~~'      88'  YP `~~88~~' 88  `8D   `88'   888o  88 88' Y8b      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 
 *    88      88ooooo    88         `8bo.      88    88oobY'    88    88V8o 88 88           88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  
 *    88  ooo 88~~~~~    88           `Y8b.    88    88`8b      88    88 V8o88 88  ooo      88~~~88 88`8b   88`8b   88~~~88    88    
 *    88. ~8~ 88.        88         db   8D    88    88 `88.   .88.   88  V888 88. ~8~      88   88 88 `88. 88 `88. 88   88    88    
 *     Y888P  Y88888P    YP         `8888Y'    YP    88   YD Y888888P VP   V8P  Y888P       YP   YP 88   YD 88   YD YP   YP    YP    
 *                    
 *                    
 *    d88888b d8888b.  .d88b.  .88b  d88.      .d8888. d888888b d8888b. d888888b d8b   db  d888b                                     
 *    88'     88  `8D .8P  Y8. 88'YbdP`88      88'  YP `~~88~~' 88  `8D   `88'   888o  88 88' Y8b                                    
 *    88ooo   88oobY' 88    88 88  88  88      `8bo.      88    88oobY'    88    88V8o 88 88                                         
 *    88~~~   88`8b   88    88 88  88  88        `Y8b.    88    88`8b      88    88 V8o88 88  ooo                                    
 *    88      88 `88. `8b  d8' 88  88  88      db   8D    88    88 `88.   .88.   88  V888 88. ~8~                                    
 *    YP      88   YD  `Y88P'  YP  YP  YP      `8888Y'    YP    88   YD Y888888P VP   V8P  Y888P                                     
 *                    
 *                    
 */
/** was: cleanProjEditOptions from TrackMyTime7
 * This function takes a string with ;, converts to array of strings and removes empty elements (like if ; is at the end.)
 * 
 * example input:   ";test;this;string;;now;"
 * example result:  ['test','this','string','now']
 * 
 * @param str
 * 
 * 
 * @param delim - exactly what you pass or 
 *  use delim = ',or;' || ';or,' to clean up string property pane values (uses 2 delimiters)
 * @param trim - default = false.  true will just remove any leading or trailing spaces from string value
 */

// 2022-12-12:  Verify all other web parts can handle returning empty string instead of null.
// Testing indicated that !return === true when return === null but !return === false when return === []

export function getStringArrayFromString ( input : any, delim: string, removeEmpty: boolean, sort: 'asc' | 'dec' | null, trim: boolean = false ) : string[] | null {

  let str: string = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';

    if (str == null ) { return null; }
    else if (  delim == null || delim == '' ) { return [ str ]; }
  
    if ( delim === ',or;' || delim === ';or,' ) {
        str = str.replace(/;/g,',');
        delim = ',';
    }

    let arr : string[] = str.split( delim );

    if ( trim === true ) {
        arr.map( (s, index) => {
            arr[index] = s.trim();
        });
    }

    arr = sortStringArray( arr, sort );

    let finalStringArray : string[] = [];

    if ( removeEmpty === true ) {
        //Found here:  https://github.com/mikezimm/generic-solution/issues/156
        //Was returning array with empty strings "" before.  This also filters those out.
        //https://www.samanthaming.com/pictorials/how-to-remove-all-falsy-values-from-an-array/#_3-filter
        finalStringArray = arr.filter( (el) => {
          return !!el;
        });
    } else {
        finalStringArray = arr;
    }

    return finalStringArray;
  
}

export function getNumberArrayFromString( input : string, delim: string, removeEmpty: boolean, removeZeros: boolean, order: ISeriesSort , def: any = null ) : number[] | null {

  const stringArray: string[] = typeof input !== 'string' ? [] : input.split( delim );

  let numberArray : number[] = [];
  
  if ( stringArray && stringArray.length > 0 ) {
    stringArray.map(str => {
      if ( removeEmpty === true && str.trim() === '' ) { }
      else {
        const strNum =Number(str);
        if ( removeZeros === true && strNum === 0 ) { }
        else {
          numberArray.push( strNum );
        }
      }
    });
  }

  numberArray = sortNumberArray( numberArray, order );

  return numberArray;

}

/***
 *     .o88b. db      d88888b  .d8b.  d8b   db      d88888b .88b  d88. d8888b. d888888b db    db      d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b .d8888. 
 *    d8P  Y8 88      88'     d8' `8b 888o  88      88'     88'YbdP`88 88  `8D `~~88~~' `8b  d8'      88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 88'  YP 
 *    8P      88      88ooooo 88ooo88 88V8o 88      88ooooo 88  88  88 88oodD'    88     `8bd8'       88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    `8bo.   
 *    8b      88      88~~~~~ 88~~~88 88 V8o88      88~~~~~ 88  88  88 88~~~      88       88         88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88      `Y8b. 
 *    Y8b  d8 88booo. 88.     88   88 88  V888      88.     88  88  88 88         88       88         88.     88booo. 88.     88  88  88 88.     88  V888    88    db   8D 
 *     `Y88P' Y88888P Y88888P YP   YP VP   V8P      Y88888P YP  YP  YP 88         YP       YP         Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    `8888Y' 
 *                                                          
 *                                                          
 *    d88888b d8888b.  .d88b.  .88b  d88.      .d8888. d888888b d8888b. d888888b d8b   db  d888b                                                                           
 *    88'     88  `8D .8P  Y8. 88'YbdP`88      88'  YP `~~88~~' 88  `8D   `88'   888o  88 88' Y8b                                                                          
 *    88ooo   88oobY' 88    88 88  88  88      `8bo.      88    88oobY'    88    88V8o 88 88                                                                               
 *    88~~~   88`8b   88    88 88  88  88        `Y8b.    88    88`8b      88    88 V8o88 88  ooo                                                                          
 *    88      88 `88. `8b  d8' 88  88  88      db   8D    88    88 `88.   .88.   88  V888 88. ~8~                                                                          
 *    YP      88   YD  `Y88P'  YP  YP  YP      `8888Y'    YP    88   YD Y888888P VP   V8P  Y888P                                                                           
 *                                                          
 *                                                          
 */

/** was originally copied from cleanProjEditOptions from TrackMyTime7
 * This function takes a string with ;, converts to array of strings and removes empty elements (like if ; is at the end.)
 * 
 * example input:   ";test;this;string;;now;"
 * example result:  "test;this;string;now"
 * @param str
 */

export function cleanEmptyElementsFromString ( input : any, delim: string, removeEmpty: boolean, sort: 'asc' | 'dec' | null ) : string {

  const str: string = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';

    let stringArray : string[] | any = getStringArrayFromString( str, delim, removeEmpty, sort );
    return stringArray.join(';');
  
}
