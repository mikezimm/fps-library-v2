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

import * as React from 'react';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';

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
export type IFPSApps = "PivotTiles" | "EasyContents" | "eXTremeStorage";

export interface IAppStyle {
    background?: string,
    opacity?: string,
    padding?: string,
    margin?: string,
    color?: string,
    borderRadius?: string,
    fontSize?: string,
}

export interface IAppStyles {
    PivotTiles: IAppStyle,
    EasyContents: IAppStyle,
    eXTremeStorage: IAppStyle,
}

export const AppStyles: IAppStyles = {
    PivotTiles: {
        background: 'white',
        opacity: '80%',
        padding: '5px',
        margin: '1px',
        borderRadius: '50%',
    },
    EasyContents: {
        background: 'white',
        opacity: '100%',
        padding: '5px',
        margin: '1px',
        borderRadius: '50%',
    },
    eXTremeStorage: {
        background: 'white',
        opacity: '100%',
        padding: '5px',
        margin: '1px',
        borderRadius: '50%',
    }
}

export function getIconStyles( app: IFPSApps,  color: any, ) {
    let result : React.CSSProperties = {  } ;
    let thisApp: IAppStyle = AppStyles[app];

    if ( thisApp.background ) { result.background = thisApp.background ; }
    if ( thisApp.padding ) { result.padding = thisApp.padding ; }
    if ( thisApp.margin ) { result.margin = thisApp.margin ; }
    if ( color ) { result.color = color ; }
    else if ( thisApp.color ) { result.color = thisApp.color ; }
    if ( thisApp.borderRadius ) { result.borderRadius = thisApp.borderRadius ; }
    if ( thisApp.opacity ) { result.opacity = thisApp.opacity ; }
    if ( thisApp.fontSize ) { result.fontSize = thisApp.fontSize ; }
    return result;
}

export function buildAppWarnIcon( app: IFPSApps, iconName: string, title: string, color: string, ) {
    return <Icon iconName= {iconName} title={title} style={ getIconStyles( app, color ) }/>;
}

export function buildClickableIcon( app: IFPSApps, iconName: string, title: string, color: string, onClick: any, id: string, dataSearch: string ) {
    return <Icon iconName= {iconName} title={title} 
    style={ getIconStyles( app, color ) } 
    onClick={ onClick } 
    id={ id } data-search={ dataSearch }/>;
}
