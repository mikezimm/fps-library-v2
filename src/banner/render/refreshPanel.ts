import { IMinWPBannerProps } from "./BannerInterface_";
import { IRepoLinks } from "../../Links_/CreateLinks";
import { visitorPanelInfo } from '../../CoreFPS_/VisitorPanelComponent_';
import { ILoadPerformance, ILoadPerformanceOps } from "../../Performance_/IPerformance";
import { createPerformanceTableVisitor } from "../../Performance_/tables";

export function refreshPanel(bannerProps: IMinWPBannerProps, repoLink: IRepoLinks, performance: ILoadPerformance, keysToShow: ILoadPerformanceOps[]) {

  if (performance) {
    bannerProps.replacePanelHTML = visitorPanelInfo(bannerProps as IMinWPBannerProps, repoLink, '', '', createPerformanceTableVisitor(performance, keysToShow));
  }

  return bannerProps;

}
