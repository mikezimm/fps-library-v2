import * as React from "react";

// For SPPermission:  let addAndCustomizePages = pageContext.web.permissions.hasPermission( SPPermission.addAndCustomizePages );
import { SPPermission } from '@microsoft/sp-page-context';

import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IWebpartBannerProps } from "../../mainReact/IWebpartBannerProps";
import { defaultBannerCommandStyles } from "../../../common/commandStyles/defaults";

require ('@mikezimm/fps-styles/dist/bannerSettings.css');

type hoverColor = 'red' | 'green' | 'yellow' | null;

export function standardSettingsLink( title: string, iconName: string , iconStyles: React.CSSProperties, href: string, color: hoverColor = null ){
  let styleName = 'grayHover';
  let titleProp = '';

  if ( color === 'red' ) {
    styleName = 'red';
    titleProp = 'You are not on your z-Account!!!';

  } else if ( color === 'green' ) {
    styleName = 'green';
    titleProp = 'You are on your z-Account :)';

  } else if ( color === 'yellow' ) {
    styleName = 'yellow';
    titleProp = 'Azure DevOps - you have an account?';

  } 
  
  return <li title={ titleProp } className={ styleName } onClick={ () => { window.open( href, '_none') ; } } >
      { iconName && iconName.length > 0 ? <Icon iconName={ iconName } style={ iconStyles }/> : null }
      <span>{ title }</span>
    </li>;

}

function getTenantAdminUrl() {
  let tenant = window.location.hostname.split('.');
  return `https://${tenant[0]}-admin.sharepoint.com`;
}

export function Settings( siteUrl: string, showIcon: boolean, iconStyles: any ) {
  return standardSettingsLink( 'Settings', showIcon === true ? 'Settings' : '', iconStyles, `${siteUrl}/_layouts/15/settings.aspx` );
} 

export function Contents( siteUrl: string, showIcon: boolean, iconStyles: any ) {
  return standardSettingsLink( 'Site Contents', showIcon === true ? 'BulletedList2' : '', iconStyles, `${siteUrl}/_layouts/15/viewlsts.aspx?view=14` );
} 

export function Permissions( siteUrl: string, showIcon: boolean, iconStyles: any ) {
  return standardSettingsLink( 'Permissions', showIcon === true ? 'Permissions' : '', iconStyles, `${siteUrl}/_layouts/15/user.aspx` );
} 

export function AdminRecycleBin( siteUrl: string, showIcon: boolean, iconStyles: any, webLevel: boolean  ) {
  let title = `${webLevel === true ? 'Web' : 'Site'} Recycle Bin`;
  return standardSettingsLink( title , showIcon === true ? 'RecycleBin' : '', iconStyles, `${siteUrl}/_layouts/15/AdminRecycleBin.aspx${webLevel === true ? '?view=5': '?view=13'}`  );
} 

export function GroupsLink( siteUrl: string, showIcon: boolean, iconStyles: any ) {
  return standardSettingsLink( 'Groups', showIcon === true ? 'Group' : '', iconStyles, `${siteUrl}/_layouts/15/groups.aspx` );
} 

export function StorageMetrics( siteUrl: string, showIcon: boolean, iconStyles: any ) {
  return standardSettingsLink( 'Storage Metrics', showIcon === true ? 'OfflineStorage' : '', iconStyles, `${siteUrl}/_layouts/15/storman.aspx` );
} 

export function NavigationLinks( siteUrl: string, showIcon: boolean, iconStyles: any ) {
  return standardSettingsLink( 'Navigation', showIcon === true ? 'CompassNW' : '', iconStyles, `${siteUrl}/_layouts/15/AreaNavigationSettings.aspx` );
} 

export function NavigationElements( siteUrl: string, showIcon: boolean, iconStyles: any ) {
  return standardSettingsLink( 'Navigation Elements', showIcon === true ? 'CompassNW' : '', iconStyles, `${siteUrl}/_layouts/15/navoptions.aspx` );
} 

