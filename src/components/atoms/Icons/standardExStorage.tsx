/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */

// import * as React from 'react';
// import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';


import { getIconStyles, buildAppWarnIcon, IFPSApps } from './stdIconsBuildersV02';

import * as StdIcons from './iconNames';

/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */

/**
 * For Lists and Libraries
 */

const thisApp: IFPSApps = "eXTremeStorage";

export const NoItems = buildAppWarnIcon(thisApp, StdIcons.NoItems, "No items", 'black' ); //

export const UniquePerms =  buildAppWarnIcon( thisApp, StdIcons.UniquePerms, "Unique Permissions", 'black' );
export const ShareThisItem =  buildAppWarnIcon( thisApp, StdIcons.Share, "Share this item", 'rgb(70, 97, 213)' );
export const SharedItem =  buildAppWarnIcon( thisApp, StdIcons.Share, "Item was shared", 'black' );

export const ImageSearchRed =  buildAppWarnIcon( thisApp, StdIcons.ImageSearch, "See Image Details", 'red' );
export const ImageSearchBlack =  buildAppWarnIcon( thisApp, StdIcons.ImageSearch, "See Image Details", 'black' );

export const DocumentSearch =  buildAppWarnIcon( thisApp, StdIcons.DocumentSearch, "See Item Details", 'black' );

export const GoToFolder =  buildAppWarnIcon( thisApp, StdIcons.FabricMovetoFolder, "Go to folder", 'black' );

export const CheckOutByOther =  buildAppWarnIcon( thisApp, StdIcons.CheckedOutByOther, "Checked out by someome else", 'black' );
export const CheckedOutByYou =  buildAppWarnIcon( thisApp, StdIcons.CheckedOutByYou, "Checked out by you", 'black' );
export const PageCheckedOut =  buildAppWarnIcon( thisApp, StdIcons.PageCheckedOut, "Page checked in", 'black' );
export const PageCheckedin =  buildAppWarnIcon( thisApp, StdIcons.PageCheckedin, "Page checked out", 'black' );