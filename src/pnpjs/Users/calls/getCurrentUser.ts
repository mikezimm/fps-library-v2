
import { fetchCurrentUser, IEnsureUserResults } from '@mikezimm/fps-pnp2/lib/services/sp/users/FetchCurrentUser';
import { createIEnsureUserInfo } from '../logic/createIEnsureUserInfo';
import { IEnsureUserInfo } from '../interfaces/IEnsureUserInfo';

export async function getCurrentUser(webUrl: string): Promise<IEnsureUserInfo> {

  const resultInfo: IEnsureUserResults = await fetchCurrentUser(webUrl);
  const result: IEnsureUserInfo = createIEnsureUserInfo( webUrl, resultInfo, 'Failed', 'ensureUserHere Ensure User Here ~ 24', false, true, true  );

  return result;

}
