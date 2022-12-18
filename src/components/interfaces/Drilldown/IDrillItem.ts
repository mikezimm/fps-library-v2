

/***
 *    d888888b      d8888b. d8888b. d888888b db      db           d888888b d888888b d88888b .88b  d88.      d888888b d8b   db d88888b  .d88b.  
 *      `88'        88  `8D 88  `8D   `88'   88      88             `88'   `~~88~~' 88'     88'YbdP`88        `88'   888o  88 88'     .8P  Y8. 
 *       88         88   88 88oobY'    88    88      88              88       88    88ooooo 88  88  88         88    88V8o 88 88ooo   88    88 
 *       88         88   88 88`8b      88    88      88              88       88    88~~~~~ 88  88  88         88    88 V8o88 88~~~   88    88 
 *      .88.        88  .8D 88 `88.   .88.   88booo. 88booo.        .88.      88    88.     88  88  88        .88.   88  V888 88      `8b  d8' 
 *    Y888888P      Y8888D' 88   YD Y888888P Y88888P Y88888P      Y888888P    YP    Y88888P YP  YP  YP      Y888888P VP   V8P YP       `Y88P'  
 *                                                                                                                                             
 *                                                                                                                                             
 */

import { ITheTime } from "../../../logic/Time/Interfaces";
import { IUser } from "../../../logic/Users/IUserInterfaces";
import { IItemRefiners } from "../Refiners/IRefiners";


export interface IDrillItemInfo extends Partial<any>{

  sort: string;
  searchString: string;
  meta: string[];

  Created: any;
  Modified: any;
  Author: any;
  Editor: any;
  timeCreated : ITheTime;

  goToItemPreview: string;
  goToItemLink: string;
  goToPropsLink: string;
  isFile: boolean;

  timeModified : ITheTime;
  bestCreate: string;
  bestMod: string;

  author: IUser;
  editor: IUser;

  refiners: IItemRefiners; //String of Keys representing the static name of the column used for drill downs

  Id: any;

}