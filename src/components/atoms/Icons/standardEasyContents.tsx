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

const thisApp: IFPSApps = "EasyContents";

export const NoItems = buildAppWarnIcon(thisApp, StdIcons.NoItems, "No items", 'black' ); //

export const LotsItems = buildAppWarnIcon( thisApp, StdIcons.LotsItems, "Lots of items", 'black' );
export const ToManyItems = buildAppWarnIcon( thisApp, StdIcons.ToManyItems, "More than 5k items", 'red' );
export const RequireCheckout = buildAppWarnIcon( thisApp, StdIcons.RequireCheckout, "Requires checkout", 'black' );
export const Attachments =  buildAppWarnIcon( thisApp, StdIcons.Attachments, "Attachments disabled", 'red' );
export const UniquePerms =  buildAppWarnIcon( thisApp, StdIcons.UniquePerms, "Unique Permissions", 'black' );

export const CreateGroups =  buildAppWarnIcon( thisApp, StdIcons.GroupsAdd, "Create Groups", 'black' );
export const ResetPermissions =  buildAppWarnIcon( thisApp, StdIcons.ShieldAlert, "Reset Permissions", 'red' );
export const RemoveItems =  buildAppWarnIcon( thisApp, StdIcons.Sweep, "Remove Items", 'red' );
export const Delete =  buildAppWarnIcon( thisApp, StdIcons.Delete, "Delete", 'red' );
export const Warning =  buildAppWarnIcon( thisApp, StdIcons.Warning, "Warning", 'darkred' );
export const WarningSolid =  buildAppWarnIcon( thisApp, StdIcons.WarningSolid, "WarningSolid", 'red' );

export const NotApplicable =  buildAppWarnIcon( thisApp, StdIcons.NotApplicable, "Not Applicable", 'black' );
export const InheritedPerms =  buildAppWarnIcon( thisApp, StdIcons.NotApplicable, "Not Applicable", 'black' );


/**
 * For Subsites
 */
export const MinDownload = buildAppWarnIcon( thisApp, StdIcons.MinDownload, "Minimum Download enabled", 'red' );

/**
 * For News and Pages
 */
// import { NewsLink, CheckedOut, UnPublished, MinorVersion } from '../Pages/PageFunctions';

export const NewsLink = buildAppWarnIcon( thisApp, StdIcons.NewsLink, "News Link", 'black' );
export const CheckedOut = buildAppWarnIcon( thisApp, StdIcons.CheckedOut, "Checked Out", 'red' );
export const UnPublished = buildAppWarnIcon( thisApp, StdIcons.UnPublished, "UnPublished", 'black' );
export const MinorVersion = buildAppWarnIcon( thisApp, StdIcons.MinorVersion, "Draft Version", 'red' );

