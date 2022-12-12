/**
 * See full file in C:\Users\me\OneDrive...\SharePoint
 */

// Need to add:  ?{}[],

import { decrpt, encrpt } from './verify';

export function encrptMeOriginalTest( str: string ) {
  let result: string = '';

  for (var i = 0; i < str.length; i++) {
    let testChar = str.charAt(i);
    
    let idx = encrpt.indexOf( testChar ) ;
    //console.log( testChar, i, idx);

    if ( idx === -1 ) {
      result += testChar;
    } else if ( isOdd(i) === true ){
      result += decrpt.charAt(decrpt.length -1 - idx);
    } else {
      result += decrpt.charAt(idx);
    }
  }
  return result;
}

function isOdd(num: number) { return (num % 2) == 1;}


/**
 * 
  function encrptMeOriginalTestX( str ) {
    let result = '';

    for (var i = 0; i < str.length; i++) {
      let testChar = str.charAt(i);
      
      let idx = encrpt.indexOf( testChar ) ;
      //console.log( testChar, i, idx);

      if ( idx === -1 ) {
        result += testChar;
      } else if ( isOdd(i) === true ){
        result += decrpt.charAt(decrpt.length -1 - idx);
      } else {
        result += decrpt.charAt(idx);
      }
    }
    return result;
  }
 */
