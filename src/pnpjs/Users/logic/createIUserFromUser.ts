
import { ISiteUserInfo } from "../../../common/interfaces/openSource/pnpsp/@2.14.0/siteUserTypes";
import { IUser } from "../../../logic/Users/IUserInterfaces";
import { checkForLoginName } from "./checkForLoginName";

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
  const notes: string[] = [];

  //Add these checks to find at least something based on all the different cases that might come in
  const userName: string = checkForLoginName( data );

  let Title: string =data.Title;
  if ( !Title && data ) {  Title = data[`title`] ? data[`title`] : data[`displayName`] ? data[`displayName`] : ''; }
  if ( !Title ) notes.push( `Not User Title` );

  let Email: string = data.Email; // Choosing NOT to include LoginName in Email at this point since it really isn't the same.
  if ( !Email && data ) { Email = data[`email`] ? data[`email`] : ''; }
  if ( !Email ) notes.push( `Not valid Email` );

  let LoginName: string = data.LoginName;
  if ( !LoginName && data ) { LoginName = data[`loginName`] ? data[`loginName`] : userName ? userName : ''; }
  if ( !LoginName ) notes.push( `Not valid Email or login` );

  let imageUrl: string = ''; //Found this in getSiteAdmins response. 
  if ( data && data[`Picture`]?.['Url'] ) imageUrl = data[`Picture`]?.['Url'];

  const Id:    string = ForceId ? ForceId : data ? `${data.Id}` : 'Not valid User ID';
  const IsSiteAdmin: boolean = data ? data.IsSiteAdmin : false;

  const PrincipalType: number = data ? data.PrincipalType : null;

  const thisUser: IUser = {
    title: Title,
    Title: Title,
    initials: data ? Title.split(" ").map((n)=>n[0]).join(""): '-NA-', //Single person column

    email: Email,
    Email: Email,

    LoginName: LoginName,
    Name: LoginName,

    id: Id,
    Id: Id,
    ID: Id,
    UserId:  user.UserId ?  user.UserId : null,

    isSiteAdmin: IsSiteAdmin,
    IsSiteAdmin: IsSiteAdmin,

    /**
     *  Added for src\pnpjs\Users\getSiteUsers.ts
     *    Through testing, found that system accounts have a LoginName but NOT UserPrincipalName
     *    So for "real test", I'm using UserPrincipalName to check.
    */
    UserPrincipalName: user.UserPrincipalName ? user.UserPrincipalName : null,

    //These optional props are from the React PeoplePicker control
    imageInitials: '',
    imageUrl: imageUrl,
    loginName: LoginName,
    text: Title,

    remoteID: null,
    ensureWeb: webUrl,

    PrincipalType: PrincipalType,

  };

  return thisUser;

}

