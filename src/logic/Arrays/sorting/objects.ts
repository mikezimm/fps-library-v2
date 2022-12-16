

 import { ISeriesSort } from './Interfaces';

 import { sortNumberArray } from './numbers';
 import { sortStringArray, sortStringArrayCollator } from './strings';

//2021-01-05: Updated per TrackMyTime7 arrayServices
export function sortObjectArrayByStringKey( arr: any[], order: ISeriesSort, key: string ) : any[] {

    if ( order === 'asc' ) { 
        arr.sort((a,b) => a[key].localeCompare(b[key]));
    } else if ( order === 'dec' ) {
        arr.sort((a,b) => b[key].localeCompare(a[key]));
    } else {
        
    }
    return arr;
}

/**
 * 
 * 
 *      NOTE sortObjectArrayByStringKeyCollator HAS NOT BEEN TESTED IN ANY WAY.
 *      JUST MODIFIED based upon sortStringArrayCollator
 * 
 * @param arr 
 * @param order 
 * @param key 
 * @param convertNullToEmpty 
 * @param localLanguage 
 */
//2021-01-05: Updated per TrackMyTime7 arrayServices

export function sortObjectArrayByStringKeyCollator( arr: any[], order: ISeriesSort, key: string, convertNullToEmpty: boolean = false, localLanguage: string = 'en'  ) : any[] {
    //Solve https://github.com/mikezimm/drilldown7/issues/79
    //Convert any null values to empty string so they don't break the 'localeCompare' sort below.
    if ( convertNullToEmpty === true ) {
        arr = arr.map( str => {
            if ( !str[key] ) { str[key] = '' ; }
            return str;
        });
    }

    //Adding collator per:  https://stackoverflow.com/a/52369951
    const collator = new Intl.Collator(localLanguage, { numeric: true, sensitivity: 'base' });

    if ( order === 'asc' ) { 
        arr.sort((a, b) => { return collator.compare(a[key], b[key]); });

    } else if ( order === 'dec' ) {
        arr.sort((a, b) => { return collator.compare(b[key], a[key]); });

    } else {
        console.log('SORTING.ts ERROR - no asc or dec ~ 88' );
    }

    return arr;
}


//2021-01-05: Updated per TrackMyTime7 arrayServices
/**
 * This is different from sortObjectArrayByNumberKey in that you can look at nested children.
 * In the case of ExtremeContents:
 * There is an array of File types call infoTypes
 * I wanted to sort by type.summary.keyToSortBy.
 * This will let you pass in a key string like: key ='summary.count' and it will look at the children objects.
 * NOTE:  The keys are determined using the '.'
 * 
 * @param arr 
 * @param order 
 * @param key 
 */
export function sortObjectArrayByChildNumberKey( arr: any[], order: ISeriesSort, key: string ) : any[] {

    let keys = key.split('.');
    let key1 = keys.length >= 1 ? keys[0] : key;
    let key2 = keys.length >= 2 ? keys[1] : '';
    let key3 = keys.length >= 3 ? keys[2] : '';
  
    if ( keys.length === 1 ) {
      if ( order === 'asc' ) { 
        arr.sort((a, b) => a[key]-b[key] );
      } else if ( order === 'dec' ) {
          arr.sort((a, b) => b[key]-a[key] );
      } else {
          
      }
    } else if ( keys.length === 2 ) {
      if ( order === 'asc' ) { 
        arr.sort((a, b) => a[key1][key2]-b[key1][key2] );
      } else if ( order === 'dec' ) {
          arr.sort((a, b) => b[key1][key2]-a[key1][key2] );
      } else {
          
      }
    }
  
    return arr;
  
  }

/***
 *    .d8888.  .d88b.  d8888b. d888888b      db   dD d88888b db    db .d8888.      d8888b. db    db       .d88b.  d888888b db   db d88888b d8888b.      db   dD d88888b db    db 
 *    88'  YP .8P  Y8. 88  `8D `~~88~~'      88 ,8P' 88'     `8b  d8' 88'  YP      88  `8D `8b  d8'      .8P  Y8. `~~88~~' 88   88 88'     88  `8D      88 ,8P' 88'     `8b  d8' 
 *    `8bo.   88    88 88oobY'    88         88,8P   88ooooo  `8bd8'  `8bo.        88oooY'  `8bd8'       88    88    88    88ooo88 88ooooo 88oobY'      88,8P   88ooooo  `8bd8'  
 *      `Y8b. 88    88 88`8b      88         88`8b   88~~~~~    88      `Y8b.      88~~~b.    88         88    88    88    88~~~88 88~~~~~ 88`8b        88`8b   88~~~~~    88    
 *    db   8D `8b  d8' 88 `88.    88         88 `88. 88.        88    db   8D      88   8D    88         `8b  d8'    88    88   88 88.     88 `88.      88 `88. 88.        88    
 *    `8888Y'  `Y88P'  88   YD    YP         YP   YD Y88888P    YP    `8888Y'      Y8888P'    YP          `Y88P'     YP    YP   YP Y88888P 88   YD      YP   YD Y88888P    YP    
 *                                                                
 *  2020-12-14
 *  This function caused errors in TrackMyTime which was based on @yo 1.9.1 but works in Drilldown and ActionNews @yo 1.11.0 
 * 
 *  Cannot invoke an expression whose type lacks a call signature. Type '((compareFn?: (a: string, b: string) => number) => string[]) | ((compareFn?: (a: number, b: numbe...' has no compatible call signatures.
 * 
 *  Rebuilt and added sortNumberArray and sortStringArray and it seems to work ok.
*/

export function sortKeysByOtherKey( obj: any, sortKey: ISeriesSort, order: ISeriesSort, dataType: 'number' | 'string', otherKeys: string[], convertNullToEmpty: boolean = false, localLanguage: string = '' ) : any {

    let sortKeyAny: any = sortKey;
    let sortCopy : any[] = JSON.parse(JSON.stringify(obj[sortKeyAny]));
    let otherKeyArrays : any = {};
    otherKeys.map( m => { otherKeyArrays[m] = [] ; } );
    
    if ( dataType === 'number' ) {
        sortCopy = sortNumberArray( sortCopy, order );
    } else {
        if ( dataType === 'string' && localLanguage !== '' ) {
            sortCopy = sortStringArrayCollator( sortCopy, order, convertNullToEmpty, localLanguage );
        } else {
            sortCopy = sortStringArray( sortCopy, order, convertNullToEmpty );
        }
        
    }

    let x = 0;
    for ( let v of sortCopy) {
      let currentIndex = obj[sortKeyAny].indexOf(v); //Get index of the first sortable value in original array
      let i = 0;
      otherKeys.map( key => {
        if ( obj[key] ) {
            otherKeyArrays[key].push( obj[key][currentIndex] );
        } else {
            console.log('sortKeysByOtherKey: Unable to push obj[key][currentIndex] because obj[key] does not exist!', obj,key,currentIndex );
        }
      });
      obj[sortKeyAny][currentIndex] = null;
      x ++;
    }
  
    otherKeys.map( key => {

      obj[key] = otherKeyArrays[key] ;

    }); 
  
    obj[sortKeyAny] = sortCopy;

    return obj;
  
}
