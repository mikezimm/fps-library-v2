import { DisplayMode } from '@microsoft/sp-core-library';


export interface IMinListProps {
  webUrl: string;
  listTitle: string;

}

export const changesFieldPanel : string[] = [ 'lists', 'designMode', 'displayMode', 'tryCommands', 'saveCommands', 'tryViews', 'saveViews'  ]

/**
 * IFieldPanelDesignMode:  
 *    Disabled means only show main column pain for finding column names
 *    Drilldown enables Design mode specific for Drilldown webpart including Views and Commands
 *    ListAPalooza enables for future web part in planning stage
 */
export type IFieldPanelDesignMode = 'Disabled' | 'Drilldown' | 'ListAPalooza' | 'Other';

export interface IMinWPFieldPanelProps {
  displayMode: DisplayMode;
  lists: IMinListProps[];  //Should not be exported

  designMode: IFieldPanelDesignMode;  //Should not be exported

  tryCommands?: any; //if function is passed down, parent web part could use this to temporarily replace the saved button commands.
  saveCommands?: any; // callback function to save current command
  tryViews?: any; //if function is passed down, parent web part could use this to temporarily replace the saved button commands.
  saveViews?: any; // callback function to save current command
  // enable: boolean; // Set in BuildBannerPropsX2 and depends on this._allowFieldPanel and if there is a web url and list title provided.  Will need to update this in react render if I add an input box in a web part
}
