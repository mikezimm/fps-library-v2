import { ISiteUsersResults, fetchSiteUsers } from '@mikezimm/fps-pnp2/lib/services/sp/users/FetchSiteUsers';
import { getFullUrlFromSlashSitesUrl } from '../../../logic/Strings/urlServices';
import { createISiteUsersInfoObject } from '../logic/createISiteUsersInfoObject';
import { IValidUserProp, IValueUserInfos } from '../interfaces/IValueUserInfos';
import { ISiteUsersInfo } from '../interfaces/ISiteUsersInfo';

/***
 *     d888b  d88888b d888888b      .d8888. d888888b d888888b d88888b      db    db .d8888. d88888b d8888b. .d8888.
 *    88' Y8b 88'     `~~88~~'      88'  YP   `88'   `~~88~~' 88'          88    88 88'  YP 88'     88  `8D 88'  YP
 *    88      88ooooo    88         `8bo.      88       88    88ooooo      88    88 `8bo.   88ooooo 88oobY' `8bo.
 *    88  ooo 88~~~~~    88           `Y8b.    88       88    88~~~~~      88    88   `Y8b. 88~~~~~ 88`8b     `Y8b.
 *    88. ~8~ 88.        88         db   8D   .88.      88    88.          88b  d88 db   8D 88.     88 `88. db   8D
 *     Y888P  Y88888P    YP         `8888Y' Y888888P    YP    Y88888P      ~Y8888P' `8888Y' Y88888P 88   YD `8888Y'
 *
 *
 */
/**
 * The use case for this function is to build a set of random users for sample items based on real users in the site.
 *
 * This will get all site users from a site
 * Then if they need to be real people, it will filter for real users
 * Then build up the detail arrays based on if it detects valid properties in those keys.
 * NOTE that it's possible that the number of users returned in Ids may be different than in the Titles.
 * @param url
 * @param props
 * @param realPeopleOnly
 */
//Get this from npmFunctions userServices

export async function getSiteUsers(url: string, props: IValidUserProp[], realPeopleOnly: boolean) : Promise<IValueUserInfos> {
  url = getFullUrlFromSlashSitesUrl(url) + '';

    const resultInfo: ISiteUsersResults = await fetchSiteUsers( url );

    const result: ISiteUsersInfo = createISiteUsersInfoObject( url, resultInfo, 'getSiteUsers ~ 38' );

    let validUserInfos: IValueUserInfos = {
      Ids: [],
      Titles: [],
      Names: [],
      Emails: [],
      Users: [],
      Props: props,
      result: result,
    };

    result.users.map(u => {
      let isReal = false;

      //UserId is typically an object with keys:  NameIdIssuer & NameId.  Only getting users with that
      let uId = u.UserId !== null ? u.Id : null;
      let uTitle = u.Title ? u.Title : null;
      let uEmail = u.Email ? u.Email : null;
      let uName = u.UserPrincipalName ? u.UserPrincipalName : u.LoginName;

      //Through testing, found that system accounts have a LoginName but NOT UserPrincipalName
      //So for "real test", I'm using UserPrincipalName to check.
      if (u.UserId !== null && u.UserPrincipalName !== null && u.UserPrincipalName !== undefined) { isReal = true; }
      if (isReal === true || realPeopleOnly === false) {
        if (props.indexOf('Id') > -1 && uId !== null) { validUserInfos.Ids.push(uId); }
        if (props.indexOf('Title') > -1 && uTitle !== null) { validUserInfos.Titles.push(uTitle); }
        if (props.indexOf('Name') > -1 && uName !== null) { validUserInfos.Names.push(uName); }
        if (props.indexOf('Email') > -1 && uEmail !== null) { validUserInfos.Emails.push(uEmail); }
        validUserInfos.Users.push(u);
      }
    });

  return validUserInfos;

}
