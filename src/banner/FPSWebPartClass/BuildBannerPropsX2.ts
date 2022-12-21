
// import { DisplayMode } from "@microsoft/sp-core-library";

import { baseBannerCmdStyles, baseBannerStyles } from "../../common/commandStyles/defaults";
import { check4SiteTheme } from "../../common/commandStyles/ISiteThemeChoices";
import { DisplayMode, } from "../../common/interfaces/@msft/1.15.2/displayMode";
import { createPerformanceTableVisitor, } from "../../components/indexes/Performance";

import { verifyAudienceVsUser } from "../../logic/Users/CheckPermissions";
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
import { IMinWPFieldPanelProps } from "../../components/molecules/FieldPanel/components/IMinWPFieldPanelProps";


export interface IMainWPBannerSetupX {
  main: IThisFPSWebPartClass
  exportProps: any;
  analyticsProps: any;
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

  const { displayMode, _beAReader, _FPSUser, properties, _modifyBannerTitle, _forceBanner, _sitePresets, _allowPandoramic, } = setup.main;
  const { pageContext, _pageLayoutType } = setup.main.context;

  // Field Panel specific properties
  const { _FieldPanelDesignMode, _FieldPanelListProp, _FieldPanelWebProp, _allowFieldPanel } = setup.main;

  const renderAsReader = displayMode === DisplayMode.Read && _beAReader === true ? true : false;
  const isSiteAdmin = renderAsReader !== true && _FPSUser.isSiteAdmin === true ? true : false;

  /***
 *    d888888b d8888b. d888888b  .o88b. db   dD .d8888. 
 *    `~~88~~' 88  `8D   `88'   d8P  Y8 88 ,8P' 88'  YP 
 *       88    88oobY'    88    8P      88,8P   `8bo.   
 *       88    88`8b      88    8b      88`8b     `Y8b. 
 *       88    88 `88.   .88.   Y8b  d8 88 `88. db   8D 
 *       YP    88   YD Y888888P  `Y88P' YP   YD `8888Y' 
 *                                                      
 *                                                      
 */


  let showTricks: any = false;
  setup.main._trickyEmailsAll.map( getsTricks => {
    if ( pageContext.user && pageContext.user.loginName && pageContext.user.loginName.toLowerCase().indexOf( getsTricks ) > -1 ) { 
      showTricks = true ;
      properties.showRepoLinks = true; //Always show these users repo links
    }
    } );


  /***
 *    db   db d88888b db      d8888b.      d8888b.  .d8b.  d8b   db d88888b db      
 *    88   88 88'     88      88  `8D      88  `8D d8' `8b 888o  88 88'     88      
 *    88ooo88 88ooooo 88      88oodD'      88oodD' 88ooo88 88V8o 88 88ooooo 88      
 *    88~~~88 88~~~~~ 88      88~~~        88~~~   88~~~88 88 V8o88 88~~~~~ 88      
 *    88   88 88.     88booo. 88           88      88   88 88  V888 88.     88booo. 
 *    YP   YP Y88888P Y88888P 88           88      YP   YP VP   V8P Y88888P Y88888P 
 *                                                                                  
 *                                                                                  
 */

  const showRepoLinks = renderAsReader === true || properties.showRepoLinks === false ? false : true;
  //Always show full panel if you are SCA
  const showFullPanel = isSiteAdmin === true ? true : verifyAudienceVsUser( _FPSUser, showTricks, properties.fullPanelAudience , SPPermission.editListItems, renderAsReader );

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


  let infoElement = 'More Information';
  if ( properties.infoElementChoice === 'Text' ) {
    infoElement = properties.infoElementText;

  } else if ( properties.infoElementChoice ) {
    infoElement = properties.infoElementChoice;

  }

/***
 *    d8b   db d88888b  .d8b.  d8888b.      d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b .d8888. 
 *    888o  88 88'     d8' `8b 88  `8D      88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 88'  YP 
 *    88V8o 88 88ooooo 88ooo88 88oobY'      88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    `8bo.   
 *    88 V8o88 88~~~~~ 88~~~88 88`8b        88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88      `Y8b. 
 *    88  V888 88.     88   88 88 `88.      88.     88booo. 88.     88  88  88 88.     88  V888    88    db   8D 
 *    VP   V8P Y88888P YP   YP 88   YD      Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    `8888Y' 
 *
 *
 */
  //Always pass false for verifyAudienceVsUser 'beAUser' or it will hide the beAUser Icon.
  const showBeAUserIcon = verifyAudienceVsUser( _FPSUser , showTricks, properties.beAUserAudience, SPPermission.addAndCustomizePages, false );

