import * as React from 'react';

/**
 * NOTE:  In npmFunctions, RegexXMLOpenProp was in this location.
 * import { RegexXMLOpenProp } from '../Services/Regex/constants';
 * 
 * Since the file only had a couple constants, I just brought it in here for easy of use
 * NOTE that rest of Strings functions went into fps-JS
 */

//RegexXMLOpenProp looks for a Quote, then space, then Capital Letter - like a prop in an xml element
//Originally used in ../Stings/Formatting > getArrayOfXMLElements
export const RegexXMLOpenProp = /[\"] [A-Z]/g;

export function buildMLineDiv ( indent: number, element: string | JSX.Element ) : JSX.Element {
  let spaces4 = indent > 0 ? '\u00a0' + '\u00a0' + '\u00a0' + '\u00a0' : null;
  let spaces = '';

  let doElement = null;

  if ( typeof element === 'string' ) {
    //This splits string for LineFeed character
    doElement = element.split('&#xA;');

  } else { doElement = [ element ]; }

  if ( indent >= 1 ) { spaces += spaces4; }
  if ( indent >= 2 ) { spaces += spaces4; }
  if ( indent >= 3 ) { spaces += spaces4; }
  if ( indent >= 4 ) { spaces += spaces4; }
  if ( indent >= 5 ) { spaces += spaces4; }

  let newDiv = <div> {
      doElement.map( el => {
        return <div>{ spaces }{ el }</div>;
      })
    } 
  </div>;
  return newDiv;

}

export function getArrayOfXMLElements ( thisXMLString: string ): JSX.Element[] {

  console.log( 'getWebXML thisXMLString:', thisXMLString );

  let sample = thisXMLString ;
  let xmlArray = [];

  do {
    let loc = sample.search(RegexXMLOpenProp);
    if (xmlArray.length === 0 ) {
      //Do this to split the xml tag out
      let firstSlice = sample.slice(0, loc + 1 );
      let loc2 = firstSlice.indexOf(' ');
      let tag = firstSlice.slice(0, loc2 );
      let prop = firstSlice.slice(loc2 + 1 );
      xmlArray.push( buildMLineDiv(0,tag) );
      xmlArray.push( buildMLineDiv(2,prop) );

    } else {
      xmlArray.push( buildMLineDiv(2, sample.slice(0, loc + 1 ) ) );

    }

    sample = sample.slice( loc + 2 );

  } while ( sample.search(RegexXMLOpenProp) > 0 );

  xmlArray.push( buildMLineDiv(2, sample ) );

  console.log( 'getWebXML:', sample, xmlArray);

  /*
  let x = sample.search(RegexXMLOpenProp);

  function testMe(str, index, replacement) {
      return str.substr(0, index + 1) + replacement + str.substr(index + 2);
  }

  let newV = testMe(sample,x,'---');

  console.log(newV);
  */

  return xmlArray;

}