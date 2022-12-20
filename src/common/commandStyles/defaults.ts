
import * as React from "react";

export const defaultBannerCommandStyles : React.CSSProperties = {
  backgroundColor: 'white' ,
  color: 'black' ,

  fontSize: 20,
  fontWeight: 'normal',
  fontStyle: 'normal',
  padding: '7px',
  margin: '0px 4px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export const baseBannerStyles : React.CSSProperties = {
  color: 'black',
  backgroundColor: '#cfcfcf',
  
  fontSize: 'larger',
  fontWeight: 600,
  fontStyle: 'normal',
  padding: '0px 10px',
  // margin: '0px 4px',
  height: '48px', //48px is the height of the top app bar and waffle for when doing full page app
  cursor: 'pointer',
}

export const baseBannerCmdStyles : React.CSSProperties = {
  color: 'black',
  backgroundColor: 'white',

  fontSize: 20,
  fontWeight: 'normal',
  fontStyle: 'normal',
  padding: '7px',
  marginRight: '9px',
  borderRadius: '5px',
  cursor: 'pointer',
}

export const corpDark1 : React.CSSProperties = {
  backgroundColor: '#005495' , color: 'white' ,
};

export const corpWhite1 : React.CSSProperties = {
  backgroundColor: 'white' , color: '#005495' ,
};

export const corpDark2 : React.CSSProperties = {
  backgroundColor: '#0078D7' , color: 'white' ,
};

export const corpWhite2 : React.CSSProperties = {
  backgroundColor: 'white' , color: '#0078D7' ,
};

export const redDark : React.CSSProperties = {
  backgroundColor: '#C80000' , color: 'white' ,
};

export const redLight : React.CSSProperties = {
  backgroundColor: 'white' , color: '#C80000' ,
};

export const greenDark : React.CSSProperties = {
  backgroundColor: '#147A1E' , color: 'white' ,
};

export const greenLight : React.CSSProperties = {
  backgroundColor: 'white' , color: '#147A1E' ,
};

export const ukraine : React.CSSProperties = {
  backgroundColor: '#005BBB' , color: '#FFD500' ,
};

export const bannerThemes = [
  defaultBannerCommandStyles,
  corpDark1, corpWhite1,
  corpDark2, corpWhite2,
  redDark, redLight, 
  greenDark, greenLight,
  ukraine ];

export const bannerThemeKeys = [
  'defaultBannerCommandStyles',
  'corpDark1', 'corpWhite1',
  'corpDark2', 'corpWhite2',
  'redDark', 'redLight', 
  'greenDark', 'greenLight',
  'ukraine' ,
  'custom', 'lock',
];

export function makeCSSPropPaneString( obj:  React.CSSProperties ) {
  
  let result = JSON.stringify( obj ? obj : {} );
  result.replace(/'/g, '"');
  return result;
}

export function createBannerStyleStr( choice: string, cmdOrBanner: 'cmd' | 'banner' ) {
  let result: string = createBannerStyle( choice, cmdOrBanner, true );
  return result;
}

export function createBannerStyleObj( choice: string, cmdOrBanner: 'cmd' | 'banner' ) {
  let result: React.CSSProperties = createBannerStyle( choice, cmdOrBanner, false );
  return result;
}

export function createBannerStyle( choice: string, cmdOrBanner: 'cmd' | 'banner', asString: boolean ) {

  const base = cmdOrBanner === 'cmd' ?  baseBannerCmdStyles: baseBannerStyles;
  let baseCSS: any = JSON.parse( JSON.stringify( base ));

  let idx = choice ? bannerThemeKeys.indexOf( choice ) : 0;
  if ( choice && idx > 0 ) {
    let themeCSS: any = JSON.parse( JSON.stringify( bannerThemes[ idx ] ));
    Object.keys( themeCSS ).map ( key => {
      baseCSS[ key ] = themeCSS[ key ];
    });
  }

  if ( asString === true ) {
    return makeCSSPropPaneString ( baseCSS ) as any;

  } else {
    return baseCSS as React.CSSProperties;

  }
}

import {  IPropertyPaneDropdownOption,  } from '@microsoft/sp-property-pane';

export const bannerThemeChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
  {   index: 0,   key: 'defaultBannerCommandStyles', text: "Default"  },
  {   index: 1,   key: 'corpDark1', text: "corpDark1"  },
  {   index: 2,   key: 'corpWhite1', text: "corpWhite1"  },
  {   index: 3,   key: 'corpDark2', text: "corpDark2"  },
  {   index: 4,   key: 'corpWhite2', text: "corpWhite2"  },
  {   index: 5,   key: 'redDark', text: "redDark"  },
  {   index: 6,   key: 'redLight', text: "redLight"  },
  {   index: 7,   key: 'greenDark', text: "greenDark"  },
  {   index: 8,   key: 'greenLight', text: "greenLight"  },
  {   index: 9,   key: 'ukraine', text: "Ukraine"  },
  {   index: 10,   key: 'custom', text: "Custom"  },
  {   index: 11,   key: 'lock', text: "Lock"  },

];


export const bannerInfoEleChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
  {   index: 0,   key: 'Text', text: "More Information"  },
  {   index: 1,   key: 'IconName=Unknown', text: "Question mark circle"  },
  {   index: 2,   key: 'IconName=UnknownSolid', text: "Question mark solid circle"  },
  {   index: 3,   key: 'IconName=Help', text: "Question mark"  },
  {   index: 4,   key: 'IconName=ReceiptTentative', text: "Question mark lines"  },
  {   index: 5,   key: 'IconName=Info', text: "i in circle"  },
  {   index: 6,   key: 'IconName=InfoSolid', text: "i in solid circle"  },
  {   index: 7,   key: 'IconName=UnknownCall', text: "Telephone with Question mark"  },
  {   index: 8,   key: 'IconName=Emoji2', text: "Smiling emoji"  },
  {   index: 9,   key: 'IconName=Sad', text: "Sad emoji"  },
  {   index: 10,   key: 'IconName=Education', text: "Education"  },
  {   index: 11,   key: 'IconName=HandsFree', text: "Hand"  },
];