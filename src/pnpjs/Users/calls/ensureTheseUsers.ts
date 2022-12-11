
import { IUser } from '../../../logic/Users/IUserInterfaces';
import { checkForLoginName } from '../logic/checkForLoginName';
import { ensureUserHere } from './ensureUserHere';
import { IEnsureUserInfo } from '../interfaces/IEnsureUserInfo';
import { createIUserFromUser } from '../logic/createIUserFromUser';
import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';

/***
 *    d88888b d8b   db .d8888. db    db d8888b. d88888b      d888888b db   db d88888b .d8888. d88888b      db    db .d8888. d88888b d8888b. .d8888.
 *    88'     888o  88 88'  YP 88    88 88  `8D 88'          `~~88~~' 88   88 88'     88'  YP 88'          88    88 88'  YP 88'     88  `8D 88'  YP
 *    88ooooo 88V8o 88 `8bo.   88    88 88oobY' 88ooooo         88    88ooo88 88ooooo `8bo.   88ooooo      88    88 `8bo.   88ooooo 88oobY' `8bo.
 *    88~~~~~ 88 V8o88   `Y8b. 88    88 88`8b   88~~~~~         88    88~~~88 88~~~~~   `Y8b. 88~~~~~      88    88   `Y8b. 88~~~~~ 88`8b     `Y8b.
 *    88.     88  V888 db   8D 88b  d88 88 `88. 88.             88    88   88 88.     db   8D 88.          88b  d88 db   8D 88.     88 `88. db   8D
 *    Y88888P VP   V8P `8888Y' ~Y8888P' 88   YD Y88888P         YP    YP   YP Y88888P `8888Y' Y88888P      ~Y8888P' `8888Y' Y88888P 88   YD `8888Y'
 *
 *
 */

export async function ensureTheseUsers(theseUsers: IUser[], checkTheseUsers: IUser[], webUrl: string): Promise<IUser[]> {

  // updateState does NOT seem to do anything
  let updateState: boolean;

  console.log('ensureTheseUsers', theseUsers);
  let recentUsers: IUser[] = checkTheseUsers;
  let ensureLogin: IUser[] = [];

  //Get each user and check if they are in stateUsers:  getEmailFromLoginName, checkForLoginName
  if (theseUsers.length > 0) {
    theseUsers.map(ensureUser => {
      let loginName = checkForLoginName(ensureUser);
      if (loginName) {

        let isAlreadyInState = false;

        //Check if loginName of new user is already in state
        recentUsers.map(existingUser => {
          if (existingUser.loginName === loginName) { isAlreadyInState = true; }
        });

        if (isAlreadyInState === false) {
          updateState = true;
          ensureUser.loginName = loginName;
          ensureLogin.push(ensureUser);
        }
      }
    });
  }

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETE: ensureTheseUsers ensureLogin ~ 51`, ensureLogin ) };

  // Need to add async modifier here to fix error await must be at top level
  ensureLogin.map( async user => {
    const resultInfo: IEnsureUserInfo = await ensureUserHere( user.loginName, webUrl, false);
    let localId = user.id ? user.id : user.Id;
    resultInfo.user = createIUserFromUser( resultInfo.user as any, webUrl, localId ) as any;
    recentUsers.push( resultInfo.user );
  });

  if ( check4Gulp() === true ) { console.log( `fps-library-v2 COMPLETE: ensureTheseUsers  recentUsers ~ 61`, recentUsers ) };

  return recentUsers;

}
