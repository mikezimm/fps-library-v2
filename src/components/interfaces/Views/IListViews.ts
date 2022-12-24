


//  import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
 
 import { IGrouping, IViewField } from '../../../common/interfaces/openSource/spfxControlsReact/@3.7.2/IViewField';
 import { IUser } from '../../../logic/Users/IUserInterfaces';
import { IQuickCommands } from '../QuickCommands/IQuickCommands';
//  import { IUser } from '../Services/Users_/IUserInterfaces_';

export type ICustViewDefKeys = 'includeDetails' | 'includeAttach' | 'includeListLink' | 'createItemLink';

/**
 * This mirrors the 3 groups in property pane.
 * Although it adds the 4 keys in ICustViewDefKeys.
 * Currently the keys would the the same on all 3 views
 */
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

  // parentListFieldTitles: string;  2022-12-22:  Does not seem to be used anywhere
  webURL :string;
  listUrl : string;
  listName : string;
  // togOtherListview: boolean;  2022-12-22:  Does not seem to be used anywhere

  viewDefs: ICustViewDef[];
  viewFields: IViewField[];
  groupByFields?: IGrouping[];

  quickCommands?: IQuickCommands;

  items : any[];
  // breadCrumb: string[];  2022-12-22:  Does not seem to be used anywhere

  contextUserInfo: IUser;  //For site you are on ( aka current page context )
  sourceUserInfo: IUser;   //For site where the list is stored

}