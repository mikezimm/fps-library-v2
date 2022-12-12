import * as React from 'react';
import { defaultBannerCommandStyles } from './defaults';

type stringOrNull = string | null;

export function adjustCmdStyles( bannerCmdReactCSS: React.CSSProperties, margin: stringOrNull, backgroundColor: stringOrNull, color: stringOrNull, fontSize: stringOrNull, padding: stringOrNull  ) {

  const propsCmdCSS: React.CSSProperties = JSON.parse(JSON.stringify( bannerCmdReactCSS ));

  if ( margin !== null ) propsCmdCSS.marginLeft = margin;
  if ( backgroundColor !== null ) propsCmdCSS.backgroundColor = backgroundColor;
  if ( color !== null ) propsCmdCSS.color = color;
  if ( fontSize !== null ) propsCmdCSS.fontSize = fontSize;
  if ( padding !== null ) propsCmdCSS.padding = padding;

  return propsCmdCSS;

}

export function alvFMCmdStyles( bannerCmdReactCSS: React.CSSProperties ): React.CSSProperties {

  const finalCSS: React.CSSProperties = adjustCmdStyles( bannerCmdReactCSS, '0px 0px 0px 30px', 'transparent', null, '24px', null );
  return finalCSS;

};

export function pageInfoCmdStyles( bannerCmdReactCSS: React.CSSProperties ): React.CSSProperties {

  const finalCSS: React.CSSProperties = adjustCmdStyles( bannerCmdReactCSS, '0px 0px 0px 30px', 'transparent', null, null, null );
  return finalCSS;

};

/**
 * This is used by ss7 for buttons on Code Page - white buttons, black color for gray canvas
 * Just adjusts the margin on default white/black buttons
 * @param bannerCmdReactCSS 
 * @returns 
 */
export function adjustDefaultCmdMargin( margin: stringOrNull ): React.CSSProperties {

  const finalCSS: React.CSSProperties = adjustCmdStyles( defaultBannerCommandStyles, margin, null, null, null, null );
  return finalCSS;

};

/**
 * This is used by ss7 for creating buttons with different colors (like red and yellow)
 * @param margin 
 * @param backgroundColor 
 * @param color 
 * @returns 
 */
export function adjustDefaultCmdColorMargin( margin: stringOrNull, backgroundColor: stringOrNull, color: stringOrNull, ): React.CSSProperties {

  const finalCSS: React.CSSProperties = adjustCmdStyles( defaultBannerCommandStyles, margin, backgroundColor, color, null, null );
  return finalCSS;

};
