import { IEveryoneAudience, IPageEditorAudience } from "../../propPane/Audiences/Interfaces";

export interface IMinBannerUIProps {
  showBanner: boolean;
  showBannerGear: boolean; // Not in Prop Pane - enables the site settings links

  showGoToHome: boolean;  //defaults to true
  showGoToParent: boolean;  //defaults to true
  homeParentGearAudience: IEveryoneAudience;

  bannerTitle: string;

  infoElementChoice: string;
  infoElementText: string;

  //For CoreFPSVisitorPanelComponent.tsx
  feedbackEmail: string; //For email icon right in banner.

  beAUserAudience: IPageEditorAudience; // For BeAUserAudience - but never use Readers or Everyone

}

export const changeBannerNav : string[] = [ 'showGoToHome', 'showGoToParent', 'homeParentGearAudience', 'showBannerGear' ];
export const changeBannerBasics : string[] = [ 'searchShow', 'showBanner', 'bannerTitle', 'infoElementChoice', 'infoElementText', 'feedbackEmail', 'beAUserAudience' ];
