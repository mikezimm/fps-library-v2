
/***
 *     .d8b.  d8888b. d8888b.  .d8b.  db    db .d8888. 
 *    d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 88'  YP 
 *    88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  `8bo.   
 *    88~~~88 88`8b   88`8b   88~~~88    88      `Y8b. 
 *    88   88 88 `88. 88 `88. 88   88    88    db   8D 
 *    YP   YP 88   YD 88   YD YP   YP    YP    `8888Y' 
 *                                                     
 *                                                     

//Services
import { spliceCopyArray, addItemToArrayIfItDoesNotExist, convertNumberArrayToRelativePercents, 
    removeItemFromArrayOnce, removeItemFromArrayAll } from '@mikezimm/npmfunctions/dist/Services/Arrays/services';
*/

export function convertArrayToLC( arr: string[] ) : string[] {
  let result: string[] = arr.map( str => { return str.toLowerCase(); } );
  return result;
}

export function expandArray ( count: number ) : any[] {
    let theseInfos: any[] = [];
    for (let index = 0; index < count; index++) {
        theseInfos.push( null );
    }
    return theseInfos;
}

/***
 *    .d8888. d8888b. db      d888888b  .o88b. d88888b  .o88b.  .d88b.  d8888b. db    db  .d8b.  d8888b. d8888b.  .d8b.  db    db 
 *    88'  YP 88  `8D 88        `88'   d8P  Y8 88'     d8P  Y8 .8P  Y8. 88  `8D `8b  d8' d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 
 *    `8bo.   88oodD' 88         88    8P      88ooooo 8P      88    88 88oodD'  `8bd8'  88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  
 *      `Y8b. 88~~~   88         88    8b      88~~~~~ 8b      88    88 88~~~      88    88~~~88 88`8b   88`8b   88~~~88    88    
 *    db   8D 88      88booo.   .88.   Y8b  d8 88.     Y8b  d8 `8b  d8' 88         88    88   88 88 `88. 88 `88. 88   88    88    
 *    `8888Y' 88      Y88888P Y888888P  `Y88P' Y88888P  `Y88P'  `Y88P'  88         YP    YP   YP 88   YD 88   YD YP   YP    YP    
 *                                                                                                                                
 *                                                                                                                                
 */

/**
 * This function will take an array of objects, and insert into another array of objects at a specific index.
 * It will also remove objects at specific indexies.
 * 
 * Example of call:  This will take an array of fields from a view, and just insert [ootbModified, ootbEditor ] at index #2 of the array.
 * If you replace the startDel and countDelete with values, it will remove XX objects starting at index YY
 * The unique thing about it though is for adding, you can give the original position to add things in.
 * This way you don't have to figure out the new index if something is to be removed.
 * 
 * export const ProjectRecentUpdatesFields = spliceCopyArray ( stdProjectViewFields, null, null, 2, [ootbModified, ootbEditor ] );
 * 
 * In the example
 * 
 * @param sourceArray - Original array of objects
 * @param startDel - index of objects to start deleting
 * @param countDelete - number of objects to delete starting at startDel
 * @param startAddOrigPos - index to add 'addArray' in sourceArray... this is based on the original array you send, not what is left if you delete some items.
 * @param addArray - array of items to insert into object a specified position.
 */
 export function spliceCopyArray(sourceArray : any[], startDel: number, countDelete: number, startAddOrigPos:  number, addArray: any[]) {

    let whole : any[] = [];
    let skipMin = startDel === null ? "-1000" : startDel ;
    let skipMax = startDel === null ? "-1000" : startDel + countDelete - 1 ; 
    let addedArray = false;

    if ( startAddOrigPos <= 0 ) {
      whole = whole.concat(addArray);
      addedArray = true;
    }

    for (let i in sourceArray){
        let addedItem = false;
        if ( i < skipMin ) {
            whole.push(sourceArray[i]);
            addedItem = true; }
            let startAddOrigPosTest: any = startAddOrigPos;
        if ( i == startAddOrigPosTest ) {
            whole = whole.concat(addArray) ;
            addedArray = true; }
       if ( i > skipMax && addedItem === false ) {  whole.push(sourceArray[i]);   }
    }

    if ( addedArray === false ) {  whole = whole.concat(addArray);  }

    return whole;
}