//https://tenant-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/siteManagement/view/SITES%20WITHOUT%20A%20GROUP
export function TenantSites( siteUrl: string, showIcon: boolean, iconStyles: any, tenantColor: hoverColor ) {
  return standardSettingsLink( 'Sites', showIcon === true ? 'SharepointLogo' : '', iconStyles, `${getTenantAdminUrl()}/_layouts/15/online/AdminHome.aspx#/siteManagement/view/SITES%20WITHOUT%20A%20GROUP`, tenantColor );
}

export function TenantHubs( siteUrl: string, showIcon: boolean, iconStyles: any, tenantColor: hoverColor ) {
  return standardSettingsLink( 'Hubs', showIcon === true ? 'TFVCLogo' : '', iconStyles, `${getTenantAdminUrl()}/_layouts/15/online/AdminHome.aspx#/siteManagement/view/ALL%20SITES`, tenantColor );
}

//https://tenant-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/siteManagement/view/TEAMS%20CONNECTED%20SITES
export function TenantTeams( siteUrl: string, showIcon: boolean, iconStyles: any, tenantColor: hoverColor ) {
  return standardSettingsLink( 'Teams', showIcon === true ? 'TeamsLogo' : '', iconStyles, `${getTenantAdminUrl()}/_layouts/15/online/AdminHome.aspx#/siteManagement/view/TEAMS%20CONNECTED%20SITES`, tenantColor );
}

//https://tenant-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/siteManagement/view/TEAMS%20CONNECTED%20SITES
export function TenantApps( siteUrl: string, showIcon: boolean, iconStyles: any, tenantColor: hoverColor ) {
  return standardSettingsLink( 'Tenant Apps', showIcon === true ? 'WebAppBuilderFragment' : '', iconStyles, `${getTenantAdminUrl()}/_layouts/15/online/TenantAdminApps.aspx`, tenantColor );
}

export function TenantSearch( siteUrl: string, showIcon: boolean, iconStyles: any, tenantColor: hoverColor ) {
  return standardSettingsLink( 'Search', showIcon === true ? 'SearchAndApps' : '', iconStyles, `${getTenantAdminUrl()}`, tenantColor );
}

export function AzureDevOps( siteUrl: string, showIcon: boolean, iconStyles: any, tenantColor: hoverColor ) {
  return standardSettingsLink( 'Azure Devops', showIcon === true ? 'ReleaseDefinition' : '', iconStyles, `https://go.microsoft.com/fwlink/?LinkId=2014676&githubsi=true`, 'yellow' );
}

//https://tenant-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/contentTypes
export function TenantContentCenter( siteUrl: string, showIcon: boolean, iconStyles: any, tenantColor: hoverColor ) {
  return standardSettingsLink( 'Content Types', showIcon === true ? 'Archive' : '', iconStyles, `${getTenantAdminUrl()}/_layouts/15/online/AdminHome.aspx#/contentTypes`, tenantColor );
}

//https://tenant.sharepoint.com/sites/contentTypeHub/_layouts/15/mngfield.aspx
export function TenantSiteColumns( siteUrl: string, showIcon: boolean, iconStyles: any, tenantColor: hoverColor ) {
  return standardSettingsLink( 'Site Columns', showIcon === true ? 'ReportAdd' : '', iconStyles, `${siteUrl}/_layouts/15/mngfield.aspx`, tenantColor );
}

//	forceNarrowStyles?: boolean; //If true (like when web part is pinned or in vertical section, force Gear settings to narrow mode )

