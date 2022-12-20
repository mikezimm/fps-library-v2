
import * as React from 'react';  //Needed for interface

import { DisplayMode, } from '@microsoft/sp-core-library';

import { PanelType } from 'office-ui-fabric-react/lib/Panel';
import { ISpecialMessage } from '../components/SpecialBanner/interface';
import { IPageLayoutType } from '../../common/interfaces/indexes/Layout';
import { ILoadPerformance } from '../../components/indexes/Performance';
import { IRepoLinks } from '../../components/atoms/Links/CreateLinks';
import { IWebpartHistory } from '../features/WebPartHistory/Interface';
import { IFPSUser } from '../../logic/Users/IUserInterfaces';
import { IKeySiteProps } from '../components/Gear/IKeySiteProps';
import { WebPartContextCopy_15_2 } from '../../common/interfaces/indexes/WebPartContext@152';
import { IEasyPagesSourceProps } from '../components/EasyPages/componentPage';
import { IEasyPagesExtraProps } from '../components/EasyPages/componentSources';
import { IEasyIcons } from '../../components/atoms/EasyIcons/eiTypes';
import { IFPSPinMenu } from '../features/PinMe/Interfaces';
import { ISitePreConfigProps } from '../../common/PropPaneHelp/preconfig/IPreConfig';
import { IMinPandoramicProps } from '../features/Expando/Interfaces';
import { IMinWPFieldPanelProps } from '../../components/molecules/FieldPanel/components/IMinWPFieldPanelProps';

export interface IBannerPages {

	whyContent: any; //function
	aboutTable: any; //function
	gettingStartedContent: any; //function
	errorsContent: any; //function
	advancedContent: any; //function
	futureContent: any; //function
	basicsContent: any; //function
	tricksTable: any; //function
	getRandomTip: any; //function
	webParTips: any[];

}


export interface IWebpartBannerProps {
	gitHubRepo: IRepoLinks; // replace with IRepoLinks from npmFunctions v0.1.0.3
	bannerWidth: number;

	contentPages: IBannerPages;

	// from changeBannerBasics
	showBanner: boolean;
	feedbackEmail: string;

	displayMode: DisplayMode;
	// WebPartHelpElement: JSX.Element | null;
	WebPartHelpPivots: JSX.Element[] ; //Had to remove JSX.Element since it was not getting compiled due to error.

  fieldPanelProps?: IMinWPFieldPanelProps;  //For future PropPaneColumns component

  // Special message put above the banner... like Wanring to upgrade
  SpecialMessage?: ISpecialMessage;

	// from changeBannerNav
	showGoToHome: boolean;
	showGoToParent: boolean;
	onHomePage: boolean; //Get from this.context on main webpart.

	// from changeBannerTheme

	title: string;  //Title text on banner
  appendTitle?: string | JSX.Element; //Can be used to add text to the bannerTitle.  aka when filtering in component, show filter test     https://github.com/mikezimm/pivottiles7/issues/190

	panelTitle: string;
	styleString?: string;

  context: WebPartContextCopy_15_2;
	// pageContext: PageContextCopy_15_2;

	pageLayout: IPageLayoutType // like SinglePageApp etc... this.context[_pageLayout];

	infoElement: string; //More information text or IconName = format

	bannerReactCSS?: React.CSSProperties;
	bannerCmdReactCSS?: React.CSSProperties;

  themeChoice: string; // From Prop Pane Theme, to be used to over-ride theme for Site Theme
  useSiteTheme: boolean;

	earyAccess?: boolean; //Auto add early access warning in panel

	showRepoLinks: boolean;
	showExport: boolean;
	showTricks: boolean;
	refreshId: string; // used to refresh banner if needed ( like performance changes )

	//These were added to be able to surpress banner click or replace panel content with something else for Secure Script webpart
	showFullPanel: boolean;
	replacePanelHTML: any; //Inteded for help info and can include performance if added in onInit, but do not add in onInit if you plan to update in React Component
	bonusHTML1: any;  //Intended for extra element to be passed in during reactComponent which is added before panelPerformance.
	panelPerformance: ILoadPerformance;
	bonusHTML2: any;  //Intended for extra element to be passed in during reactComponent which is added after panelPerformance.
	replacePanelWarning: any; //This is intended to be information telling the owners that people NOT in XYZ permissions will only see this information.

	forceNarrowStyles?: boolean; //If true (like when web part is pinned or in vertical section, force Gear settings to narrow mode )
	showBannerGear: boolean; //Show gear to SiteAdmins and SiteOwners (as determined by page context.)


	//2022-02-17:  Added these for expandoramic mode
	domElement: HTMLElement; 

	//2022-02-17:  END additions for expandoramic mode

	wideToggle?: boolean; //enables panel width expander, true by default
	hoverEffect?: boolean; // applies fade in to full opacity on hover - true by default

	nearElements: any[];
	farElements: any[];

	exportProps: any;
	analyticsProps: any; // minimal WP Props to analytics

	webpartHistory: IWebpartHistory;

  easyPagesSourceProps: IEasyPagesSourceProps;  // General props which apply to all Sources/Pages
  easyPagesExtraProps: IEasyPagesExtraProps;  // General props which are used on the SourcesPage but not component page
  EasyIconsObject: IEasyIcons;
  fpsPinMenu: IFPSPinMenu;
  sitePresets: ISitePreConfigProps;
	expandoProps: IMinPandoramicProps;
  keySiteProps: IKeySiteProps;

	FPSUser: IFPSUser;

	beAUser: boolean; //This is true if someone presses the beAUser button
	showBeAUserIcon: boolean; // this would be true if the banner has any audience targetting in any way that is not 'Everyone'
	beAUserFunction: any;

}


export interface IWebpartBannerState {
	showPanel: boolean;
	showSettings: boolean;
	selectedKey: string;
	
	showPropsHelp: boolean;

	panelType: PanelType;
	// keySiteProps: IKeySiteProps;
	expandoramicMode: boolean;
	renderCount: number;

}

