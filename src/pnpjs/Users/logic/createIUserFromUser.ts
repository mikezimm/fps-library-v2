import { ISiteUserInfo } from "../../../common/interfaces/openSource/pnpsp/@2.14.0/siteUserTypes";
import { IUser } from "../../../logic/Users/IUserInterfaces";

/**
 *    user MAY need to be cast as any to avoid this error.
 *    casting as unknown or any other type did not work
 *    Argument of type 'ISiteUser' is not assignable to parameter of type 'ISiteUserInfo'.
 *    Type 'ISiteUser' is missing the following properties from type 'ISiteUserInfo': Expiration, IsEmailAuthenticationGuestUser, UserId, UserPrincipalName, and 8 more.ts(2345)

 * @param user 
 * @param webUrl 
 * @param ForceId 
 * @returns 
 */
export function createIUserFromUser( user: ISiteUserInfo, webUrl: string, ForceId: string ) : IUser {

  // const data = user.data;
  const data = user;

  const Title: string = data ? data.Title : 'Not valid User';
  const Email: string = data ? data.Email : 'Not valid User';
  const Id:    string = ForceId ? ForceId : data ? `${data.Id}` : 'Not valid User';
  const IsSiteAdmin: boolean = data ? data.IsSiteAdmin : false;
  const LoginName: string = data ? data.LoginName : 'Not valid User';
  const PrincipalType: number = data ? data.PrincipalType : null;

  const thisUser: IUser = {
    title: Title,
    Title: Title,
    initials: data ? Title.split(" ").map((n)=>n[0]).join(""): '-NA-', //Single person column

    email: Email,
    Email: Email,

    id: Id,
    Id: Id,
    ID: Id,
    UserId:  user.UserId ?  user.UserId : null,

    isSiteAdmin: IsSiteAdmin,
    IsSiteAdmin: IsSiteAdmin,

    LoginName: LoginName,
    Name: LoginName,

    /**
     *  Added for src\pnpjs\Users\getSiteUsers.ts
     *    Through testing, found that system accounts have a LoginName but NOT UserPrincipalName
     *    So for "real test", I'm using UserPrincipalName to check.
    */
    UserPrincipalName: user.UserPrincipalName ? user.UserPrincipalName : null,

    //These optional props are from the React PeoplePicker control
    imageInitials: '',
    imageUrl: '',
    loginName: LoginName,
    text: Title,

    remoteID: null,
    ensureWeb: webUrl,

    PrincipalType: PrincipalType,

  };

  return thisUser;

}

