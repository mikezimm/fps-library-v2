
import * as React from 'react';
import { IWebpartBannerProps } from '../../mainReact/IWebpartBannerProps';
import { Icon } from 'office-ui-fabric-react';

export function addExpandoIcon( nearElements: JSX.Element[], bannerProps: IWebpartBannerProps, onClickToggleExpando: any ) : JSX.Element[] {

  if ( bannerProps.expandoProps.enableExpandoramic === true ) {
    let thisIcon = bannerProps.expandoProps.expandoDefault === true ? 'BackToWindow' : 'ChromeFullScreen';
    nearElements.push( <Icon iconName={'ChromeFullScreen'} onClick={ onClickToggleExpando } style={ bannerProps.bannerCmdReactCSS } title="Toggle Expandoramic Mode"/> );
  }

  return nearElements;

}