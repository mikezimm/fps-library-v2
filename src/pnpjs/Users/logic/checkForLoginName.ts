
import { IUser } from '../../../logic/Users/IUserInterfaces';

/***
 *     d888b  d88888b d888888b      db       .d88b.   d888b  d888888b d8b   db      d8b   db  .d8b.  .88b  d88. d88888b
 *    88' Y8b 88'     `~~88~~'      88      .8P  Y8. 88' Y8b   `88'   888o  88      888o  88 d8' `8b 88'YbdP`88 88'
 *    88      88ooooo    88         88      88    88 88         88    88V8o 88      88V8o 88 88ooo88 88  88  88 88ooooo
 *    88  ooo 88~~~~~    88         88      88    88 88  ooo    88    88 V8o88      88 V8o88 88~~~88 88  88  88 88~~~~~
 *    88. ~8~ 88.        88         88booo. `8b  d8' 88. ~8~   .88.   88  V888      88  V888 88   88 88  88  88 88.
 *     Y888P  Y88888P    YP         Y88888P  `Y88P'   Y888P  Y888888P VP   V8P      VP   V8P YP   YP YP  YP  YP Y88888P
 *
 *
 */

export function checkForLoginName(u: IUser): string {

  let results = undefined;

  if (u.Name) {
    results = u.Name;

  } else if (u.loginName) {
    results = u.loginName;

  } else if (u.LoginName) {
    results = u.LoginName;

  } else if (u.email) {
    results = u.email;
  }

  return results;

}
