/**
 * The purpose of this file is to build the FPS Banner props in a standard way.
 * To benefit from typescript, it's meant to be copied to the specific webpart using it
 */

// import {  WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode, } from '@microsoft/sp-core-library';
// import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";

 // For SPPermission:  let addAndCustomizePages = pageContext.web.permissions.hasPermission( SPPermission.addAndCustomizePages );
import { SPPermission } from '@microsoft/sp-page-context';
import { baseBannerCmdStyles, baseBannerStyles } from '../../common/commandStyles/defaults';
import { IFPSUser, verifyAudienceVsUser } from '../../logic/indexes';
import { getReactCSSFromString, ICurleyBraceCheck } from '../../logic/Strings/reactCSS';
import { IMinWPBannerProps } from '../interfaces/MinWP/IMinWPBannerProps';
import { IWebpartBannerProps } from '../mainReact/IWebpartBannerProps';
import { IBuildBannerSettings } from './IBuildBannerSettings';

 /***
  *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
  *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
  *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
  *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
  *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
  *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
  *                                                                                                                                                                              
  *                                                                                                                                                                              
  */

//  import { getReactCSSFromString, ICurleyBraceCheck } from '../../Services/PropPane/StringToReactCSS';
//  import { IWebpartBannerProps,} from './bannerProps';
//  import { baseBannerCmdStyles, baseBannerStyles} from './defaults_';
 
// import { IEveryoneItemPageAudience } from  '../../Services/DOM/Expando/FPSOptionsExpando';

//  import { getHelpfullError, getHelpfullErrorV2 } from '../../Services/Logging/ErrorHandler';
 
//  import { IRepoLinks } from '../../Links/CreateLinks';

//  import { verifyAudienceVsUser } from '../../Services/Users_/CheckPermissions_';
//  import { IFPSUser,  } from '../../Services/Users_/IUserInterfaces_';
 
// import { IWebpartHistory, } from '../../Services/PropPane/WebPartHistory/Interface';
// import { ISupportedHost } from '../../Services/PropPane/FPSInterfaces';

// import { IPinMeState } from "../../Services/DOM/PinMe/FPSPinMenu";

 
// import { IMinWPBannerProps, IBuildBannerSettings } from "./Moved_/BannerInterface_";