/***
 *     .d8b.  d8888b. d8888b. d888888b d888888b d88888b .88b  d88.      d888888b  .d88b.   .d8b.  d8888b. d8888b.  .d8b.  db    db      d888888b d88888b      d888888b d888888b d8888b.  .d88b.  d88888b .d8888. d8b   db  .d88b.  d888888b d88888b db    db d888888b .d8888. d888888b 
 *    d8' `8b 88  `8D 88  `8D   `88'   `~~88~~' 88'     88'YbdP`88      `~~88~~' .8P  Y8. d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8'        `88'   88'            `88'   `~~88~~' 88  `8D .8P  Y8. 88'     88'  YP 888o  88 .8P  Y8. `~~88~~' 88'     `8b  d8'   `88'   88'  YP `~~88~~' 
 *    88ooo88 88   88 88   88    88       88    88ooooo 88  88  88         88    88    88 88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'          88    88ooo           88       88    88   88 88    88 88ooooo `8bo.   88V8o 88 88    88    88    88ooooo  `8bd8'     88    `8bo.      88    
 *    88~~~88 88   88 88   88    88       88    88~~~~~ 88  88  88         88    88    88 88~~~88 88`8b   88`8b   88~~~88    88            88    88~~~           88       88    88   88 88    88 88~~~~~   `Y8b. 88 V8o88 88    88    88    88~~~~~  .dPYb.     88      `Y8b.    88    
 *    88   88 88  .8D 88  .8D   .88.      88    88.     88  88  88         88    `8b  d8' 88   88 88 `88. 88 `88. 88   88    88           .88.   88             .88.      88    88  .8D `8b  d8' 88.     db   8D 88  V888 `8b  d8'    88    88.     .8P  Y8.   .88.   db   8D    88    
 *    YP   YP Y8888D' Y8888D' Y888888P    YP    Y88888P YP  YP  YP         YP     `Y88P'  YP   YP 88   YD 88   YD YP   YP    YP         Y888888P YP           Y888888P    YP    Y8888D'  `Y88P'  Y88888P `8888Y' VP   V8P  `Y88P'     YP    Y88888P YP    YP Y888888P `8888Y'    YP    
 *                                                                                                                                                                                                                                                                                     
 *     2020-09-24:  Updated from drilldown-filter webpart                                                                                                                                                                                                                                                                                
 */

export function addItemToArrayIfItDoesNotExist (arr : string[], item: string, suppressUndefined: boolean = true ): string[] {
    if ( item === undefined ) { 
        if ( suppressUndefined != true ) {
            console.log('addItemToArrayIfItDoesNotExist found undefined!') ;
        }
     }
    //To close https://github.com/mikezimm/drilldown7/issues/94
    if ( typeof item === 'string' ) { item = item.trim(); }
    
    if ( item != '' && item !== undefined && arr.indexOf(item) < 0  ) { arr.push(item); }
    return arr;
}


/***
 *     .o88b.  .d88b.  d8b   db db    db d88888b d8888b. d888888b      d8b   db db    db .88b  d88. d8888b. d88888b d8888b.  .d8b.  d8888b. d8888b.  .d8b.  db    db      d888888b  .d88b.  d8888b. d88888b db       .d8b.  d888888b d888888b db    db d88888b      d8888b. d88888b d8888b.  .o88b. d88888b d8b   db d888888b .d8888. 
 *    d8P  Y8 .8P  Y8. 888o  88 88    88 88'     88  `8D `~~88~~'      888o  88 88    88 88'YbdP`88 88  `8D 88'     88  `8D d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8'      `~~88~~' .8P  Y8. 88  `8D 88'     88      d8' `8b `~~88~~'   `88'   88    88 88'          88  `8D 88'     88  `8D d8P  Y8 88'     888o  88 `~~88~~' 88'  YP 
 *    8P      88    88 88V8o 88 Y8    8P 88ooooo 88oobY'    88         88V8o 88 88    88 88  88  88 88oooY' 88ooooo 88oobY' 88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'          88    88    88 88oobY' 88ooooo 88      88ooo88    88       88    Y8    8P 88ooooo      88oodD' 88ooooo 88oobY' 8P      88ooooo 88V8o 88    88    `8bo.   
 *    8b      88    88 88 V8o88 `8b  d8' 88~~~~~ 88`8b      88         88 V8o88 88    88 88  88  88 88~~~b. 88~~~~~ 88`8b   88~~~88 88`8b   88`8b   88~~~88    88            88    88    88 88`8b   88~~~~~ 88      88~~~88    88       88    `8b  d8' 88~~~~~      88~~~   88~~~~~ 88`8b   8b      88~~~~~ 88 V8o88    88      `Y8b. 
 *    Y8b  d8 `8b  d8' 88  V888  `8bd8'  88.     88 `88.    88         88  V888 88b  d88 88  88  88 88   8D 88.     88 `88. 88   88 88 `88. 88 `88. 88   88    88            88    `8b  d8' 88 `88. 88.     88booo. 88   88    88      .88.    `8bd8'  88.          88      88.     88 `88. Y8b  d8 88.     88  V888    88    db   8D 
 *     `Y88P'  `Y88P'  VP   V8P    YP    Y88888P 88   YD    YP         VP   V8P ~Y8888P' YP  YP  YP Y8888P' Y88888P 88   YD YP   YP 88   YD 88   YD YP   YP    YP            YP     `Y88P'  88   YD Y88888P Y88888P YP   YP    YP    Y888888P    YP    Y88888P      88      Y88888P 88   YD  `Y88P' Y88888P VP   V8P    YP    `8888Y' 
 *                                                                                                                                                                                                                                                                                                                                    
 * 
 * @param arr 
 * @param percentsAsWholeNumbers -- If true, converts 25% from 0.25 to 25.
 *                                                                                                                                                                                                                                                                                                                                 
 */

