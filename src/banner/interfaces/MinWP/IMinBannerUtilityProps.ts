
// ####################################################### #######################################################
// ####################################################### #######################################################

import { IWebpartHistory } from "../../features/WebPartHistory/Interface";
import { ISupportedHost } from "../../../common/interfaces/@msft/1.15.2/layout";

export interface IMinBannerUtilityProps {
  uniqueId: string;
  pageLayout: ISupportedHost ;// like SinglePageApp etc... this.context[_pageLayout];

  showRepoLinks: boolean;
  showExport: boolean;

  fpsImportProps: string;

  //ADDED FOR WEBPART HISTORY:
  webpartHistory: IWebpartHistory;

  showTricks: boolean;

}

export const changeBannerUtility : string[] = [ 'showRepoLinks', 'showExport',  ];