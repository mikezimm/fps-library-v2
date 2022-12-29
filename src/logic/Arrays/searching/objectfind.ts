

import { getHelpfullErrorV2, IHelpfullOutput } from '../../Errors/friendly';

/***
 *    d888888b d8b   db d8888b. d88888b db    db  .d88b.  d88888b       .d8b.  d8b   db db    db       .o88b.  .d8b.  .d8888. d88888b 
 *      `88'   888o  88 88  `8D 88'     `8b  d8' .8P  Y8. 88'          d8' `8b 888o  88 `8b  d8'      d8P  Y8 d8' `8b 88'  YP 88'     
 *       88    88V8o 88 88   88 88ooooo  `8bd8'  88    88 88ooo        88ooo88 88V8o 88  `8bd8'       8P      88ooo88 `8bo.   88ooooo 
 *       88    88 V8o88 88   88 88~~~~~  .dPYb.  88    88 88~~~        88~~~88 88 V8o88    88         8b      88~~~88   `Y8b. 88~~~~~ 
 *      .88.   88  V888 88  .8D 88.     .8P  Y8. `8b  d8' 88           88   88 88  V888    88         Y8b  d8 88   88 db   8D 88.     
 *    Y888888P VP   V8P Y8888D' Y88888P YP    YP  `Y88P'  YP           YP   YP VP   V8P    YP          `Y88P' YP   YP `8888Y' Y88888P 
 *                     
 *                     
 */

/**
 * Based on:  https://bobbyhadz.com/blog/javascript-array-contains-string-case-insensitive
 * Any non-string checks will be considered 'not a match'
 * @param checkMe 
 * @param inArray 
 */
export function indexOfAnyCase( checkMe: string, inArray: string[], consoleLog: boolean, alertMe: boolean ) : number {
    let result = -1;

    //result = inArray.findIndex( element => { //NOTE:  findIndex does not work in my code (typescript error)
    inArray.map( ( element: string, index ) => {
      try {
          if ( element.toLowerCase() === checkMe.toLowerCase() ) { result = index; }
        }catch(e){
          //Sending false, false to getHelpfullErrorV2  because I'm handling that here
          let errMessage: IHelpfullOutput = getHelpfullErrorV2( e, alertMe, consoleLog, 'indexOfAnyCase ~ 65' );
      }
    });

    return result;

}


/***
 *    d8888b.  .d88b.  d88888b .d8888.       .d88b.  d8888b.    d88b d88888b  .o88b. d888888b      d88888b db    db d888888b .d8888. d888888b      d888888b d8b   db  .d8b.  d8888b. d8888b.  .d8b.  db    db 
 *    88  `8D .8P  Y8. 88'     88'  YP      .8P  Y8. 88  `8D    `8P' 88'     d8P  Y8 `~~88~~'      88'     `8b  d8'   `88'   88'  YP `~~88~~'        `88'   888o  88 d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 
 *    88   88 88    88 88ooooo `8bo.        88    88 88oooY'     88  88ooooo 8P         88         88ooooo  `8bd8'     88    `8bo.      88            88    88V8o 88 88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  
 *    88   88 88    88 88~~~~~   `Y8b.      88    88 88~~~b.     88  88~~~~~ 8b         88         88~~~~~  .dPYb.     88      `Y8b.    88            88    88 V8o88 88~~~88 88`8b   88`8b   88~~~88    88    
 *    88  .8D `8b  d8' 88.     db   8D      `8b  d8' 88   8D db. 88  88.     Y8b  d8    88         88.     .8P  Y8.   .88.   db   8D    88           .88.   88  V888 88   88 88 `88. 88 `88. 88   88    88    
 *    Y8888D'  `Y88P'  Y88888P `8888Y'       `Y88P'  Y8888P' Y8888P  Y88888P  `Y88P'    YP         Y88888P YP    YP Y888888P `8888Y'    YP         Y888888P VP   V8P YP   YP 88   YD 88   YD YP   YP    YP    
 *                                                                                             
 *                                                                                             
 */

/**
 * This function checks to see if an element of an array (object) contains a specific property/value pair.
 * 
 * example call:  if ( doesObjectExistInArray(currentFields, 'StaticName', checkField ) ) {
 * This takes an array of field objects (currentFields), and looks to see if any of the objects has a key of StaticName which has a value of checkField variable.
 * 
 * @param sourceArray 
 * @param objectProperty 
 * @param propValue 
 */

 export function doesObjectExistInArrayInt(sourceArray: any[], objectProperty : string, propValue : any, exact : boolean = true ) : number {
    let result = doesObjectExistInArray(sourceArray, objectProperty, propValue, exact );
    if ( result === false ) { return -1 } else { return parseInt( result ) ; }
}

export function doesObjectExistInArray(sourceArray: any[], objectProperty : string, propValue : any, exact : boolean = true ) : false | string {

    let result : boolean | string = false;

    for (let i in sourceArray){
        let test: boolean = false;
        if ( exact === true ) { //2020-10-07:  Added this to allow for Id string to number checks
            test = sourceArray[i][objectProperty] === propValue ? true : false;

        } else {
            test = sourceArray[i][objectProperty] == propValue ? true : false;
        }
        if ( test === true ) {
            result = i;
            break;
        }
    }

    return result;

}


/**
 *  Typical use case:  arr = ['a','b','c' ]
 *  getNextElementInArray( arr, 'b', 'next, true, 'notfound' ) returns 'c'
 *  getNextElementInArray( arr, 'c', 'next, true, 'notfound' ) returns 'a'
 * 
 * @param arr array should be either numbers or strings, not objects
 * @param current item to search for
 * @param direction direction to search for
 * @param roll true = if it's the last item and you pick 'next' it will get the first item in array etc.
 * @param notFound = return result if not found ( either because current is not in array or roll === false and it's at an end )
 */
 export function getNextElementInArray( arr: any[], current: any, direction: 'next' | 'prev' , roll : boolean, notFound: any ): any {
  let result: any = null;
  let idx = arr.indexOf(current);

  if ( arr.length === 0 || idx === -1 ) { } //result = notFound; } 
  else if ( arr.length === 1 ) { result = roll === true ? arr[0] : null; }

  else if ( idx === 0  )  { //This is first item in the array
      if ( direction === 'next' ) { result = arr[1]; }
       else { result = roll === true ? arr.length - 1 : null; } }

  else if ( idx === arr.length - 1 ) { //This is the last item in the array
      if ( direction === 'prev' ) { result = arr[idx - 1]; }
      else { result = roll === true ? arr[0] : null; } }

  else { //This is the last item in the array
      result = arr[ direction === 'next' ? idx + 1 : idx - 1 ] ;

  
  }
  if ( result === null ) { 
      result = notFound;
      console.log(' ERROR in getNextElementInArray', arr, current, direction, roll, notFound ) ; }
  return result;

}


