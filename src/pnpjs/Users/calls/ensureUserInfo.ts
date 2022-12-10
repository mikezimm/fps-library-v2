
import { IEnsureUserResults, ensureUserInfo as ensureUserInfoPnp2 } from '@mikezimm/fps-pnp2/lib/services/sp/users/EnsureUserInfo';
import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';
import { IEnsureUserInfo } from '../interfaces/IEnsureUserInfo';
import { createIEnsureUserInfo } from '../logic/createIEnsureUserInfo';

/**
 * 
 * @param webUrl 
 * @param userEmail 
 * @returns 
 */
export async function ensureUserInfo(webUrl: string, userEmail: string) : Promise<IEnsureUserInfo> {

  const resultInfo: IEnsureUserResults = await ensureUserInfoPnp2( webUrl, userEmail );

  const result: IEnsureUserInfo = createIEnsureUserInfo( webUrl, resultInfo, 'Failed', 'ensureUserInfo ~ 21', false ,false, true );

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETE: ensureUserInfo ~29`, result ) };

  return result;
}
