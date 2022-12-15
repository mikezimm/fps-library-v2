import { IPageLayoutType } from '../../../common/interfaces/@msft/1.15.2/layout';

export type IPinMeState = 'normal' | 'pinFull' | 'pinMini' | 'disabled';

export interface IFPSPinMenu {
  defPinState: IPinMeState;
  forcePinState: boolean;
  domElement: HTMLElement;
  pageLayout: IPageLayoutType ;// like SinglePageApp etc... this.context[_pageLayout];

}

export interface IPinStatus {
  defPinState: IPinMeState;
  refresh: boolean;
}

// ####################################################### #######################################################
// ####################################################### #######################################################

export interface IMinPinMeProps {
    // For FPS Pin Me function
    defPinState: IPinMeState;
    forcePinState: boolean;
}

//Should match keys of IMinWPBannerProps in src\HelpPanelOnNPM\onNpm\BannerInterface.ts
export const changePinMe : string[] = [ 'defPinState', 'forcePinState' ];
