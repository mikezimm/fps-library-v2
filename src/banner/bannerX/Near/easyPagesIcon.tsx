
import * as React from 'react';
import { IWebpartBannerProps } from '../../mainReact/IWebpartBannerProps';
import { Icon } from 'office-ui-fabric-react';

export function addEasyPagesIcon( nearElements: JSX.Element[], bannerProps: IWebpartBannerProps, _toggleEasyLinks: any ) : JSX.Element[] {

  if ( bannerProps.easyPagesExtraProps.EasyPagesEnable === true )  {
    nearElements.push(
      <Icon key='Link12' iconName='Link12' onClick={ _toggleEasyLinks } style={ bannerProps.bannerCmdReactCSS }/>
    );
  }

  return nearElements;

}