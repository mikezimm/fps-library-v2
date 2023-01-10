

export type IReturnErrorType = 'Actual' | 'FullError' | 'ShortError' | 'EmptyString';

/**
 * checkDeepProperty - Originally built for Pivot Tiles banner component 
 * Checks for sub-sub-property of object by going one layer at a time to avoid undefined error
 * 
 * @param obj - parent object you want to check
 * @param keys - key array to check (parent.check.this keys are ['check','this'] )
 * @param errReturnType - what to do when there is an error
 * @param consoleLog - true is default due to being used before.  Set to false to not show in console if it is not neccessary.
 */

export function checkDeepProperty( obj: any, keys: string[] , errReturnType: IReturnErrorType, consoleLog: boolean = true ) : any {

  if ( !keys || keys.length === 0 ) { return obj; }
  else {
    let returnValue: any = null;
    let isUndefined: boolean = false;
    let lastTestedKey: string = 'obj';
    let subObject: any = obj;

    keys.map ( (key, index) => {

      let isLastKey = index === keys.length -1 ? true : false;

      if ( isUndefined === false ) {
        subObject = subObject[key];

        lastTestedKey += '.' + key ;

        if ( subObject === undefined ) {
          isUndefined = true;
          if ( errReturnType === 'Actual' ) { returnValue = undefined ; }
          else if ( errReturnType === 'EmptyString' ) { returnValue = '' ; }
          else if ( errReturnType === 'FullError' ) { returnValue = `${lastTestedKey} = undef` ; }
          else if ( errReturnType === 'ShortError' ) { returnValue = `...${key} = undef` ; }
          if ( consoleLog === true ) console.log('Object Error: checkDeepProperty ~ 39: ', `${lastTestedKey} = undef` );

        } else if ( subObject === null ) {
          isUndefined = true;

          if ( errReturnType === 'Actual' ) { returnValue = null ; }
          else if ( errReturnType === 'EmptyString' ) { returnValue = '' ; }
          else if ( errReturnType === 'FullError' ) { returnValue = `${lastTestedKey} = undef` ; }
          else if ( errReturnType === 'ShortError' ) { returnValue = `...${key} = undef` ; }
          if ( consoleLog === true ) console.log('Object Error: checkDeepProperty ~ 48: ', `${lastTestedKey} = null` );

        } else {

          if ( isLastKey ) {//This is the actual value to test.
            returnValue = subObject;
          }
        }
      }

    });

    return returnValue;
  }
}
