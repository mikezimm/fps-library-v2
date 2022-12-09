/**
 * This is modeled after npmFunctions/Services/DOM/FPSExpandoramic.ts
 * 
 * @returns 
 */


//  import { IFPSWindowProps, } from './FPSInterfaces';
//  import { createFPSWindowProps, } from './FPSDocument';
 
//  import { IFPSBasicToggleSetting, IFPSExpandoAudience, IPageLayoutType } from '../PropPane/FPSInterfaces';
 
//  import { findParentElementLikeThis } from './domSearch';
//  import { updateByClassNameEleChild } from './otherDOMAttempts';


// import { IFPSWindowProps, } from '../FPSInterfaces';
// import { createFPSWindowProps, } from '../FPSDocument';

import { IPageLayoutType } from '../../../common/interfaces/@msft/1.15.2/layout';
import { IFPSPinMenu, IPinStatus, IPinMeState } from './Interfaces';

import { findParentElementLikeThis } from '../../../logic/DOM/Search/domSearch';
// import { updateByClassNameEleChild } from '../otherDOMAttempts';
import { DisplayMode } from '@microsoft/sp-core-library';



require('./FPSPinMe.css');


/**
 * getDefaultFPSPinState gets the default defPinState depending on if the page is in Edit Mode.
 * Edit Mode requires the pinMode to change so that it does not hide the Edit/Save buttons.
 * Originally copied from FPSPageInfo.tsx

 * @param prevfpsPinMenu 
 * @param currfpsPinMenu 
 * @param displayMode - basically current component must have displayMode in it's props and passed in here.
 * @returns 
 */

 export function getDefaultFPSPinState ( prevfpsPinMenu: IFPSPinMenu, currfpsPinMenu: IFPSPinMenu, displayMode: DisplayMode,  ){

  let refresh = false;
  let defPinState =currfpsPinMenu.defPinState;
  if ( defPinState !== prevfpsPinMenu.defPinState ) {
    refresh = true;
  } else if ( prevfpsPinMenu.forcePinState !== currfpsPinMenu.forcePinState ) {
    refresh = true;
  }
  //This fixed https://github.com/mikezimm/PageInfo/issues/47
  if ( displayMode === DisplayMode.Edit ) {
    defPinState = 'normal';
  } 

  const result : IPinStatus = { defPinState: defPinState, refresh: refresh };
  return result;
}

export function checkIsInVerticalSection( domElement: HTMLElement ) {
  //CanvasVerticalSection 
  let isVertical: boolean = false;

  let verticalSection = findParentElementLikeThis( domElement, 'classList', 'CanvasVerticalSection', 10 , 'contains', false, true );
  if ( verticalSection ) { isVertical = true; }
  
  return isVertical;

}

