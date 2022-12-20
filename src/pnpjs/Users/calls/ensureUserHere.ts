
import { IEnsureUserResults, ensureUserHere as ensureUserHerePnp2 } from '@mikezimm/fps-pnp2/lib/services/sp/users/EnsureUserHere';
import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';
import { IEnsureUserInfo } from '../interfaces/IEnsureUserInfo';
import { createIEnsureUserInfo } from '../logic/createIEnsureUserInfo';

/**
 *  NOTE:  THIS IS SAME AS ensureUserInfo EXCEPT IT TRIES TO ADD USER IF NOT THERE.
 *  WHY IS THIS NEEDED?  ADDING ISSUE TO ACTION NEWS which is what called it
 *  https://github.com/mikezimm/actionnews/issues/14
 * 
 * @param webUrl 
 * @param userEmail 
 * @returns 
 */
export async function ensureUserHere( loginName: string | undefined, webUrl: string, supressSaveConflict: boolean ) : Promise<IEnsureUserInfo> {

  const resultInfo: IEnsureUserResults = await ensureUserHerePnp2( loginName, webUrl );
  const result: IEnsureUserInfo = createIEnsureUserInfo( webUrl, resultInfo, 'Failed', 'ensureUserHere ~ 24', false, true, true );

  if ( result.errorInfo ) {

    if ( supressSaveConflict === true && ( result.errorInfo.friendly?.indexOf('Save Conflict') > -1
        || result.errorInfo.returnMess.indexOf('Save Conflict') > -1 ) ) {
        //Do nothting

    } else {
      let saveMessage = 'Ensure Failed!\n' + loginName + "\n" + webUrl + "\n" + result.errorInfo.friendly;
      alert(saveMessage);
    }
  }

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETE: ensureUserHere ~ 47`, result ) };

  return result;

}
