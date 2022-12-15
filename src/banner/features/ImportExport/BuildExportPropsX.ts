/* eslint-disable @typescript-eslint/no-explicit-any */

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */
 import { changeEasyIcons } from '../../../components/atoms/EasyIcons/eiTypes';
import { changeEasyPages } from '../../components/EasyPages/epTypes';
import { changeCustomHelp } from '../../components/VisitorPanel/Interfaces';
import { changeBannerBasics, changeBannerNav } from '../../interfaces/MinWP/IMinBannerUIProps';
import { changeBannerUtility } from '../../interfaces/MinWP/IMinBannerUtilityProps';
import { IMinWPBannerProps } from '../../interfaces/MinWP/IMinWPBannerProps';
import { changeBannerTheme } from '../../interfaces/Theme/Interfaces';
import { changeExpando } from '../Expando/Interfaces';
import { changePageStyle } from '../PageStyle/Interfaces';
import { changePinMe } from '../PinMe/Interfaces';
import { createExportObject, } from './ExportFunctions';
import { exportIgnorePropsFPS } from './IgnoreBlockProps';

  /***
  *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .o88b.  .d88b.  .88b  d88. d8888b.  .d88b.  d8b   db d88888b d8b   db d888888b 
  *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D .8P  Y8. 888o  88 88'     888o  88 `~~88~~' 
  *       88    88  88  88 88oodD' 88    88 88oobY'    88         8P      88    88 88  88  88 88oodD' 88    88 88V8o 88 88ooooo 88V8o 88    88    
  *       88    88  88  88 88~~~   88    88 88`8b      88         8b      88    88 88  88  88 88~~~   88    88 88 V8o88 88~~~~~ 88 V8o88    88    
  *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         Y8b  d8 `8b  d8' 88  88  88 88      `8b  d8' 88  V888 88.     88  V888    88    
  *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  `Y88P'  YP  YP  YP 88       `Y88P'  VP   V8P Y88888P VP   V8P    YP    
  *                                                                                                                                               
  *                                                                                                                                               
  */


// import { ILoadPerformanceALVFM, IPerformanceOp } from './components/Performance/IFpsPageInfoWebPartProps';

// import { exportIgnoreProps, } from './IgnoreBlockProps';

// import { changeBannerTheme } from "../fpsMinIndex";
// import { changePinMe, } from '../fpsMinIndex';
// import { changeExpando, } from '../fpsMinIndex';

// import { changeCustomHelp, } from '../fpsMinIndex';
// import { changePageStyle} from '../fpsMinIndex';
// import { changeBannerBasics, changeBannerNav, } from '../fpsMinIndex';
// import { changeBannerUtility,  } from '../fpsMinIndex';

// import { changeEasyIcons } from '../fpsMinIndex';
// import { changeEasyPages, } from '../fpsMinIndex';
// import { IMinWPBannerProps } from '@mikezimm/fps-library-v2/lib/banner/interfaces/MinWP/IMinWPBannerProps';

/**
 * These are properties to export BOTH to analytics AND the panel
 */
const exportFPSAnalytics : any = {
  Visitor : changeCustomHelp,
  easyPages : changeEasyPages,
  easyIcons : changeEasyIcons,
  BannerBasics : changeBannerBasics,
  BannerNav : changeBannerNav,
  BannerTheme : changeBannerTheme,
  BannerOther : changeBannerUtility,
  fpsOptions1 : changePageStyle,
  Expando : changeExpando,
  pinMe : changePinMe,
};

/**
  For props to export to panel but NOT save in analytics
 */
const exportFPSPanel : any = {

};

/**
 * This will create total export object for the panel in order of:
 *   'Start items that are always there'
 *   Then adding wpAnalyticsChanges and wpPanelChanges if usage === Panel
 *   Followed by: exportFPSAnalytics and exportFPSPanel if usage === Panel
 * 
 * @param wpProps 
 * @param wpInstanceID 
 * @param currentWeb 
 * @param wpAnalyticsChanges 
 * @param wpPanelChanges 
 * @returns 
 */
export function buildExportPropsX( usage: 'Panel' | 'Analytics', wpProps : IMinWPBannerProps, wpInstanceID: string, currentWeb: string, wpAnalyticsChanges: any, wpPanelChanges: any, exportIgnoreProps: any ) : any {

  const exportStart :any = {
    wpInstanceID: wpInstanceID,
    currentWeb: currentWeb,
  };

  const exportStructure : any = usage ==='Panel'?
   { ...exportStart, ...wpAnalyticsChanges, ...wpPanelChanges, ...exportFPSAnalytics, ...exportFPSPanel } :
   { ...exportStart, ...wpAnalyticsChanges, ...exportFPSAnalytics, };

  const exportObject = createExportObject( exportStructure, wpProps, exportIgnoreProps, false );

  console.log('Exportable Props:', exportObject );
  return exportObject;

}
