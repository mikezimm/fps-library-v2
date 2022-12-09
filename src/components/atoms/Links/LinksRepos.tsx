

import { createLink, createRepoLinks, IRepoLinks } from './CreateLinks';


/**
 *  Github Repos
 */
export const baseGitContReact = 'https://github.com/SharePoint/sp-dev-fx-controls-react/';
export const gitRepoSPFxContReact = createLink( baseGitContReact,'_blank', 'controls-react' );
export const gitRepoPnpJSsp = createLink( 'https://pnp.github.io/pnpjs/','_blank', 'pnpjs' );



/**
 *  My repos - Legacy Early Access Banner style
 */
export const baseMyRepos = 'https://github.com/mikezimm/';
export const gitRepoTrackMyTime: IRepoLinks = createRepoLinks( baseMyRepos + 'TrackMyTime7v2021', '_blank', 'TrackMyTime-7' );
export const gitRepoPivotTiles: IRepoLinks = createRepoLinks( baseMyRepos + 'pivottiles7','_blank', 'Pivot-Tiles-7' );
export const gitRepoDrillDown: IRepoLinks = createRepoLinks( baseMyRepos + 'drilldown7','_blank', 'Drilldown-7' );
export const gitRepoSocialiis: IRepoLinks = createRepoLinks( baseMyRepos + 'Social-iis-7','_blank', 'Social-iis-7' );
export const gitRepoGridCharts: IRepoLinks = createRepoLinks( baseMyRepos + 'gridcharts','_blank', 'GridCharts' );
export const gitRepoCarrotCharts: IRepoLinks = createRepoLinks( baseMyRepos + 'carrotcharts','_blank', 'Carrot charts' );
export const gitRepoEasyContnets: IRepoLinks = createRepoLinks( baseMyRepos + 'generic-solution', '_blank', 'Easy Contents' );
export const gitRepoActionNews: IRepoLinks = createRepoLinks( baseMyRepos + 'actionnews','_blank', 'ActionNews' );
export const gitRepoImageMapper: IRepoLinks = createRepoLinks( baseMyRepos + 'imagemapper','_blank', 'Image Mapper' );
export const gitRepoEasyStorage: IRepoLinks = createRepoLinks( baseMyRepos + 'ECStorage','_blank', 'Extreme Storage' );

/**
 *  My repos - For Banner component in Panel
 */
// export const baseMyRepos = 'https://github.com/mikezimm/';
export const gitRepoTrackMyTimeSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'TrackMyTime7v2021', '_blank', 'TrackMyTime-7', 'small' );
export const gitRepoPivotTilesSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'pivottiles7','_blank', 'Pivot-Tiles-7', 'small' );
export const gitRepoDrillDownSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'drilldown7','_blank', 'Drilldown-7', 'small' );
export const gitRepoSocialiisSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'Social-iis-7','_blank', 'Social-iis-7', 'small' );
export const gitRepoGridChartsSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'gridcharts','_blank', 'GridCharts', 'small' );
export const gitRepoCarrotChartsSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'carrotcharts','_blank', 'Carrot charts', 'small' );
export const gitRepoEasyContnetsSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'generic-solution', '_blank', 'Easy Contents', 'small' );
export const gitRepoActionNewsSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'actionnews','_blank', 'ActionNews', 'small' );
export const gitRepoImageMapperSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'imagemapper','_blank', 'Image Mapper', 'small' );
export const gitRepoEasyStorageSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'ECStorage','_blank', 'Extreme Storage', 'small' );
export const gitRepoSecureScript7Small: IRepoLinks = createRepoLinks( baseMyRepos + 'SecureScript7','_blank', 'Secure Script', 'small' );
export const gitRepoALVFinManSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'ALVFinMan','_blank', 'ALV Financial Manual', 'small' );
export const gitRepoPageInfoSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'PageInfo','_blank', 'FPS PageInfo', 'small' );

export const gitRepoCoreFPS114Small: IRepoLinks = createRepoLinks( baseMyRepos + 'CoreFPS114','_blank', 'Core-FPS-1.14', 'small' );
export const gitRepoCoreFPS115Small: IRepoLinks = createRepoLinks( baseMyRepos + 'CoreFPS115','_blank', 'Core-FPS-1.15', 'small' );

export const gitRepoPnpjsV2Small: IRepoLinks = createRepoLinks( baseMyRepos + 'Pnpjs-v2-Upgrade-sample','_blank', 'Pnpjs-v2-Upgrade-sample', 'small' );
export const gitRepoListAPaLoozaSmall: IRepoLinks = createRepoLinks( baseMyRepos + 'ListAPaLooza','_blank', 'List-A-Pa-Looza', 'small' );

/**
 * Track My Time links
 */

export const gitTMTActivityTypeWiki = createLink( baseMyRepos + 'TrackMyTime7v2021/wiki/ActivityURL%5E-calculated-column-example' , '_blank', 'ActivityType examples' );
export const gitTMTActivityURLWiki = createLink( baseMyRepos + 'TrackMyTime7v2021/wiki/ActivityURL%5E-calculated-column-example' , '_blank', 'ActivityURL^ Formula examples' );
export const gitTMTOptionsWiki = createLink( baseMyRepos + 'TrackMyTime7v2021/wiki/Options%5E-calculated-column-example' , '_blank', 'Options^ Formula examples' );

export const trickyEmails = ['mike.mcclickster@mc','clicky.mcclickster@mc','ike.zimmerman@autol','rina.stan@autol','ablo.herman@autol','kob.kurien@autol'];