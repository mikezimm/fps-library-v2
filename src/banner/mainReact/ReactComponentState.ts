import { IPinMeState } from "../features/PinMe/Interfaces";

/**
 * Use this to extend the default react component state WITHOUT PinMe option
 *
 * Usage:
 * export interface IYourComponentState extends IFPSCoreReactComponentState {
 *
 */
export interface IFPSCoreReactComponentState {
  // [key: string]: boolean | string | IPinMeState | undefined ;
  showDevHeader: boolean;
  lastStateChange: string;
  analyticsWasExecuted: boolean;
  refreshId: string; // If needed to track/force a refresh of the banner
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text  DeviceBug
  showSpinner?: boolean; //Optional if you use a spnner to show loading message

}


/**
 * Use this to extend the default react component state WITH PinMe option
 *
 * Usage:
 * export interface IYourComponentState extends IFPSCorePinMeReactComponentState {
 *
 */
 export interface IFPSCorePinMeReactComponentState extends IFPSCoreReactComponentState {

  pinState: IPinMeState;

}