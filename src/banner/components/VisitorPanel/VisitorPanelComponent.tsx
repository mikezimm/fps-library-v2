import * as React from 'react';

import { IRepoLinks } from '../../../components/atoms/Links/CreateLinks';
import { TeamsLogo } from '../../../components/atoms/SVGIcons/TeamsLogo';
import { IMinWPVisitorPanelInfo } from './Interfaces';


/***
 *    db    db d888888b .d8888. d888888b d888888b  .d88b.  d8888b.      d8888b.  .d8b.  d8b   db d88888b db           d888888b d8b   db d88888b  .d88b.  
 *    88    88   `88'   88'  YP   `88'   `~~88~~' .8P  Y8. 88  `8D      88  `8D d8' `8b 888o  88 88'     88             `88'   888o  88 88'     .8P  Y8. 
 *    Y8    8P    88    `8bo.      88       88    88    88 88oobY'      88oodD' 88ooo88 88V8o 88 88ooooo 88              88    88V8o 88 88ooo   88    88 
 *    `8b  d8'    88      `Y8b.    88       88    88    88 88`8b        88~~~   88~~~88 88 V8o88 88~~~~~ 88              88    88 V8o88 88~~~   88    88 
 *     `8bd8'    .88.   db   8D   .88.      88    `8b  d8' 88 `88.      88      88   88 88  V888 88.     88booo.        .88.   88  V888 88      `8b  d8' 
 *       YP    Y888888P `8888Y' Y888888P    YP     `Y88P'  88   YD      88      YP   YP VP   V8P Y88888P Y88888P      Y888888P VP   V8P YP       `Y88P'  
 *                                        
 *                                        
 */

// export function visitorPanelInfo( wpProps: IMinWPVisitorPanelInfo, performance: ILoadPerformanceALVFM ) {
export function visitorPanelInfo( wpProps: IMinWPVisitorPanelInfo, repoLinks: IRepoLinks, bodyText: string, fromText: string, loadSummary: JSX.Element | null ) {
    const {
        bannerTitle,
        documentationLinkDesc,
        documentationLinkUrl,
        supportContacts,
        panelMessageDescription1,
        panelMessageSupport,
        panelMessageDocumentation,
        panelMessageIfYouStill,
      } = wpProps;

      if ( !bodyText ) bodyText = 'Add your question or comment here: ';
      if ( !fromText ) fromText = 'SharePoint Support Team';

    console.log('visitorPanelInfo - wpProps', wpProps );
    //    text-decoration: underline;
    const headingStyles : React.CSSProperties = {fontSize: 'larger', paddingTop: '25px', fontWeight: 'bold'};
    const subHeadingStyles : React.CSSProperties = {fontSize: 'normal', paddingLeft: '20px' };
    const subHeadingStylesAround : React.CSSProperties = {fontSize: 'normal', padding: '16px 20px 0px 20px' };
    const contactStyles : React.CSSProperties = {fontSize: 'normal', padding: '16px 20px 0px 20px' };

    const Description1 = !panelMessageDescription1 ? null : 
        <div style={ subHeadingStyles }>{ panelMessageDescription1 }</div>;

    const Support = !panelMessageSupport ? null : 
        <div style={ subHeadingStylesAround }>{ panelMessageSupport }</div>;

    const DocumentationMessage = !panelMessageDocumentation ? null : 
        <div style={ subHeadingStylesAround }>{ panelMessageDocumentation }</div>;

    const cardStyles : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '5px',

    };

    const lbreak = '%0D%0A';

    const contactList = !supportContacts ? [] : supportContacts.map( contact => {

        let pageName = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
        let mailTemplate = `mailto:${contact.email}`;
        mailTemplate += `?subject=${repoLinks.desc} Webpart Question or Issue on PAGE: ${ pageName }`;
        mailTemplate += `&body=${ bodyText } ${ lbreak }${ lbreak }${ lbreak }`;
        mailTemplate += `Page Name: ${ pageName }${ lbreak }${ lbreak }`;
        mailTemplate += `Link to page:${ lbreak }${ window.location.href }${ lbreak }${ lbreak }`;
        mailTemplate += `Best Regards, ${ lbreak }${ lbreak }`;
        mailTemplate += `${ fromText }`;

        //Fix:  https://github.com/mikezimm/ALVFinMan/issues/141
        const imageUrl: string = !contact.imageUrl || ( contact.email && contact.email.indexOf('.teams.ms') )  ? TeamsLogo : contact.imageUrl ;

        return <div style={ cardStyles }>
            <img src={ imageUrl } alt={`Picture of ${ contact.fullName}`} width={ 30 } height={ 30 } style={{borderRadius: '50%' }}  />
            <a style={{ paddingLeft: '20px', paddingRight: '20px' }} href={ mailTemplate }>Email</a>
            <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>{ contact.fullName }</div>
        </div>;
    });

    const ContactInfo = contactList.length === 0 ? null : <div style={ contactStyles }>
        { contactList }
    </div>;

    let validLink = documentationLinkUrl && documentationLinkUrl.length > 0 && 
        (
            documentationLinkUrl.indexOf('./') === 0 ||
            documentationLinkUrl.indexOf('../') === 0 ||
            documentationLinkUrl.indexOf('/sites') === 0 ||
            documentationLinkUrl.indexOf(window.origin) === 0
        ) ? '' : 'Please Verify Link :(';

    const docsLink = !documentationLinkUrl ? null : <div style={ contactStyles }>
        <span onClick={() => onLinkClick( documentationLinkUrl )} 
        style={{ color: 'blue' , cursor: 'pointer', paddingRight: '30px' }}
        title={ documentationLinkUrl }
         >{ documentationLinkDesc }</span><span>{validLink}</span>
    </div>;

    // const loadSummary = createPerformanceTableVisitor( performance );

/***
 *    d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *    88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *    88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *    88`8b   88~~~~~    88    8    88 88`8b   88 V8o88 
 *    88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *    88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *                                                       
 *                                                       
 */


    let panelMessageIfYouStillContent = panelMessageIfYouStill ? panelMessageIfYouStill : ' - please contact the owner of this webpart before submitting an incident.';

    return ( <div style={{ fontSize: 'larger'}}>
        <h2 >{`Support information for: ${ bannerTitle ? bannerTitle : 'This web part' }`}</h2>

        { Description1 }

        <div style={ headingStyles }>If the webpart displays a warning</div>
        <div style={ subHeadingStyles }> - please notify someone listed below in the contacts section</div>

        <div style={ headingStyles }>Before asking for additional support</div>
        <div style={ subHeadingStyles }> - please review our support documentation</div>

        { Support }
        { DocumentationMessage }
        { docsLink }
        <div style={ headingStyles }>If you still have issues...</div>
        <div style={ subHeadingStyles }>{ panelMessageIfYouStillContent } </div>
        <div style={ headingStyles }>Contact(s) for primary support or issues</div>
        <div>{ ContactInfo }</div>  
        <div>{ loadSummary }</div>  
    </div> );
}

function onLinkClick( gotoLink: string ) {
    window.open( gotoLink, '_none' ) ;
}