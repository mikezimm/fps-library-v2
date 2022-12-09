
export interface IMinPageStyleProps {
  // [key: string]: string | number | boolean ;  //Added string because of error on IMinWPBannerProps
    //FPS Options part II
    quickLaunchHide: boolean;
    pageHeaderHide: boolean;
    allSectionMaxWidthEnable: boolean;
    allSectionMaxWidth: number;
    allSectionMarginEnable: boolean;
    allSectionMargin: number;
    toolBarHide: boolean;
}
export const changePageStyle : string[] = [   'quickLaunchHide', 'pageHeaderHide', 'allSectionMaxWidthEnable', 'allSectionMaxWidth',
    'allSectionMarginEnable', 'allSectionMargin', 'toolBarHide', ];
