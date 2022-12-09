// ####################################################### #######################################################
// ####################################################### #######################################################

export interface IMinBannerThemeProps {
  // [key: string]: string | boolean;
  bannerStyleChoice: string;
  bannerStyle: string;
  bannerCmdStyle: string;
  lockStyles: boolean;

  bannerHoverEffect: boolean;

}
export const changeBannerTheme : string[] = [ 'bannerStyleChoice', 'bannerStyle', 'bannerCmdStyle', 'lockStyles', 'bannerHoverEffect',  ];