// export function bannerSettingsContent( showTricks: boolean,	pageContext: PageContext, keySiteProps: IKeySiteProps, bannerCommandStylesX: React.CSSProperties, bannerWidth: number, forceNarrowStyles: boolean | null | undefined ) {
export function bannerSettingsContent( bannerProps: IWebpartBannerProps, forceNarrowStyles: boolean | null | undefined ) {

  const { context, keySiteProps, bannerWidth } = bannerProps;
  const pageContext = context.pageContext;
  const legacyPageContext = pageContext.legacyPageContext;
  const LPC = `pageContext.legacyPageContext.`;
  const bannerCommandStylesX: React.CSSProperties = defaultBannerCommandStyles;
  //Admin links
  let bannerCommandStyles = JSON.parse(JSON.stringify(bannerCommandStylesX));
  if ( bannerCommandStyles && bannerCommandStyles.background ) { bannerCommandStyles.background = 'transparent'; }
  if ( bannerCommandStyles && bannerCommandStyles.backgroundColor ) { bannerCommandStyles.backgroundColor = 'transparent'; }

  // Commenting out since it only seems to add to console.  https://github.com/mikezimm/fps-library-v2/issues/39
  // let addAndCustomizePages = pageContext.web.permissions.hasPermission( SPPermission.addAndCustomizePages );
  // console.log('Current user can addAndCustomizePages', addAndCustomizePages );

  let showAdmin = legacyPageContext.isSiteAdmin === true ? true : false;
  let siteUrl = pageContext.site.absoluteUrl;
  let contentTypeHub = `${window.location.origin}/sites/contentTypeHub`;

  let isFraudTenant = legacyPageContext.isFraudTenant ;
  let allowInfectedDownload = legacyPageContext.allowInfectedDownload ;
  let isNoScriptEnabled = pageContext.site.isNoScriptEnabled ;
  let noScriptStyle = isNoScriptEnabled !== true ? 'redLabel' : 'justLabel'  ;

  let blockDownloads = legacyPageContext.blockDownloadsExperienceEnabled ;
  let blockDownloadStyle = blockDownloads !== true ? 'redLabel' : 'justLabel' ;

  let disableFlows = legacyPageContext.disableFlows ;
  let isWebWelcomePage = legacyPageContext.isWebWelcomePage ;
  let hasManageWebPermissions = legacyPageContext.hasManageWebPermissions ;
  let guestsEnabled = legacyPageContext.guestsEnabled ;
  let guestStyle = guestsEnabled === true ? 'redLabel' : 'justLabel';

  let isSiteOwner = legacyPageContext.isSiteOwner ;
  let isArchived = legacyPageContext.isArchived ;

  let liIsNoScriptEnabled = <li className={ noScriptStyle } title='pageContext.site.isNoScriptEnabled'>{ `Scripts Disabled: ${ isNoScriptEnabled }` }</li>;
  let liGuestsEnabled = <li className={ guestStyle } title={ `${LPC}guestsEnabled`} >{ `Guests Enabled: ${ guestsEnabled}` }</li>;
  let liBlockDownloads = <li className={ blockDownloadStyle } title={`${LPC}blockDownloadsExperienceEnabled`}>{ `Block Downloads: ${ blockDownloads }` }</li>;

  let flowStyle = disableFlows === true ? 'redLabel' : 'justLabel';
  let liDisableFlows = <li className={ flowStyle } title={ `${LPC}disableFlows`}>{ `Disable Flows: ${ disableFlows }` }</li>;

  let licGuestsEnabled = <li className={ 'compressedLabel' } title={ `${LPC}guestsEnabled`}>{ `Guests Enabled: ${ guestsEnabled}` }</li>;
  let licBlockDownloads = <li className={ 'compressedLabel' } title={ `${LPC}blockDownloadsExperienceEnabled`}>{ `Block Downloads: ${ blockDownloads }` }</li>;

  // Highlight red color if you are NOT on z-Account
  let tenantColor: hoverColor = pageContext.user.loginName.indexOf('z-')  === 0 ? 'green' : 'red';
  let scaContent = showAdmin !== true ? null : <div className={ 'tileBox' }>
    <h2>Site - SCAs</h2>
    <ul className={ 'boxLinks' }>
      { Settings( siteUrl, true, bannerCommandStyles ) }
      { Contents( siteUrl, true, bannerCommandStyles ) }
      { Permissions( siteUrl, true, bannerCommandStyles ) }
      { GroupsLink( siteUrl, true, bannerCommandStyles ) }
      { AdminRecycleBin( siteUrl, true, bannerCommandStyles, false ) }
      { StorageMetrics( siteUrl, true, bannerCommandStyles ) }
      { NavigationLinks( siteUrl, true, bannerCommandStyles ) }
      <div style={{ height: '20px' }}></div>
      { liIsNoScriptEnabled }
      { liGuestsEnabled }
      { liBlockDownloads }
    </ul>
  </div>;

  //Admin links
  let showOwner = legacyPageContext.isSiteAdmin === true || legacyPageContext.isSiteOwner === true ? true : false;
  let webUrl = pageContext.web.absoluteUrl;
  if ( siteUrl === webUrl && showAdmin === true ) { showOwner = false; }

  let ownerContent = showOwner !== true ? null : <div className={ 'tileBox' }>
    <h2>Web - Owners</h2>
    <ul className={ 'boxLinks' }>
      { Settings( webUrl, true, bannerCommandStyles ) }
      { Contents( webUrl, true, bannerCommandStyles ) }
      { Permissions( webUrl, true, bannerCommandStyles ) }
      { GroupsLink( webUrl, true, bannerCommandStyles ) }
      { AdminRecycleBin( webUrl, true, bannerCommandStyles, true ) }
      { StorageMetrics( siteUrl, true, bannerCommandStyles ) }
      { NavigationElements( webUrl, true, bannerCommandStyles ) }
    </ul>
  </div>;
  
  //Tenant links

  let trickyContent = bannerProps.showTricks !== true ? null : <div className={ 'tileBox' }>
    <h2>Tenant Links</h2>
    <ul className={ 'boxLinks' }>
      { TenantSites( webUrl, true, bannerCommandStyles, tenantColor ) }
      { TenantHubs( webUrl, true, bannerCommandStyles, tenantColor ) }
      { TenantTeams( webUrl, true, bannerCommandStyles, tenantColor ) }
      { TenantApps( webUrl, true, bannerCommandStyles, tenantColor ) }
      { TenantContentCenter( webUrl, true, bannerCommandStyles, tenantColor ) }
      { TenantSiteColumns( contentTypeHub, true, bannerCommandStyles, tenantColor ) }
      { AzureDevOps( webUrl, true, bannerCommandStyles, tenantColor ) }
      <div style={{ height: '20px' }}></div>
      { liIsNoScriptEnabled }
      { liGuestsEnabled }
      { liBlockDownloads }

      <li className={ 'justLabel' } title={ `${LPC}isFraudTenant`}>{ `FraudTenant: ${ isFraudTenant}` }</li>
      <li className={ 'justLabel' } title={ `${LPC}allowInfectedDownload`}>{ `Inf Download: ${ allowInfectedDownload}` }</li>

    </ul>
  </div>;

  let timePrefTitle = keySiteProps.UserTimePref === true ? `You will see timestamps based on your time zone` : `YOU will see timestamps based on ???`;
  let timesAreSame = keySiteProps.WebTimezone ===keySiteProps.UserTimezone ? true : false;
  let userTimeZoneTitle = timesAreSame === true ? `User Timezone: (same)` : <span style={{ color: 'red' }}>{`User Timezone: ( Different )`}</span>;
  //Tenant links

  //  _layouts/15/regionalsetng.aspx
  let webTime24 = legacyPageContext.webTime24;
  let WebTimeTitle = `Web Timezone: ( ${ webTime24 === true ? 24 : 12 } hour )`;
  let webRegionalSettings = webUrl + '/_layouts/15/regionalsetng.aspx';
  let settingsContent = <div className={ ['tileBox', 'summaryBox'].join(' ') }>
    <h2>Summary</h2>
    <ul className={ 'boxLinks' }>

      <li className={ 'heading' } title={ keySiteProps.WebTimezone } onClick={ () => { window.open( webRegionalSettings, '_none') ; } } >
        <div>{ WebTimeTitle }</div>
        {`${ keySiteProps.WebTimezone }` }
      </li>

      <li className={ 'heading' } title={ keySiteProps.UserTimezone } style={{ cursor: 'default'}}>
        <div>{ userTimeZoneTitle }</div>
        {`${ keySiteProps.UserTimezone }` }
      </li>

      <li className={ 'heading' } title={ timePrefTitle } style={{ cursor: 'default'}}>
        <div>User Time Pref:</div>
        {`${ keySiteProps.UserTimePref }` }
      </li>

      <li className={ 'heading' } style={{ cursor: 'default'}}>
        <div>Web Language:</div>
        {`${keySiteProps.WebLanguage}` }
      </li>

      { licBlockDownloads }
      { licGuestsEnabled }

      { liDisableFlows }

      <li className={ 'compressedLabel' } title='pageContext.site.isArchived'>{ `Is archived: ${ isArchived }` }</li>
      <li className={ 'compressedLabel' } title={ `${LPC}isWebWelcomePage`}>{ `Is Welcome Page: ${ isWebWelcomePage}` }</li>
      <li className={ 'compressedLabel' } title={ `${LPC}hasManageWebPermissions`}>{ `Can Manage Web: ${ hasManageWebPermissions}` }</li>
      <li className={ 'compressedLabel' } title={ `${LPC}isSiteOwner`}>{ `Is Site Owner: ${ isSiteOwner }` }</li>

      <li>{ `Members can edit: ${ keySiteProps.BrokenPermissions ===null ? 'TBD' : keySiteProps.LimitedDownload }` }</li>
      <li>{ `Broken permissions: ${ keySiteProps.BrokenPermissions ===null ? 'TBD' : keySiteProps.BrokenPermissions}` }</li>

    </ul>
  </div>;

  let approxWidth = 0;
  if ( scaContent !== null ) { approxWidth += 169 + 90 ; }
  if ( ownerContent !== null ) { approxWidth += 206 + 90 ; }
  if ( trickyContent !== null ) { approxWidth +=  206 + 90 ; }
  approxWidth +=  237 + 90 ; //For Summary

  let content = null;
  let showSettingsAsPivot = forceNarrowStyles === true || approxWidth > bannerWidth ? true : false;
  if ( showSettingsAsPivot === true ) {
    let pivotItems: any[] = [];

    if ( ownerContent !== null ) { pivotItems.push( <PivotItem headerText={'Web'} ariaLabel={'Web'} title={'Web'} >{ ownerContent }</PivotItem>); }
    if ( scaContent !== null ) { pivotItems.push( <PivotItem headerText={'Site'} ariaLabel={'Site'} title={'Site'} >{ scaContent }</PivotItem>); }
    if ( trickyContent !== null ) { pivotItems.push( <PivotItem headerText={'Tenant'} ariaLabel={'Tenant'} title={'Tenant'} >{ trickyContent }</PivotItem>); }
    if ( settingsContent !== null ) { pivotItems.push( <PivotItem headerText={'Key Settings'} ariaLabel={'Key Settings'} title={'Key Settings'} >{ settingsContent }</PivotItem>); }

    content =<div className= { 'banner-settings-component' } ><Pivot
        // styles={ pivotStyles }
        linkFormat={PivotLinkFormat.links}
        linkSize={PivotLinkSize.large }
      >
      { pivotItems }
    </Pivot></div>;

  } else {
    content = <div className= { 'banner-settings-component' } >
    <div className = { 'flexBoxes' } style={{paddingBottom: '100px'}}>
      { ownerContent }
      { scaContent }
      { trickyContent }
      { settingsContent }
    </div>

  </div>;
  }


  return { content: content , approxWidth: approxWidth, showSettingsAsPivot: showSettingsAsPivot };

}