
// import { DisplayMode } from "@microsoft/sp-core-library";

import { baseBannerCmdStyles, baseBannerStyles } from "../../common/commandStyles/defaults";
import { DisplayMode, } from "../../common/interfaces/@msft/1.15.2/displayMode";
import { createPerformanceTableVisitor, } from "../../components/indexes/Performance";

import {  verifyAudienceVsUser } from "../../logic/indexes/Users";
import { getReactCSSFromString, ICurleyBraceCheck } from "../../logic/Strings/reactCSS";
import { ISpecialMessage } from "../components/SpecialBanner/interface";
import { visitorPanelInfo } from "../components/VisitorPanel/VisitorPanelComponent";
import { IWebpartBannerProps } from "../mainReact/IWebpartBannerProps";

import { SPPermission } from '@microsoft/sp-page-context';
import { createEasyPagesSourceWPProps } from "../components/EasyPages/createEasyPagesSourceWPProps";
import { createEasyPagesExtraWPProps } from "../components/EasyPages/createEasyPagesExtraWPProps";
import { createEasyIconsWPProps } from "../../components/atoms/EasyIcons/createEasyIconsWPProps";

import { createKeySiteProps } from "../components/Gear/CreateKeySiteProps";
import { IThisFPSWebPartClass } from "./IThisFPSWebPartClass";


export interface IMainWPBannerSetupX {
  main: IThisFPSWebPartClass
  exportProps: any;
  strings: any;
  wideToggle: boolean;
  expandConsole: boolean;
  SpecialMessage?: ISpecialMessage;
}

/**
 * This function takes the main webpart class
 * @param setup 
 * @returns 
 */