  properties.showBannerGear = verifyAudienceVsUser( _FPSUser , showTricks, properties.homeParentGearAudience, null, renderAsReader );

  const hasCustomizePages = isSiteAdmin === true ? true :
      verifyAudienceVsUser( _FPSUser, showTricks, properties.homeParentGearAudience , SPPermission.addAndCustomizePages, renderAsReader );

  const homeParentGearAudience = isSiteAdmin === true ? true : verifyAudienceVsUser( _FPSUser, showTricks, properties.homeParentGearAudience , null, renderAsReader );
  const showBannerGear = isSiteAdmin === true ? true : properties.showBannerGear === true && homeParentGearAudience === true ? true : false;
  const showGoToHome = isSiteAdmin === true ? true : properties.showGoToHome === true && homeParentGearAudience === true ? true : false;
  const showGoToParent = isSiteAdmin === true ? true : properties.showGoToParent === true && homeParentGearAudience === true ? true : false;

  const showExport = isSiteAdmin === true ? true : properties.showExport === true && hasCustomizePages !== true ? false : true; 

  const enableExpandoramic = _allowPandoramic === false || properties.enableExpandoramic === false ? false :
      verifyAudienceVsUser( _FPSUser, showTricks, properties.expandoAudience , null, renderAsReader );


/***
 *    d888888b d888888b d888888b db      d88888b      .d8888. d888888b db    db db      d88888b .d8888. 
 *    `~~88~~'   `88'   `~~88~~' 88      88'          88'  YP `~~88~~' `8b  d8' 88      88'     88'  YP 
 *       88       88       88    88      88ooooo      `8bo.      88     `8bd8'  88      88ooooo `8bo.   
 *       88       88       88    88      88~~~~~        `Y8b.    88       88    88      88~~~~~   `Y8b. 
 *       88      .88.      88    88booo. 88.          db   8D    88       88    88booo. 88.     db   8D 
 *       YP    Y888888P    YP    Y88888P Y88888P      `8888Y'    YP       YP    Y88888P Y88888P `8888Y' 
 *                                                                                                      
 *                                                                                                      
 */

  //  Updated for SPA to get Title which is also the window.name property  https://github.com/mikezimm/drilldown7/issues/243
  const bannerTitle = _modifyBannerTitle === true && properties.bannerTitle && properties.bannerTitle.length > 0 ? properties.bannerTitle : 
  _pageLayoutType === 'SingleWebPartAppPageLayout' ? document.title : setup.main._repoLink.desc;

  //Added useSiteTheme for SiteTheme in Banner
  const useSiteTheme: boolean = check4SiteTheme( properties.bannerStyleChoice )
  const bannerStyle: ICurleyBraceCheck = getReactCSSFromString( 'bannerStyle', properties.bannerStyle, baseBannerStyles, useSiteTheme );
  const bannerCmdStyle: ICurleyBraceCheck = getReactCSSFromString( 'bannerCmdStyle', properties.bannerCmdStyle, baseBannerCmdStyles, useSiteTheme );

  //Over-rides expand for certain users

  //  Changed expandoStyle from buildExpandoStyle function based on https://github.com/mikezimm/CoreFPS114/issues/6
  //  let expandobuildExpandoStyle = buildExpandoStyle( errMessage, properties, bbs.errorObjArray, bbs.expandoErrorObj );
  const expandoStyleObject = getReactCSSFromString( 'expandoStyle', properties.expandoStyle, {}, false  );

  const styleErrors : string[] = [];
  if ( bannerStyle.errMessage ) { styleErrors.push( bannerStyle.errMessage ) ; }
  if ( bannerCmdStyle.errMessage ) { styleErrors.push( bannerCmdStyle.errMessage ) ; }
  if ( expandoStyleObject.errMessage ) { styleErrors.push( expandoStyleObject.errMessage ) ; }

  const styleErrorMessage = styleErrors.length > 0 ? `; ${styleErrors.join('; ')}` : '';
  errMessage += styleErrorMessage;

