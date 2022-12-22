import { PanelType } from 'office-ui-fabric-react';
import { IGrouping } from '../../../../common/interfaces/openSource/spfxControlsReact/@3.7.2/IViewField';
import { IMyBigDialogProps } from '../../../atoms/Elements/confirmDialogBig';
import { IQuickButton } from '../../../interfaces/QuickCommands/IQuickCommands';
import { IDrillItemInfo } from '../../../interfaces/Drilldown/IDrillItem';
import { IMinPageArrowsState, } from '../../Arrows/PageArrows';
import { IViewFieldDD } from '../interfaces/IViewFieldDD';
import { IUpdateCommandItemReturn } from '../../../../pnpjs/CommandItems/updateItem';

export interface IReactListItemsState extends IMinPageArrowsState {
  maxChars?: number;
  parentListFieldTitles: any;
  viewFields: IViewFieldDD[];
  groupByFields?: IGrouping[];

  showPanel: boolean;
  panelWidth: PanelType;
  showAttach: boolean;
  clickedAttach: boolean; //if you clicked the attached icon (vs selected row), it only will show the attachments in the panel for cleaner implimentation

  fontSize: any; //=>> address:  https://github.com/mikezimm/drilldown7/issues/169

  panelId: number;
  lastPanelId: number;
  panelItem: IDrillItemInfo;
  panelAttachments: any[];
  lastAttachId: number;
  panelMessage?: any;

  myDialog?: IMyBigDialogProps;
  pickedCommand?: IQuickButton; //Index of command and ID of panel item

  commandResult: IUpdateCommandItemReturn;  // Result of command function
  commandError: boolean;  // command function had error or not

}
