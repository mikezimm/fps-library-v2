
import { ISiteUsersInfo } from "./ISiteUsersInfo";

export type IValidUserProp = 'Id' | 'Title' | 'Name' | 'Email';

export interface IValueUserInfos {
  Ids: number[];
  Titles: string[];
  Names: string[];
  Emails: string[];
  Users: any[];
  Props: IValidUserProp[];
  result: ISiteUsersInfo;
}