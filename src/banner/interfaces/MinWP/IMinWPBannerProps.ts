import { IMinCustomHelpProps } from "../../components/VisitorPanel/Interfaces";
import { IMinPandoramicProps } from "../../features/Expando/Interfaces";
import { IMinPageStyleProps } from "../../features/PageStyle/Interfaces";
import { IMinPinMeProps } from "../../features/PinMe/Interfaces";
import { changeBannerTheme, IMinBannerThemeProps } from "../Theme/Interfaces";
import { changeBannerBasics, changeBannerNav, IMinBannerUIProps } from "./IMinBannerUIProps";
import { changeBannerUtility, IMinBannerUtilityProps } from "./IMinBannerUtilityProps";


/**
 * Usage:  export interface FutureMailable extends IMinWPBannerProps {
 */

 export interface IMinWPBannerProps extends 
  IMinBannerUIProps, IMinPinMeProps, IMinPandoramicProps, 
  IMinBannerThemeProps, IMinCustomHelpProps, IMinPageStyleProps, 
  IMinBannerUtilityProps {

}

export const changeBanner : string[] = [ ...changeBannerBasics, ...changeBannerNav, ...changeBannerTheme, ...changeBannerUtility  ];
