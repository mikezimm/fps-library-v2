
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";

import { SPPermission } from '@microsoft/sp-page-context';

import { IMinWPBannerProps, IBuildBannerSettings, } from "./BannerInterface_";
import { IRepoLinks, } from "../../Links_/CreateLinks";
import { IFPSUser } from "../../Services/Users_/IUserInterfaces_";
import { IWebpartBannerProps, } from "./bannerProps";

import { visitorPanelInfo,  } from '../../CoreFPS_/VisitorPanelComponent_';
import { verifyAudienceVsUser } from '../../Services/Users_/CheckPermissions_';
// import { } from "../fpsReferences";
import { ILoadPerformance, ILoadPerformanceOps } from "../../Performance_/IPerformance";

import { getReactCSSFromString, ICurleyBraceCheck } from '../../Services/PropPane/StringToReactCSS';
import { baseBannerCmdStyles, baseBannerStyles} from './defaults_';
import { createPerformanceTableVisitor } from "../../Performance_/tables";
import { ISpecialMessage } from "../specialX_/interface";

export interface IMainWPBanerSetup {
  displayMode: DisplayMode,
  beAReader: boolean,
  FPSUser: IFPSUser,
  minWPBannerProps: IMinWPBannerProps,
  repoLink: IRepoLinks,
  trickyEmails: string[],
  exportProps: IBuildBannerSettings,
  strings: any,
  clientWidth: number,
  thisContext: WebPartContext,
  modifyBannerTitle: boolean,
  forceBanner: boolean,
  disablePandoramic: boolean,
  performance: ILoadPerformance,
  keysToShow: ILoadPerformanceOps[],
  wideToggle: boolean,
  expandConsole: boolean,
  SpecialMessage?: ISpecialMessage,
}

