
import { DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IFPSEnviro } from '../../common/interfaces/fps/IFPSEnviro';
import { ISitePreConfigProps } from '../../common/PropPaneHelp/IPreConfig';
import { IRepoLinks } from '../../components/atoms/Links/CreateLinks';
import { ILoadPerformance, ILoadPerformanceOps } from '../../components/molecules/Performance/IPerformance';
import { IFPSUser } from '../../logic/Users/IUserInterfaces';
import { webpartInstance } from '../features/FPSDOM/FPSDocument';

/**
 * REQUIREMENT:  Update wepbart's tsconfig to target 'es6' or higher
 * 
 * The purpose of this class is to easily add all required setup to use the banner.
 * Then minimal set up is required in each webpart project
 * 
 *
 * WARNING:  THIS SHOULD MATCH THE Interface in IThisFPSWebPartClass
 * It is intended to mirror the class and is used for type checking in various functions including:
 *  - BuildBannerProps
 *  - runOnPropChange
 *  - runOnSuperOnInit
 *  - runWebPartRender
 *
 */


export abstract class FPSBaseClass<TProperties> extends BaseClientSideWebPart<TProperties> {

  /**
   * These are intended to be set or adjusted right at the beginning of the main webpart class
   */
  protected _repoLink: IRepoLinks = null as any; //Set as any but will get created in FPSSuperOnOnit
  protected _exportIgnorePropsWP: string[] = [];
  protected _importBlockPropsWP: string[] = [];
  protected _trickyApp = 'FPS UPDATE FPSBaseClass';
  protected _trickyEmailsWP: string[] = []; // These are emails that get tricky functionality for this specific web part

  /**
   * These are preset but likely to be adjusted in each webpart as needed
   */
  protected _disablePinMe: boolean = false;
  protected _disablePandoramic: boolean = false;

  /**
   * These are preset and NOT Likely to need adjustments
   */
  protected _forceBanner: boolean = true;
  protected _modifyBannerTitle: boolean = true;
  protected _modifyBannerStyle: boolean = true;
  protected _keysToShow: ILoadPerformanceOps[] = [];

  protected _allowQuickLaunchHide: boolean = true;
  protected _allowPageHeaderHide: boolean = true;
  protected _allowToolBarHide: boolean = true;
  protected _allowAllSectWidth: boolean = true;
  protected _allowBeAUser: boolean = true;
  protected _allowFeedback: boolean = true;
  protected _allowExpando: boolean = true;
  protected _allowSiteThemeChoice: boolean = false;
  protected _allowEasyPages: boolean = true;

  //Set this to true if webpart has a search bar and you want the user to be able to turn it on or off
  protected _allowShowSearch: boolean = false;

  /**
   * These are updated later in the code
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public _performance: ILoadPerformance = null as any; //Set as any but will get created in FPSSuperOnOnit

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public _sitePresets: ISitePreConfigProps = null as any; //Set as any but will get created in FPSSuperOnOnit

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public _FPSUser: IFPSUser = null as any; //Set as any but will get created in FPSSuperOnOnit

  public _FPSEnviro: IFPSEnviro = null as any; //Set as any but will get created in FPSSuperOnOnit


  /**
   * These are preset and should be managed by the code... do not change in main webpart class
   */
  protected _wpInstanceID: string = webpartInstance(this._trickyApp);
  protected _exitPropPaneChanged: boolean = false;
  protected _importErrorMessage: string = '';
  protected _trickyEmailsALL: string[] = []; // These are emails that get tricky functionality for this specific web part

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _urlParameters: any = {};

  //2022-04-07:  Intent of this is a one-time per instance to 'become a reader' level user.  aka, hide banner buttons that reader won't see
  public _beAReader: boolean = false;

  
  /**
   * These are functions used in the class
   */
  protected _beAUserFunction(): void {
    console.log('beAUserFunction:');
    if (this.displayMode === DisplayMode.Edit) {
      alert("'Be a regular user' mode is only available while viewing the page.  \n\nOnce you are out of Edit mode, please refresh the page (CTRL-F5) to reload the web part.");

    } else {
      this._beAReader = this._beAReader === true ? false : true;
      this.render();
    }
  }

}
