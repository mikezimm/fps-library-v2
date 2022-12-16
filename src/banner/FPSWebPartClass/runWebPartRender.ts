
import { startPerformOp, updatePerformanceEnd } from '../../components/indexes';
import { buildExportPropsX } from '../features/ImportExport/BuildExportPropsX';

import { renderCustomStyles } from '../features/PageStyle/renderCustStyles';
import { IWebpartBannerProps } from '../mainReact/IWebpartBannerProps';
import { IMainWPBannerSetupX, mainWebPartRenderBannerSetupX } from './BuildBannerPropsX2';

import { IThisFPSWebPartClass } from './IThisFPSWebPartClass';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function runFPSWebPartRender( thisWPClass: IThisFPSWebPartClass, strings: any, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WebPartAnalyticsChanges: any, WebPartPanelChanges: any, alreadyStartedPerformOp: boolean = false ): IWebpartBannerProps {

  /**
   * NOTE FROM TESTING, Only deconstruct things that do NOT change.
   * If I deconstructed _performance, _sitePresets, _FPSUser, then in main web part it would not return the actual values back.
   */

  const {displayMode, properties,  context, _wpInstanceID, domElement, _beAUserFunction } = thisWPClass;

  /**
   * PERFORMANCE - START
   * This is how you can start a performance snapshot - make the _performance.KEYHERE = startPerforOp('KEYHERE', this.displayMode)
   */

  //This will create renderWebPartStart only if it was not created earlier in the render
  if ( thisWPClass._performance.ops.renderWebPartStart === undefined || alreadyStartedPerformOp === false ) {
    thisWPClass._performance.ops.renderWebPartStart = startPerformOp( 'renderWebPartStart', displayMode, );
  }

  renderCustomStyles( 
    { wpInstanceID: _wpInstanceID, domElement: domElement, wpProps: properties, 
      displayMode: displayMode,
      doHeadings: false } );  //doHeadings is currently only used in PageInfo so set to false.

  const exportProps = buildExportPropsX( 'Panel', properties , _wpInstanceID, context.pageContext.web.serverRelativeUrl, WebPartAnalyticsChanges, WebPartPanelChanges, thisWPClass._exportIgnorePropsWP );
  const analyticsProps = buildExportPropsX( 'Analytics', properties , _wpInstanceID, context.pageContext.web.serverRelativeUrl, WebPartAnalyticsChanges, WebPartPanelChanges, thisWPClass._exportIgnorePropsWP );


  const buildBannerProps: IMainWPBannerSetupX = {
    main: thisWPClass,
    exportProps: exportProps,
    analyticsProps: analyticsProps,
    strings: strings,
    wideToggle: true,
    expandConsole: true,
    SpecialMessage: undefined,
  }

  const bannerProps: IWebpartBannerProps = mainWebPartRenderBannerSetupX( buildBannerProps );

  if ( bannerProps.showBeAUserIcon === true ) { bannerProps.beAUserFunction = _beAUserFunction.bind(thisWPClass); }

  /**
    * PERFORMANCE - UPDATE
    * This is how you can UPDATE a performance snapshot - make the _performance.KEYHERE = startPerforOp('KEYHERE', this.displayMode)
    * NOTE IN THIS CASE to do it before you refreshPanelHTML :)
    */

  thisWPClass._performance.ops.renderWebPartStart = updatePerformanceEnd( thisWPClass._performance.ops.renderWebPartStart, true, 555 );

  return bannerProps;

}