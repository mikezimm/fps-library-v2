
import { IGrouping } from '../../../../common/interfaces/openSource/spfxControlsReact/@3.7.2/IViewField';
import { IUser } from '../../../../pnpjs';
import { IDrillItemInfo } from '../../../interfaces/Drilldown/IDrillItem';
import { IPageArrowsParentProps } from '../../Arrows/PageArrows';
import { IQuickCommandsDesign } from '../../FieldPanel/components/command/IAccordion';
import { IViewFieldDD } from '../interfaces/IViewFieldDD';

export interface IReactListItemsProps extends IPageArrowsParentProps {
  title?: string;
  descending?: boolean;
  maxChars?: number;
  items: IDrillItemInfo[];
  richColumns: string[];
  richHeight: string; //=>> maxHeight: 55em ; address:  https://github.com/mikezimm/drilldown7/issues/270
  updateRichHeightProps: any;

  resetArrows?: string; //unique Id used to reset arrows to starting position

  webURL: string; //Used for attachments
  listName: string; //Used for attachments
  parentListURL: string;
  isLibrary: boolean;

  contextUserInfo: IUser; //For site you are on ( aka current page context )
  sourceUserInfo: IUser; //For site where the list is stored

  blueBar?: any;
  blueBarTitleText?: string;

  showIDs?: boolean;
  showDesc?: boolean;

  parentListFieldTitles?: string;
  viewFields?: IViewFieldDD[];

  groupByFields?: IGrouping[];
  includeDetails: boolean;
  includeAttach: boolean;
  includeListLink: boolean;
  createItemLink: boolean;

  highlightedFields?: string[];

  quickCommands?: IQuickCommandsDesign;

}
