
import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';
import { goToParentSite } from '../../../logic/Links/Navigation';
import { IWebpartBannerProps } from '../../mainReact/IWebpartBannerProps';

export function addParentIcon( nearElements: JSX.Element[], bannerProps: IWebpartBannerProps ) : JSX.Element[] {

  const pageContext = bannerProps.context.pageContext;
  if ( bannerProps.showGoToParent === true && 
    pageContext.site.absoluteUrl !== pageContext.web.absoluteUrl ) {

    let title = 'Go to parent site';
    nearElements.push(<div style={{ paddingRight: undefined }} className={ '' } title={ title}>
      <Icon iconName='Up' onClick={ ( ) => goToParentSite( pageContext ) } style={ bannerProps.bannerCmdReactCSS }/>
    </div>);

  }

  return nearElements;

}