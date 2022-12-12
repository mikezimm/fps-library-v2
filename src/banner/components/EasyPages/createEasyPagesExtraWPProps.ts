import { getStringArrayFromString } from "../../../logic/Strings/arraysFromString";
import { IEasyPagesExtraProps } from "./componentSources";
import { IEasyPagesWPProps } from "./epTypes";

export function createEasyPagesExtraWPProps( epXtraWPProps: IEasyPagesWPProps, showTricks: boolean, ) : IEasyPagesExtraProps {

  const tabsC = getStringArrayFromString( epXtraWPProps.EasyPageTabsC , ';', true, null, true ) ;
  const tabsP = getStringArrayFromString( epXtraWPProps.EasyPageTabsP , ';', true, null, true ) ;
  const tabsA = getStringArrayFromString( epXtraWPProps.EasyPageTabsA , ';', true, null, true ) ;
  const tabsB = getStringArrayFromString( epXtraWPProps.EasyPageTabsB , ';', true, null, true ) ;

  // Updated this to convert tabs to empty array so getStringArrayFromString can still return null... it's used LOTS of places
  const easyPagesExtraProps:  IEasyPagesExtraProps = {
      easyPagesExpanded: false,
      showTricks: showTricks,
      EasyPagesEnable: epXtraWPProps.EasyPagesEnable,
      EasyPageParentFetch: epXtraWPProps.EasyPagesEnable === true ? epXtraWPProps.EasyPageParent : false,
      EasyPageUrlA: epXtraWPProps.EasyPagesEnable === true ? epXtraWPProps.EasyPageUrlA : '',
      EasyPagesSiteTitleA: epXtraWPProps.EasyPagesSiteTitleA,

      EasyPageUrlB: epXtraWPProps.EasyPagesEnable === true ? epXtraWPProps.EasyPageUrlB : '',
      EasyPagesSiteTitleB: epXtraWPProps.EasyPagesSiteTitleB,

      EasyPageOverflowTab: epXtraWPProps.EasyPageOverflowTab,

      tabsC: tabsC === null ? [] : tabsC ,
      tabsP: tabsP === null ? [] : tabsP ,
      tabsA: tabsA === null ? [] : tabsA ,
      tabsB: tabsB === null ? [] : tabsB ,

    }

    return easyPagesExtraProps;

}