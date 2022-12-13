
import * as React from 'react';

/***
 *       d88b db    db .88b  d88. d8888b.      d888888b  .d88b.       
 *       `8P' 88    88 88'YbdP`88 88  `8D      `~~88~~' .8P  Y8.      
 *        88  88    88 88  88  88 88oodD'         88    88    88      
 *        88  88    88 88  88  88 88~~~           88    88    88      
 *    db. 88  88b  d88 88  88  88 88              88    `8b  d8'      
 *    Y8888P  ~Y8888P' YP  YP  YP 88              YP     `Y88P'       
 *                                                                    
 *                                                                    
 */

import { goToHomePage, goToParentSite } from "../../../logic/Links/Navigation";
import { IKeySiteProps } from "../../components/Gear/IKeySiteProps";
import { IPinMeState } from '../../features/PinMe/Interfaces';
import { IWebpartBannerProps } from "../../mainReact/IWebpartBannerProps";
import { addBeAUserIcons } from "./beAUserIcon";
import { addExpandoIcon } from './expandoIcon';
import { addGearIcon } from './gearIcon';
import { addHomeIcon } from './goHomeIcon';
import { addParentIcon } from './goParentIcon';


/***
*    db    db d8888b. d8888b.  .d8b.  d888888b d88888b      d8b   db d88888b  .d8b.  d8888b. 
*    88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'          888o  88 88'     d8' `8b 88  `8D 
*    88    88 88oodD' 88   88 88ooo88    88    88ooooo      88V8o 88 88ooooo 88ooo88 88oobY' 
*    88    88 88~~~   88   88 88~~~88    88    88~~~~~      88 V8o88 88~~~~~ 88~~~88 88`8b   
*    88b  d88 88      88  .8D 88   88    88    88.          88  V888 88.     88   88 88 `88. 
*    ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P      VP   V8P Y88888P YP   YP 88   YD 
*                                                                                            
*                                                                                            
*/

export function updateNearElements( parentNearElements: JSX.Element[], bannerProps: IWebpartBannerProps, onClickShowSettings: any, onClickToggleExpando: any ): JSX.Element[] {
  
  let nearElements: JSX.Element[] = [];

  nearElements = addBeAUserIcons( nearElements, bannerProps );

  if ( this.props.showBannerGear === true ) {
    addGearIcon( nearElements, bannerProps, onClickShowSettings );
  }

  nearElements = addExpandoIcon( nearElements, bannerProps, onClickToggleExpando );
  nearElements = addHomeIcon( nearElements, bannerProps );
  nearElements = addParentIcon ( nearElements, bannerProps );

  return [ ...nearElements, ...parentNearElements ];

}





