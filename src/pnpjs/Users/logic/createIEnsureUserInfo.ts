
import { IEnsureUserResults } from '@mikezimm/fps-pnp2/lib/services/sp/users';
import { convertHelpfullError, IHelpfullInput } from '../../../logic/indexes';
import { BaseErrorTrace } from '../../../PackageConst';
import { IEnsureUserInfo } from '../interfaces/IEnsureUserInfo';
import { createIUserFromUser } from './createIUserFromUser';

/***
 *     d888b  d88888b d888888b       .o88b. db    db d8888b. d8888b. d88888b d8b   db d888888b      db    db .d8888. d88888b d8888b.
 *    88' Y8b 88'     `~~88~~'      d8P  Y8 88    88 88  `8D 88  `8D 88'     888o  88 `~~88~~'      88    88 88'  YP 88'     88  `8D
 *    88      88ooooo    88         8P      88    88 88oobY' 88oobY' 88ooooo 88V8o 88    88         88    88 `8bo.   88ooooo 88oobY'
 *    88  ooo 88~~~~~    88         8b      88    88 88`8b   88`8b   88~~~~~ 88 V8o88    88         88    88   `Y8b. 88~~~~~ 88`8b
 *    88. ~8~ 88.        88         Y8b  d8 88b  d88 88 `88. 88 `88. 88.     88  V888    88         88b  d88 db   8D 88.     88 `88.
 *     Y888P  Y88888P    YP          `Y88P' ~Y8888P' 88   YD 88   YD Y88888P VP   V8P    YP         ~Y8888P' `8888Y' Y88888P 88   YD
 *
 *
 */
/**
 * Copied from ExStorage - gets current logged in user from site.
 * @param webUrl
 */

export function createIEnsureUserInfo(webUrl: string, resultInfo: IEnsureUserResults, status: string, trace: string, alertMe: boolean , consoleLog: boolean, logErrors: boolean ): IEnsureUserInfo {

  let helpfulErrorEnd = [webUrl, null, null, null].join('|');
  const traceString: string = [BaseErrorTrace, status, trace, helpfulErrorEnd].join('|');
  const errorInput: IHelpfullInput = { e: resultInfo.e, alertMe: alertMe, consoleLog: consoleLog, traceString: traceString, logErrors: logErrors };

  const result: IEnsureUserInfo = {
    user: createIUserFromUser(resultInfo.user as any, webUrl, null),
    errorInfo: resultInfo.e ? convertHelpfullError(errorInput) : null,
    errorInput: errorInput,
    status: resultInfo.status,
  };

  return result;

}
