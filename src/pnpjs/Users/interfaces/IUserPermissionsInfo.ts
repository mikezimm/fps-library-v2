
import { IBasePermissions } from '../../../common/interfaces/openSource/pnpsp/@2.14.0/securityTypes';
import { IHelpfullOutput } from '../../../logic/Errors/friendly';

/***
*     d888b  d88888b d888888b      db    db .d8888. d88888b d8888b.      d8888b. d88888b d8888b. .88b  d88. d888888b .d8888. .d8888. d888888b  .d88b.  d8b   db .d8888.
*    88' Y8b 88'     `~~88~~'      88    88 88'  YP 88'     88  `8D      88  `8D 88'     88  `8D 88'YbdP`88   `88'   88'  YP 88'  YP   `88'   .8P  Y8. 888o  88 88'  YP
*    88      88ooooo    88         88    88 `8bo.   88ooooo 88oobY'      88oodD' 88ooooo 88oobY' 88  88  88    88    `8bo.   `8bo.      88    88    88 88V8o 88 `8bo.
*    88  ooo 88~~~~~    88         88    88   `Y8b. 88~~~~~ 88`8b        88~~~   88~~~~~ 88`8b   88  88  88    88      `Y8b.   `Y8b.    88    88    88 88 V8o88   `Y8b.
*    88. ~8~ 88.        88         88b  d88 db   8D 88.     88 `88.      88      88.     88 `88. 88  88  88   .88.   db   8D db   8D   .88.   `8b  d8' 88  V888 db   8D
*     Y888P  Y88888P    YP         ~Y8888P' `8888Y' Y88888P 88   YD      88      Y88888P 88   YD YP  YP  YP Y888888P `8888Y' `8888Y' Y888888P  `Y88P'  VP   V8P `8888Y'
*
*        Updated function from https://github.com/pnp/pnpjs/issues/1480#issuecomment-745203843
*/

export interface IUserPermissionsInfo {
  basePerms: IBasePermissions;
  errorInfo: IHelpfullOutput;
  status: 'success' | 'error' | 'none';
}
