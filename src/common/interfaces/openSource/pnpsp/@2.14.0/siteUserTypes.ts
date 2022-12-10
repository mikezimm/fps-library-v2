import { PrincipalType } from "./fpsTypes";

export interface ISiteUserInfo extends ISiteUserProps {
  Expiration: string;
  IsEmailAuthenticationGuestUser: boolean;
  UserId: {
      NameId: string;
      NameIdIssuer: string;
  };
  UserPrincipalName: string | null;
}
/**
* Describes a single user properties
*
*/
export interface ISiteUserProps {
  /**
   * Contains Site user email
   *
   */
  Email: string;
  /**
   * Contains Site user Id
   *
   */
  Id: number;
  /**
   * Site user IsHiddenInUI
   *
   */
  IsHiddenInUI: boolean;
  /**
   * Site user IsShareByEmailGuestUser
   *
   */
  IsShareByEmailGuestUser: boolean;
  /**
   * Describes if Site user Is Site Admin
   *
   */
  IsSiteAdmin: boolean;
  /**
   * Site user LoginName
   *
   */
  LoginName: string;
  /**
   * Site user Principal type
   *
   */
  PrincipalType: number | PrincipalType;
  /**
   * Site user Title
   *
   */
  Title: string;
}
/**
* Properties that provide both a getter, and a setter.
*
*/
export interface IUserUpdateResult {
  user: ISiteUser;
  data: any;
}
/**
* Result from ensuring a user
*
*/
export interface IWebEnsureUserResult {
  data: ISiteUserProps;
  user: ISiteUser; // extends:  ISiteUserInfo,ISiteUserProps so both data and the other things below
}

export interface ISiteUser extends ISiteUserInfo {
}

export interface ISiteUserInfo extends ISiteUserProps {
  Expiration: string;
  IsEmailAuthenticationGuestUser: boolean;
  UserId: {
      NameId: string;
      NameIdIssuer: string;
  };
  UserPrincipalName: string | null;
}
/**
* Describes a single user properties
*
*/
export interface ISiteUserProps {
  /**
   * Contains Site user email
   *
   */
  Email: string;
  /**
   * Contains Site user Id
   *
   */
  Id: number;
  /**
   * Site user IsHiddenInUI
   *
   */
  IsHiddenInUI: boolean;
  /**
   * Site user IsShareByEmailGuestUser
   *
   */
  IsShareByEmailGuestUser: boolean;
  /**
   * Describes if Site user Is Site Admin
   *
   */
  IsSiteAdmin: boolean;
  /**
   * Site user LoginName
   *
   */
  LoginName: string;
  /**
   * Site user Principal type
   *
   */
  PrincipalType: number | PrincipalType;
  /**
   * Site user Title
   *
   */
  Title: string;
}