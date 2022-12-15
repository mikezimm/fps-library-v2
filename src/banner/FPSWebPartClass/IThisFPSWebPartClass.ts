
import { DisplayMode } from '@microsoft/sp-core-library';
import { IFPSEnviro } from '../../common/interfaces/fps/IFPSEnviro';
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
  _exportIgnorePropsWP: string[];
  _importBlockPropsWP: string[];
  _trickyApp: string;
  _trickyEmailsWP: string[]; // These are emails that get tricky functionality for this specific web part

  /**
   * These are preset but likely to be adjusted in each webpart as needed
   */
  _allowPinMe: boolean;

  /**
   * These are preset and NOT Likely to need adjustments
   */
  _forceBanner: boolean;
  _modifyBannerTitle: boolean;
  _modifyBannerStyle: boolean;
  _keysToShow: ILoadPerformanceOps[]; // Performance keys to show in the propPaneHelp

  //Disabling any of these removes from property pane, may not actually block importing though
  _allowQuickLaunchHide: boolean; //Allows user to hide quick launch via property pane
  _allowPageHeaderHide: boolean; //Allows user to hide Page Header (Title block) via property pane
  _allowToolBarHide: boolean; //Allows user to hide Toolbar (like edit page button) via property pane
  _allowAllSectWidth: boolean; //Allows user to hide Adjust all sections max width via property pane
  _allowShowSearch: boolean; //Adds 'Show Search' Toggle to property pane, only needed if web part needs it.
  _allowBeAUser: boolean; //Allows page editors to 'BeAUser' and adds to property pane where needed.
  _allowFeedback: boolean; //Allows page editors to add 'Feedback email' in banner.
  _allowPandoramic: boolean;  //Allows page editors the modify Expandoramic settings
  _allowSiteThemeChoice: boolean; //Allows page editors the choice to inherit SiteTheme as a Theme choice
  _allowEasyPages: boolean; //Allows page editors use EasyPages and EasyIcons

  /**
   * These are updated later in the code
   */
  _performance: ILoadPerformance;
  _sitePresets: ISitePreConfigProps;
  _FPSUser: IFPSUser;
  _FPSEnviro: IFPSEnviro;

  /**
   * These are preset and should be managed by the code... do not change in main webpart class
   */
  _wpInstanceID: string;
  _exitPropPaneChanged: boolean;
  _importErrorMessage: string;
  _trickyEmailsAll: string[]; // These are emails that get tricky functionality for this specific web part
  _isSPA: boolean; // Is SinglePageApp ( Layout === SingleWebPartAppPageLayout )

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
  onPropertyPaneFieldChanged: any;



}
