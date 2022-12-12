import * as React from 'react';
// import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';
import { CSSOverRideWarning } from './Warnings';

require('@mikezimm/fps-styles/dist/PropPanelHelp.css');

export const FPSBasicHelp = <PivotItem headerText={ 'FPS Basic' } > 
    <div className={ 'fps-pph-content' }>

    { CSSOverRideWarning }

    <div className={ 'fps-pph-topic' }>Hide Quick Launch</div>
    <div>As of April 2022, MSFT allows you to modify quick launch in Site Gear 'Change the look'</div>
    <div>Only use this option if you want the Quick launch on the site as a whole but not on the page this web part is installed on.</div>
    
    <div className={ 'fps-pph-topic' }>All Sections <b>Max Width</b> Toggle and slider</div>
    <div>Over-rides out of the box max width on page sections.</div>

    <div className={ 'fps-pph-topic' }>All Sections <b>Margin</b> Toggle and slider</div>
    <div>Over-rides out of the box top and bottom section margin.</div>

    <div className={ 'fps-pph-topic' }>Hide Toolbar - while viewing</div>
    <div>Hidden:  Will hide the page toolbar (Edit button) when loading the page.</div>
    <div><b>Only use if you know what you are doing :)</b></div>
    <div><mark>WARNING</mark>.  <b>Add ?tool=true to the Url</b> and reload the page in order to edit the page.  You <b>CAN NOT SEE THESE INSTRUCTIONS</b> unless you add ?tool=true to the page</div>

    </div>
</PivotItem>;