import { IPreConfigSettings, } from './IPreConfig';

export const PresetFPSBanner : IPreConfigSettings = {
    source: 'PresetFPSBanner',
    location: '*',
    props: {
        //Pin Me
        infoElementChoice: 'IconName=Unknown',
        infoElementText: 'Question mark circle',

        //Copied from FPSPagInfo.manifest.json
        bannerStyleChoice: "corpDark1",
        bannerStyle: "{\"color\":\"white\",\"backgroundColor\":\"#005495\",\"fontSize\":\"larger\",\"fontWeight\":600,\"fontStyle\":\"normal\",\"padding\":\"0px 10px\",\"height\":\"48px\",\"cursor\":\"pointer\"}",
        bannerCmdStyle: "{\"color\":\"white\",\"backgroundColor\":\"#005495\",\"fontSize\":16,\"fontWeight\":\"normal\",\"fontStyle\":\"normal\",\"padding\":\"7px 4px\",\"marginRight\":\"0px\",\"borderRadius\":\"5px\",\"cursor\":\"pointer\"}",

        showGoToHome: true,
        showGoToParent: true,
        homeParentGearAudience: "Everyone",
        beAUserAudience: "Page Editors",

        requireDocumentation: false,
        documentationLinkDesc: 'Documentation',

        // Visitor Panel props that are not preset in manifest.json
        fullPanelAudience: 'Page Editors',
        panelMessageIfYouStill: '',
        documentationIsValid: true,

        requireContacts: false,

        bannerHoverEffect : false,  //Line 311 in FPSPageInfoWebPart.ts

        defPinState: 'disabled',  //Turn off by default because it does not work well with Expando at this point.

        enableExpandoramic : true,  // Enable pandoramic by default for all.  Disable by default if needed in the WPPresetEverywhere or WPForceEverywhere
        expandoDefault : false,  
        expandoAudience : "Everyone",

        showBanner : true,

    }
};
