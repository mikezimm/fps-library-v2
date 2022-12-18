import { getHelpListPerformance } from "./listview/ListPerformance";
// import { getHelpRefinerColumns } from "./listview/RefinerColumns";
import { getHelpStringFunctions } from "./listview/StringFunctions";
// import { getHelpRefinerRules } from "./listview/RefinerRules";
import { getHelpViews } from "./listview/Views";
// import { getHelpStats } from "./listview/Stats";
// import { getHelpCommands } from "./listview/Commands";
import { getHelpUsers } from "./listview/Users";
import { IWebpartBannerProps } from "../../../banner/mainReact/IWebpartBannerProps";

export function ListViewHelp( bannerProps: IWebpartBannerProps ) : JSX.Element[] {
  
  const pages: JSX.Element[] = [
    getHelpListPerformance (  ) ,
    // getHelpRefinerColumns (  ) ,
    getHelpStringFunctions (  ) ,
    // getHelpRefinerRules (  ) ,
    getHelpViews ( bannerProps ) ,
    // getHelpStats ( bannerProps ) ,
    // getHelpCommands ( bannerProps ) ,
    getHelpUsers ( ) ,
  ]

  return pages;

}