export function mainWebPartRenderBannerSetup( main: IMainWPBanerSetup ) : IWebpartBannerProps {

  const { 
    displayMode,
    beAReader,
    FPSUser,
    minWPBannerProps,
    repoLink,
    trickyEmails,
    exportProps,
    strings,
    clientWidth,
    thisContext,
    modifyBannerTitle,
    forceBanner,
    disablePandoramic,
    performance,
    keysToShow,
    wideToggle,
    expandConsole,
    SpecialMessage,
  } = main;


    let anyContext: any = thisContext;

    const renderAsReader = displayMode === DisplayMode.Read && beAReader === true ? true : false;

    // console.log('mainWebPart: showTricks ~ 322',   );
    // Verify if this is a duplicate of the code in FPSUser (copied and commented out below )
    let showTricks: any = false;
    trickyEmails.map( getsTricks => {
      if ( thisContext.pageContext.user && thisContext.pageContext.user.loginName && thisContext.pageContext.user.loginName.toLowerCase().indexOf( getsTricks ) > -1 ) { 
        showTricks = true ;
        minWPBannerProps.showRepoLinks = true; //Always show these users repo links
      }
      } );

    //  Copied from getFPSUser Junly 29, 2022
    //   let showTricks: any = false;
    //   trickyEmails.map( getsTricks => {
    //     if ( user.loginName && user.loginName.toLowerCase().indexOf( getsTricks ) > -1 ) { 
    //       showTricks = true ;
    //     }
    //     } );

    // console.log('mainWebPart: verifyAudienceVsUser ~ 341',   );

    minWPBannerProps.showBannerGear = verifyAudienceVsUser( FPSUser , showTricks, minWPBannerProps.homeParentGearAudience, null, renderAsReader );

    let errMessage = '';
    let validDocsContacts = ''; //This may no longer be needed if links below are commented out.

    if ( ( minWPBannerProps.documentationIsValid !== true && minWPBannerProps.documentationLinkUrl ) //This means it failed the url ping test... throw error
    || ( minWPBannerProps.requireDocumentation === true && !minWPBannerProps.documentationLinkUrl ) ) {//This means docs are required but there isn't one provided
        errMessage += ' Invalid Support Doc Link: ' + ( minWPBannerProps.documentationLinkUrl ? minWPBannerProps.documentationLinkUrl : 'Empty.  ' ) ; validDocsContacts += 'DocLink,'; 
    }

    if ( minWPBannerProps.requireContacts === true ) {
      if ( !minWPBannerProps.supportContacts || minWPBannerProps.supportContacts.length < 1 ) { 
        errMessage += ' Need valid Support Contacts' ; validDocsContacts += 'Contacts,'; 
      }
    }
    
    /***
      *    d8888b.  .d8b.  d8b   db d8b   db d88888b d8888b. 
      *    88  `8D d8' `8b 888o  88 888o  88 88'     88  `8D 
      *    88oooY' 88ooo88 88V8o 88 88V8o 88 88ooooo 88oobY' 
      *    88~~~b. 88~~~88 88 V8o88 88 V8o88 88~~~~~ 88`8b   
      *    88   8D 88   88 88  V888 88  V888 88.     88 `88. 
      *    Y8888P' YP   YP VP   V8P VP   V8P Y88888P 88   YD 
      *                                                      
      *                                                      
      */

    const replacePanelWarning = `Anyone with lower permissions than '${minWPBannerProps.fullPanelAudience}' will ONLY see this content in panel`;





































    // export function buildBannerProps ( wpProps : IMinWPBannerProps, FPSUser: IFPSUser, bbs: IBuildBannerSettings, showTricks: boolean, displayMode: DisplayMode ) {
 
     
      /***
       *    d8888b.  .d8b.  d8b   db d8b   db d88888b d8888b. 
       *    88  `8D d8' `8b 888o  88 888o  88 88'     88  `8D 
       *    88oooY' 88ooo88 88V8o 88 88V8o 88 88ooooo 88oobY' 
       *    88~~~b. 88~~~88 88 V8o88 88 V8o88 88~~~~~ 88`8b   
       *    88   8D 88   88 88  V888 88  V888 88.     88 `88. 
       *    Y8888P' YP   YP VP   V8P VP   V8P Y88888P 88   YD 
       *                                                      
       *                                                      
       */
    
    
    
      //  Updated for SPA to get Title which is also the window.name property  https://github.com/mikezimm/drilldown7/issues/243
       let bannerTitle = modifyBannerTitle === true && minWPBannerProps.bannerTitle && minWPBannerProps.bannerTitle.length > 0 ? minWPBannerProps.bannerTitle : 
          anyContext._pageLayoutType === 'SingleWebPartAppPageLayout' ? document.title : repoLink.desc;       let bannerStyle: ICurleyBraceCheck = getReactCSSFromString( 'bannerStyle', minWPBannerProps.bannerStyle, baseBannerStyles );
    
       let bannerCmdStyle: ICurleyBraceCheck = getReactCSSFromString( 'bannerCmdStyle', minWPBannerProps.bannerCmdStyle, baseBannerCmdStyles );
    
    
       //Over-rides gear for certain users
       let showRepoLinks = renderAsReader === true || minWPBannerProps.showRepoLinks === false ? false : true;
    

       let isSiteAdmin = renderAsReader !== true && FPSUser.isSiteAdmin === true ? true : false;

      let hasCustomizePages = isSiteAdmin === true ? true :
          verifyAudienceVsUser( FPSUser, showTricks, minWPBannerProps.homeParentGearAudience , SPPermission.addAndCustomizePages, renderAsReader );


       let homeParentGearAudience = isSiteAdmin === true ? true : verifyAudienceVsUser( FPSUser, showTricks, minWPBannerProps.homeParentGearAudience , null, renderAsReader );
       let showBannerGear = isSiteAdmin === true ? true : minWPBannerProps.showBannerGear === true && homeParentGearAudience === true ? true : false;
       let showGoToHome = isSiteAdmin === true ? true : minWPBannerProps.showGoToHome === true && homeParentGearAudience === true ? true : false;
       let showGoToParent = isSiteAdmin === true ? true : minWPBannerProps.showGoToParent === true && homeParentGearAudience === true ? true : false;

       let showExport = isSiteAdmin === true ? true : minWPBannerProps.showExport === true && hasCustomizePages !== true ? false : true; 

       let enableExpandoramic = disablePandoramic === true || minWPBannerProps.enableExpandoramic === false ? false :
          verifyAudienceVsUser( FPSUser, showTricks, minWPBannerProps.expandoAudience , null, renderAsReader );
    
       //Always show full panel if you are SCA
       let showFullPanel = isSiteAdmin === true ? true : verifyAudienceVsUser( FPSUser, showTricks, minWPBannerProps.fullPanelAudience , SPPermission.editListItems, renderAsReader );
    
       //Over-rides expand for certain users
    

       console.log('_pageLayoutType:', anyContext._pageLayoutType );
       console.log('pageLayoutType:', anyContext.pageLayoutType );
    
     //  Changed expandoStyle from buildExpandoStyle function based on https://github.com/mikezimm/CoreFPS114/issues/6
     //  let expandobuildExpandoStyle = buildExpandoStyle( errMessage, minWPBannerProps, bbs.errorObjArray, bbs.expandoErrorObj );
      let expandoStyleObject = getReactCSSFromString( 'expandoStyle', minWPBannerProps.expandoStyle, {}  );
    
      let styleErrors : string[] = [];
      if ( bannerStyle.errMessage ) { styleErrors.push( bannerStyle.errMessage ) ; }
      if ( bannerCmdStyle.errMessage ) { styleErrors.push( bannerCmdStyle.errMessage ) ; }
      if ( expandoStyleObject.errMessage ) { styleErrors.push( expandoStyleObject.errMessage ) ; }
    
     let styleErrorMessage = styleErrors.length > 0 ? `; ${styleErrors.join('; ')}` : '';
     errMessage += styleErrorMessage;
    
      let showBannerError = errMessage !== '' && errMessage !== null ? true : false; 
    
      //Always pass false for verifyAudienceVsUser 'beAUser' or it will hide the beAUser Icon.
     const showBeAUserIcon = verifyAudienceVsUser( FPSUser , showTricks, minWPBannerProps.beAUserAudience, SPPermission.addAndCustomizePages, false );
    
     // let showBeAUserIcon: boolean = false;
     //  if ( ( minWPBannerProps.expandoAudience && minWPBannerProps.expandoAudience !== 'Everyone') 
     //    || ( minWPBannerProps.homeParentGearAudience && minWPBannerProps.homeParentGearAudience !== 'Everyone' )  ) {
     //   showBeAUserIcon = true;
     //  }
    
      let infoElement = 'More Information';
      if ( minWPBannerProps.infoElementChoice === 'Text' ) {
       infoElement = minWPBannerProps.infoElementText;

      } else if ( minWPBannerProps.infoElementChoice ) {
        infoElement = minWPBannerProps.infoElementChoice;

      }

      let startTime = new Date();
      let refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();

     let bannerProps: IWebpartBannerProps = {
        webpartHistory: minWPBannerProps.webpartHistory,
        refreshId: refreshId,
        FPSUser: FPSUser,
        exportProps: exportProps,
        pageContext: thisContext.pageContext,
        displayMode: displayMode,

        WebPartHelpElement: null,
        SpecialMessage: SpecialMessage,

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

        bannerWidth : ( clientWidth - ( displayMode === DisplayMode.Edit ? 250 : 0) ),
        showBanner: showTricks === true || forceBanner === true || minWPBannerProps.showBanner !== false ? true : false,
        feedbackEmail: minWPBannerProps.feedbackEmail ? minWPBannerProps.feedbackEmail : '',
        showTricks: showTricks,
        showBannerGear: showBannerGear,
        showGoToHome: showGoToHome,
        showGoToParent: showGoToParent,
        showRepoLinks: showRepoLinks,
        showExport: showExport,

        showFullPanel: showFullPanel,
        replacePanelHTML: minWPBannerProps.replacePanelHTML,
        bonusHTML1: null,
        panelPerformance: performance,
        bonusHTML2: null,
        replacePanelWarning: replacePanelWarning,

        // onHomePage: anyContext._pageLayoutType === 'Home' ? true : false,
        onHomePage: thisContext.pageContext.legacyPageContext.isWebWelcomePage === true ? true : false,
        hoverEffect: minWPBannerProps.bannerHoverEffect === false ? false : true,

        //This was my modified attempt that didn't work
        title: showBannerError === true ? errMessage : bannerTitle ,
        bannerReactCSS: showBannerError === true ?  { background: "yellow", color: "red", } : bannerStyle.parsed ,
        bannerCmdReactCSS: bannerCmdStyle.parsed ,

        gitHubRepo: repoLink,
        farElements: [],
        nearElements: [],
        earyAccess: false,
        wideToggle: wideToggle,

        //2022-02-17:  Added these for expandoramic mode
        domElement: thisContext.domElement,
        pageLayout: minWPBannerProps.pageLayout, // like SinglePageApp etc... this.context[_pageLayout];
        enableExpandoramic: enableExpandoramic,
        expandoDefault: minWPBannerProps.expandoDefault,
        expandoStyle: expandoStyleObject.parsed,
        expandAlert: false,
        expandConsole: expandConsole,
        expandoPadding: minWPBannerProps.expandoPadding,
        //2022-02-17:  END additions for expandoramic mode

        beAUser: renderAsReader,
        showBeAUserIcon: showBeAUserIcon,
        beAUserFunction: null,

      };

       //close #129:  This makes the maxWidth added in fps options apply to banner as well.
       if ( minWPBannerProps.fpsContainerMaxWidth && minWPBannerProps.fpsContainerMaxWidth.length > 0 && bannerProps.bannerReactCSS ) {
         bannerProps.bannerReactCSS.maxWidth = minWPBannerProps.fpsContainerMaxWidth;
       }

      //  return { errMessage: errMessage, bannerProps: bannerProps, errorObjArray: [ expandoStyleObject.errMessage ], };

    if ( minWPBannerProps.defPinState === 'disabled'  ) {
      // npm install @mikezimm/npmfunctions@2.1.14

    } else {
      if ( !minWPBannerProps.bannerTitle || minWPBannerProps.bannerTitle === '' ) { 
        if ( minWPBannerProps.defPinState !== 'normal' && strings.bannerTitle ) {
          bannerProps.title = strings.bannerTitle ;
        } else {
          bannerProps.title = 'hide' ;
        }
      }

      //Add this to force a title because when pinned by default, users may not know it's there.
      if ( minWPBannerProps.forcePinState === true && minWPBannerProps.defPinState !== 'normal' ) {
        if ( !minWPBannerProps.bannerTitle || minWPBannerProps.bannerTitle.length < 3 ) { bannerProps.title = 'Page Contents' ; }
      }
    }

    bannerProps.enableExpandoramic = enableExpandoramic; //Hard code this option for FPS PageInfo web part only because of PinMe option

    minWPBannerProps.replacePanelHTML = visitorPanelInfo( minWPBannerProps, repoLink, '', '', createPerformanceTableVisitor( performance, keysToShow ) );

    bannerProps.replacePanelHTML = minWPBannerProps.replacePanelHTML;

    return bannerProps;

}









