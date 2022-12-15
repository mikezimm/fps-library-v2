
import { applyPresetCollectionDefaults } from '../../common/PropPaneHelp/ApplyPresets';
import { IAllPreConfigSettings } from '../../common/PropPaneHelp/IPreConfig';
import { trickyEmails } from '../../components/atoms/Links/LinksRepos';
import { createBasePerformanceInit, startPerformOp, updatePerformanceEnd } from '../../components/indexes';
import { getFPSUser } from '../../logic/indexes';
import { expandoOnInit } from '../features/Expando/oninit';
import { updateBannerThemeStyles } from '../features/PageStyle/bannerThemes';
import { renderCustomStyles } from '../features/PageStyle/renderCustStyles';
import { getWebPartHistoryOnInit } from '../features/WebPartHistory/OnInit';
import { IThisFPSWebPartClass } from './IThisFPSWebPartClass';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function runFPSSuperOnInit( thisWPClass: IThisFPSWebPartClass, PreConfiguredProps : IAllPreConfigSettings, SPPermission: any ): void {

  /**
   * NOTE FROM TESTING, Only deconstruct things that do NOT change.
   * If I deconstructed _performance, _sitePresets, _FPSUser, then in main web part it would not return the actual values back.
   */
  // let { _performance, _sitePresets, _FPSUser, } = thisWPClass;
  const { displayMode, context, properties, domElement, _wpInstanceID, _trickyApp, } = thisWPClass;

    /***
   *     .d88b.  d8b   db      d888888b d8b   db d888888b d888888b      d8888b. db   db  .d8b.  .d8888. d88888b      .d888b. 
   *    .8P  Y8. 888o  88        `88'   888o  88   `88'   `~~88~~'      88  `8D 88   88 d8' `8b 88'  YP 88'          VP  `8D 
   *    88    88 88V8o 88         88    88V8o 88    88       88         88oodD' 88ooo88 88ooo88 `8bo.   88ooooo         odD' 
   *    88    88 88 V8o88         88    88 V8o88    88       88         88~~~   88~~~88 88~~~88   `Y8b. 88~~~~~       .88'   
   *    `8b  d8' 88  V888        .88.   88  V888   .88.      88         88      88   88 88   88 db   8D 88.          j88.    
   *     `Y88P'  VP   V8P      Y888888P VP   V8P Y888888P    YP         88      YP   YP YP   YP `8888Y' Y88888P      888888D 
   *                                                                                                                         
   *                                                                                                                         
   */

    // DEFAULTS SECTION:  Performance   <<< ================================================================
    thisWPClass._performance = createBasePerformanceInit( displayMode, false );
    thisWPClass._performance.ops.superOnInit = startPerformOp( 'superOnInit', displayMode );

    thisWPClass._trickyEmailsAll = [ ...trickyEmails, ...thisWPClass._trickyEmailsWP ];
    //NEED TO APPLY THIS HERE as well as follow-up in render for it to not visibly change
    thisWPClass._sitePresets = applyPresetCollectionDefaults( thisWPClass._sitePresets, PreConfiguredProps, thisWPClass.properties, thisWPClass.context.pageContext.web.serverRelativeUrl ) ;

    //This indicates if its SPA, Teams etc.... always keep.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageLayout: any = context['_pageLayoutType']?context['_pageLayoutType'] : context['_pageLayoutType'];
    thisWPClass.properties.pageLayout = pageLayout;
    // _urlParameters = getUrlVars();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisWPClass._FPSUser = getFPSUser( context as any, thisWPClass._trickyEmailsAll, _trickyApp, SPPermission ) ;
    console.log( 'FPSUser: ', thisWPClass._FPSUser );

    expandoOnInit( properties, context.domElement, displayMode );

    const bannerStyleChoice: string = properties.bannerStyleChoice ? properties.bannerStyleChoice : 'corpDark1';
    updateBannerThemeStyles( properties, bannerStyleChoice, true, properties.defPinState, thisWPClass._sitePresets.forces );

    thisWPClass.properties.webpartHistory = getWebPartHistoryOnInit( context.pageContext.user.displayName, properties.webpartHistory );

    renderCustomStyles( 
      { wpInstanceID: _wpInstanceID, domElement: domElement, wpProps: properties, 
        displayMode: displayMode,
        doHeadings: false } );  //doHeadings is currently only used in PageInfo so set to false.

    thisWPClass._performance.ops.superOnInit = updatePerformanceEnd( thisWPClass._performance.ops.superOnInit, true,666 );
}