/**
 * 
 * @param wpProps 
 * @param FPSUser 
 * @param bbs 
 * @param showTricks 
 * @param displayMode 
 * @returns 
 */
 export function buildBannerProps ( wpProps : IMinWPBannerProps, FPSUser: IFPSUser, bbs: IBuildBannerSettings, showTricks: boolean, displayMode: DisplayMode ) {
 
     
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



      let bannerTitle = bbs.modifyBannerTitle === true && wpProps.bannerTitle && wpProps.bannerTitle.length > 0 ? wpProps.bannerTitle : bbs.repoLinks.desc;
      let bannerStyle: ICurleyBraceCheck = getReactCSSFromString( 'bannerStyle', wpProps.bannerStyle, baseBannerStyles );


      let bannerCmdStyle: ICurleyBraceCheck = getReactCSSFromString( 'bannerCmdStyle', wpProps.bannerCmdStyle, baseBannerCmdStyles );


      //Over-rides gear for certain users
      let showRepoLinks = bbs.beAUser === true || wpProps.showRepoLinks === false ? false : true;

      let isSiteAdmin = bbs.beAUser !== true && FPSUser.isSiteAdmin === true ? true : false;

      let showBannerGear = isSiteAdmin === true ? true : false;
      let showGoToHome = isSiteAdmin === true ? true : false;
      let showGoToParent = isSiteAdmin === true ? true : false;
      let showExport = isSiteAdmin === true ? true : false;
      let enableExpandoramic = isSiteAdmin === true ? true : false;

      //Always show full panel if you are SCA
      let showFullPanel = isSiteAdmin === true ? true : false;


      if ( isSiteAdmin !== true ) {
        let homeParentGearAudience = verifyAudienceVsUser( FPSUser, showTricks, wpProps.homeParentGearAudience , null, bbs.beAUser );
        showBannerGear = wpProps.showBannerGear === true && homeParentGearAudience === true ? true : false;
        showGoToHome = wpProps.showGoToHome === true && homeParentGearAudience === true ? true : false;
        showGoToParent = wpProps.showGoToParent === true && homeParentGearAudience === true ? true : false;

        let hasCustomizePages = verifyAudienceVsUser( FPSUser, showTricks, wpProps.homeParentGearAudience , SPPermission.addAndCustomizePages, bbs.beAUser );
        showExport = wpProps.showExport === true && hasCustomizePages !== true ? false : true;

        enableExpandoramic = verifyAudienceVsUser( FPSUser, showTricks, wpProps.expandoAudience , null, bbs.beAUser );

        //Logic for showing full panel... If you can edit items, you can likely edit the page and therefore should know about the webpart.
        let getsFullPanelExperience = verifyAudienceVsUser( FPSUser, showTricks, wpProps.fullPanelAudience , SPPermission.editListItems, bbs.beAUser );
        showFullPanel = getsFullPanelExperience;
      }

      //Over-rides expand for certain users

      let anyContext: any = bbs.context;
      console.log('_pageLayoutType:', anyContext._pageLayoutType );
      console.log('pageLayoutType:', anyContext.pageLayoutType );

    //  Changed expandoStyle from buildExpandoStyle function based on https://github.com/mikezimm/CoreFPS114/issues/6
    //  let expandobuildExpandoStyle = buildExpandoStyle( bbs.errMessage, wpProps, bbs.errorObjArray, bbs.expandoErrorObj );
     let expandoStyleObject = getReactCSSFromString( 'expandoStyle', wpProps.expandoStyle, {}  );

     let styleErrors : string[] = [];
     if ( bannerStyle.errMessage ) { styleErrors.push( bannerStyle.errMessage ) ; }
     if ( bannerCmdStyle.errMessage ) { styleErrors.push( bannerCmdStyle.errMessage ) ; }
     if ( expandoStyleObject.errMessage ) { styleErrors.push( expandoStyleObject.errMessage ) ; }

    let styleErrorMessage = styleErrors.length > 0 ? `; ${styleErrors.join('; ')}` : '';
    bbs.errMessage += styleErrorMessage;

     let showBannerError = bbs.errMessage !== '' && bbs.errMessage !== null ? true : false; 

     //Always pass false for verifyAudienceVsUser 'beAUser' or it will hide the beAUser Icon.
    const showBeAUserIcon = verifyAudienceVsUser( FPSUser , showTricks, wpProps.beAUserAudience, SPPermission.addAndCustomizePages, false );

    // let showBeAUserIcon: boolean = false;
    //  if ( ( wpProps.expandoAudience && wpProps.expandoAudience !== 'Everyone') 
    //    || ( wpProps.homeParentGearAudience && wpProps.homeParentGearAudience !== 'Everyone' )  ) {
    //   showBeAUserIcon = true;
    //  }

     let infoElement = 'More Information';
     if ( wpProps.infoElementChoice === 'Text' ) {
      infoElement = wpProps.infoElementText;

     } else if ( wpProps.infoElementChoice ) {
       infoElement = wpProps.infoElementChoice;

     }

    let bannerProps: IWebpartBannerProps = {
       webpartHistory: wpProps.webpartHistory,
       FPSUser: FPSUser,
       exportProps: bbs.exportProps,
       pageContext: bbs.context.pageContext,
       displayMode: displayMode,

       WebPartHelpElement: null,

       panelTitle: showBannerError === true ? bbs.errMessage : bannerTitle ,
       infoElement: infoElement,

      contentPages: {
        aboutTable: null,
        advancedContent: null,
        basicsContent: null,
        errorsContent: null,
        futureContent: null,
        getRandomTip: null,
        gettingStartedContent: null,
        tricksTable: null,
        webParTips: [],
        whyContent: null,
      },

       bannerWidth : bbs.clientWidth,
       showBanner: showTricks === true || bbs.forceBanner === true || wpProps.showBanner !== false ? true : false,
       feedbackEmail: wpProps.feedbackEmail ? wpProps.feedbackEmail : '',
       showTricks: showTricks,
       showBannerGear: showBannerGear,
       showGoToHome: showGoToHome,
       showGoToParent: showGoToParent,
       showRepoLinks: showRepoLinks,
       showExport: showExport,

       showFullPanel: showFullPanel,
       replacePanelHTML: wpProps.replacePanelHTML,
       replacePanelWarning: bbs.replacePanelWarning,

       // onHomePage: anyContext._pageLayoutType === 'Home' ? true : false,
       onHomePage: bbs.context.pageContext.legacyPageContext.isWebWelcomePage === true ? true : false,
       hoverEffect: wpProps.bannerHoverEffect === false ? false : true,

       //This was my modified attempt that didn't work
       title: showBannerError === true ? bbs.errMessage : bannerTitle ,
       bannerReactCSS: showBannerError === true ?  { background: "yellow", color: "red", } : bannerStyle.parsed ,
       bannerCmdReactCSS: bannerCmdStyle.parsed ,

       gitHubRepo: bbs.repoLinks,
       farElements: [],
       nearElements: [],
       earyAccess: bbs.earyAccess,
       wideToggle: bbs.wideToggle,

       bonusHTML1: '', // 2022-08-29:  Added per tsc errors
       bonusHTML2: '', // 2022-08-29:  Added per tsc errors
       refreshId: '', // 2022-08-29:  Added per tsc errors

       panelPerformance: { // 2022-08-29:  Added per tsc errors
        mode: DisplayMode.Read,
        monitor: false,
        onInit:  new Date(),
        constructor: new Date(),
        sets:{},
        ops: {},
       },
      //  bonusHTML2: null,

       //2022-02-17:  Added these for expandoramic mode
       domElement: bbs.context.domElement,
       pageLayout: wpProps.pageLayout, // like SinglePageApp etc... this.context[_pageLayout];
       enableExpandoramic: enableExpandoramic,
       expandoDefault: wpProps.expandoDefault,
       expandoStyle: expandoStyleObject.parsed,
       expandAlert: bbs.expandAlert,
       expandConsole: bbs.expandConsole,
       expandoPadding: wpProps.expandoPadding,
       //2022-02-17:  END additions for expandoramic mode

       beAUser: bbs.beAUser,
       showBeAUserIcon: showBeAUserIcon,
       beAUserFunction: null,

     };

      //close #129:  This makes the maxWidth added in fps options apply to banner as well.
      if ( wpProps.fpsContainerMaxWidth && wpProps.fpsContainerMaxWidth.length > 0 && bannerProps.bannerReactCSS ) {
        bannerProps.bannerReactCSS.maxWidth = wpProps.fpsContainerMaxWidth;
      }

      return { errMessage: bbs.errMessage, bannerProps: bannerProps, errorObjArray: [ expandoStyleObject.errMessage ], };

 }
