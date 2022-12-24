import { getStringArrayFromString } from "../../../logic/Strings/arraysFromString";
import { verifyAudienceVsUser } from "../../../logic/Users/CheckPermissions";
import { IThisFPSWebPartClass } from "../../FPSWebPartClass/IThisFPSWebPartClass";
import { IEasyPagesExtraProps } from "./componentSources";

export function createEasyPagesExtraWPProps( main: IThisFPSWebPartClass, showTricks: boolean, renderAsReader: boolean ) : IEasyPagesExtraProps {

  const enableEasyPages = main._allowEasyPages === false || main.properties.EasyPagesEnable === false ? false :
    verifyAudienceVsUser( main._FPSUser, showTricks, main.properties.EasyPagesAudience , null, renderAsReader );

  const tabsC = getStringArrayFromString( main.properties.EasyPageTabsC , ';', true, null, true ) ;
  const tabsP = getStringArrayFromString( main.properties.EasyPageTabsP , ';', true, null, true ) ;
  const tabsA = getStringArrayFromString( main.properties.EasyPageTabsA , ';', true, null, true ) ;
  const tabsB = getStringArrayFromString( main.properties.EasyPageTabsB , ';', true, null, true ) ;

  // Updated this to convert tabs to empty array so getStringArrayFromString can still return null... it's used LOTS of places
  const easyPagesExtraProps:  IEasyPagesExtraProps = {
      easyPagesExpanded: false,
      easyPagesToggleExpanded: null, // Placeholder for callback function to banner
      showTricks: showTricks,
      EasyPagesEnable: enableEasyPages,
      EasyPageParentFetch: enableEasyPages === true ? main.properties.EasyPageParent : false,
      EasyPageUrlA: enableEasyPages === true ? main.properties.EasyPageUrlA : '',
      EasyPagesSiteTitleA: main.properties.EasyPagesSiteTitleA,

      EasyPageUrlB: enableEasyPages === true ? main.properties.EasyPageUrlB : '',
      EasyPagesSiteTitleB: main.properties.EasyPagesSiteTitleB,

      EasyPageOverflowTab: main.properties.EasyPageOverflowTab,

      tabsC: tabsC === null ? [] : tabsC ,
      tabsP: tabsP === null ? [] : tabsP ,
      tabsA: tabsA === null ? [] : tabsA ,
      tabsB: tabsB === null ? [] : tabsB ,

    }

    return easyPagesExtraProps;

}