
import { DisplayMode } from '@microsoft/sp-core-library';
// import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { WebPartContextCopy_15_2 } from '../../common/interfaces/indexes';
import { ISitePreConfigProps } from '../../common/PropPaneHelp/IPreConfig';
import { ILoadPerformance, ILoadPerformanceOps } from '../../components/molecules/Performance/IPerformance';
import { IFPSUser } from '../../logic/Users/IUserInterfaces';
// import { webpartInstance } from '../features/FPSDOM/FPSDocument';
import { IMinWPBannerProps } from '../interfaces/MinWP/IMinWPBannerProps';


export interface IThisFPSWebPartClass {
  _performance: ILoadPerformance;
  _sitePresets: ISitePreConfigProps;
  _FPSUser: IFPSUser;

  displayMode: DisplayMode;
  context: WebPartContextCopy_15_2;
  domElement: HTMLElement;
  properties: IMinWPBannerProps;
  _wpInstanceID: string;
  _trickyApp: string;

  _beAReader: boolean;
  _modifyBannerTitle: boolean;
  _forceBanner: boolean;
  _keysToShow: ILoadPerformanceOps[];
  _beAUserFunction(): void;

}
