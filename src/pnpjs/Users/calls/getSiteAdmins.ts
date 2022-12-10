
import { ISiteUsersResults, fetchSiteAdmins } from '@mikezimm/fps-pnp2/lib/services/sp/users/FetchSiteAdmins';
import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';
import { ISiteUsersInfo } from '../interfaces/ISiteUsersInfo';
import { createISiteUsersInfoObject } from '../logic/createISiteUsersInfoObject';

export async function getSiteAdmins(webUrl: string, supressError: boolean): Promise<ISiteUsersInfo> {

  const resultInfo: ISiteUsersResults = await fetchSiteAdmins( webUrl );

  const result: ISiteUsersInfo = createISiteUsersInfoObject( webUrl, resultInfo, 'getSiteAdmins ~ 7' );

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETE: getSiteAdmins ~53`, result ) };

  if (supressError !== true && result.errorInfo ) { alert( result.errorInfo.friendly ); }

  return result;

}
