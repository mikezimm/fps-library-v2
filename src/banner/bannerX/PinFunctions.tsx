
import * as React from 'react';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';
import { DisplayMode } from '@microsoft/sp-core-library';
import { IFPSPinMenu, IPinMeState } from '../features/PinMe/Interfaces';
import { FPSPinMe } from '../features/PinMe/FPSPinMenu';
import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';

export interface IUpdateFarPinMe  {
  farBannerElementsArray: JSX.Element[],
  fpsPinMenu: IFPSPinMenu;
  updatePinState: any;
  pinState: IPinMeState;
  displayMode: DisplayMode;
  pimMeCmdStyles: React.CSSProperties;
}

export function updateFarElementsPinMe( updateProps: IUpdateFarPinMe ): JSX.Element[] {

  const { farBannerElementsArray, fpsPinMenu, updatePinState, pinState, displayMode, pimMeCmdStyles } = updateProps;

  //If there is no updatePinState function or pinState is disabled, do not show any icons.
  if ( pinState !== 'disabled' && updatePinState ) {

    const PinDefault = <Icon  title={ 'Set to default' } iconName='ArrowDownRightMirrored8' 
      onClick={ () => setPinArrowFunction( fpsPinMenu, updatePinState, 'normal', displayMode) } style={ pimMeCmdStyles  }/>;


    if ( fpsPinMenu.forcePinState !== true && pinState === 'normal' ) {
      farBannerElementsArray.push( <Icon title={ 'Pin to top' } iconName='Pinned' 
        onClick={ () => setPinArrowFunction( fpsPinMenu, updatePinState, 'pinFull', displayMode ) } style={ pimMeCmdStyles }/> );

    } else if ( pinState === 'pinFull' ) {
      farBannerElementsArray.push( <Icon  title={ 'Minimize' } iconName='CollapseMenu' 
        onClick={ () => setPinArrowFunction(fpsPinMenu, updatePinState, 'pinMini', displayMode) } style={ pimMeCmdStyles  }/> );
      if ( fpsPinMenu.forcePinState !== true ) farBannerElementsArray.push( PinDefault );

    } else if ( pinState === 'pinMini' ) {
      farBannerElementsArray.push( <Icon  title={ 'Expand' } iconName='DoubleChevronDown' 
        onClick={ () => setPinArrowFunction(fpsPinMenu, updatePinState, 'pinFull', displayMode) } style={ pimMeCmdStyles  }/> );

      if ( fpsPinMenu.forcePinState !== true ) farBannerElementsArray.push( PinDefault );
    }
  }

  return farBannerElementsArray;

}

export function setPinArrowFunction( fpsPinMenu: IFPSPinMenu, updatePinState: any, pinState: IPinMeState, displayMode: DisplayMode,  ): void {
  if ( check4Gulp() === true ) console.log(`FetchBannerX ~ ${pinState}`);
  FPSPinMe( fpsPinMenu.domElement, pinState, null,  false, true, null as any, fpsPinMenu.pageLayout, displayMode );
  if ( updatePinState ) updatePinState( pinState );
}