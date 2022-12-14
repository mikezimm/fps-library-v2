
import { DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ISitePreConfigProps } from '../../common/PropPaneHelp/IPreConfig';
import { ILoadPerformance, ILoadPerformanceOps } from '../../components/molecules/Performance/IPerformance';
import { IFPSUser } from '../../logic/Users/IUserInterfaces';
import { webpartInstance } from '../features/FPSDOM/FPSDocument';

export abstract class FPSBaseClass<TProperties> extends BaseClientSideWebPart<TProperties> {

  protected _keysToShow: ILoadPerformanceOps[] = [];
  public _performance: ILoadPerformance = null as any; //Set as any but will get created in FPSSuperOnOnit

  //Common FPS variables
  public _sitePresets: ISitePreConfigProps = null as any; //Set as any but will get created in FPSSuperOnOnit
  protected _trickyApp = 'FPS Core115';
  protected _wpInstanceID: string = webpartInstance(this._trickyApp);
  public _FPSUser: IFPSUser = null as any; //Set as any but will get created in FPSSuperOnOnit

  //For FPS Banner
  protected _forceBanner = true;
  protected _modifyBannerTitle = true;
  protected _modifyBannerStyle = true;

  protected _exitPropPaneChanged = false;
  protected _importErrorMessage = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _urlParameters: any = {};

  //2022-04-07:  Intent of this is a one-time per instance to 'become a reader' level user.  aka, hide banner buttons that reader won't see
  protected _beAReader: boolean = false;

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
