import { Icon } from 'office-ui-fabric-react';
import * as React from 'react';
import { DisplayMode } from '../../common/interfaces/@msft/1.15.2/displayMode';

import { createStyleFromString } from '../../logic/Strings/reactCSS';

import * as links from '../../components/atoms/Links/LinksRepos';
import { IWebpartBannerProps } from '../mainReact/IWebpartBannerProps';
import { makeYellowStyles } from '../../common/commandStyles/makeYellow';
import { makeInfoElement } from './InfoElement';
import { IPinMeState } from '../features/PinMe/Interfaces';
import { bannerSettingsContent } from '../components/Gear/bannerGearFunctions';

export function mainBannerContent( bannerProps: IWebpartBannerProps, forceNarrowStyles: boolean,
    nearBannerElementsArray: JSX.Element[], farBannerElementsArray: JSX.Element[],
    showSettings: boolean, _openPanel: any, _togglePropsHelp: any ) {

  // const { showTricks, context, keySiteProps, bannerWidth } = bannerProps;

  let settingsContent = null;
  let settingsPage = null;

  if ( bannerProps.showBannerGear === true ) {
    settingsPage = bannerSettingsContent( bannerProps, forceNarrowStyles );
    settingsContent = settingsPage.content;
  }

  const showSettingsAsPivot = forceNarrowStyles === true || settingsPage?.showSettingsAsPivot === true ? true : false;

  /***
 *    .d8888. db    db d88888b d88888b d888888b db    db 
 *    88'  YP 88    88 88'     88'       `88'   `8b  d8' 
 *    `8bo.   88    88 88ooo   88ooo      88     `8bd8'  
 *      `Y8b. 88    88 88~~~   88~~~      88     .dPYb.  
 *    db   8D 88b  d88 88      88        .88.   .8P  Y8. 
 *    `8888Y' ~Y8888P' YP      YP      Y888888P YP    YP 
 *                                                       
 *                                                       
 */


  const bannerSuffix = '';
  //Exclude the props.bannerProps.title if the webpart is narrow to make more responsive
  let bannerTitle = bannerProps.bannerWidth < 900 ? bannerProps.title : `${bannerProps.title} ${ ( bannerSuffix ? ' - ' + bannerSuffix : '' ) }`;

  if ( bannerTitle === '' ) { bannerTitle = 'ignore' ; }
  if ( bannerProps.displayMode === DisplayMode.Edit ) { bannerTitle += '' ; }


/***
 *    d8888b.  .d8b.  d8b   db       .o88b.  .d88b.  d8b   db d888888b d88888b d8b   db d888888b 
 *    88  `8D d8' `8b 888o  88      d8P  Y8 .8P  Y8. 888o  88 `~~88~~' 88'     888o  88 `~~88~~' 
 *    88oooY' 88ooo88 88V8o 88      8P      88    88 88V8o 88    88    88ooooo 88V8o 88    88    
 *    88~~~b. 88~~~88 88 V8o88      8b      88    88 88 V8o88    88    88~~~~~ 88 V8o88    88    
 *    88   8D 88   88 88  V888      Y8b  d8 `8b  d8' 88  V888    88    88.     88  V888    88    
 *    Y8888P' YP   YP VP   V8P       `Y88P'  `Y88P'  VP   V8P    YP    Y88888P VP   V8P    YP    
 *                                                                                               
 *                                                                                               
 */

  //  Estimated width pixels used by banner.  Used to determine max size of the title component.
  let usedWidth = 40; //20px padding on outside of all elements
  usedWidth += nearBannerElementsArray.length * 43 + farBannerElementsArray.length * 43;  //Add 45px per icon button
  // usedWidth += 40; //Padding between near/far elements and the text part of heading
  const remainingWidth = bannerProps.bannerWidth - usedWidth - 40;

  let moreInfoText: string = bannerProps.infoElement ? bannerProps.infoElement : 'More Information';

  let bannerTitleText = bannerTitle && bannerTitle.length > 0 ? bannerTitle.trim() : 'FPS Webpart';
  const textWidth = ( moreInfoText.length + bannerTitleText.length ) * 19 + 40; //characters * 19px + 40 padding

  if ( bannerTitleText && ['hide','ignore','empty'].indexOf( bannerTitleText.toLowerCase() ) >= 0 ) {
    bannerTitleText = '';
    }

  //  If space between < estimated space needed, apply ratio, else just leave large on both sides so the math works.
  const moreInfoRatio = textWidth > remainingWidth ? moreInfoText.length / ( moreInfoText.length + bannerTitleText.length ) : .7;
  const titleRatio = textWidth > remainingWidth ? 1 - moreInfoRatio : .7;

  if ( bannerProps.bannerWidth < 700 && moreInfoText.length > 5 ) {
    moreInfoText = moreInfoText === 'More Information' ? 'Info' : moreInfoText.substring(0,5) + '...';

  }

  // usedWidth += 18 * bannerTitleText.length; //Est 18px per character of title

  const hasNear = nearBannerElementsArray.length > 0 ? true : false;
  const hasFar = farBannerElementsArray.length > 0 ? true : false;

  const hasNearOrFar = hasNear === true || hasFar === true ? true : false;

  let bannerStyle: React.CSSProperties = {};
  if ( bannerProps.bannerReactCSS ) { bannerStyle = bannerProps.bannerReactCSS ; } 
  else if ( bannerProps.styleString ) { bannerStyle = createStyleFromString( bannerProps.styleString, { background: 'green' }, 'bannerStyle in banner/component.tsx ~ 81' ); }

  if ( !bannerStyle.height ) { bannerStyle.height = '35px' ; }
  if ( !bannerStyle.paddingLeft ) { bannerStyle.paddingLeft = '20px' ; }
  if ( !bannerStyle.paddingRight ) { bannerStyle.paddingRight = '20px' ; }
  if ( hasNearOrFar === false ) { bannerStyle.cursor = 'pointer' ; }

  const classNames = [ 'container', bannerProps.hoverEffect === true ? 'opacity' : null, 'flex-container' ].join( ' ' ); 

  //  On clicks need to be defined like this and only put on specific elements in certain cases.
  //  OR ELSE they will all get fired messing up panel open


  const bannerOnClick = hasNearOrFar !== true ? _openPanel : undefined;
  const titleInfoOnClick = hasNearOrFar === true ? _openPanel : undefined;
  const titleInfoCursor = hasNearOrFar === true ? 'pointer' : undefined;
  const styleFlexElements : React.CSSProperties = { padding: '10px', cursor: titleInfoCursor };

  //Added for https://github.com/mikezimm/PageInfo/issues/30
  const isPinned = bannerProps.domElement && bannerProps.domElement.offsetParent && bannerProps.domElement.offsetParent.classList.contains( 'pinMeWebPartDefault') ? true : false;
  const isPageInfo = bannerProps.gitHubRepo.desc === links.gitRepoPageInfoSmall.desc ? true : false;
  const maxWidth = isPinned === true || isPageInfo === true ? '200px' : titleRatio * remainingWidth;

  const styleLeftTitle : React.CSSProperties = { padding: '10px', cursor: titleInfoCursor, maxWidth: maxWidth, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }; 
  const styleRightTitle : React.CSSProperties = { padding: '10px', cursor: titleInfoCursor, maxWidth: moreInfoRatio * remainingWidth, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }; 


  /***
 *    d888888b d8b   db d88888b  .d88b.       d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
 *      `88'   888o  88 88'     .8P  Y8.      88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
 *       88    88V8o 88 88ooo   88    88      88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
 *       88    88 V8o88 88~~~   88    88      88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
 *      .88.   88  V888 88      `8b  d8'      88.     88booo. 88.     88  88  88 88.     88  V888    88    
 *    Y888888P VP   V8P YP       `Y88P'       Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
 *                                                                                                         
 *                                                                                                         
 */

  const infoElement = makeInfoElement( bannerProps, moreInfoText, styleRightTitle, titleInfoOnClick, _togglePropsHelp )


/***
 *    d8888b. db    db d888888b db      d8888b.                                       
 *    88  `8D 88    88   `88'   88      88  `8D                                       
 *    88oooY' 88    88    88    88      88   88                                       
 *    88~~~b. 88    88    88    88      88   88                                       
 *    88   8D 88b  d88   .88.   88booo. 88  .8D                                       
 *    Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'                                       
 *                                                                                    
 *                                                                                    
 *    db      d88888b d88888b d888888b      d8888b. d888888b  d888b  db   db d888888b 
 *    88      88'     88'     `~~88~~'      88  `8D   `88'   88' Y8b 88   88 `~~88~~' 
 *    88      88ooooo 88ooo      88         88oobY'    88    88      88ooo88    88    
 *    88      88~~~~~ 88~~~      88         88`8b      88    88  ooo 88~~~88    88    
 *    88booo. 88.     88         88         88 `88.   .88.   88. ~8~ 88   88    88    
 *    Y88888P Y88888P YP         YP         88   YD Y888888P  Y888P  YP   YP    YP    
 *                                                                                    
 *                                                                                    
 */


  const appendTitle = bannerProps.appendTitle ? bannerProps.appendTitle : '';

  const bannerLeft = nearBannerElementsArray.length === 0 ? <div style={ styleFlexElements } onClick = { titleInfoOnClick } > { bannerTitleText } </div> :
    <div className={ 'flex-left-nowrap-start' }>
      { nearBannerElementsArray }
      <div style={ styleLeftTitle } onClick = { titleInfoOnClick } title={ bannerTitleText }> { bannerTitleText } { appendTitle } </div>
    </div>;

  const bannerRight = farBannerElementsArray.length === 0 && infoElement.length === 0 ? <div style={ styleFlexElements } onClick = { titleInfoOnClick } >{moreInfoText}</div> :
    <div className={ 'flex-left-nowrap-start' }>
      { [ ...farBannerElementsArray, ...infoElement, ] }
    </div>;



  let showSettingStyle = showSettingsAsPivot === true ? 'show-settings show-settings-pivot' : 'show-settings show-settings-flex';
  console.log('showSettingStyle ~ 326', showSettingStyle );

  let bannerContent = 
  <div>
    <div className={ classNames } style={ bannerStyle } onClick = { bannerOnClick }>
      { bannerLeft }
      { bannerRight }
    </div>
    <div className={ showSettings ? showSettingStyle: 'hide-settings' } style={ {} }>
      { settingsContent }
    </div>
  </div>;

  return bannerContent;

}