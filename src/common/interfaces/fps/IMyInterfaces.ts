
/***
 *    .88b  d88. db    db      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'YbdP`88 `8b  d8'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88  88  88  `8bd8'          88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88  88  88    88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88  88  88    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    YP  YP  YP    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                
 *                                                                                                                

import { IMyProgress, IMyFonts, IMyIcons } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

 */

export interface IMyProgress {
  // [key: string]: string | boolean | number | undefined;
    time: string;
    logLabel: string;
    label: string;
    description: string;
    percentComplete?: number;
    progressHidden?: boolean;
    icon?: string;
    color?: string;
    ref?: string;
    refElement?: any;
  }

  export interface IMyFonts{
    // [key: string]: string | undefined;
    size?: string;
    weight?: string;
    style?: string;
    color?: string;
  }

  export interface IMyIcons{
    // [key: string]: string | boolean | undefined;
    hasIcon: boolean;
    name: string;
    size?: string;
    height?: string;
    width?: string;
    margin?: string;
  }

  export interface IMyHistory {
    // [key: string]: number | IMyProgress[];
    count: number;
    errors: IMyProgress[];
    webs: IMyProgress[];
    fields: IMyProgress[];
    views: IMyProgress[];
    items: IMyProgress[];
    features: IMyProgress[];
    groups: IMyProgress[];
    users: IMyProgress[];
  }

  export function clearHistory() {
    let history: IMyHistory = {
        count: 0,
        errors: [],
        webs: [],
        fields: [],
        views: [],
        items: [],
        features: [],
        groups: [],
        users: [],
    };
    return history;

  }