import * as React from 'react';
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

import { defaultBannerCommandStyles, } from "../../commandStyles/defaults";

require('@mikezimm/fps-styles/dist/PropPanelHelp.css');

export const ImportHelp = <PivotItem headerText={ 'Import' } > 
    <div className={ 'fps-pph-content' }>
        <div className={ 'fps-pph-topic' }>If Available in this web part...</div>
        <div>It allows you to paste in values from the same webpart from a different page.</div>
        <div>To Export web part settings</div>
        <ol>
        <li>Click on 'More Information' in the Web Part Banner</li>
        <li>Click the Export tab <Icon iconName='Export' style={ defaultBannerCommandStyles }/> (last tab in the Help Panel)</li>
        <li>Hover over Export Properties row</li>
        <li>Click the blue paper/arrow icon on the right side of the row to 'Export' the properties</li>
        <li>Edit this page and web part</li>
        <li>Paste properties into the Import properties box</li>
        </ol>

    </div>
</PivotItem>;