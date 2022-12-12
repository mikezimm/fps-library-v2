
import { WebPartContext, } from "@microsoft/sp-webpart-base";


import { DisplayMode } from '@microsoft/sp-core-library';

// import { IWebpartBannerProps, } from '../HelpPanelOnNPM/onNpm/bannerProps';
// import { IWebpartHistory, } from '../Services/PropPane/WebPartHistory_/Interface';

// import { IFPSPinMenu } from "../Services/DOM_/PinMe_/FPSPinMenu";
// import { ISitePreConfigProps, } from '../PropPaneHelp_/PreConfigFunctions';

/**
 * Use this to extend the default react component props for FPS Banner functionality
 *
 * Usage:
 * export interface IYourComponentProps extends IFPSCoreReactComponentProps {
 *
 */
export interface IFPSCoreReactComponentProps {  // WITHOUT PinMe option
  // [key: string]: ISitePreConfigProps | DisplayMode | WebPartContext | IWebpartBannerProps | IWebpartHistory | IFPSPinMenu ;
  sitePresets : ISitePreConfigProps;

  //FPS Banner and Options props
  displayMode: DisplayMode;

  //Environement props
  context: WebPartContext;

  //Banner related props
  errMessage: any;
  bannerProps: IWebpartBannerProps;

  //ADDED FOR WEBPART HISTORY:
  webpartHistory: IWebpartHistory;

  // saveLoadAnalytics: any;
  FPSPropsObj: any;

}

/**
 * Use this to extend the default react component props for FPS Banner functionality
 *
 * Usage:
 * export interface IYourComponentProps extends IFPSCorePinMeReactComponentProps {
 *
 */
export interface IFPSCorePinMeReactComponentProps extends IFPSCoreReactComponentProps {

  fpsPinMenu: IFPSPinMenu;

}
