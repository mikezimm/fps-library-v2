
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContextCopy_15_2 } from '../../common/interfaces/indexes';
import { ISitePreConfigProps } from '../../common/PropPaneHelp/IPreConfig';
import { IRepoLinks } from '../../components/atoms/Links/CreateLinks';
import { ILoadPerformance, ILoadPerformanceOps } from '../../components/molecules/Performance/IPerformance';
import { IFPSUser } from '../../logic/Users/IUserInterfaces';
import { IMinWPBannerProps } from '../interfaces/MinWP/IMinWPBannerProps';

/**
 *
 * WARNING:  THIS SHOULD MATCH THE CLASS IN FPSBaseClass
 * It is intended to mirror the class and is used for type checking in various functions including:
 *  - BuildBannerProps
 *  - runOnPropChange
 *  - runOnSuperOnInit
 *  - runWebPartRender
 *
 */
export interface IThisFPSWebPartClass {

  /**
   * These are intended to be set or adjusted right at the beginning of the main webpart class
   */
  _repoLink: IRepoLinks;
  _exportIgnoreProps: string[];
  _importBlockProps: string[];
  _trickyApp: string;
  _trickyEmailsWP: string[]; // These are emails that get tricky functionality for this specific web part

  /**
   * These are preset but likely to be adjusted in each webpart as needed
   */
  _disablePinMe: boolean;
  _disablePandoramic: boolean;

  /**
   * These are preset and NOT Likely to need adjustments
   */
  _forceBanner: boolean;
  _modifyBannerTitle: boolean;
  _modifyBannerStyle: boolean;
  _keysToShow: ILoadPerformanceOps[]; // Performance keys to show in the propPaneHelp

  /**
   * These are updated later in the code
   */
  _performance: ILoadPerformance;
  _sitePresets: ISitePreConfigProps;
  _FPSUser: IFPSUser;

  /**
   * These are preset and should be managed by the code... do not change in main webpart class
   */
  _wpInstanceID: string;
  _exitPropPaneChanged: boolean;
  _importErrorMessage: string;
  _trickyEmailsAll: string[]; // These are emails that get tricky functionality for this specific web part
  
  _urlParameters: any;

  _beAReader: boolean;


  /**
   * These are functions used in the class
   */

  _beAUserFunction(): void;

  /**
   * These are here JUST FOR INTERFACE but come from SharePoint class
   */
  displayMode: DisplayMode;
  context: WebPartContextCopy_15_2;
  domElement: HTMLElement;
  properties: IMinWPBannerProps;
  onPropertyPaneConfigurationStart: any;


 






}
