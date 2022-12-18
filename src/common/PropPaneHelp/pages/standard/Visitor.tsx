import * as React from 'react';

import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

export const VisitorHelp = <PivotItem headerText={ 'Visitor Help' } > 
    <div className={ 'fps-pph-content' }>
    <div className={ 'fps-pph-topic' }>Full Help Panel Audience</div>
    <div>This gives you control who can see the entire <b>More Information</b> panel in the Help Banner bar.</div>
    <div>People who have less rights than this will only see the content you add via the property pane.</div>

    <div className={ 'fps-pph-topic' }>Panel Description</div>
    <div>Personalized heading message you give you your users.</div>

    <div className={ 'fps-pph-topic' }>Support Message</div>
    <div>Optional message to give users for support.</div>

    <div className={ 'fps-pph-topic' }>Documentation message</div>
    <div>Message you can give users directly above the documentation link</div>

    <div className={ 'fps-pph-topic' }>Paste a Documentation link</div>
    <div>We require a valid SharePoint link where you store further information on using this web part.</div>

    <div className={ 'fps-pph-topic' }>Documentation Description</div>
    <div>Optional text that the user sees as the Documentation Link text</div>

    <div className={ 'fps-pph-topic' }>Support Contacts</div>
    <div>Use of this web part requires a current user to be identified for support issues.</div>

    </div>
</PivotItem>;