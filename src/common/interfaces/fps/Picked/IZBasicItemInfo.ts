import { ITheTime } from '../../../../logic/Time/Interfaces';
import { IUser } from '../../../../logic/Users/IUserInterfaces';

/***
 *    d888888b      d88888D d8888b.  .d8b.  .d8888. d888888b  .o88b.      d888888b d888888b d88888b .88b  d88.      d888888b d8b   db d88888b  .d88b.
 *      `88'        YP  d8' 88  `8D d8' `8b 88'  YP   `88'   d8P  Y8        `88'   `~~88~~' 88'     88'YbdP`88        `88'   888o  88 88'     .8P  Y8.
 *       88            d8'  88oooY' 88ooo88 `8bo.      88    8P              88       88    88ooooo 88  88  88         88    88V8o 88 88ooo   88    88
 *       88           d8'   88~~~b. 88~~~88   `Y8b.    88    8b              88       88    88~~~~~ 88  88  88         88    88 V8o88 88~~~   88    88
 *      .88.         d8' db 88   8D 88   88 db   8D   .88.   Y8b  d8        .88.      88    88.     88  88  88        .88.   88  V888 88      `8b  d8'
 *    Y888888P      d88888P Y8888P' YP   YP `8888Y' Y888888P  `Y88P'      Y888888P    YP    Y88888P YP  YP  YP      Y888888P VP   V8P YP       `Y88P'
 *
 *
 */

export interface IZBasicItemInfo extends Partial<any> {
  sort: string;
  searchString: string;
  meta: string[];

  Created: any;
  Modified: any;
  Author: any;
  Editor: any;
  timeCreated: ITheTime;

  //    goToItemPreview: string;
  //    goToItemLink: string;
  //    goToPropsLink: string;
  isFile: boolean;

  timeModified: ITheTime;
  bestCreate: string;
  bestMod: string;

  author: IUser;
  editor: IUser;

  //    refiners: IItemRefiners; //String of Keys representing the static name of the column used for drill downs
  Id: any;

}
