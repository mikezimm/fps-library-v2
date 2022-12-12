

export interface IKeySiteProps {
	SiteLogoUrl: string;  // pageContext.web.logoUrl;
	LimitedDownload: boolean | null; // TBD

	WebTimezone: string;  // pageContext.web.timeZoneInfo.description;
	WebLanguage: string;  // `${pageContext.cultureInfo.currentCultureName } - ${pageContext.web.language}` ;

	UserTimezone: string;  // pageContext.user.timeZoneInfo.description;
	UserTimePref:  boolean;  // pageContext.user.preferUserTimeZone ;

	BrokenPermissions: boolean | null; // TBD

}