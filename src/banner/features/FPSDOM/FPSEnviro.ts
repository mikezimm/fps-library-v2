
import { IFPSEnviro } from "../../../common/interfaces/fps/IFPSEnviro"
import { IFPSWindow } from "../../../common/interfaces/fps/Window";
import { checkDeepProperty } from "../../../logic/indexes";
import { IThisFPSWebPartClass } from "../../FPSWebPartClass/IThisFPSWebPartClass"
import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';

export function createFPSEnviroOnWindow ( thisWPClass: IThisFPSWebPartClass ) {

  const { context,  } = thisWPClass;
  const pageContext = context.pageContext;
  const legacyPageContext = pageContext.legacyPageContext;
  const pageLayout = context[`_pageLayoutType`] ? context[`_pageLayoutType`] : context[`pageLayoutType` as `_pageLayoutType` ];
  const pageName = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);

  const FPSEnviro: IFPSEnviro = {
    tenantUrl: window.location.origin,
    siteUrl: pageContext.site.absoluteUrl,
    webUrl: pageContext.web.absoluteUrl,
    webServerRelativeUrl: pageContext.web.serverRelativeUrl,

    pageLayout: pageLayout,
    pageName: pageName,
    onHomePage: legacyPageContext.isWebWelcomePage === true ? true : false,
    SiteLogoUrl: pageContext.web.logoUrl,  // pageContext.web.logoUrl;

    language: pageContext.web.language,
    languageName: pageContext.web.languageName,

    LimitedDownload: null, // TBD

    WebTimezone: checkDeepProperty( pageContext, ['web','timeZoneInfo','description'], 'ShortError' ) ,
    WebLanguage: `${ checkDeepProperty( pageContext, ['cultureInfo','currentCultureName'], 'ShortError' ) } - ${checkDeepProperty( pageContext, ['web','language'], 'ShortError' )}`,

    UserTimezone:  checkDeepProperty( pageContext, ['user','timeZoneInfo','description'], 'ShortError' ),  // pageContext.user.timeZoneInfo.description;
    UserTimePref:   checkDeepProperty( pageContext, ['user','preferUserTimeZone'], 'ShortError' ) ,  // pageContext.user.preferUserTimeZone ;

    BrokenPermissions: null,

    repoLink: thisWPClass._repoLink,

    theme: null,
  }

  const thisWindow : IFPSWindow = window as any;
  thisWindow.FPSEnviro = FPSEnviro;

  if ( check4Gulp() === true ) console.log(`createFPSEnviroOnWindow FPSEnviro:`, JSON.parse(JSON.stringify( thisWindow.FPSEnviro )) );

  return FPSEnviro;

}