
import { doesObjectExistInArray } from '../../../logic/Arrays/searching/objectfind';
import { IUser } from '../../../logic/Users/IUserInterfaces';

/***
 *     .o88b. db   db d88888b  .o88b. db   dD      d888888b d88888b      db    db .d8888. d88888b d8888b.
 *    d8P  Y8 88   88 88'     d8P  Y8 88 ,8P'        `88'   88'          88    88 88'  YP 88'     88  `8D
 *    8P      88ooo88 88ooooo 8P      88,8P           88    88ooo        88    88 `8bo.   88ooooo 88oobY'
 *    8b      88~~~88 88~~~~~ 8b      88`8b           88    88~~~        88    88   `Y8b. 88~~~~~ 88`8b
 *    Y8b  d8 88   88 88.     Y8b  d8 88 `88.        .88.   88           88b  d88 db   8D 88.     88 `88.
 *     `Y88P' YP   YP Y88888P  `Y88P' YP   YD      Y888888P YP           ~Y8888P' `8888Y' Y88888P 88   YD
 *
 *
 *    d88888b db    db d888888b .d8888. d888888b .d8888.      d888888b d8b   db       .d8b.  d8888b. d8888b.  .d8b.  db    db
 *    88'     `8b  d8'   `88'   88'  YP `~~88~~' 88'  YP        `88'   888o  88      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8'
 *    88ooooo  `8bd8'     88    `8bo.      88    `8bo.           88    88V8o 88      88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'
 *    88~~~~~  .dPYb.     88      `Y8b.    88      `Y8b.         88    88 V8o88      88~~~88 88`8b   88`8b   88~~~88    88
 *    88.     .8P  Y8.   .88.   db   8D    88    db   8D        .88.   88  V888      88   88 88 `88. 88 `88. 88   88    88
 *    Y88888P YP    YP Y888888P `8888Y'    YP    `8888Y'      Y888888P VP   V8P      YP   YP 88   YD 88   YD YP   YP    YP
 *
 *
 */

export function checkIfUserExistsInArray(recentUsers: IUser[], user: IUser) : number | false {

  let remoteId: any = false;

  remoteId = doesObjectExistInArray(recentUsers, "Id", user.id, true);
  if (remoteId === false) { remoteId = doesObjectExistInArray(recentUsers, "email", user.email, true); }
  if (remoteId === false) { remoteId = doesObjectExistInArray(recentUsers, "loginName", user.loginName, true); }
  if (remoteId === false) { remoteId = doesObjectExistInArray(recentUsers, "email", user.email, true); }
  if (remoteId === false) { remoteId = doesObjectExistInArray(recentUsers, "title", user.title, true); }

  if (remoteId === false) {
    alert('Error addTheseFieldsToSaveObject:\n' + JSON.stringify(user));
  } else {
    remoteId = parseInt(remoteId, 10);
  }

  return remoteId;
}
