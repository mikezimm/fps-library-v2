import { Icon } from 'office-ui-fabric-react';
import * as React from 'react';
import { DisplayMode } from '../../common/interfaces/@msft/1.15.2/displayMode';

import { createStyleFromString } from '../../logic/Strings/reactCSS';

import * as links from '../../components/atoms/Links/LinksRepos';
import { IWebpartBannerProps } from '../mainReact/IWebpartBannerProps';
import { makeYellowStyles } from '../../common/commandStyles/makeYellow';
import { IRepoLinks } from '../../components/atoms/Links/CreateLinks';

export function makeInfoElement( bannerProps: IWebpartBannerProps, moreInfoText: string, styleRightTitle: React.CSSProperties, 
    titleInfoOnClick: any, togglePropsHelp: any ) {

  const { feedbackEmail, gitHubRepo, bannerCmdReactCSS, infoElement } = bannerProps;
   const isMoreInfoButton = typeof infoElement === 'string' && infoElement.toLowerCase().indexOf('iconname=') === 0 ? true : false;

  const infoElements = [];

  if ( bannerProps.feedbackEmail ) {
    infoElements.push( <Icon title={ 'Submit Feedback' } iconName='Feedback' onClick={ () => sendFeedback( feedbackEmail, gitHubRepo ) } style={ bannerCmdReactCSS }/> )
  };

  if ( isMoreInfoButton === true ) {
    let iconName = infoElement.split('=')[1];
    infoElements.push( <Icon iconName={ iconName } onClick={ titleInfoOnClick } style={ bannerCmdReactCSS } title="More Information on webpart"/>);
  } else {
    infoElements.push(<div style={ styleRightTitle } onClick = { titleInfoOnClick }  title={ 'More Information on webpart' }>{moreInfoText}</div>);
  }

  if ( bannerProps.displayMode === DisplayMode.Edit ) {
    infoElements.push( 
      //Found I had to makeYellowStyles every render to make this work.
      <Icon iconName='OpenEnrollment' onClick={ togglePropsHelp } style={ makeYellowStyles ( bannerCmdReactCSS ) }
      title={ 'Property Pane Help' }/>
    );
  }
  return infoElements;

}

function sendFeedback( feedbackEmail: string, gitHubRepo: IRepoLinks ) {

  const lbreak = '%0D%0A';
  let pageName = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
  let mailTemplate = `mailto:${feedbackEmail}`;
  // let mailTemplate = `mailto:${`UpdateEmail@someday.com`}`;
  mailTemplate += `?subject=${ gitHubRepo.desc } Webpart Question or Issue on PAGE: ${ pageName }`;
  mailTemplate += `&body=Add your question or comment here: ${ lbreak }${ lbreak }${ lbreak }`;
  mailTemplate += `Page Name: ${ pageName }${ lbreak }${ lbreak }`;
  mailTemplate += `Link to page:${ lbreak }${ window.location.href }${ lbreak }${ lbreak }`;
  mailTemplate += `Best Regards, ${ lbreak }${ lbreak }`;

  window.open( mailTemplate );
}