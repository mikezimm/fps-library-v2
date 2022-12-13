
import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';
import { IWebpartBannerProps } from '../../mainReact/IWebpartBannerProps';

export function addBeAUserIcons( nearElements: JSX.Element[], bannerProps: IWebpartBannerProps ) : JSX.Element[] {

  if ( bannerProps.showBeAUserIcon === true && bannerProps.beAUserFunction ) {

    nearElements.push( 
      <Icon iconName='Glasses' 
        onClick={ bannerProps.beAUserFunction } 
        style={ bannerProps.bannerCmdReactCSS } 
        title="Simulate a typical visitor experience"
      />);

  }

  return nearElements;

}