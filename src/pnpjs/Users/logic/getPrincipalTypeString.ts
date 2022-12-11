
import { PrincipalType } from '../../../common/interfaces/openSource/pnpsp/@2.14.0/fpsTypes';

/***
 *     d888b  d88888b d888888b      d8888b. d8888b. d888888b d8b   db  .o88b. d888888b d8888b.  .d8b.  db           d888888b db    db d8888b. d88888b
 *    88' Y8b 88'     `~~88~~'      88  `8D 88  `8D   `88'   888o  88 d8P  Y8   `88'   88  `8D d8' `8b 88           `~~88~~' `8b  d8' 88  `8D 88'
 *    88      88ooooo    88         88oodD' 88oobY'    88    88V8o 88 8P         88    88oodD' 88ooo88 88              88     `8bd8'  88oodD' 88ooooo
 *    88  ooo 88~~~~~    88         88~~~   88`8b      88    88 V8o88 8b         88    88~~~   88~~~88 88              88       88    88~~~   88~~~~~
 *    88. ~8~ 88.        88         88      88 `88.   .88.   88  V888 Y8b  d8   .88.   88      88   88 88booo.         88       88    88      88.
 *     Y888P  Y88888P    YP         88      88   YD Y888888P VP   V8P  `Y88P' Y888888P 88      YP   YP Y88888P         YP       YP    88      Y88888P
 *
 *
 */

export function getPrincipalTypeString(type: PrincipalType) : string {
  if (type === 0) { return 'None'; }
  if (type === 1) { return 'User'; }
  if (type === 2) { return 'Distribution'; }
  if (type === 4) { return 'Security'; }
  if (type === 8) { return 'SharePoint'; }
  if (type === 15) { return 'All'; }
  else { return ''; }

}
