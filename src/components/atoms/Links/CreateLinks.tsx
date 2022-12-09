import * as React from 'react';

import { Link, } from 'office-ui-fabric-react';

export const baseDevDocs = 'https://developer.microsoft.com/en-us/fabric#/controls/web/';

export interface IRepoLinks {
    repo: any;
    issues: any;
    wiki: any;
    projects: any;
    href: string;
    target: string;
    desc: string;
}

export function createRepoLinks(href: string, target: string, linkDesc: string, style: 'legacy' | 'smaller' | 'small' = 'legacy' ){

    let gitHubLinkDesc = `${ linkDesc } on Github`;
    let gitHubIssuesLinkDesc = `${ style === 'legacy' ? linkDesc : '' } Issues`;
    let gitHubWikiLinkDesc = `${ style === 'legacy' ? linkDesc : '' } Wiki`;
    let gitHubProjLinkDesc = `${ style === 'legacy' ? linkDesc : '' } Projects`;

    let repoLinks : IRepoLinks = {
        repo: createLink( href, target, gitHubLinkDesc ),
        issues: createLink( href + '/issues', target, gitHubIssuesLinkDesc ),
        wiki: createLink( href + '/wiki', target, gitHubWikiLinkDesc ),
        projects: createLink( href + '/projects', target, gitHubProjLinkDesc ),
        href: href,
        target: target,
        desc: linkDesc,
    };

    return repoLinks;

}

export function createLink(href: string, target: string, linkDesc: string){
    return (
        <Link href={href} target={ target }>{ linkDesc }</Link>
    );
}

export function createSpanLink( url: string, desc: string, title: string = '', size: string = '' ) {
    let linkStyle = { cursor: 'pointer', color: '#1a0dab', fontSize: size !== null ? size : 'normal' };
    const thisLink = <span style={ linkStyle } 
                        onClick={ () => openThisLinkInNewTab( url ) }
                        title={ title !== null ? title : desc }
                      >
                          { desc }
                      </span>;
    return thisLink;
  }

  export function openThisLinkInNewTab( input: any ) {

    const link : string = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';
    if ( link ) { 
        window.open( link, '_blank' ); 
    } else {
        console.log('openThisLinkInNewTab: Function was called but there was no link... input=', input )
    }
  }