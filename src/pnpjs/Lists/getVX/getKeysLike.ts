/**
 * This was originally used in Pivot Tiles ...
 * 
 * VERIFIED SAME AS getKeysLikeV2 from Drilldown.
 * 
 * getKeysLike function takes an object like "props"
 *      looks for specific keys that begin with a string like 'col'
 *      and returns those keys back in an array.
 *      Use case:  Look for props that begin with 'col' which will then return all the known or mapped static column names
 * @param thisProps
 * @param findMe
 * @param findOp
 */

  export function getKeysLike( thisProps: any, findMe: string, findOp: string ): string[] {  //2022-08-26:  Added types to eliminate tsc errors
    //Sample call:  getKeysLike(this.props,"col","begins")
    //console.log('FoundProps that ' + findOp + ' with ' + findMe);
    //console.log(thisProps);
    const allKeys = Object.keys(thisProps);
    let foundKeys: string[]  = [];
    const lFind = findMe.length;

    findMe = findMe.toLowerCase();
    findOp = findOp.toLowerCase();

    if (findOp==="begins") {
      foundKeys = allKeys.filter(k => k.toLowerCase().indexOf(findMe) === 0);
    } else if (findOp === "ends") {
      foundKeys = allKeys.filter(k => k.toLowerCase().indexOf(findMe) === ( k.length - lFind));
    } else {
      foundKeys = allKeys.filter(k => k.toLowerCase().indexOf(findMe) > -1);
    }

    let foundProps: string[] = [];
    for (let thisProp of foundKeys) {
      if (thisProp && thisProp !== "" ) { foundProps.push( thisProps[thisProp] ) ; }
    }

    return foundProps;
  }
