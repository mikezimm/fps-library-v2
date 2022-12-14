import * as React from 'react';

require('@mikezimm/fps-styles/dist/PropPanelHelp.css');

import { Pivot, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';

// import { IFieldPanelProps } from '../../../components/molecules/FieldPanel/IFieldPanelProps';
import { SitePresetsInfo } from './SitePresetsInfo';
import { IWebpartBannerProps } from '../../../banner/mainReact/IWebpartBannerProps';
import { VisitorHelp } from './Visitor';
import { BannerHelp } from './Banner';
import { FPSBasicHelp } from './FPSBasic';
import { FPSExpandHelp } from './FPSExpand';
import { ImportHelp } from './Import';
import { getEasyIconsHelp } from '../../../components/atoms/EasyIcons/eiHelp';
import { EasyIconObjectDefault } from '../../../components/atoms/EasyIcons/eiTypes';

export function getWebPartHelpElementX ( WebPartHelpPivots: JSX.Element[], bannerProps: IWebpartBannerProps, ) {

  const DefaultPivots: JSX.Element[] = [
    getEasyIconsHelp( EasyIconObjectDefault, ),
    VisitorHelp,
    BannerHelp,
    FPSBasicHelp,
    FPSExpandHelp,
    // {/* { SinglePageAppHelp } */}
    ImportHelp,
  ];

  const preSetsContent = SitePresetsInfo( bannerProps.sitePresets );
  if ( preSetsContent ) DefaultPivots.push( preSetsContent )

  const AllPivots: JSX.Element[] = [ ...WebPartHelpPivots, ...DefaultPivots ];

  const WebPartHelpElement = <div style={{ overflowX: 'scroll' }}>
  <Pivot 
          linkFormat={PivotLinkFormat.links}
          linkSize={PivotLinkSize.normal}
      >
      { AllPivots }
    </Pivot>
  </div>;

  return WebPartHelpElement;

}