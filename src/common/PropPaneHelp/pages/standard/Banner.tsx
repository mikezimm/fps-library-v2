import * as React from 'react';
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

import { defaultBannerCommandStyles, } from "../../../commandStyles/defaults";

export const BannerHelp = <PivotItem headerText={ 'Banner' } > 
    <div className={ 'fps-pph-content' }>
    <div className={ 'fps-pph-topic' } style={{ textDecoration: 'underline' }}>FPS Banner - Basics</div>
    <div className={ 'fps-pph-topic' }>Show Banner</div>
    <div>May allow you to hide the banner.  If toggle disabled, it is required.</div>

    <div className={ 'fps-pph-topic' }>Optional Web Part Title</div>
    <div>Add Title text to the web part banner.</div>
    <div>Depending on the web part, this may not be editable.</div>

    <div className={ 'fps-pph-topic' }>More Info text-button</div>
    <div>Customize the More Information text/Icon in the right of the banner.</div>

    <div className={ 'fps-pph-topic' } style={{ textDecoration: 'underline' }}>FPS Banner - Navigation</div>
    <div className={ 'fps-pph-topic' }>Show 'Go to Home Page' <Icon iconName='Home'/> Icon</div>
    <div>Displays the <Icon iconName='Home' style={ defaultBannerCommandStyles }/> when you are not on the site's home page.</div>

    <div className={ 'fps-pph-topic' }>Show 'Go to Parent Site' <Icon iconName='Up'/> Icon</div>
    <div>Displays the <Icon iconName='Up' style={ defaultBannerCommandStyles }/> when you are not on the site's home page.</div>

    <div className={ 'fps-pph-topic' }>Gear, Go to Home, Parent audience</div>
    <div>Minimum permissions requied to see the Home and Parent site icons.</div>
    <div>Use this to hide buttons from visitors if your ALV Financial Manual Web part is more of a single page app and you want to hide the site from a typical visitor.</div>
    <div>NOTE:  Site Admins will always see the icons.</div>
    <ul>
        <li>Site Owners: have manageWeb permissions</li>
        <li>Page Editors: have addAndCustomizePages permissions</li>
        <li>Item Editors: have addListItems permissions</li>
    </ul>
    
    
    

    <div className={ 'fps-pph-topic' } style={{ textDecoration: 'underline' }}>Theme options</div>
    <div><mark><b>NOTE:</b></mark> May be required depending on our policy for this web part</div>
    <div>Use dropdown to change your theme for the banner (color, buttons, text)</div>

    <div className={ 'fps-pph-topic' }>Banner Hover Effect</div>
    <div>Turns on or off the Mouse Hover effect.  If Toggle is off, the banner does not 'Fade In'.  Turn off if you want a solid color banner all the time.</div>

    </div>
</PivotItem>;
