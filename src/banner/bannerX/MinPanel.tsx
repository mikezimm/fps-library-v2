
import * as React from 'react';

import { createPerformanceTableVisitor } from '../../components/molecules/Performance/tables';
import { IWebpartBannerProps } from '../mainReact/IWebpartBannerProps';

export function getMinPanel( bannerProps: IWebpartBannerProps ) : JSX.Element {

    const bonusHTML1: any = bannerProps.bonusHTML1 ? bannerProps.bonusHTML1 : null;
    const panelPerformance = bannerProps.panelPerformance ? createPerformanceTableVisitor( bannerProps.panelPerformance, [] ): null;
    const bonusHTML2: any = bannerProps.bonusHTML2 ? bannerProps.bonusHTML2 : null;

    const panelContent = <div>
      { bannerProps.replacePanelHTML }
      { bonusHTML1 ? <div>{ bonusHTML1 }</div> : null }
      { panelPerformance ? <div>{ panelPerformance }</div> : null }
      { bonusHTML2 ? <div>{ bonusHTML2 }</div> : null }
    </div>;

  return panelContent;

}


