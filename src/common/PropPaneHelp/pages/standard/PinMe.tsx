import * as React from 'react';
// import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

export const PinMeHelp = <PivotItem headerText={ 'Pin Me' } > 
    <div className={ 'fps-pph-content' }>
    <div className={ 'fps-pph-topic' }>Default Location</div>
    <div>
        <li><b>normal - </b>Web part loads on page where you put it</li>
        <li><b>Pin Expanded - </b>Web part loads Pinned in upper right corner fully expanded</li>
        <li><b>Pin Collapsed - </b>Web part loads Pinned in upper right corner collapsed</li>
    </div>
    <div className={ 'fps-pph-topic' }>Force Pin State</div>
    <div>
        <li><b>Let user change - </b>End user can move the web part from Pinned to Normal location at any time</li>
        <li><b>Enforce no Toggle - </b>End user can not toggle the position of the web part.
        <p>With Enforcing pin, the end user will always be able to expand or collapse the web part.</p>
        <p>Be sure to test experience by loading the page with the browser shrunk to size of a phone.  Consider end user experience trying to navigate your page.</p>
        </li>
    </div>
    </div>
</PivotItem>;