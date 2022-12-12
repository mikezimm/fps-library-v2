import { getStringArrayFromString } from "../../../logic/Strings/arraysFromString";
import { IEasyPagesExtraProps } from "./componentSources";
import { IEasyPagesWPProps } from "./epTypes";

export function createEasyPagesExtraWPProps( epXtraWPProps: IEasyPagesWPProps, showTricks: boolean, ) : IEasyPagesExtraProps {

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

      tabsC: getStringArrayFromString( epXtraWPProps.EasyPageTabsC , ';', true, null, true ) ,
      tabsP: getStringArrayFromString( epXtraWPProps.EasyPageTabsP , ';', true, null, true ) ,
      tabsA: getStringArrayFromString( epXtraWPProps.EasyPageTabsA , ';', true, null, true ) ,
      tabsB: getStringArrayFromString( epXtraWPProps.EasyPageTabsB , ';', true, null, true ) ,

    }

    return easyPagesExtraProps;

}