import * as React from "react";

export interface ICurleyBraceCheck {
  errMessage: string;
  string: string;
  parsed: React.CSSProperties;
}

/**
 * Created from BoxStyles in order to create React.CSSProperties from strings.
 * @param key  - purely for error feedback
 * @param value 
 */

export function getReactCSSFromString( key: string, value: string, fallback: React.CSSProperties,  ) : ICurleyBraceCheck {

  let result: ICurleyBraceCheck = {
    errMessage: '',
    string: value,
    parsed: fallback,
  };

  if ( !value || value === null || value === undefined || value === '' ) {
    result.string = '';

  } else {

    try {
      if ( value && value.length > 0 ) {
        if ( value.indexOf('{') !== 0 ) { value = '{' + value ;}
        if ( value.lastIndexOf('}') !== value.length -1 ) { value += '}' ;}
        result.parsed = JSON.parse( value );
      }
    } catch(e){
      // errMessage = getHelpfullErrorV2( e, true, true, null ); //'BoxTilesWebpart.ts ~ boxStyles.' + key
      result.errMessage = `${key} value is not correct JSON format - React.CSSProperties type but without outer { "background":"red" }`;
      console.log('Unable to understand this style string:', value + '' );
  
    }

  }

  return result;

}

/**
 * Copied from banner/component.tsx origilly in ECStorage project
 * @param styleString 
 * @param fallback 
 */

export function createStyleFromString( styleString: string, fallback: React.CSSProperties, traceString: string, ) {
  let thisStyle: React.CSSProperties = {};

  if ( !styleString || styleString === null || styleString === undefined ) {
    return fallback;
  }
  if ( typeof styleString !== 'string' ) {
    console.log('StringToReactCSS.ts ~ 62 detected unknown type' ) ;
    return fallback;
  }

  styleString = styleString.trim() + '';  //Added to insure it never modifies the original

  //Add leading and trailing curley as needed
  if ( styleString.indexOf('{') < 0 ) { styleString = '{' + styleString ; }
  if ( styleString.lastIndexOf('}') !== styleString.length -1 ) { styleString = styleString + '}' ; }

  //replace single quotes with double because you sometimes have one or the other.
  styleString = styleString.replace(/'/g, '"');

  //replace all semi-colons with commas just to help when typing and make a typo
  styleString = styleString.replace(/;/g, ',');

  try {
      thisStyle = JSON.parse( styleString );

  } catch(e) {
    console.log('Unable to understand this style string:', styleString + '' );  //doing + '' so that if you pause in console but later modify, it does not change
    thisStyle = fallback;

  }

  return thisStyle;

}
