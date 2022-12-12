import * as React from 'react';

import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';
import { CSSOverRideWarning } from './Warnings';

require('@mikezimm/fps-styles/dist/PropPanelHelp.css');

export const FPSExpandHelp = <PivotItem headerText={ 'FPS Expand' } > 
    <div className={ 'fps-pph-content' }>

    { CSSOverRideWarning }

    <div className={ 'fps-pph-topic' }><b></b>Enable Expandoramic Mode</div>
    <div><b></b>Enables the Expandoramic toggle (diagonal arrow icon in upper left of Header.</div>

    <div className={ 'fps-pph-topic' }><b></b>Page load default</div>
    <div><b></b>Determines the format when loading the page.</div>
    <ul>
        <li>Normal:  Webpart DOES NOT AUTO expand when loading the page</li>
        <li>Expanded:  Page loads with webpart expanded</li>
        <li>Whenever you 'Edit' the page, you may need to manually shrink webpart to see the page and webpart properties.</li>
    </ul>

    <div className={ 'fps-pph-topic' }><b></b>Expandoramic Audience</div>
    <div><b>NOTE:</b> Site Admins will always see all icons regardless of the Toggles or the audience.</div>
    <ul>
        <li>Site Owners: have manageWeb permissions</li>
        <li>Page Editors: have addAndCustomizePages permissions</li>
        <li>Item Editors: have addListItems permissions</li>
    </ul>

    <div className={ 'fps-pph-topic' }><b>Style options and Hover Effect</b> are for SharePoint IT use only.</div>
    <div><b></b></div>

    <div className={ 'fps-pph-topic' }>Padding</div>
    <div>Adjusts the padding around the webpart.  20px minimum.</div>

    </div>
</PivotItem>;