
export class LegacyPageContextCopy_15_2 {
  readonly isSiteAdmin: boolean;
  readonly userId: string;
}

export class PageContextCopy_15_2 {
    listItem: { 
      readonly id: number;
    }
    list: { 
      readonly title: string;
      readonly id: string; //This is really a 'Guid'
      readonly serverRelativeUrl: string;
      // readonly permissions: SPPermission;
    }
    user: {
      readonly displayName: string;
      readonly loginName: string;
      readonly email: string;
      readonly preferUserTimeZone: boolean;

      // Verify if these exist or were used to merge other user objects from
      // These could also be something returned from a pnp call
      Name?: string;
      LoginName?: string;
      imageUrl?: string;
      PrincipalType: number | undefined;
      isExternalGuestUser: boolean;
    }
    web: {
      readonly title: string;
      readonly description: string;
      readonly serverRelativeUrl: string;
      readonly id: string;
      readonly absoluteUrl: string;
      readonly language: number; // LCID Example: 1033 represents the locale identifier for en-US.
      readonly languageName: string;
      readonly logoUrl: string;
      //npmFunctions/src\Services\Users\FPSUser.ts
      // permissions: SPPermission;
      permissions: any;
    }
    site: {
      // id: string;
      // serverRelativeUrl: string;
      readonly absoluteUrl: string;
      readonly id: string; //This is really a 'Guid'
      readonly isNoScriptEnabled: boolean;
    }
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
    }

    legacyPageContext: LegacyPageContextCopy_15_2;
}


export class WebPartContextCopy_15_2 {

  pageContext: PageContextCopy_15_2;

}

