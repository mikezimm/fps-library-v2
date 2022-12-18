// EVENTUALLY MOVE THIS TO npmFunctions
export const HandleBarsRegex = /{{([^}]+)}}/gi;


export function replaceHandleBarsValues( item: any, handleBarString: string, emptyIfSubEmpty: boolean ) {

  if ( typeof handleBarString !== 'string' ) {
    return handleBarString;

  } else {
    let returnEmpty: boolean = false;
    // Get array of strings by splitting the string by any {{ or }}
    const linkSplits = handleBarString.split( HandleBarsRegex );

    // Replace first handlebars instance
    if ( linkSplits.length > 2 ) {
      const part1 = linkSplits[1]?.trim().replace('/',''); //Get column name, removing / from lookup values
      linkSplits[1] = item[ part1 ] ? item[ part1 ] : emptyIfSubEmpty === true ? '' : `${part1}` ;
      if ( !linkSplits[1] && emptyIfSubEmpty === true ) returnEmpty = true;
    }

    // Replace second handlebars instance
    if ( linkSplits.length > 4 ) { 
      const part3 = linkSplits[3]?.trim().replace('/',''); //Get column name, removing / from lookup values
      linkSplits[3] = item[ part3 ] ? item[ part3 ] : emptyIfSubEmpty === true ? '' : `${part3}` ;
      if ( !linkSplits[3] && emptyIfSubEmpty === true ) returnEmpty = true;
    }

    return returnEmpty === true ? '' : linkSplits.join('');
  }


}