import { IRepoLinks } from "../../../components/atoms/Links/CreateLinks";
import { IPageLayoutType } from "../indexes/Layout";

/**
 * This will be used to streamline variable handling,
 * make some props more easily available to functions and web part
 * 
 * SHOULD ONLY CONTAIN PROPS THAT DO NOT MUTATE THROUGHT PAGE LIFECYCLE
 */
export interface IFPSEnviro {
  tenantUrl: string;
  siteUrl: string;
  webUrl: string;
  webServerRelativeUrl: string;

  pageLayout: IPageLayoutType;
  pageName: string;
  onHomePage: boolean;
  SiteLogoUrl: string; // pageContext.web.logoUrl;

  language: number;
  languageName: string;

  LimitedDownload: boolean | null; // TBD

  WebTimezone: string; // pageContext.web.timeZoneInfo.description;
  WebLanguage: string; // `${pageContext.cultureInfo.currentCultureName } - ${pageContext.web.language}` ;

  UserTimezone: string; // pageContext.user.timeZoneInfo.description;
  UserTimePref: boolean; // pageContext.user.preferUserTimeZone ;

  BrokenPermissions: boolean | null; // TBD

  repoLink: IRepoLinks;
  
  theme: any;

}
