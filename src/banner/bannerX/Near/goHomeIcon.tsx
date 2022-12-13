
import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';
import { goToHomePage } from '../../../logic/Links/Navigation';
import { IWebpartBannerProps } from '../../mainReact/IWebpartBannerProps';

export function addHomeIcon( nearElements: JSX.Element[], bannerProps: IWebpartBannerProps ) : JSX.Element[] {

  if ( bannerProps.onHomePage !== true && bannerProps.showGoToHome === true ) {
    let titleHome = 'Go to Home Page of current site';
    this.hasNear = true;
    this.hasNearOrFar = true;

    //This is the easy fix that assumes the page is not in a folder in site pages.
    this.nearElements.push(<div style={{ paddingRight: undefined }} className={ '' } title={ titleHome } >
      <Icon iconName='Home' onClick={ ( ) => goToHomePage( bannerProps.context.pageContext ) } 
        style={ bannerProps.bannerCmdReactCSS }/>
    </div>);
  }

  return nearElements;

}
