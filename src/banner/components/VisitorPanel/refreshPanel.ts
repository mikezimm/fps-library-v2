
import { IRepoLinks } from "../../../components/atoms/Links/CreateLinks";
import { createPerformanceTableVisitor } from "../../../components/indexes/Performance";
import { ILoadPerformance, ILoadPerformanceOps } from "../../../components/molecules/Performance/IPerformance";
import { visitorPanelInfo } from "./VisitorPanelComponent";
import { IMinWPBannerProps } from "../../interfaces/MinWP/IMinWPBannerProps";

export function refreshPanel(bannerProps: IMinWPBannerProps, repoLink: IRepoLinks, performance: ILoadPerformance, keysToShow: ILoadPerformanceOps[]) {

  if (performance) {
    bannerProps.replacePanelHTML = visitorPanelInfo(bannerProps as IMinWPBannerProps, repoLink, '', '', createPerformanceTableVisitor(performance, keysToShow));
  }

  return bannerProps;

}
