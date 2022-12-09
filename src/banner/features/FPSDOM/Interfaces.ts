
/**
 * Minimal object required for styling and page changes
 */
export interface IFPSMinimal {
  title: string;
  original: any;
  wpInstanceID: any;
  history: string[];
  attempted: boolean;
  value: any;
  success: number;
  errors: number;
}

/**
 * Object stored in window for a ALL FPS Webpart Settings
 */
export interface IFPSWindowProps {
  page: IFPSPage;
  sections: IFPSSection;
  header: IFPSMinimal;
  quicklaunch: IFPSMinimal;
  toolBar: IFPSSectionStyle;
  expando: IFPSMinimal;
}

/**
 * Object stored in window for a specific type of Page change request
 */
export interface IFPSPage {
  attempted: boolean;
  title: string;
  wpInstanceID: any;
  do: boolean | null;
  errors: number;
  success: number;
  Style: string | null;
  Array: any[] | any | null;
}

/**
 * Minimal object needed to kick off a Section Style change request
 * keys should also be found on IFPSSectionStyle.
 */
export interface IFPSSectionRequest {
  do: boolean | null;
  value: any;
}

/**
 * Object stored in window for a specific type of Style change request
 */
export interface IFPSSectionStyle {
  title: string;
  cssProp: string;
  wpInstanceID: any;
  history: string[];
  attempted: boolean;
  do: boolean | null;
  value: any;
  original: any;
  errors: number;
  success: number;
}

/**
 * Object stored in window for ALL Style change requests
 */
export interface IFPSSection {
  summary: { 
    success: number, 
    errors: number 
  };
  maxWidth: IFPSSectionStyle;
  marginTB: IFPSSectionStyle;
}