export function convertNumberArrayToRelativePercents( arr: number[] , percentsAsWholeNumbers : boolean = true ): number[] {

    let result : number[] = [];
    //Get sum of array of numbers:  https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
    // Can't do this:  const arrSum = arr => arr.reduce((a,b) => a + b, 0) like example.
    // And THIS changes arr to single value:  const arrSum = arr.reduce((a,b) => a + b, 0);
    let arrSum = 0;
    arr.map( v => { if ( v !== null && v !== undefined ) { arrSum += v;} });

    let multiplier = percentsAsWholeNumbers === true ? 100 : 1 ;

    if ( arrSum === 0 ) { console.log('Unable to convertNumberArrayToRelativePercents because Sum === 0', arrSum, arr ) ; }
    arr.map( v => {
        result.push( arrSum !== 0 ? multiplier * v / arrSum : multiplier * v / 1 )  ;
    });

    return result;
}


  
/***
 *    d8888b. d88888b .88b  d88.  .d88b.  db    db d88888b      d888888b d888888b d88888b .88b  d88.      d88888b d8888b.  .d88b.  .88b  d88.       .d8b.  d8888b. d8888b.  .d8b.  db    db       .d88b.  d8b   db  .o88b. d88888b 
 *    88  `8D 88'     88'YbdP`88 .8P  Y8. 88    88 88'            `88'   `~~88~~' 88'     88'YbdP`88      88'     88  `8D .8P  Y8. 88'YbdP`88      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8'      .8P  Y8. 888o  88 d8P  Y8 88'     
 *    88oobY' 88ooooo 88  88  88 88    88 Y8    8P 88ooooo         88       88    88ooooo 88  88  88      88ooo   88oobY' 88    88 88  88  88      88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'       88    88 88V8o 88 8P      88ooooo 
 *    88`8b   88~~~~~ 88  88  88 88    88 `8b  d8' 88~~~~~         88       88    88~~~~~ 88  88  88      88~~~   88`8b   88    88 88  88  88      88~~~88 88`8b   88`8b   88~~~88    88         88    88 88 V8o88 8b      88~~~~~ 
 *    88 `88. 88.     88  88  88 `8b  d8'  `8bd8'  88.            .88.      88    88.     88  88  88      88      88 `88. `8b  d8' 88  88  88      88   88 88 `88. 88 `88. 88   88    88         `8b  d8' 88  V888 Y8b  d8 88.     
 *    88   YD Y88888P YP  YP  YP  `Y88P'     YP    Y88888P      Y888888P    YP    Y88888P YP  YP  YP      YP      88   YD  `Y88P'  YP  YP  YP      YP   YP 88   YD 88   YD YP   YP    YP          `Y88P'  VP   V8P  `Y88P' Y88888P 
 * 
 * import { removeItemFromArrayOnce, removeItemFromArrayAll } from '../../../services/arrayServices';
 * https://stackoverflow.com/a/5767357                                                                                                                                                                                                                               
 *                                                                                                                                                                                                                                 
 */

export function removeItemFromArrayOnce(arr: any[], value : any): any[] {
    if ( arr === null || arr === undefined ) {
        //Do nothing... 
    } else {
        var index = arr.indexOf(value);
        if (index > -1) {
        arr.splice(index, 1);
        }
    }
    return arr;
}
  
