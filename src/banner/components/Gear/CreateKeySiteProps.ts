import { PageContextCopy_15_2 } from "../../../common/interfaces/indexes";
import { checkDeepProperty } from "../../../logic/indexes";
import { IKeySiteProps } from "./IKeySiteProps";

export function createKeySiteProps( pageContext: PageContextCopy_15_2 ) : IKeySiteProps {
  const keySiteProps: IKeySiteProps = {
    SiteLogoUrl: pageContext.web.logoUrl,  // pageContext.web.logoUrl;
    LimitedDownload: null, // TBD
  
    WebTimezone: checkDeepProperty( pageContext, ['web','timeZoneInfo','description'], 'ShortError' ) ,
    WebLanguage: `${ checkDeepProperty( pageContext, ['cultureInfo','currentCultureName'], 'ShortError' ) } - ${checkDeepProperty( pageContext, ['web','language'], 'ShortError' )}`,
  
    UserTimezone:  checkDeepProperty( pageContext, ['user','timeZoneInfo','description'], 'ShortError' ),  // pageContext.user.timeZoneInfo.description;
    UserTimePref:   checkDeepProperty( pageContext, ['user','preferUserTimeZone'], 'ShortError' ) ,  // pageContext.user.preferUserTimeZone ;
  
    BrokenPermissions: null, // TBD
  };

  return keySiteProps;
}

