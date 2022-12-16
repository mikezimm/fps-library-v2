/**
 * This standard was started with eXTreme Storage webpart
 */

/**
 * IZLoadAnalytics can be created when the webpart loads the data so it's easy to pass
 */
export interface IZLoadAnalytics {
  SiteID: string;  //Current site collection ID for easy filtering in large list
  WebID: string;  //Current web ID for easy filtering in large list
  SiteTitle: string; //Web Title
  ListID: string;  //Current list ID for easy filtering in large list
  ListTitle: string;

  TargetSite?: string;  //Saved as link column.  Displayed as Relative Url
  TargetList?: string;  //Saved as link column.  Displayed as Relative Url

}

/**
 * IZSentAnalytics can be created based on IZLoadAnalytics when the webpart generates final data to save
 */
export interface IZSentAnalytics {

  loadProperties: IZLoadAnalytics;

  Title: string;  //General Label used to identify what analytics you are saving:  such as Web Permissions or List Permissions.

  Result: string;  //Success or Error
  Setting?: string;  //Special settings

  zzzText1?: string; //Start-Now in some webparts
  zzzText2?: string; //Start-TheTime in some webparts
  zzzText3?: string; //Info1 in some webparts.  Simple category defining results.   Like Unique / Inherited / Collection
  zzzText4?: string; //Info2 in some webparts.  Phrase describing important details such as "Time to check old Permissions: 86 snaps / 353ms"
  zzzText5?: string;
  zzzText6?: string;
  zzzText7?: string;

  zzzNumber1?: number;
  zzzNumber2?: number;
  zzzNumber3?: number;
  zzzNumber4?: number;
  zzzNumber5?: number;
  zzzNumber6?: number;
  zzzNumber7?: number;

  zzzRichText1?: any;  //Used to store JSON objects for later use, will be stringified
  zzzRichText2?: any;
  zzzRichText3?: any;

  performance?: any;
  FPSProps?: any;
  FetchInfo?: any;

  AnalyticsVersion?: string; //Not used in webparts, used in legacy html code
  CodeVersion?: string; //Not used in webparts, used in legacy html code
  language?: string;


}

export interface ILink {
  Description: string;
  Url: string;
}

/**
 * This contains properties automatically added based on the current url
 */
export interface IZFullAnalytics extends IZSentAnalytics {

  loadProperties: any;  //To be removed in final object

  CollectionUrl?: string; // Should be target Site Collection Url

  PageURL: string;  //Url of page person is on
  getParams?: string;  //Parameters from url

  PageLink?: ILink;  // Saved as link column.  Displayed as Page Name
  SiteLink?: ILink;  //Saved as link column.  Displayed as full Url
  language?: string;

  //These props were buried in loadProperties but get moved up to main object for saving.
  SiteID: string;  //Current site collection ID for easy filtering in large list
  WebID: string;  //Current web ID for easy filtering in large list
  SiteTitle: string; //Web Title
  ListID: string;  //Current list ID for easy filtering in large list
  ListTitle: string;

  TargetSite?: ILink;  //Saved as link column.  Displayed as Relative Url
  TargetList?: ILink;  //Saved as link column.  Displayed as Relative Url

  memory: string;
  browser: string;
  JSHeapSize: number;

  screen: string;  // Extra screen info in object link window.inner/outer sizes
  screenSize: string; // Basic dimensions 1080 x 1920
  device: string;

}