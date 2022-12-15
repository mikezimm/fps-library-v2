
import { IRepoLinks } from "../../../components/atoms/Links/CreateLinks";
import { createPerformanceTableVisitor } from "../../../components/indexes/Performance";
import { ILoadPerformance, ILoadPerformanceOps } from "../../../components/molecules/Performance/IPerformance";
import { visitorPanelInfo } from "../../components/VisitorPanel/VisitorPanelComponent";
import { IMinWPBannerProps } from "../../interfaces/MinWP/IMinWPBannerProps";

export function refreshPanelHTML(bannerProps: IMinWPBannerProps, repoLink: IRepoLinks, performance: ILoadPerformance, keysToShow: ILoadPerformanceOps[]) {
  let replacePanelHTML: any = bannerProps.replacePanelHTML;

  if (performance) {
    replacePanelHTML = visitorPanelInfo(bannerProps as IMinWPBannerProps, repoLink, '', '', createPerformanceTableVisitor(performance, keysToShow));
  }

  return replacePanelHTML;

}
