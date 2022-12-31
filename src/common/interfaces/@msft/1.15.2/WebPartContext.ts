import { IPageLayoutType } from "./layout";
export class LegacyPageContextCopy_15_2 {
    readonly isSiteAdmin: boolean;
    readonly userId: string;
    isWebWelcomePage: boolean;
    isSiteOwner: boolean;
    isFraudTenant: boolean;
    allowInfectedDownload: boolean;
    blockDownloadsExperienceEnabled: boolean;
    disableFlows: boolean;
    hasManageWebPermissions: boolean;
    guestsEnabled: boolean;
    isArchived: boolean;
    webTime24: boolean;
}
export class PageContextCopy_15_2 {
    listItem: {
        readonly id: number;
    };
    list: {
        readonly title: string;
        readonly id: any; //Normally this is string or number but is actually Guid here
        readonly serverRelativeUrl: string;
    };
    user: {
        readonly displayName: string;
        readonly loginName: string;
        readonly email: string;
        readonly preferUserTimeZone: boolean;
        Name?: string;
        LoginName?: string;
        imageUrl?: string;
        PrincipalType?: number | undefined;
        isExternalGuestUser: boolean;
    };
    web: {
        readonly title: string;
        readonly description: string;
        readonly serverRelativeUrl: string;
        readonly id: any; //Normally this is string or number but is actually Guid here
        readonly absoluteUrl: string;
        readonly language: number;
        readonly languageName: string;
        readonly logoUrl: string;
        permissions: any;
    };
    site: {
        readonly absoluteUrl: string;
        readonly id: any; //Normally this is string or number but is actually Guid here
        readonly isNoScriptEnabled: boolean;
        readonly serverRequestPath: string; // Added from ALVFinMan
    };
    cultureInfo: {
        /**
         * This string determines the language default format for dates, times, numbers, currency values,
         * the sorting order of text, casing conventions, and string comparisons.
         *
         * @remarks
         *
         * This property may be an empty string, but it will never be undefined.
         *
         * Example: If the currentCultureName is `"en-AU"` then the application could use this information
         * to display the date as 1/8 instead of 8/1.
         */
        readonly currentCultureName: string;
        /**
        * This string determines the default user interface language. This used for localization and
        * translation of text.
        *
        * @remarks
        * This property may have an empty string, but will never be undefined.
        *
        * Example: If the currentUICultureName is `"es-MX"`, then the application could use this
        * information to translate the word "hello" to "hola".
        */
        readonly currentUICultureName: string;
    };
    legacyPageContext: LegacyPageContextCopy_15_2;
}


export class propertyPaneCopy_15_2 {
  refresh: any;
}

export class WebPartContextCopy_15_2 {
    pageContext: PageContextCopy_15_2;
    domElement: any;
    propertyPane: propertyPaneCopy_15_2;
    _pageLayoutType: IPageLayoutType;
}
//# sourceMappingURL=WebPartContext.d.ts.map