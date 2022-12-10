import { IHelpfullInput, convertHelpfullError } from '../../../logic/indexes/HelpfullErrors';
import { ISiteUsersResults } from '@mikezimm/fps-pnp2/lib/services/sp/users/FetchSiteAdmins';
import { BaseErrorTrace } from '../../../PackageConst';
import { IUser } from '../../../logic/Users/IUserInterfaces';
import { createIUserFromUser } from './createIUserFromUser';
import { ISiteUsersInfo } from '../interfaces/ISiteUsersInfo';


export function createISiteUsersInfoObject(webUrl: string, resultInfo: ISiteUsersResults, trace: string): ISiteUsersInfo {

  let helpfulErrorEnd = [webUrl, '', null, null].join('|');
  const traceString: string = [BaseErrorTrace, 'Failed', trace, helpfulErrorEnd].join('|');
  const errorInput: IHelpfullInput = { e: resultInfo.e, alertMe: false, consoleLog: true, traceString: traceString, logErrors: true };

  const result: ISiteUsersInfo = {
    users: resultInfo.users,
    errorInfo: resultInfo.e ? convertHelpfullError(errorInput) : null,
    status: resultInfo.status,
  };

  const newIUsers: IUser[] = [];
  // Need to add async modifier here to fix error await must be at top level
  resultInfo.users.map(async (user) => {
    const newuser: IUser = createIUserFromUser(user, webUrl, null);
    newIUsers.push(newuser);
  });

  result.users = newIUsers;

  return result;

}