export function mainWebPartRenderBannerSetupX( setup: IMainWPBannerSetupX ) : IWebpartBannerProps {

  const { displayMode, _beAReader, _FPSUser, properties, _modifyBannerTitle, _forceBanner, _sitePresets, _disablePandoramic, } = setup.main;
  const { pageContext, _pageLayoutType } = setup.main.context;

  const renderAsReader = displayMode === DisplayMode.Read && _beAReader === true ? true : false;

  let showTricks: any = false;
  setup.main._trickyEmailsAll.map( getsTricks => {
    if ( pageContext.user && pageContext.user.loginName && pageContext.user.loginName.toLowerCase().indexOf( getsTricks ) > -1 ) { 
      showTricks = true ;
      properties.showRepoLinks = true; //Always show these users repo links
    }
    } );

  properties.showBannerGear = verifyAudienceVsUser( _FPSUser , showTricks, properties.homeParentGearAudience, null, renderAsReader );

  let errMessage = '';
  let validDocsContacts = ''; //This may no longer be needed if links below are commented out.

  if ( ( properties.documentationIsValid !== true && properties.documentationLinkUrl ) //This means it failed the url ping test... throw error
  || ( properties.requireDocumentation === true && !properties.documentationLinkUrl ) ) {//This means docs are required but there isn't one provided
      errMessage += ' Invalid Support Doc Link: ' + ( properties.documentationLinkUrl ? properties.documentationLinkUrl : 'Empty.  ' ) ; validDocsContacts += 'DocLink,'; 
  }

  if ( properties.requireContacts === true ) {
    if ( !properties.supportContacts || properties.supportContacts.length < 1 ) { 
      errMessage += ' Need valid Support Contacts' ; validDocsContacts += 'Contacts,'; 
    }
  }


  const replacePanelWarning = `Anyone with lower permissions than '${properties.fullPanelAudience}' will ONLY see this content in panel`;


  //  Updated for SPA to get Title which is also the window.name property  https://github.com/mikezimm/drilldown7/issues/243
  const bannerTitle = _modifyBannerTitle === true && properties.bannerTitle && properties.bannerTitle.length > 0 ? properties.bannerTitle : 
      _pageLayoutType === 'SingleWebPartAppPageLayout' ? document.title : setup.main._repoLink.desc;

  const bannerStyle: ICurleyBraceCheck = getReactCSSFromString( 'bannerStyle', properties.bannerStyle, baseBannerStyles );
  const bannerCmdStyle: ICurleyBraceCheck = getReactCSSFromString( 'bannerCmdStyle', properties.bannerCmdStyle, baseBannerCmdStyles );

  //Over-rides gear for certain users
  const showRepoLinks = renderAsReader === true || properties.showRepoLinks === false ? false : true;

  const isSiteAdmin = renderAsReader !== true && _FPSUser.isSiteAdmin === true ? true : false;

  const hasCustomizePages = isSiteAdmin === true ? true :
      verifyAudienceVsUser( _FPSUser, showTricks, properties.homeParentGearAudience , SPPermission.addAndCustomizePages, renderAsReader );

  const homeParentGearAudience = isSiteAdmin === true ? true : verifyAudienceVsUser( _FPSUser, showTricks, properties.homeParentGearAudience , null, renderAsReader );
  const showBannerGear = isSiteAdmin === true ? true : properties.showBannerGear === true && homeParentGearAudience === true ? true : false;
  const showGoToHome = isSiteAdmin === true ? true : properties.showGoToHome === true && homeParentGearAudience === true ? true : false;
  const showGoToParent = isSiteAdmin === true ? true : properties.showGoToParent === true && homeParentGearAudience === true ? true : false;

  const showExport = isSiteAdmin === true ? true : properties.showExport === true && hasCustomizePages !== true ? false : true; 

  const enableExpandoramic = _disablePandoramic === true || properties.enableExpandoramic === false ? false :
      verifyAudienceVsUser( _FPSUser, showTricks, properties.expandoAudience , null, renderAsReader );

  //Always show full panel if you are SCA
  const showFullPanel = isSiteAdmin === true ? true : verifyAudienceVsUser( _FPSUser, showTricks, properties.fullPanelAudience , SPPermission.editListItems, renderAsReader );

  //Over-rides expand for certain users

  //  Changed expandoStyle from buildExpandoStyle function based on https://github.com/mikezimm/CoreFPS114/issues/6
  //  let expandobuildExpandoStyle = buildExpandoStyle( errMessage, properties, bbs.errorObjArray, bbs.expandoErrorObj );
  const expandoStyleObject = getReactCSSFromString( 'expandoStyle', properties.expandoStyle, {}  );

  const styleErrors : string[] = [];
  if ( bannerStyle.errMessage ) { styleErrors.push( bannerStyle.errMessage ) ; }
  if ( bannerCmdStyle.errMessage ) { styleErrors.push( bannerCmdStyle.errMessage ) ; }
  if ( expandoStyleObject.errMessage ) { styleErrors.push( expandoStyleObject.errMessage ) ; }

  const styleErrorMessage = styleErrors.length > 0 ? `; ${styleErrors.join('; ')}` : '';
  errMessage += styleErrorMessage;

  const showBannerError = errMessage !== '' && errMessage !== null ? true : false; 

  //Always pass false for verifyAudienceVsUser 'beAUser' or it will hide the beAUser Icon.
  const showBeAUserIcon = verifyAudienceVsUser( _FPSUser , showTricks, properties.beAUserAudience, SPPermission.addAndCustomizePages, false );

    // let showBeAUserIcon: boolean = false;
    //  if ( ( properties.expandoAudience && properties.expandoAudience !== 'Everyone') 
    //    || ( properties.homeParentGearAudience && properties.homeParentGearAudience !== 'Everyone' )  ) {
    //   showBeAUserIcon = true;
    //  }
  
    let infoElement = 'More Information';
    if ( properties.infoElementChoice === 'Text' ) {
      infoElement = properties.infoElementText;

    } else if ( properties.infoElementChoice ) {
      infoElement = properties.infoElementChoice;

    }

    const startTime = new Date();
    const refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();

    const bannerProps: IWebpartBannerProps = {

      webpartHistory: properties.webpartHistory,
      easyPagesSourceProps: createEasyPagesSourceWPProps( properties, setup.main.context, setup.main._repoLink ),
      easyPagesExtraProps: createEasyPagesExtraWPProps( properties, showTricks ),
      EasyIconsObject: createEasyIconsWPProps( properties ),
      sitePresets: _sitePresets,
      keySiteProps: createKeySiteProps( pageContext ),

      fpsPinMenu: {
        defPinState: properties.defPinState ? properties.defPinState : 'disabled',
        forcePinState: properties.forcePinState ? properties.forcePinState : true,
        domElement: setup.main.context.domElement,
        pageLayout: properties.pageLayout,
      },

      refreshId: refreshId,
      FPSUser: _FPSUser,
      exportProps: setup.exportProps,
      context: setup.main.context,
      displayMode: displayMode,

      WebPartHelpElements: [],
      SpecialMessage: setup.SpecialMessage,

      panelTitle: showBannerError === true ? errMessage : bannerTitle ,
      infoElement: infoElement,

      // changed null to undefined:  https://github.com/mikezimm/ALVFinMan/issues/171
      contentPages: {
        aboutTable: undefined ,
        advancedContent: undefined ,
        basicsContent: undefined ,
        errorsContent: undefined ,
        futureContent: undefined ,
        getRandomTip: undefined ,
        gettingStartedContent: undefined ,
        tricksTable: undefined ,
        webParTips: [],
        whyContent: undefined ,
      },

      bannerWidth : ( setup.main.domElement.clientWidth - ( displayMode === DisplayMode.Edit ? 250 : 0) ),
      showBanner: showTricks === true || _forceBanner === true || properties.showBanner !== false ? true : false,
      feedbackEmail: properties.feedbackEmail ? properties.feedbackEmail : '',
      showTricks: showTricks,
      showBannerGear: showBannerGear,
      showGoToHome: showGoToHome,
      showGoToParent: showGoToParent,
      showRepoLinks: showRepoLinks,
      showExport: showExport,

      showFullPanel: showFullPanel,
      replacePanelHTML: properties.replacePanelHTML,
      bonusHTML1: null,
      panelPerformance: setup.main._performance,
      bonusHTML2: null,
      replacePanelWarning: replacePanelWarning,

      // onHomePage: anyContext._pageLayoutType === 'Home' ? true : false,
      onHomePage: pageContext.legacyPageContext.isWebWelcomePage === true ? true : false,
      hoverEffect: properties.bannerHoverEffect === false ? false : true,

      //This was my modified attempt that didn't work
      title: showBannerError === true ? errMessage : bannerTitle ,
      bannerReactCSS: showBannerError === true ?  { background: "yellow", color: "red", } : bannerStyle.parsed ,
      bannerCmdReactCSS: bannerCmdStyle.parsed ,

      gitHubRepo: setup.main._repoLink,
      farElements: [],
      nearElements: [],
      earyAccess: false,
      wideToggle: setup.wideToggle,

      //2022-02-17:  Added these for expandoramic mode
      domElement: setup.main.context.domElement, //Looking at renderCustomStyles, it seems that domElement is on this.domElement ( aka main webpart this )
      pageLayout: properties.pageLayout, // like SinglePageApp etc... this.context[_pageLayout];
      expandoProps: {
        enableExpandoramic: enableExpandoramic,
        expandoDefault: properties.expandoDefault,
        expandoStyle: expandoStyleObject.parsed,
        expandAlert: false,
        expandConsole: setup.expandConsole,
        expandoPadding: properties.expandoPadding,
        expandoAudience: properties.expandoAudience,
        //2022-02-17:  END additions for expandoramic mode
      },

      beAUser: renderAsReader,
      showBeAUserIcon: showBeAUserIcon,
      beAUserFunction: null,

    };

      //close #129:  This makes the maxWidth added in fps options apply to banner as well.
    //  if ( properties.fpsContainerMaxWidth && properties.fpsContainerMaxWidth.length > 0 && bannerProps.bannerReactCSS ) {
    //    bannerProps.bannerReactCSS.maxWidth = properties.fpsContainerMaxWidth;
    //  }

    // 2022-12-12:  VERIFY THIS IS NEEDED, it's in buildBannerPropsv1 AND WebPartRenderBannerV2.ts
      if ( properties.allSectionMaxWidthEnable && properties.allSectionMaxWidth > 0 && bannerProps.bannerReactCSS ) {
        bannerProps.bannerReactCSS.maxWidth = properties.allSectionMaxWidth;
      }

  if ( properties.defPinState === 'disabled'  ) {

  } else {
    if ( !properties.bannerTitle || properties.bannerTitle === '' ) { 
      if ( properties.defPinState !== 'normal' && setup.strings.bannerTitle ) {
        bannerProps.title = setup.strings.bannerTitle ;
      } else {
        bannerProps.title = 'hide' ;
      }
    }

    //Add this to force a title because when pinned by default, users may not know it's there.
    if ( properties.forcePinState === true && properties.defPinState !== 'normal' ) {
      if ( !properties.bannerTitle || properties.bannerTitle.length < 3 ) { bannerProps.title = 'Page Contents' ; }
    }
  }

  properties.replacePanelHTML = visitorPanelInfo( properties, setup.main._repoLink, '', '', createPerformanceTableVisitor( setup.main._performance, setup.main._keysToShow ) );

  bannerProps.replacePanelHTML = properties.replacePanelHTML;

  return bannerProps;

}









