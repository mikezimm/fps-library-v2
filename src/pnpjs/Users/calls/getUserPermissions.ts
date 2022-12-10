
import { fetchUserPermissions, IUserPermissionsResults } from '@mikezimm/fps-pnp2/lib/services/sp/users/FetchUserPermissions';
import { convertHelpfullError, IHelpfullInput } from '../../../logic/Errors/friendly';
import { BaseErrorTrace } from '../../../PackageConst';
import { IUserPermissionsInfo } from '../interfaces/IUserPermissionsInfo';

export async function getUserPermissions(webUrl: string, supressError: boolean): Promise<IUserPermissionsInfo> {

  const resultInfo: IUserPermissionsResults = await fetchUserPermissions( webUrl );

  let helpfulErrorEnd = [webUrl, '', null, null].join('|');
  const traceString: string = [BaseErrorTrace, 'Failed', 'getUserPermissions ~ 26', helpfulErrorEnd].join('|');
  const errorInput: IHelpfullInput = { e: resultInfo.e, alertMe: false, consoleLog: true, traceString: traceString, logErrors: true };

  const result: IUserPermissionsInfo = {
    basePerms: resultInfo.basePerms,
    errorInfo: resultInfo.e ? convertHelpfullError(errorInput) : null,
    status: resultInfo.status,
  };

  if (supressError !== true  && result.errorInfo ) { alert( result.errorInfo.friendly ); }

  return result;

}
