

/***
 *     d888b  d88888b d888888b      db   dD d88888b db    db      .d8888. db    db .88b  d88. .88b  d88.  .d8b.  d8888b. db    db 
 *    88' Y8b 88'     `~~88~~'      88 ,8P' 88'     `8b  d8'      88'  YP 88    88 88'YbdP`88 88'YbdP`88 d8' `8b 88  `8D `8b  d8' 
 *    88      88ooooo    88         88,8P   88ooooo  `8bd8'       `8bo.   88    88 88  88  88 88  88  88 88ooo88 88oobY'  `8bd8'  
 *    88  ooo 88~~~~~    88         88`8b   88~~~~~    88           `Y8b. 88    88 88  88  88 88  88  88 88~~~88 88`8b      88    
 *    88. ~8~ 88.        88         88 `88. 88.        88         db   8D 88b  d88 88  88  88 88  88  88 88   88 88 `88.    88    
 *     Y888P  Y88888P    YP         YP   YD Y88888P    YP         `8888Y' ~Y8888P' YP  YP  YP YP  YP  YP YP   YP 88   YD    YP    
 *                 
 *    
 *              
  * Copied from FoamControl.tsx
  * @param baselineObject
  * @param compareTypes Tested values = ['string','number','boolean'];
  * @param ignoreKeys   Tested values = ['element'];
  * @returns 
  */

 export function getKeySummary( baselineObject: any, compareTypes : string[], ignoreKeys : string[], parseMe: boolean ) : any {

  let keySummary: any = {};

  Object.keys( baselineObject ).map( key => {
    let keyType = typeof baselineObject[key];
    if ( compareTypes.indexOf( keyType ) > -1 && ignoreKeys.indexOf( key ) < 0 ) { 
      keySummary[key] = baselineObject[key];
    } 
  });

  if ( parseMe !== false ) { keySummary = JSON.parse( JSON.stringify( keySummary ) ) ; } 

  return keySummary;
}

 
export const BaseFieldKeys = ['Title','StaticName','TypeAsString','FieldTypeKind','TypeDisplayName','Formula','InternalName','Required','Sealed','CanBeDeleted'];

export const BaseViewKeys = ['Title','Id'];

export const BaseTypeKeys = ['Title','Id'];

export const DoesNotExistLabel = '- >> Does NOT Exist << -';

export const KeyChangeDelimiter = ' >>> ';
 /***
 *     d888b  d88888b d888888b      db   dD d88888b db    db       .o88b. db   db  .d8b.  d8b   db  d888b  d88888b .d8888. 
 *    88' Y8b 88'     `~~88~~'      88 ,8P' 88'     `8b  d8'      d8P  Y8 88   88 d8' `8b 888o  88 88' Y8b 88'     88'  YP 
 *    88      88ooooo    88         88,8P   88ooooo  `8bd8'       8P      88ooo88 88ooo88 88V8o 88 88      88ooooo `8bo.   
 *    88  ooo 88~~~~~    88         88`8b   88~~~~~    88         8b      88~~~88 88~~~88 88 V8o88 88  ooo 88~~~~~   `Y8b. 
 *    88. ~8~ 88.        88         88 `88. 88.        88         Y8b  d8 88   88 88   88 88  V888 88. ~8~ 88.     db   8D 
 *     Y888P  Y88888P    YP         YP   YD Y88888P    YP          `Y88P' YP   YP YP   YP VP   V8P  Y888P  Y88888P `8888Y' 
 *          
 *          
 */

 /**
  * getKeyChanges function compares two objects which are similar... and returns the differences.
  *     An example would be versions of a list item.
  *     the keyChanges would compare both arrays to each other and only return the keys which have values that are not equal
  * This is more for converting changes into single label per key notation that is more easily readable
  * 
  * baselineObject = { a: 1, b: 2}  compareObject = { a: 1, b: 3} => result would be newObject = { b: '2 >>> 3' }
  * 
  * 
  * POSSIBLE BREAKING CHANGE VVVVV
  * 
  * 2021-05-18:  REVISED TO START USING 2nd Paramter (now called specificKeys )
  * 
  * TO AVOID ISSUES (this paramter was received but not used in the past) - pass in null or []
  * 
  * @param baselineObject 
  * @param specificKeys ( was keySummary ) - Pass array of specific keys to check, empty or null to use keys in baselineObject
  * @param compareObject 
  * @param parseMe 
  */
 export function getKeyChanges( baselineObject: any, specificKeys: string[], compareObject : any, parseMe: boolean ): any {

    let keyChanges : any = {};
    let TestTheseKeys =[];
    
    if ( baselineObject === null || compareObject === null ) {
        TestTheseKeys = BaseFieldKeys;
        // TestTheseKeys = BaseFieldKeys; 
    } else if ( specificKeys !== null && specificKeys !== undefined && specificKeys.length > 0 ) {
        TestTheseKeys = specificKeys;
    } else {
        TestTheseKeys = baselineObject ? Object.keys( baselineObject ) : Object.keys( compareObject );
    }

    TestTheseKeys.map( key => {
        let baselineObjectVal: any = baselineObject ? baselineObject[key] : key === 'Title' ? DoesNotExistLabel : undefined;
        let compareObjectVal: any = compareObject ? compareObject[key] : key === 'Title' ? DoesNotExistLabel : undefined;
        
        //Can't directly compare arrays or objects so you have to stringify them first
        if ( typeof baselineObjectVal === 'object' ) {
            baselineObjectVal = JSON.stringify( baselineObject[key] );
        }

        //Can't directly compare arrays or objects so you have to stringify them first
        if ( typeof compareObjectVal === 'object' ) {
            compareObjectVal = JSON.stringify( compareObject[key] );
        }

        if ( baselineObjectVal !== compareObjectVal ) { 
            let keyChange = baselineObjectVal + KeyChangeDelimiter +  compareObjectVal;

            //Do not make comparisons for these...
            let ignoreCompares = [
                `undefined${KeyChangeDelimiter}null`, 
                `undefined${KeyChangeDelimiter}function(){}`,
                `undefined${KeyChangeDelimiter}[object HTMLDivElement]`,
                `undefined${KeyChangeDelimiter}[object Object]`,  //May want to come back to this one though and add back
                `undefined${KeyChangeDelimiter}`
            ];

            if ( ignoreCompares.indexOf( keyChange ) < 0 && keyChange.indexOf( `undefined${KeyChangeDelimiter}function` ) < 0 ) { 
                keyChanges[key] = keyChange ;
            }
            if ( keyChange === `undefined${KeyChangeDelimiter}[object Object]` ) {
                console.log('OBJECT NOT COMPARED', baselineObjectVal, compareObjectVal );
            }

        } 
    });
  
    if ( parseMe !== false ) { keyChanges = JSON.parse( JSON.stringify( keyChanges ) ) ; } 

    return keyChanges;
 }