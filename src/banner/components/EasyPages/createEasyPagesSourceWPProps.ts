
import { ISupportedHost } from "../../../common/interfaces/indexes/Layout";
import { getReactCSSFromString } from "../../../logic/Strings/reactCSS";
import { IPinMeState } from "../../features/PinMe/Interfaces";
import { IEasyPagesSourceProps } from "./componentPage";
import { IEasyPagesWPProps } from "./epTypes";
import { IThisFPSWebPartClass } from "../../FPSWebPartClass/IThisFPSWebPartClass";

export interface ICreateEasyPagesSourceProps extends IEasyPagesWPProps {
  pageLayout: ISupportedHost,
  defPinState: IPinMeState,
}

export function createEasyPagesSourceWPProps( main: IThisFPSWebPartClass ): IEasyPagesSourceProps {
  const epSrcWPProps = main.properties;
  const easyPagesSourceProps: IEasyPagesSourceProps = {
    context: main.context,
    pageLayout: epSrcWPProps.pageLayout,
    repo: main._repoLink,

    pinState: epSrcWPProps.defPinState,

    // added null so not to over-ride any color choices for easy pages
    styles: getReactCSSFromString( 'EasyPageStyles', epSrcWPProps.EasyPageStyles, {} , null ).parsed,
    containerStyles: getReactCSSFromString( 'EasyPageContainerStyles', epSrcWPProps.EasyPageContainerStyles, {} , null ).parsed,
  }

  return easyPagesSourceProps;

}