/***
 *    d8888b. d88888b .88b  d88.  .d88b.  db    db d88888b      d888888b d888888b d88888b .88b  d88.      d88888b d8888b.  .d88b.  .88b  d88.       .d8b.  d8888b. d8888b.  .d8b.  db    db       .d8b.  db      db      
 *    88  `8D 88'     88'YbdP`88 .8P  Y8. 88    88 88'            `88'   `~~88~~' 88'     88'YbdP`88      88'     88  `8D .8P  Y8. 88'YbdP`88      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8'      d8' `8b 88      88      
 *    88oobY' 88ooooo 88  88  88 88    88 Y8    8P 88ooooo         88       88    88ooooo 88  88  88      88ooo   88oobY' 88    88 88  88  88      88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'       88ooo88 88      88      
 *    88`8b   88~~~~~ 88  88  88 88    88 `8b  d8' 88~~~~~         88       88    88~~~~~ 88  88  88      88~~~   88`8b   88    88 88  88  88      88~~~88 88`8b   88`8b   88~~~88    88         88~~~88 88      88      
 *    88 `88. 88.     88  88  88 `8b  d8'  `8bd8'  88.            .88.      88    88.     88  88  88      88      88 `88. `8b  d8' 88  88  88      88   88 88 `88. 88 `88. 88   88    88         88   88 88booo. 88booo. 
 *    88   YD Y88888P YP  YP  YP  `Y88P'     YP    Y88888P      Y888888P    YP    Y88888P YP  YP  YP      YP      88   YD  `Y88P'  YP  YP  YP      YP   YP 88   YD 88   YD YP   YP    YP         YP   YP Y88888P Y88888P 
 *                                                                                                                                                                                                                       
 * import { removeItemFromArrayOnce, removeItemFromArrayAll } from '../../../services/arrayServices';
 * https://stackoverflow.com/a/5767357                                                                                                                                                                                                                        
 */

export function removeItemFromArrayAll(arr: any[], value : any): any[] {
    if ( arr === null || arr === undefined ) {
        //Do nothing... 
    } else {
        var i = 0;
        while (i < arr.length) {
          if (arr[i] === value) {
            arr.splice(i, 1);
          } else {
            ++i;
          }
        }
    }
    return arr;
}

 /***
 *    db    db d8888b. d8888b.  .d8b.  d888888b d88888b      d8b   db d88888b db    db d888888b       .d88b.  d8888b. d88888b d8b   db      d888888b d8b   db d8888b. d88888b db    db 
 *    88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'          888o  88 88'     `8b  d8' `~~88~~'      .8P  Y8. 88  `8D 88'     888o  88        `88'   888o  88 88  `8D 88'     `8b  d8' 
 *    88    88 88oodD' 88   88 88ooo88    88    88ooooo      88V8o 88 88ooooo  `8bd8'     88         88    88 88oodD' 88ooooo 88V8o 88         88    88V8o 88 88   88 88ooooo  `8bd8'  
 *    88    88 88~~~   88   88 88~~~88    88    88~~~~~      88 V8o88 88~~~~~  .dPYb.     88         88    88 88~~~   88~~~~~ 88 V8o88         88    88 V8o88 88   88 88~~~~~  .dPYb.  
 *    88b  d88 88      88  .8D 88   88    88    88.          88  V888 88.     .8P  Y8.    88         `8b  d8' 88      88.     88  V888        .88.   88  V888 88  .8D 88.     .8P  Y8. 
 *    ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P      VP   V8P Y88888P YP    YP    YP          `Y88P'  88      Y88888P VP   V8P      Y888888P VP   V8P Y8888D' Y88888P YP    YP 
 *                                                                                                                                                                                     
 *    import { updateNextOpenIndex } from '@mikezimm/npmfunctions/dist/Services/Arrays/manipulation';
 * 
 * The purpose of this array is to get an array of items [ 0, 1, null, 3,  4,  null ]
 * Provide a start index
 * Find the first empty/null value in array starting at that index
 * Set the value in that slot to the value provided
 * Example:
 * updateNextOpenIndex( [ 0, 1, null, 3,  4,  null ], 0, 999 )
 * updateNextOpenIndex( [ 0, 1, null, 3,  4,  null ], 1, 999 )
 * updateNextOpenIndex( [ 0, 1, null, 3,  4,  null ], 2, 999 )
 *     ==>> will return [ 0, 1, 999, 3,  4,  null ]
 * 
 * updateNextOpenIndex( [ 0, 1, null, 3,  4,  null ], 3, 777 )
 *     ==>> will return [ 0, 1, null, 3,  4,  777 ]
 */
/**
 * 
 * @param targetArray 
 * @param start start index to start looking for a null value
 * @param value value to set the next open slot to
 */
export function updateNextOpenIndex( targetArray: any[], start: number, value: any ): any[] {
    let exit: boolean = false;
  
    for (let index = start; index < targetArray.length; index++) {
      if ( !exit && targetArray[ index ] === null ) { 
        targetArray[ index ] = value ;
        exit = true;
       }
    }
    return targetArray;
  
   }