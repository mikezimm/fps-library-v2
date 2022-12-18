


//  import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
 
 import { IGrouping, IViewField } from '../../../common/interfaces/openSource/spfxControlsReact/@3.7.2/IViewField';
 import { IUser } from '../../../logic/Users/IUserInterfaces';
import { IQuickCommands } from '../QuickCommands/IQuickCommands';
//  import { IUser } from '../Services/Users_/IUserInterfaces_';

export type ICustViewDefKeys = 'includeDetails' | 'includeAttach' | 'includeListLink' | 'createItemLink';

export interface ICustViewDef {
  minWidth: number;
  viewFields: IViewField[];
  groupByFields?: IGrouping[];
  includeDetails: boolean;
  includeAttach: boolean;
  includeListLink: boolean;
  createItemLink: boolean;
}
  
export interface IListViewDD {

  parentListFieldTitles: string;
  webURL :string;
  parentListURL : string;
  listName : string;
  togOtherListview: boolean;

  viewDefs: ICustViewDef[];
  viewFields: IViewField[];
  groupByFields?: IGrouping[];

  quickCommands?: IQuickCommands;

  items : any[];
  breadCrumb: string[];

  contextUserInfo: IUser;  //For site you are on ( aka current page context )
  sourceUserInfo: IUser;   //For site where the list is stored

}