export function FPSPinMe ( domElement: HTMLElement, pinState : IPinMeState, controlStyle: any, alertError: boolean = true, consoleResult: boolean = false, pinMePadding: number, host: IPageLayoutType, displayMode:  DisplayMode,  ) {

  //https://github.com/mikezimm/drilldown7/issues/184
  //Had to add  || host === "SingleWebPartAppPageLayout"  because that is what layout was consoled in Drilldown 1.3.1.1
  if ( host === "SharePointFullPage" || host === "SingleWebPartAppPageLayout"  ) { 
    //If this is a SPA, then there is no reason to do PinMe since there is nothing else to show.
    //Just return
    console.log('FPSPinMe host == SPA: host=', host );
    return;

  } else {
    console.log('FPSPinMe host !== NOT SPA:  host=', host );
  //This might be option to bring this line of code in from FetchBannerElement.tsx
    //Just need to change the incoming paramter from pinState to tempPinState
    // let pinState: IPinMeState = displayMode === DisplayMode.Edit ? 'normal' : tempPinState;

    let searchParams = window.location.search ? window.location.search : '';
    searchParams = searchParams.split('%3a').join(':');

    //Had to add this just as a precaution.... 
    //the classnames change depending on if the page is in EditMode.
    //When in EditMode, they have single -, in View mode, the have --
    let findClass = searchParams.indexOf('Mode=Edit') > -1 ? ['ControlZone-control', 'ControlZone--control'] : ['ControlZone--control', 'ControlZone-control'];

    // let thisControlZome: Element = null;
    let thisControlZome: any = null;
    let thisCanvasSection: any = null;
    let foundElement: any = false;  //Need to be any to pass tslint
    findClass.map( checkClass => {
      if ( foundElement === false ) {
        thisControlZome = findParentElementLikeThis( domElement, 'classList', checkClass, 10 , 'contains', false, true );
        if ( thisControlZome ) { 
          foundElement = true;
          thisCanvasSection = thisControlZome.parentElement;
        }
      }
    });

    let classList = thisControlZome.classList;

    console.log('FPSPinMe thisControlZome, thisCanvasSection = ', thisControlZome, thisCanvasSection );
    if ( thisControlZome && thisCanvasSection ) {

      if ( foundElement === true && pinState === 'disabled' ) {
        //Added this if to resolve https://github.com/mikezimm/pivottiles7/issues/190 - if pinCanvasDefault class is found, it shrinks the panel title width
        if ( thisControlZome.classList.contains( 'pinMeWebPartDefault' ) ) thisControlZome.classList.remove( 'pinMeWebPartDefault' ) ;
        if ( thisCanvasSection.classList.contains( 'pinCanvasDefault' ) ) thisCanvasSection.classList.remove( 'pinCanvasDefault' ) ;
        if ( thisCanvasSection.classList.contains( 'pinMeCanvasMinimize' ) ) thisCanvasSection.classList.remove( 'pinMeCanvasMinimize' ) ;
  
      } else {
  
        if ( foundElement === true ) {
  
          // console.log( 'classList b4 = ', classList );
          if ( classList ) { 
            thisControlZome.classList.add( 'pinMeWebPartDefault' ) ;
  
          }
          // console.log( 'classList af = ', thisControlZome.classList );
        }
  
        if ( displayMode !== DisplayMode.Edit && pinState === 'pinFull' ) {
          if ( !thisControlZome.classList.contains( 'pinMeTop' ) ) thisControlZome.classList.add( 'pinMeTop' ) ;
          if ( !thisControlZome.classList.contains( 'pinMeFull' ) ) thisControlZome.classList.add( 'pinMeFull' ) ;
          if ( thisControlZome.classList.contains( 'pinMeMini' ) ) thisControlZome.classList.remove( 'pinMeMini' ) ;
          // thisControlZome.classList.remove( 'pinMeNormal' ) ;
  
          if ( !thisCanvasSection.classList.contains( 'pinCanvasDefault' ) ) thisCanvasSection.classList.add( 'pinCanvasDefault' ) ;
          if ( !thisCanvasSection.classList.contains( 'pinMeCanvasMinimize' ) ) thisCanvasSection.classList.add( 'pinMeCanvasMinimize' ) ;
  
        } else if ( ( displayMode === DisplayMode.Edit && pinState === 'pinFull' ) || pinState === 'pinMini' ) {
          if ( !thisControlZome.classList.contains( 'pinMeTop' ) ) thisControlZome.classList.add( 'pinMeTop' ) ;
          if ( !thisControlZome.classList.contains( 'pinMeMini' ) ) thisControlZome.classList.add( 'pinMeMini' ) ;
          if ( thisControlZome.classList.contains( 'pinMeFull' ) ) thisControlZome.classList.remove( 'pinMeFull' ) ;
          if ( thisControlZome.classList.contains( 'pinMeNormal' ) ) thisControlZome.classList.remove( 'pinMeNormal' ) ;
  
          if ( displayMode === DisplayMode.Edit ) {
            if ( thisCanvasSection.classList.contains( 'pinCanvasDefault' ) ) thisCanvasSection.classList.remove( 'pinCanvasDefault' ) ;
            if ( thisCanvasSection.classList.contains( 'pinMeCanvasMinimize' ) ) thisCanvasSection.classList.remove( 'pinMeCanvasMinimize' ) ;

          } else { //Is display mode and state === 'pinFull' or 'pinMini'
            if ( !thisCanvasSection.classList.contains( 'pinCanvasDefault' ) ) thisCanvasSection.classList.add( 'pinCanvasDefault' ) ;
            if ( !thisCanvasSection.classList.contains( 'pinMeCanvasMinimize' ) ) thisCanvasSection.classList.add( 'pinMeCanvasMinimize' ) ;
          }
  
        } else if ( pinState === 'normal' ) {
          // thisControlZome.classList.add( 'pinMeNormal' ) ;
          if ( thisControlZome.classList.contains( 'pinMeTop' ) ) thisControlZome.classList.remove( 'pinMeTop' ) ;
          if ( thisControlZome.classList.contains( 'pinMeMini' ) ) thisControlZome.classList.remove( 'pinMeMini' ) ;
          if ( thisControlZome.classList.contains( 'pinMeFull' ) )  thisControlZome.classList.remove( 'pinMeFull' ) ;
  
          if ( thisCanvasSection.classList.contains( 'pinCanvasDefault' ) ) thisCanvasSection.classList.remove( 'pinCanvasDefault' ) ;
          if ( thisCanvasSection.classList.contains( 'pinMeCanvasMinimize' ) ) thisCanvasSection.classList.remove( 'pinMeCanvasMinimize' ) ;
  
        }
  
      }
      // console.log( 'classList af = ', thisControlZome.classList );

    }
  }

 

}

