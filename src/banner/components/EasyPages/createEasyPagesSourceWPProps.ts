import { WebPartContextCopy_15_2 } from "../../../common/interfaces/indexes/WebPartContext@152";
import { ISupportedHost } from "../../../common/interfaces/indexes/Layout";
import { IRepoLinks } from "../../../components/atoms/Links/CreateLinks";
import { getReactCSSFromString } from "../../../logic/Strings/reactCSS";
import { IPinMeState } from "../../features/PinMe/Interfaces";
import { IEasyPagesSourceProps } from "./componentPage";
import { IEasyPagesWPProps } from "./epTypes";

export interface ICreateEasyPagesSourceProps extends IEasyPagesWPProps {
  pageLayout: ISupportedHost,
  defPinState: IPinMeState,
}

export function createEasyPagesSourceWPProps( epSrcWPProps: ICreateEasyPagesSourceProps, context: WebPartContextCopy_15_2, repoLink: IRepoLinks ): IEasyPagesSourceProps {

  const easyPagesSourceProps: IEasyPagesSourceProps = {
    context: context,
    pageLayout: epSrcWPProps.pageLayout,
    repo: repoLink,

    pinState: epSrcWPProps.defPinState,

    // added null so not to over-ride any color choices for easy pages
    styles: getReactCSSFromString( 'EasyPageStyles', epSrcWPProps.EasyPageStyles, {} , null ).parsed,
    containerStyles: getReactCSSFromString( 'EasyPageContainerStyles', epSrcWPProps.EasyPageContainerStyles, {} , null ).parsed,
  }

  return easyPagesSourceProps;

}