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

    styles: getReactCSSFromString( 'EasyPageStyles', epSrcWPProps.EasyPageStyles, {} ).parsed,
    containerStyles: getReactCSSFromString( 'EasyPageContainerStyles', epSrcWPProps.EasyPageContainerStyles, {} ).parsed,
  }

  return easyPagesSourceProps;

}