
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

/***
 *     .o88b.  .d8b.  .88b  d88. d88888b db      d888888b d88888D d88888b 
 *    d8P  Y8 d8' `8b 88'YbdP`88 88'     88        `88'   YP  d8' 88'     
 *    8P      88ooo88 88  88  88 88ooooo 88         88       d8'  88ooooo 
 *    8b      88~~~88 88  88  88 88~~~~~ 88         88      d8'   88~~~~~ 
 *    Y8b  d8 88   88 88  88  88 88.     88booo.   .88.    d8' db 88.     
 *     `Y88P' YP   YP YP  YP  YP Y88888P Y88888P Y888888P d88888P Y88888P 
 *                                                                        
 *                                                                        
 */

 
 /**
  * camelToSentanceCase will take camel case and convert to sentance case
  * source:  https://stackoverflow.com/a/7225450
  * 
   * @param oldString 
   * @param capFirst = capitalize first letter regardless
  * 
  */   

 export function camelToSentanceCase( oldString: string, capFirst = true ): string {
    var result = oldString.replace( /([A-Z])/g, " $1" );
    var finalResult = capFirst === true ? result.charAt(0).toUpperCase() + result.slice(1) : result;
    finalResult = finalResult.trim();
  
    return finalResult;
  
  }

  
//https://stackoverflow.com/a/2970667/4210807
export function camelize(str : string ,firstCap: boolean): string {

    if ( str == null ) { return ''; }
    else {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, 
            (word, index) => {
                if ( firstCap ) {   //Use this flavor for CamelCase
                    return index == 0 ? word.toUpperCase() : word.toUpperCase();
                } else {    //Use this flavor for camelCase
                    return index == 0 ? word.toLowerCase() : word.toUpperCase();
                } 
            }).replace(/\s+/g, '');
    }
}

export function upperFirstLetter( str : string, onErrorReturnEmpty : boolean ): string { 
    if ( str === null || str === undefined || str.length === 0 ) {
        return onErrorReturnEmpty === true ? '' : str;
    } else {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export function lowerFirstLetter( str : string, onErrorReturnEmpty : boolean ): string { 
    if ( str === null || str === undefined || str.length === 0 ) {
        return onErrorReturnEmpty === true ? '' : str;
    } else {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
}

/***
 *    d8888b.  .d8b.  d8b   db d8888b.  .d88b.  .88b  d88. d888888b d88888D d88888b       .o88b.  .d8b.  .d8888. d88888b 
 *    88  `8D d8' `8b 888o  88 88  `8D .8P  Y8. 88'YbdP`88   `88'   YP  d8' 88'          d8P  Y8 d8' `8b 88'  YP 88'     
 *    88oobY' 88ooo88 88V8o 88 88   88 88    88 88  88  88    88       d8'  88ooooo      8P      88ooo88 `8bo.   88ooooo 
 *    88`8b   88~~~88 88 V8o88 88   88 88    88 88  88  88    88      d8'   88~~~~~      8b      88~~~88   `Y8b. 88~~~~~ 
 *    88 `88. 88   88 88  V888 88  .8D `8b  d8' 88  88  88   .88.    d8' db 88.          Y8b  d8 88   88 db   8D 88.     
 *    88   YD YP   YP VP   V8P Y8888D'  `Y88P'  YP  YP  YP Y888888P d88888P Y88888P       `Y88P' YP   YP `8888Y' Y88888P 
 *        
 *        
 */

export function randomizeCase(str: string): string {
    var result = '';
    if ( str !== null && str !== undefined  ) {
        for ( let i = 0; i < str.length; i++) {
            let UC = Math.random() > .5 ? true : false;
            if ( UC === true ) {
                result += str.substr(i,1).toUpperCase();
            } else { result += str.substr(i,1).toLowerCase(); }
        }
    } else { result = str; }
    return result;
}
