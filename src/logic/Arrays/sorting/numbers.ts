import { ISeriesSort } from './Interfaces';

/***
 *    .d8888.  .d88b.  d8888b. d888888b      d8b   db db    db .88b  d88. d8888b. d88888b d8888b.       .d8b.  d8888b. d8888b.  .d8b.  db    db 
 *    88'  YP .8P  Y8. 88  `8D `~~88~~'      888o  88 88    88 88'YbdP`88 88  `8D 88'     88  `8D      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 
 *    `8bo.   88    88 88oobY'    88         88V8o 88 88    88 88  88  88 88oooY' 88ooooo 88oobY'      88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  
 *      `Y8b. 88    88 88`8b      88         88 V8o88 88    88 88  88  88 88~~~b. 88~~~~~ 88`8b        88~~~88 88`8b   88`8b   88~~~88    88    
 *    db   8D `8b  d8' 88 `88.    88         88  V888 88b  d88 88  88  88 88   8D 88.     88 `88.      88   88 88 `88. 88 `88. 88   88    88    
 *    `8888Y'  `Y88P'  88   YD    YP         VP   V8P ~Y8888P' YP  YP  YP Y8888P' Y88888P 88   YD      YP   YP 88   YD 88   YD YP   YP    YP    
 *                                                                                                                                              
 *     
 * 2020-12-14
 * sortNumberArray was added to remove typescript errors in sortKeysByOtherKey
 * @param arr 
 * @param order      
 * 
 * NOTE PER DOCS:  Sorts as strings
 * The sort() sorts the elements as strings in alphabetical and ascending order.                                                                                                                                    
 */

export function sortNumberArray( arr: number[], order: ISeriesSort ) : number[] {

    if ( order === 'asc' ) {
        arr.sort((a, b) => a-b );

    } else if ( order === 'dec' ) {
        arr.sort((a, b) => b-a );

    } else {

    }
    return arr;

}

//2021-01-05: Updated per TrackMyTime7 arrayServices
export function sortObjectArrayByNumberKey( arr: any[], order: ISeriesSort, key: string ) : any[] {

    if ( order === 'asc' ) { 
        arr.sort((a, b) => a[key]-b[key] );
    } else if ( order === 'dec' ) {
        arr.sort((a, b) => b[key]-a[key] );
    } else {
        
    }
    return arr;

}
