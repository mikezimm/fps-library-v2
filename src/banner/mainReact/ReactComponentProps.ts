
import { IWebpartBannerProps } from "./IWebpartBannerProps";

/**
 * Use this to extend the default react component props for FPS Banner functionality
 *
 * Usage:
 * export interface IYourComponentProps extends IFPSCoreReactComponentProps {
 *
 */
export interface IFPSCoreReactComponentProps {  // WITHOUT PinMe option

  //Banner related props
  errMessage: any;
  bannerProps: IWebpartBannerProps; // Moved to bannerProps

}
