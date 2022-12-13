import { IPinMeState } from "../../features/PinMe/Interfaces";

export function getForceNarrow( pinState: IPinMeState, updatePinState: any ) : boolean {

  let forceNarrowStyles = pinState === 'pinFull' || pinState === 'pinMini' ? true : false ;

  //If there is no updatePinState function, then the web part does not use it so ignore this code.
  if ( !updatePinState ) {
    forceNarrowStyles = false;
  }

  return forceNarrowStyles;

}