  const showBannerError = errMessage !== '' && errMessage !== null ? true : false; 


/***
 *    d88888b d888888b d88888b db      d8888b.      d8888b.  .d8b.  d8b   db d88888b db      
 *    88'       `88'   88'     88      88  `8D      88  `8D d8' `8b 888o  88 88'     88      
 *    88ooo      88    88ooooo 88      88   88      88oodD' 88ooo88 88V8o 88 88ooooo 88      
 *    88~~~      88    88~~~~~ 88      88   88      88~~~   88~~~88 88 V8o88 88~~~~~ 88      
 *    88        .88.   88.     88booo. 88  .8D      88      88   88 88  V888 88.     88booo. 
 *    YP      Y888888P Y88888P Y88888P Y8888D'      88      YP   YP VP   V8P Y88888P Y88888P 
 *                                                                                           
 *                                                                                           
 */

    const MinFPProps: any = setup.main.properties;

    const saveCommands: any = _FieldPanelDesignMode === 'Disabled' ? null : setup.main._saveFieldPanelCommandsFunction.bind( setup.main );
    const saveViews: any = _FieldPanelDesignMode === 'Disabled' ? null : setup.main._saveFieldPanelViewsFunction.bind( setup.main );

    const fieldPanelProps: IMinWPFieldPanelProps = {
      displayMode: displayMode,
      lists: [{
        webUrl: _FieldPanelWebProp && MinFPProps[ _FieldPanelWebProp ] ? MinFPProps[ _FieldPanelWebProp ] : pageContext.web.absoluteUrl ,
        listTitle: _FieldPanelListProp ? MinFPProps[ _FieldPanelListProp ] : 'Documents' ,
      }],
      designMode: _FieldPanelDesignMode,
      tryCommands: null,  //if function is passed down in React Component, parent web part could use this to temporarily replace the saved button commands.
      saveCommands: saveCommands, // callback function to save current command
      tryViews: null,     //if function is passed down in  React Component, parent web part could use this to temporarily replace the saved button commands.
      saveViews: saveViews,    // callback function to save current command
    }

    const startTime = new Date();
    const refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();

    /***
 *    d8888b.  .d8b.  d8b   db d8b   db d88888b d8888b.      d8888b. d8888b.  .d88b.  d8888b. .d8888. 
 *    88  `8D d8' `8b 888o  88 888o  88 88'     88  `8D      88  `8D 88  `8D .8P  Y8. 88  `8D 88'  YP 
 *    88oooY' 88ooo88 88V8o 88 88V8o 88 88ooooo 88oobY'      88oodD' 88oobY' 88    88 88oodD' `8bo.   
 *    88~~~b. 88~~~88 88 V8o88 88 V8o88 88~~~~~ 88`8b        88~~~   88`8b   88    88 88~~~     `Y8b. 
 *    88   8D 88   88 88  V888 88  V888 88.     88 `88.      88      88 `88. `8b  d8' 88      db   8D 
 *    Y8888P' YP   YP VP   V8P VP   V8P Y88888P 88   YD      88      88   YD  `Y88P'  88      `8888Y' 
 *                                                                                                    
 *                                                                                                    
 */

    const bannerProps: IWebpartBannerProps = {

      webpartHistory: properties.webpartHistory,
      easyPagesSourceProps: createEasyPagesSourceWPProps( properties, setup.main.context, setup.main._repoLink ),
      easyPagesExtraProps: createEasyPagesExtraWPProps( properties, showTricks ),
      EasyIconsObject: createEasyIconsWPProps( properties ),
      sitePresets: _sitePresets,
      keySiteProps: createKeySiteProps( pageContext ),

      fieldPanelProps: fieldPanelProps,

      fpsPinMenu: {
        defPinState: properties.defPinState ? properties.defPinState : 'disabled',
        forcePinState: properties.forcePinState !== true ? false : true,
        domElement: setup.main.context.domElement,
        pageLayout: properties.pageLayout,
      },


      refreshId: refreshId,
      FPSUser: _FPSUser,
      exportProps: setup.exportProps,
      analyticsProps: setup.analyticsProps,
      context: setup.main.context,
      displayMode: displayMode,

      WebPartHelpPivots: [],
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
      themeChoice: properties.bannerStyleChoice,
      useSiteTheme: useSiteTheme,

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









