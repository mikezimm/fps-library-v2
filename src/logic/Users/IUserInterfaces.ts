

/***
 *    db    db .d8888. d88888b d8888b. 
 *    88    88 88'  YP 88'     88  `8D 
 *    88    88 `8bo.   88ooooo 88oobY' 
 *    88    88   `Y8b. 88~~~~~ 88`8b   
 *    88b  d88 db   8D 88.     88 `88. 
 *    ~Y8888P' `8888Y' Y88888P 88   YD 
 *                                     
 *                                     

import { getPrincipalTypeString, ensureUserInfo, checkIfUserExistsInArray, getEmailFromLoginName, checkForLoginName
    ensureUserHere, ensureTheseUsers, getUserPermissions, getSiteAdmins,  } from '@mikezimm/npmfunctions/dist/Users/userServices';

import { IUser } from '@mikezimm/npmfunctions/dist/Users/IUserInterfaces';

 */

export interface IUser {
  title?: string;
  Title?: string;
  initials?: string;  //Single person column
  email?: string;  //Single person column
  Email?: string;  //Single person column
  id?: any;
  Id?: any;
  ID?: any;
  UserId?: {
    NameId: string;
    NameIdIssuer: string;
  };
  notes?: string[];

  remoteID?: any;  //This is the ID of the user on another site collection, sourceWeb ID
  PrincipalType?: number;

  isSiteAdmin?:boolean;
  IsSiteAdmin?:boolean;

  LoginName?: string;
  Name?: string;
  UserPrincipalName?: string;
  isGuest?: boolean;

  //These optional props are from the React PeoplePicker control
  imageInitials?: string; //same as Initials;         From React People Picker control
  imageUrl?: string;  //Thumbnail URL;                From React People Picker control
  loginName?: string;  //Same as LoginName and Name;  From React People Picker control
  text?: string;   //Same as Title and title;         From React People Picker control
  tertiaryText?: string; //                           From React People Picker control
  secondaryText?: string; // same as email;           From React People Picker control

  ensureWeb?: string; //FullUrl

  // 2022-12-10:  Added fullWebUrl just because ensureWeb was not always consistant here
  fullWebUrl?: string; //FullUrl

}

export type ISimplePermission = 'SharePoint' | 'Admin' | 'FullControl' | 'Designer' | 'Editor' | 'Approver' | 'Contributor' | 'Reader' | 'None';

export interface IFPSUser extends IUser {
  title: string;
  email: string;
  name: string;
  id: string;
  imageUrl: string;
	// isTricky: boolean;  DO NOT USE THIS ANY MORE.  Need to know on app level, not on page level
	trickyApps: string[];
	isSiteAdmin: boolean;
  isGuest: boolean;
  currentCultureName: string;
  PrincipalType?: number;

  //This is the general permission level on web
  simple: ISimplePermission;

  //These are specific permission levels
	manageWeb: boolean;
	managePermissions: boolean;
	enumeratePermissions: boolean;
	addAndCustomizePages: boolean; // aka design
	manageLists: boolean; // aka edit
	approveItems: boolean;
	editListItems: boolean; // aka contribute
	openItems: boolean; // aka read

  crunchTime: number; // Time to fetch user profile

}