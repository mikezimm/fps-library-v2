
import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';
import { IWebpartBannerProps } from '../../mainReact/IWebpartBannerProps';

export function addGearIcon( nearElements: JSX.Element[], bannerProps: IWebpartBannerProps, onClickShowSettings: any ) : JSX.Element[] {

  nearElements.push( <Icon iconName='PlayerSettings' onClick={ onClickShowSettings } style={ bannerProps.bannerCmdReactCSS } title="Show Settings quick links and info"/> );
  return nearElements;

}