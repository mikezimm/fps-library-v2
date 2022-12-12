
import { ISiteUsersResults } from '@mikezimm/fps-pnp2/lib/services/sp/users/FetchSiteAdmins';

import { IHelpfullInput, convertHelpfullError, IHelpfullOutput } from '../../../logic/indexes/HelpfullErrors';
import { BaseErrorTrace } from '../../../PackageConst';
import { IUser } from '../../../logic/Users/IUserInterfaces';
import { createIUserFromUser } from './createIUserFromUser';
import { ISiteUsersInfo } from '../interfaces/ISiteUsersInfo';
import { saveErrorToLog } from '../../Logging';


export function createISiteUsersInfoObject(webUrl: string, resultInfo: ISiteUsersResults, trace: string): ISiteUsersInfo {

  let helpfulErrorEnd = [webUrl, '', null, null].join('|');
  const traceString: string = [BaseErrorTrace, 'Failed', trace, helpfulErrorEnd].join('|');
  const errorInput: IHelpfullInput = { e: resultInfo.e, alertMe: false, consoleLog: true, traceString: traceString, logErrors: true };

  const result: ISiteUsersInfo = {
    users: resultInfo.users as IUser[],
    errorInfo: resultInfo.e ? convertHelpfullError(errorInput) : null as any,
    status: resultInfo.status,
  };

  saveErrorToLog( result.errorInfo, errorInput as IHelpfullInput );

  const newIUsers: IUser[] = [];
  // Need to add async modifier here to fix error await must be at top level
  resultInfo.users.map(async (user) => {
    const newuser: IUser | null = createIUserFromUser(user, webUrl, null);
    if ( newuser !== null ) newIUsers.push(newuser);
  });

  result.users = newIUsers;

  return result;

}
