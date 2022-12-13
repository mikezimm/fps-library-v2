
import * as React from 'react';

export function makeYellowStyles( defStyles: React.CSSProperties | undefined ) {

  if ( !defStyles ) {
    return {};

  } else {
    let newStyle: React.CSSProperties = JSON.parse(JSON.stringify( defStyles ));
    newStyle.color = 'black';
    newStyle.background = 'yellow';
    newStyle.fontSize = '20px';
    newStyle.fontWeight = 400;
    newStyle.padding = '7px';
    newStyle.marginLeft = '10px';
    return newStyle;
  }

}