

import { IRepoLinks } from '../../components/atoms/Links/CreateLinks';
import { trickyEmails } from '../../components/atoms/Links/LinksRepos';
import { startPerformOp, updatePerformanceEnd } from '../../components/indexes';

import { renderCustomStyles } from '../features/PageStyle/renderCustStyles';
import { IWebpartBannerProps } from '../mainReact/IWebpartBannerProps';
import { IMainWPBanerSetup, mainWebPartRenderBannerSetup } from '../render/BuildBannerPropsX2';
import { IThisFPSWebPartClass } from './IThisFPSWebPartClass';


// import { IMainWPBanerSetup, mainWebPartRenderBannerSetup } from '@mikezimm/fps-library-v2/lib/banner/render/BuildBannerPropsX';
// import { buildExportProps } from './CoreFPS/BuildExportProps';
// import { IRepoLinks, IWebpartBannerProps } from './fpsMinIndex';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function runFPSWebPartRender( thisWPClass: IThisFPSWebPartClass, repoLink: IRepoLinks, strings: any, alreadyStartedPerformOp: boolean = false ): IWebpartBannerProps {

  /**
   * NOTE FROM TESTING, Only deconstruct things that do NOT change.
   * If I deconstructed _performance, _sitePresets, _FPSUser, then in main web part it would not return the actual values back.
   */
  // let { _performance, _sitePresets, _FPSUser, } = thisWPClass;

  const {displayMode, _beAReader, _FPSUser, properties,  context, _modifyBannerTitle, 
    _forceBanner, _wpInstanceID, _keysToShow, _sitePresets, domElement, _beAUserFunction } = thisWPClass;

    //repoLink, trickyEmails, exportProps, strings , domElement.clientWidth, 
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

  const exportProps = buildExportProps( properties , _wpInstanceID, context.pageContext.web.serverRelativeUrl );

  const buildBannerProps: IMainWPBanerSetup = {
    displayMode: displayMode,
    beAReader: _beAReader,
    FPSUser: _FPSUser,
    minWPBannerProps: properties,
    repoLink: repoLink,
    trickyEmails: trickyEmails,
    exportProps: exportProps,
    strings: strings,
    clientWidth: domElement.clientWidth,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisContext: context as any,
    modifyBannerTitle: _modifyBannerTitle,
    forceBanner: _forceBanner,
    disablePandoramic: false,
    performance: thisWPClass._performance,
    keysToShow: _keysToShow,
    wideToggle: true,
    expandConsole: true,
    sitePresets: _sitePresets,
    SpecialMessage: undefined,
  }
  const bannerProps: IWebpartBannerProps = mainWebPartRenderBannerSetup( buildBannerProps );

  if ( bannerProps.showBeAUserIcon === true ) { bannerProps.beAUserFunction = _beAUserFunction.bind(thisWPClass); }

  /**
    * PERFORMANCE - UPDATE
    * This is how you can UPDATE a performance snapshot - make the _performance.KEYHERE = startPerforOp('KEYHERE', this.displayMode)
    * NOTE IN THIS CASE to do it before you refreshPanelHTML :)
    */

  thisWPClass._performance.ops.renderWebPartStart = updatePerformanceEnd( thisWPClass._performance.ops.renderWebPartStart, true, 555 );

  return bannerProps;

}