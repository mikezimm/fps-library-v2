import * as React from 'react';

import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

require('@mikezimm/fps-styles/dist/PropPanelHelp.css');

export const SinglePageAppHelp = <PivotItem headerText={ 'Single Page Apps' } > 
    <div className={ 'fps-pph-content' }>

    <div className={ 'fps-pph-topic' }>Before you start!</div>

    <div className={ 'fps-pph-topic' }>If you plan to build a full page app (Full expand web part at load time)</div>
    <div>
        Be sure to follow these steps to improve performance and minimize any styling issues and delays:
        <ol>
        <li>Create a page from 'Apps' Template when you first create a page</li>
        <ul>
            <li>This will remove all navigation from the page, make the web part full page and load faster.</li>
        </ul>

        <li>IF NOT, then Start with a <b>Communication Site</b></li>
        <ul>
            <li>This is the only site that allows true 'Full Width webparts'</li>
        </ul>
        <li><b>Clear the home page completely</b> (do not have any other webparts)</li>
        <li>Minimize what SharePoint loads
        <ol style={{ listStyleType: 'lower-alpha' }}>
            <li>Go to Gear</li>
            <li>Click 'Change the look'</li>
            <li>Click Header
            <ul>
            <li>Set Layout to minimal</li>
            <li>Set 'Site title visiblity' to off</li>
            <li>Remove your site logo</li>
            <li>Save Header settings</li>
            </ul></li>
            <li>Click Navigation
            <ul>
            <li>Turn off Site Navigation</li>
            </ul></li>
        </ol></li>
        <li>Add SecureScript in the first Full Width section</li>
        </ol>
    </div>
    </div>
</PivotItem>;