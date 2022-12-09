


/**
 * findPropFromSimilarKey
 * @param obj 
 * @param anyKeyCase 
 * @param test contains means the obj.key is contained in the checkKey -
 *      Original use case:  Look to see if the current web Url is contained in DefaultBannerThemes
 *      checkKey (aka findKey = full url:  /sites/sitecollection/subsite/etc )
 *      Object.key ( /sites/sitecollection/ )
 *      Contains will find this Object.key in the checkKey string and return the value.
 * @param checkKey 
 * @param defValue 
 * @returns 
 */

 export function findPropFromSimilarKey( obj: any, anyKeyCase: boolean, checkKey: string, test: 'eq' | 'containsObjKey' | 'isContainedInObjKey' , defValue: any ) {

    let result = defValue;
    if ( typeof obj !== 'object' ) { return result; }
    else {
        let findKey = anyKeyCase === true ?  checkKey.toLowerCase() : checkKey;
        Object.keys( obj ).map ( key => {

            let objKey = anyKeyCase === true ?  key.toLowerCase() : key;

            if ( test === 'eq' ) {
                if ( findKey === objKey ) { result = obj[ key ]; }

            } else if ( test === 'containsObjKey' ) {
                if ( findKey.indexOf( objKey ) > -1 ) { result = obj[ key ]; }

            } else if ( test === 'isContainedInObjKey' ) {
                if ( objKey.indexOf( findKey ) > -1 ) { result = obj[ key ]; }

            }

        } ) ;
    }
    return result;
}