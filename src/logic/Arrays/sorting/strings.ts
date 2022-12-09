
 import { ISeriesSort } from './Interfaces';

/***
 *    .d8888.  .d88b.  d8888b. d888888b      .d8888. d888888b d8888b. d888888b d8b   db  d888b        .d8b.  d8888b. d8888b.  .d8b.  db    db 
 *    88'  YP .8P  Y8. 88  `8D `~~88~~'      88'  YP `~~88~~' 88  `8D   `88'   888o  88 88' Y8b      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 
 *    `8bo.   88    88 88oobY'    88         `8bo.      88    88oobY'    88    88V8o 88 88           88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  
 *      `Y8b. 88    88 88`8b      88           `Y8b.    88    88`8b      88    88 V8o88 88  ooo      88~~~88 88`8b   88`8b   88~~~88    88    
 *    db   8D `8b  d8' 88 `88.    88         db   8D    88    88 `88.   .88.   88  V888 88. ~8~      88   88 88 `88. 88 `88. 88   88    88    
 *    `8888Y'  `Y88P'  88   YD    YP         `8888Y'    YP    88   YD Y888888P VP   V8P  Y888P       YP   YP 88   YD 88   YD YP   YP    YP    
 *                                                                                                                                            
 * 2020-12-14
 * sortStringArray was added to remove typescript errors in sortKeysByOtherKey
 * @param arr 
 * @param order                                                                                                                                         
 */

 export function sortStringArray( arr: string[], order: ISeriesSort, convertNullToEmpty: boolean = false ) : string[] {
    //Solve https://github.com/mikezimm/drilldown7/issues/79
    //Convert any null values to empty string so they don't break the 'localeCompare' sort below.
    if ( convertNullToEmpty === true ) {
        arr = arr.map( str => {
            return str ? str : '';
        });
    }

    if ( order === 'asc' ) { 
        arr.sort((a,b) => a.localeCompare(b));
    } else if ( order === 'dec' ) {
        arr.sort((a,b) => b.localeCompare(a));
    } else {
        
    }
    return arr;
}


export function sortStringArrayCollator( arr: string[], order: ISeriesSort, convertNullToEmpty: boolean = false, localLanguage: string = 'en' ) : string[] {
    //Solve https://github.com/mikezimm/drilldown7/issues/79
    //Convert any null values to empty string so they don't break the 'localeCompare' sort below.
    if ( convertNullToEmpty === true ) {
        arr = arr.map( str => {
            return str ? str : '';
        });
    }

    //Adding collator per:  https://stackoverflow.com/a/52369951
    const collator = new Intl.Collator(localLanguage, { numeric: true, sensitivity: 'base' });

    if ( order === 'asc' ) { 
        arr.sort((a, b) => { return collator.compare(a, b); });

    } else if ( order === 'dec' ) {
        arr.sort((a, b) => { return collator.compare(b, a); });

    } else {
        console.log('SORTING.ts ERROR - no asc or dec ~ 88' );
    }
    return arr;
}

