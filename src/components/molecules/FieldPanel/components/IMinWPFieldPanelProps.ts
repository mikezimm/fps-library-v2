import { DisplayMode } from '@microsoft/sp-core-library';


export interface IMinListProps {
  webUrl: string;
  listTitle: string;

}

/**
 * IFieldPanelDesignMode:  
 *    Disabled means only show main column pain for finding column names
 *    Drilldown enables Design mode specific for Drilldown webpart including Views and Commands
 *    ListAPalooza enables for future web part in planning stage
 */
export type IFieldPanelDesignMode = 'Disabled' | 'Drilldown' | 'ListAPalooza' | 'Other';

export interface IMinWPFieldPanelProps {
  displayMode: DisplayMode;
  lists: IMinListProps[];

  designMode: IFieldPanelDesignMode;

  tryCommands?: any; //if function is passed down, parent web part could use this to temporarily replace the saved button commands.
  saveCommands?: any; // callback function to save current command
  tryViews?: any; //if function is passed down, parent web part could use this to temporarily replace the saved button commands.
  saveViews?: any; // callback function to save current command
}
