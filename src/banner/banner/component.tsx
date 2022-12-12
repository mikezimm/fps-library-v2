import * as React from "react";

import { escape } from "@microsoft/sp-lodash-subset";

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { DisplayMode,  } from '@microsoft/sp-core-library';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';

// import { getHelpfullErrorV2 } from "../../../Services/Logging/ErrorHandler";
// import { createStyleFromString, } from "../../../Services/PropPane/StringToReactCSS";
// import { IWebpartHistoryItem2, } from "../../../Services/PropPane/WebPartHistory_/Interface";

// import { bannerSettingsContent } from './bannerGearFunctions_';

// import { checkDeepProperty } from "../../../Services/Objects_/properties"; 
// import { goToParentSite, goToHomePage } from "../../../Services/Navigation/site"; 

// import { setExpandoRamicMode } from '../../../Services/DOM_/Expando_/FPSExpandoramic';
// import { defaultBannerCommandStyles, } from "../../onNpm/defaults_";

// import { IWebpartBannerProps, IWebpartBannerState, } from '../../../HelpPanelOnNPM/onNpm/bannerProps';
// import { IKeySiteProps } from '../../onNpm/Moved_/interfaces_';

import * as links from '../../components/atoms/Links/LinksRepos';

import WebPartLinks from '../components/WebPartLinks/WebPartLinks';

import SinglePage from '../components/SingleHelpPage/SinglePage';

import ReactJson from "react-json-view";

// import { createPerformanceTableVisitor } from "../../../Performance_/tables";

// import { createSpecialElement } from '../../specialX_/component';
import { IWebpartBannerProps, IWebpartBannerState } from "../mainReact/IWebpartBannerProps";
import { IWebpartHistoryItem2 } from "../features/WebPartHistory/Interface";
import { goToHomePage, goToParentSite } from "../../logic/Links/Navigation";
import { checkDeepProperty } from "../../logic/indexes/ObjectDeep";
import { IKeySiteProps } from "../components/Gear/IKeySiteProps";
import { createStyleFromString } from "../../logic/Strings/reactCSS";
import { createPerformanceTableVisitor } from "../../components/indexes/Performance";
import { createSpecialElement } from "../components/SpecialBanner/component";
import { setExpandoRamicMode } from "../features/Expando/functions";
import { bannerSettingsContent } from "../components/Gear/bannerGearFunctions";
import { defaultBannerCommandStyles } from "../../common/commandStyles/defaults";


require ('./banner.css');

const pivotStyles = {
	root: {
		whiteSpace: "normal",
	//   textAlign: "center"
	}};

const pivotHeadingX = '';  //2022-01-31: Added Pivot Tiles

const pivotHeading0 = 'Why';  //2022-01-31: Added Pivot Tiles
const pivotHeading1 = 'Getting started';  //Templates
const pivotHeading2 = 'Basics';  //Templates
const pivotHeading3 = 'Advanced';  //Templates
const pivotHeading4 = 'Future';  //Templates
const pivotHeading5 = 'Dev';  //Templates
const pivotHeading6 = 'Errors';  //Templates
const pivotHeading7 = 'Tricks';  //Templates
const pivotHeading8 = 'About';  //Templates
const pivotHeading9 = 'Export';  //Templates
const pivotHeadingA = 'History';  //Templates
const pivotHeadingB = 'Health';  //Templates

export default class WebpartBanner extends React.Component<IWebpartBannerProps, IWebpartBannerState > {

	private getRandomTip( webParTipsX: any[] ) {

		return webParTipsX[Math.floor(Math.random() * webParTipsX.length)];
	  
	}

	private hoverEffect = this.props.hoverEffect === false ? false : true;

	private dev: any = undefined ; //devTable( );  https://github.com/mikezimm/ALVFinMan/issues/171

	private wideToggle = this.props.wideToggle === null || this.props.wideToggle === undefined ? true : this.props.wideToggle ;

	private hasNear = this.props.nearElements.length > 0 ? true : false;
	private hasFar = this.props.farElements.length > 0 ? true : false;
	private hasNearOrFar = this.hasNear === true || this.hasFar === true ? true : false;

	private nearElements: any[] = [];
	private showSettings() {  this.setState({ showSettings: !this.state.showSettings }); }
	private showSettingsAsPivot = false;

	private settingsContent: any = null;
	private isShowTricks = this.props.showTricks;
	private isSiteAdmin = this.props.pageContext.legacyPageContext.isSiteAdmin;
	private isSiteOwner = this.isSiteAdmin === true ? true : this.props.pageContext.legacyPageContext.isSiteOwner;

	private makeYellowStyles( defStyles: React.CSSProperties | undefined ) {

		if ( !defStyles ) {
			return {};
		} else {
			let newStyle: React.CSSProperties = JSON.parse(JSON.stringify( defStyles ));
			newStyle.color = 'black';
			newStyle.background = 'yellow';
			newStyle.fontSize = '20px';
			newStyle.fontWeight = 400;
			newStyle.padding = '7px';
			newStyle.marginLeft = '10px';
			return newStyle;
		}

	}

	private PropPaneCmdStyles: React.CSSProperties = this.makeYellowStyles ( this.props.bannerCmdReactCSS );

	private createHistoryItem( item: IWebpartHistoryItem2 ) {

		if ( item.changes.length === 0 ) { return  null ; }
		const changes = item.changes.map( ( change, idx ) => {
			return <tr><td>{change.prop} : </td><td title={change.value}>{ change.value ? change.value : 'Empty' }</td></tr>;
		});

		return <div className={ 'history-item' }>
			<div>{ item.user } : { new Date ( item.time ).toLocaleString() }</div>
			<table>{ changes }</table>
		</div>;

	}

	private jumpToParentSite(  ) {
		let e: any = event;
		goToParentSite( e, this.props.pageContext );		
	}
	
	private  jumpToHomePage( ) {
		let e: any = event;
		goToHomePage( e, this.props.pageContext );		
	}

	private updateNearElements( keySiteProps: IKeySiteProps ) {
		this.nearElements = [];

		if ( this.props.showBeAUserIcon === true && this.props.beAUserFunction ) {
			this.nearElements.push( <Icon iconName='Glasses' onClick={ this.props.beAUserFunction } style={ this.props.bannerCmdReactCSS } title="Simulate a typical visitor experience"/> );
			this.hasNear = true;
			this.hasNearOrFar = true;
		}

		if ( this.props.showBannerGear === true ) {
			this.nearElements.push( <Icon iconName='PlayerSettings' onClick={ this.showSettings.bind(this) } style={ this.props.bannerCmdReactCSS } title="Show Settings quick links and info"/> );
			this.hasNear = true;
			this.hasNearOrFar = true;
			// (property) pageContext: PageContext
			// Argument of type 'import("C:/Users/dev/Documents/GitHub/ALVFinMan7/node_modules/@mikezimm/npmfunctions/node_modules/@microsoft/sp-page-context/dist/index-internal").PageContext' is not assignable to parameter of type 'import("C:/Users/dev/Documents/GitHub/ALVFinMan7/node_modules/@microsoft/sp-page-context/dist/index-internal").PageContext'.
			// Type 'PageContext' is missing the following properties from type 'PageContext': _searchData, _getUrlParser, _isQueryStringParamsKSActivatedts(2345)
			//2022-04-19:  Had to add as any to pageContext due to error
			let bannerContent = bannerSettingsContent( this.props.showTricks, this.props.pageContext as any, keySiteProps, defaultBannerCommandStyles, this.props.bannerWidth, this.props.forceNarrowStyles );
			this.settingsContent = bannerContent.content;
			// console.log('b4 showSettingsAsPivot, forceNarrowStyles', this.showSettingsAsPivot, this.props.forceNarrowStyles );
			this.showSettingsAsPivot = this.props.forceNarrowStyles === true ? true : bannerContent.showSettingsAsPivot;
			// console.log('af showSettingsAsPivot, forceNarrowStyles', this.showSettingsAsPivot, this.props.forceNarrowStyles );

		}

		if ( this.props.enableExpandoramic === true ) {
			let thisIcon = this.props.expandoDefault === true ? 'BackToWindow' : 'ChromeFullScreen';
			this.nearElements.push( <Icon iconName={'ChromeFullScreen'} onClick={ this._toggleExpando.bind(this) } style={ this.props.bannerCmdReactCSS } title="Toggle Expandoramic Mode"/> );
			this.hasNear = true;
			this.hasNearOrFar = true;
		}

		if ( this.props.onHomePage !== true && this.props.showGoToHome === true ) {
			let titleHome = 'Go to Home Page of current site';
			this.hasNear = true;
			this.hasNearOrFar = true;

			//This is the easy fix that assumes the page is not in a folder in site pages.
			this.nearElements.push(<div style={{ paddingRight: undefined }} className={ '' } title={ titleHome } >
				<Icon iconName='Home' onClick={ this.jumpToHomePage.bind(this) } style={ this.props.bannerCmdReactCSS }/>
			</div>);
		}

		if ( this.props.showGoToParent === true && this.props.pageContext.site.absoluteUrl !== this.props.pageContext.web.absoluteUrl ) {
			let title = 'Go to parent site';
			this.hasNear = true;
			this.hasNearOrFar = true;

			this.nearElements.push(<div style={{ paddingRight: undefined }} className={ '' } title={ title}>
				<Icon iconName='Up' onClick={ this.jumpToParentSite.bind(this) } style={ this.props.bannerCmdReactCSS }/>
			</div>);

		}
		
		this.nearElements.push(...this.props.nearElements );
	}

    constructor(props: IWebpartBannerProps) {
			super(props);
			
			let pageContext: any = this.props.pageContext;

			let LimtedDowload = null;
			
			let spFeatures = pageContext.spFeatureInfo && pageContext.spFeatureInfo.features && pageContext.spFeatureInfo.features.length > 0 ? pageContext.spFeatureInfo.features : null;

			if ( spFeatures ) {
				spFeatures.map( ( feature: any ) => {
					if ( feature.key === 'FollowingContent' ) {

						if ( feature.value && feature.value.enabled === true ) {

						}
						if ( feature.value && feature.value.version === 2 ) {
							
						}
					}
				});
			}

			let keySiteProps: IKeySiteProps = {
				SiteLogoUrl: pageContext.web.logoUrl,  // pageContext.web.logoUrl;
				LimitedDownload: null, // TBD
			
				WebTimezone: checkDeepProperty( pageContext, ['web','timeZoneInfo','description'], 'ShortError' ) ,
				WebLanguage: `${ checkDeepProperty( pageContext, ['cultureInfo','currentCultureName'], 'ShortError' ) } - ${checkDeepProperty( pageContext, ['web','language'], 'ShortError' )}`,
			
				UserTimezone:  checkDeepProperty( pageContext, ['user','timeZoneInfo','description'], 'ShortError' ),  // pageContext.user.timeZoneInfo.description;
				UserTimePref:   checkDeepProperty( pageContext, ['user','preferUserTimeZone'], 'ShortError' ) ,  // pageContext.user.preferUserTimeZone ;
			
				BrokenPermissions: null, // TBD
			};

			this.updateNearElements( keySiteProps );

			this.state = {
				keySiteProps: keySiteProps,
				showPanel: false,
				selectedKey: this.props.replacePanelHTML ? pivotHeadingX : pivotHeading0,    //2022-01-31: Added Pivot Tiles
				panelType: PanelType.medium,
				showSettings: false,
				expandoramicMode: this.props.enableExpandoramic === true && this.props.expandoDefault === true ? true : false ,
				renderCount: 0,
				showPropsHelp: false,
			};
		}

		// Tried this to get it to update when prop pane was changed but it does
		public componentDidUpdate(prevProps: IWebpartBannerProps){
			
			let rebuildNearElements = JSON.stringify(this.props.bannerCmdReactCSS) !== JSON.stringify(prevProps.bannerCmdReactCSS) ? true : false;

			if ( this.props.webpartHistory.thisInstance && ( JSON.stringify( this.props.webpartHistory.thisInstance.changes ) !==
				JSON.stringify(prevProps.webpartHistory.thisInstance.changes ) ) ) { rebuildNearElements = true; }

			if ( this.props.beAUser != prevProps.beAUser ) { rebuildNearElements = true; }
			if ( this.props.infoElement != prevProps.infoElement ) { rebuildNearElements = true; }

			if ( this.props.hoverEffect != prevProps.hoverEffect ) { 
				rebuildNearElements = true;
				this.hoverEffect = this.props.hoverEffect === false ? false : true;
			 }

			 if ( this.props.forceNarrowStyles != prevProps.forceNarrowStyles ) { 
				rebuildNearElements = true;
			 }

			 //Check if cmd style props changed and update EditPropPane styles
			 if ( JSON.stringify( this.props.bannerCmdReactCSS ) != JSON.stringify( prevProps.bannerCmdReactCSS ) ) { 
				this.PropPaneCmdStyles = this.makeYellowStyles ( this.props.bannerCmdReactCSS );
				rebuildNearElements = true;
			 }

			 if ( prevProps.refreshId !== this.props.refreshId ) {
				rebuildNearElements = true;
			 }
			if ( rebuildNearElements ) { 
				this.updateNearElements( this.state.keySiteProps );
				rebuildNearElements = true ;
				let renderCount= this.state.renderCount +1;
				this.setState({ renderCount: renderCount });
			}
		}

		public render(): React.ReactElement<IWebpartBannerProps> {
		const { showBanner, showTricks, showRepoLinks } = this.props;
		const showPanel = this.state.showPanel;

		if ( showBanner !== true ) {
			return ( <div></div> );
		} else {

			let propsHelp = null;
			if ( this.props.WebPartHelpElement ) { 
				propsHelp = <div className={ this.state.showPropsHelp !== true ? 'fps-pph-hide' : 'fps-pph-show'  }>
					{ this.props.WebPartHelpElement ? this.props.WebPartHelpElement : null }
				</div>;
			}

			//  Estimated width pixels used by banner.  Used to determine max size of the title component.
			let usedWidth = 40; //20px padding on outside of all elements
			usedWidth += this.nearElements.length * 43 + this.props.farElements.length * 43;  //Add 45px per icon button
			// usedWidth += 40; //Padding between near/far elements and the text part of heading
			const remainingWidth = this.props.bannerWidth - usedWidth - 40;

			let moreInfoText: string = this.props.infoElement ? this.props.infoElement : 'More Information';

			let bannerTitleText = this.props.title && this.props.title.length > 0 ? this.props.title.trim() : 'FPS Webpart';
			const textWidth = ( moreInfoText.length + bannerTitleText.length ) * 19 + 40; //characters * 19px + 40 padding

			if ( bannerTitleText && ['hide','ignore','empty'].indexOf( bannerTitleText.toLowerCase() ) >= 0 ) {
				bannerTitleText = '';
			  }

			//  If space between < estimated space needed, apply ratio, else just leave large on both sides so the math works.
			const moreInfoRatio = textWidth > remainingWidth ? moreInfoText.length / ( moreInfoText.length + bannerTitleText.length ) : .7;
			const titleRatio = textWidth > remainingWidth ? 1 - moreInfoRatio : .7;

			if ( this.props.bannerWidth < 700 && moreInfoText.length > 5 ) {
				moreInfoText = moreInfoText === 'More Information' ? 'Info' : moreInfoText.substring(0,5) + '...';

			}

			// usedWidth += 18 * bannerTitleText.length; //Est 18px per character of title

			let bannerStyle: React.CSSProperties = {};
			if ( this.props.bannerReactCSS ) { bannerStyle = this.props.bannerReactCSS ; } 
			else if ( this.props.styleString ) { bannerStyle = createStyleFromString( this.props.styleString, { background: 'green' }, 'bannerStyle in banner/component.tsx ~ 81' ); }

			if ( !bannerStyle.height ) { bannerStyle.height = '35px' ; }
			if ( !bannerStyle.paddingLeft ) { bannerStyle.paddingLeft = '20px' ; }
			if ( !bannerStyle.paddingRight ) { bannerStyle.paddingRight = '20px' ; }
			if ( this.hasNearOrFar === false ) { bannerStyle.cursor = 'pointer' ; }

			const classNames = [ 'container', this.hoverEffect === true ? 'opacity' : null, 'flex-container' ].join( ' ' ); 

			//  On clicks need to be defined like this and only put on specific elements in certain cases.
			//  OR ELSE they will all get fired messing up panel open

			const bannerOnClick = this.hasNearOrFar !== true ? this._openPanel.bind( this ) : undefined;
			const titleInfoOnClick = this.hasNearOrFar === true ? this._openPanel.bind( this ) : undefined;
			const titleInfoCursor = this.hasNearOrFar === true ? 'pointer' : undefined;
			const styleFlexElements : React.CSSProperties = { padding: '10px', cursor: titleInfoCursor };

			//Added for https://github.com/mikezimm/PageInfo/issues/30
			const isPinned = this.props.domElement && this.props.domElement.offsetParent && this.props.domElement.offsetParent.classList.contains( 'pinMeWebPartDefault') ? true : false;
			const isPageInfo = this.props.gitHubRepo.desc === links.gitRepoPageInfoSmall.desc ? true : false;
			const maxWidth = isPinned === true || isPageInfo === true ? '200px' : titleRatio * remainingWidth;

			const styleLeftTitle : React.CSSProperties = { padding: '10px', cursor: titleInfoCursor, maxWidth: maxWidth, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }; 
			const styleRightTitle : React.CSSProperties = { padding: '10px', cursor: titleInfoCursor, maxWidth: moreInfoRatio * remainingWidth, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }; 

			const isMoreInfoButton = typeof this.props.infoElement === 'string' && this.props.infoElement.toLowerCase().indexOf('iconname=') === 0 ? true : false;

			const infoElement = [];

			if ( this.props.feedbackEmail ) {
				infoElement.push( <Icon title={ 'Submit Feedback' } iconName='Feedback' onClick={ this.sendFeedback.bind(this) } style={ this.props.bannerCmdReactCSS }/> )
			};

			if ( isMoreInfoButton === true ) {
				let iconName = this.props.infoElement.split('=')[1];
				infoElement.push( <Icon iconName={ iconName } onClick={ titleInfoOnClick } style={ this.props.bannerCmdReactCSS } title="More Information on webpart"/>);
			} else {
				infoElement.push(<div style={ styleRightTitle } onClick = { titleInfoOnClick }  title={ 'More Information on webpart' }>{moreInfoText}</div>);
			}

			if ( this.props.displayMode === DisplayMode.Edit && this.props.WebPartHelpElement ) {
				infoElement.push( 
					//Found I had to makeYellowStyles every render to make this work.
				  <Icon iconName='OpenEnrollment' onClick={ this.togglePropsHelp.bind(this) } style={ this.makeYellowStyles ( this.props.bannerCmdReactCSS ) }
				  title={ 'Property Pane Help' }/>
				);
			  }
      
      const appendTitle = this.props.appendTitle ? this.props.appendTitle : '';

			const bannerLeft = this.nearElements.length === 0 ? <div style={ styleFlexElements } onClick = { titleInfoOnClick } > { bannerTitleText } </div> :
				<div className={ 'flex-left-nowrap-start' }>
					{ this.nearElements }
					<div style={ styleLeftTitle } onClick = { titleInfoOnClick } title={ bannerTitleText }> { bannerTitleText } { appendTitle } </div>
				</div>;

      const bannerRight = this.props.farElements.length === 0 && infoElement.length === 0 ? <div style={ styleFlexElements } onClick = { titleInfoOnClick } >{moreInfoText}</div> :
				<div className={ 'flex-left-nowrap-start' }>
					{ [ ...this.props.farElements, ...infoElement, ] }
				</div>;

			let showSettingStyle = this.showSettingsAsPivot === true ? 'show-settings show-settings-pivot' : 'show-settings show-settings-flex';
			console.log('showSettingStyle ~ 326', showSettingStyle );
			let bannerContent = 
			<div>
				<div className={ classNames } style={ bannerStyle } onClick = { bannerOnClick }>
					{ bannerLeft }
					{/* { <div style={{width: '100%', overflow: 'hidden', color: 'green'}}></div>} */}
					{ bannerRight }
				</div>
				<div className={ this.state.showSettings ? showSettingStyle: 'hide-settings' } style={ {} }>
					{ this.settingsContent }
				</div>
			</div>;

			let thisPage = null;

			let panelContent = null;

			if ( showPanel === true && this.props.showFullPanel !== true ) {

				const bonusHTML1: any = this.props.bonusHTML1 ? this.props.bonusHTML1 : null;
				const panelPerformance = this.props.panelPerformance ? createPerformanceTableVisitor( this.props.panelPerformance, [] ): null;
				const bonusHTML2: any = this.props.bonusHTML2 ? this.props.bonusHTML2 : null;

				panelContent = <div>
					{ this.props.replacePanelHTML }
					{ bonusHTML1 ? <div>{ bonusHTML1 }</div> : null }
					{ panelPerformance ? <div>{ panelPerformance }</div> : null }
					{ bonusHTML2 ? <div>{ bonusHTML2 }</div> : null }
				</div>;

			} else if ( showPanel === true ) {
				const webPartLinks =  <WebPartLinks 
					parentListURL = { '' } //Get from list item
					childListURL = { '' } //Get from list item

					parentListName = { '' } // Static Name of list (for URL) - used for links and determined by first returned item
					childListName = { '' } // Static Name of list (for URL) - used for links and determined by first returned item

					repoObject = { this.props.gitHubRepo }
					showRepoLinks = { this.props.showRepoLinks }

				></WebPartLinks>;

				const thisWindow : any = window;
				let content = null;
				// let showMedical = this.isShowTricks && ( thisWindow.FPSUser || thisWindow.FPSOptions )  ? true : false;
				let showMedical = this.isShowTricks === true && ( thisWindow.FPSUser || thisWindow.FPSOptions )  ? true : false;

				const bonusHTML1: any = this.props.bonusHTML1 ? this.props.bonusHTML1 : null;
				const panelPerformance = this.props.panelPerformance ? createPerformanceTableVisitor( this.props.panelPerformance, [] ): null;
				const bonusHTML2: any = this.props.bonusHTML2 ? this.props.bonusHTML2 : null;
				
				if ( this.state.selectedKey === pivotHeadingX ) {
					console.log('Banner component -build content');
					content = <div>
						<div style={{ padding: '10px 20px 20px 20px', background: 'yellow', marginTop: '20px' }}>{ this.props.replacePanelWarning }</div>
						<div>{ this.props.replacePanelHTML }</div>
						{ bonusHTML1 ? <div>{ bonusHTML1 }</div> : null }
						{ panelPerformance ? <div>{ panelPerformance }</div> : null }
						{ bonusHTML2 ? <div>{ bonusHTML2 }</div> : null }
					</div>;

				// import { whyContent } from './HelpPanel/Content/Whyme';
				// import { aboutTable } from './HelpPanel/Content/About';
				// import { gettingStartedContent } from './HelpPanel/Content/GettingStarted';
				// import { errorsContent } from './HelpPanel/Content/Errors';
				// import { advancedContent } from './HelpPanel/Content/Advanced';
				// import { futureContent } from './HelpPanel/Content/FuturePlans';
				// import { basicsContent } from './HelpPanel/Content/Basics';
				// import { tricksTable } from './HelpPanel/Content/Tricks';
				// import { webParTips } from './HelpPanel/Content/Tips';

				} else if ( this.state.selectedKey === pivotHeading1 ) {
						content = this.props.contentPages.gettingStartedContent;
				} else if ( this.state.selectedKey === pivotHeading2 ) {
						content= this.props.contentPages.basicsContent;
				} else if ( this.state.selectedKey === pivotHeading3 ) {
						content=  this.props.contentPages.advancedContent;
				} else if ( this.state.selectedKey === pivotHeading4 ) {
						content=  this.props.contentPages.futureContent;
				} else if ( this.state.selectedKey === pivotHeading5 ) {
						content=  this.dev;
				} else if ( this.state.selectedKey === pivotHeading6 ) {
						content=  this.props.contentPages.errorsContent;
				} else if ( this.state.selectedKey === pivotHeading7 ) {
						content= this.props.contentPages.tricksTable;
				} else if ( this.state.selectedKey === pivotHeading8 ) {
						content= this.props.contentPages.aboutTable;
				} else if ( this.state.selectedKey === pivotHeading0 ) {  //2022-01-31: Added Pivot Tiles
						content= this.props.contentPages.whyContent;
				} else if ( this.state.selectedKey === pivotHeading9 ) {  //2022-01-31: Added Pivot Tiles
						content= <div id="CommandsJSONPanel" style={{paddingTop: '20px'}}>
							<h3>Summary of Exportable Properties</h3>
							<ReactJson src={ this.props.exportProps } name={ 'Export Properties' } collapsed={ false } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '10px 0px' }}/>
							<ReactJson src={ this.props.webpartHistory } name={ 'Webpart History' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '10px 0px' }}/>
						</div>;
				} else if ( this.state.selectedKey === pivotHeadingA ) {  //2022-01-31: Added Pivot Tiles
					const thisInstance = this.createHistoryItem( this.props.webpartHistory.thisInstance  );
					let thisInstanceChanges = this.props.webpartHistory.thisInstance.changes.length === 0 ? null : <div>
						<div style={{fontSize: 'large', textDecoration: 'underline' }}>This edit session</div>
						{ thisInstance }
					</div>;

					let priorHistoryChanges = null;
					if ( this.props.webpartHistory.history && this.props.webpartHistory.history.length > 0 ) {
						let priorHistory : any[] = [];
						this.props.webpartHistory.history.map( ( item ) => {
							if ( this.props.webpartHistory.thisInstance.time !== item.time ) {
								priorHistory.push ( this.createHistoryItem( item ) );
							}
						});
						priorHistoryChanges = <div>
							<div style={{fontSize: 'large', textDecoration: 'underline' }}>Previous edit sessions</div>
							{ priorHistory }
						</div>;
					}

					content= <div id="HistoryPanel" style={{paddingTop: '20px'}}>
						{ thisInstanceChanges }
						{ priorHistoryChanges }
					</div>;

				} else if ( this.state.selectedKey === pivotHeadingB ) {  //2022-01-31: Added Pivot Tiles
	
					if ( showMedical === true ) {
						let medicalElements : any = [];
						if ( thisWindow.FPSUser ) {
							medicalElements.push( <ReactJson src={ thisWindow.FPSUser } name={ 'FPSUser' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ false } style={{ padding: '10px 0px' }}/> );
						}
						if ( thisWindow.FPSUser ) {
							medicalElements.push( <ReactJson src={ thisWindow.FPSOptions } name={ 'FPSOptions' } collapsed={ false } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ false } style={{ padding: '10px 0px' }}/> );
						}
						content= <div id="MedicalPanel" style={{paddingTop: '20px'}}>
							{ medicalElements }
						</div>;
					}
				}

				if ( this.state.selectedKey === pivotHeading9 || this.state.selectedKey === pivotHeadingA || this.state.selectedKey === pivotHeadingB || this.state.selectedKey === pivotHeadingX ) {
					thisPage = content;

				} else {
					thisPage = content === undefined ?  undefined : <SinglePage 
						allLoaded={ true }
						showInfo={ true }
						content= { content }
					></SinglePage>;
				}

				const tipHeaderStyle: React.CSSProperties = {paddingRight: '10px', textAlign: 'left' };
				const tipsTable = <table>
					<tr>
						<th style={tipHeaderStyle}>Do this</th>
						<th style={tipHeaderStyle}>Where</th>
						<th style={{textAlign: 'left'}}>Result</th>
					</tr>
					{ this.getRandomTip( this.props.contentPages.webParTips ) }
				</table>;

        const tips = this.props.contentPages.webParTips.length === 0 ? null :
					<MessageBar messageBarType={MessageBarType.warning } >
						<div style={{fontWeight: 600, fontSize: 'large', marginBottom: '12px'}} >Pro TIP:</div> 
						<div style={{minHeight: '30px'}} >{ tipsTable }</div>
					</MessageBar>;

          const wideIcon = this.wideToggle !== true ? null : <Icon iconName= { this.state.panelType === PanelType.medium ? 'MaximumValue' : 'MinimumValue' } style={{ fontSize: 'xx-large', cursor: 'pointer' }} 
					  onClick={ this._panelWidth.bind(this) }/>;


          const showExport = this.props.showExport === true && this.props.exportProps !== null ? true : false;
          const showHistory = this.props.webpartHistory ? true : false;

				let panelTitle = this.props.panelTitle;
				if ( panelTitle && ['hide','ignore','empty'].indexOf( panelTitle.toLowerCase() ) >= 0 ) {
					panelTitle = this.props.gitHubRepo.desc;
				  }

				panelContent = <div style={{ paddingBottom: '50px' } }>
					{ tips }
					{ webPartLinks }
					<div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'center' }}>
							<h3> { panelTitle }</h3>
							<div title={ this.state.panelType === PanelType.medium ? 'Make panel wider' : 'Make panel narrower' }>
							{ wideIcon }
						</div>
					</div>

					<Pivot
							linkFormat={PivotLinkFormat.links}
							linkSize={PivotLinkSize.normal }
							onLinkClick={this._selectedIndex.bind(this)}
					> 
						{/* { pivotItems.map( item => { return  ( item ) ; }) }
						*/}

						{/* //2022-01-31: Added Pivot Tiles */}

            {/* changed null to undefined :  https://github.com/mikezimm/ALVFinMan/issues/171 */}
						{ this.props.replacePanelHTML == '' ? undefined : <PivotItem headerText={pivotHeadingX} ariaLabel={pivotHeadingX} title={pivotHeadingX} itemKey={pivotHeadingX} itemIcon={ 'SunQuestionMark' }/> }

						{ this.props.contentPages.whyContent === undefined ?  undefined : <PivotItem headerText={pivotHeading0} ariaLabel={pivotHeading0} title={pivotHeading0} itemKey={pivotHeading0} itemIcon={ 'QandA' }/> }

						{ this.props.contentPages.gettingStartedContent === undefined ?  undefined : <PivotItem headerText={pivotHeading1} ariaLabel={pivotHeading1} title={pivotHeading1} itemKey={pivotHeading1} itemIcon={ undefined }/> }
						{ this.props.contentPages.basicsContent				 === undefined ?  undefined : <PivotItem headerText={pivotHeading2} ariaLabel={pivotHeading2} title={pivotHeading2} itemKey={pivotHeading2} itemIcon={ undefined }/> }
						{ this.props.contentPages.advancedContent			 === undefined ?  undefined : <PivotItem headerText={pivotHeading3} ariaLabel={pivotHeading3} title={pivotHeading3} itemKey={pivotHeading3} itemIcon={ undefined }/> }
						{ this.props.contentPages.futureContent		 === undefined ?  undefined : <PivotItem headerText={pivotHeading4} ariaLabel={pivotHeading4} title={pivotHeading4} itemKey={pivotHeading4} itemIcon={ 'RenewalFuture' }/> }
						{ this.props.contentPages.errorsContent 				 === undefined ?  undefined : <PivotItem headerText={pivotHeading6} ariaLabel={pivotHeading6} title={pivotHeading6} itemKey={pivotHeading6} itemIcon={ 'Warning12' }/> }
						{ this.dev						 === undefined ?  undefined : <PivotItem headerText={ undefined } ariaLabel={pivotHeading5} title={pivotHeading5} itemKey={pivotHeading5} itemIcon={ 'TestAutoSolid' }/> }
						{ showTricks !== true || this.props.contentPages.tricksTable === undefined ?  undefined : <PivotItem headerText={ undefined } ariaLabel={pivotHeading7} title={pivotHeading7} itemKey={pivotHeading7} itemIcon={ 'AutoEnhanceOn' }/> }
						{ this.props.contentPages.aboutTable 				 === undefined ?  undefined : <PivotItem headerText={ undefined } ariaLabel={pivotHeading8} title={pivotHeading8} itemKey={pivotHeading8} itemIcon={ 'Info' }/> }
						{ showExport !== true ? null : <PivotItem headerText={ undefined } ariaLabel={pivotHeading9} title={pivotHeading9} itemKey={pivotHeading9} itemIcon={ 'Export' }/> }
						{ showHistory !== true ? null : <PivotItem headerText={ undefined } ariaLabel={pivotHeadingA} title={pivotHeadingA} itemKey={pivotHeadingA} itemIcon={ 'FullHistory' }/> }
						{ showMedical !== true ? null : <PivotItem headerText={ undefined } ariaLabel={pivotHeadingB} title={pivotHeadingB} itemKey={pivotHeadingB} itemIcon={ 'Medical' }/> }
					</Pivot>
					{ thisPage }
				</div>;
			}

			const bannerPanel = <div><Panel
					isOpen={ showPanel }
					// this prop makes the panel non-modal
					isBlocking={true}
					onDismiss={ this._closePanel.bind(this) }
					closeButtonAriaLabel="Close"
					type = { this.state.panelType }
					isLightDismiss = { true }
				>
				{ panelContent }
			</Panel></div>;

      let SpecialElement: any = this.props.SpecialMessage ? createSpecialElement( this.props.SpecialMessage ) : undefined;

			return (
				<div className={ 'banner-component' } >
          { SpecialElement }
					{ bannerContent }
					{ propsHelp }
					{ bannerPanel }
				</div>
	
			);
	
		}


	}

	public _selectedIndex = (item: any ): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;

		let itemKey = item.props.itemKey;

		this.setState({ selectedKey: itemKey });
		
	}

	private _toggleExpando ( )  {
		const newMode = this.state.expandoramicMode === true ? false : true;
		setExpandoRamicMode( this.props.domElement, newMode, this.props.expandoStyle,  this.props.expandAlert, this.props.expandConsole, this.props.expandoPadding, this.props.pageLayout );
		// if ( this.state.expandoramicMode === true ) {
			this.setState({ expandoramicMode: newMode,});
		// } else {

			// this.setState({ showPanel: true,});
		// }

	}

	private _closePanel ( )  {
    this.setState({ showPanel: false,});
	}

	private _openPanel ( event: any )  {
		let textCallback = event.currentTarget.dataset.callback;
		if ( textCallback && textCallback.length > 0) {
			//Do Nothing
		} else {
			this.setState({ showPanel: true,});
		}
	}

	private _panelWidth ( )  {
		let newPanelType: PanelType = this.state.panelType !== PanelType.medium ? PanelType.medium : PanelType.large;
    this.setState({ panelType: newPanelType,});
	}

	private togglePropsHelp(){
		let newState = this.state.showPropsHelp === true ? false : true;
		this.setState( { showPropsHelp: newState });
	}

	private sendFeedback() {

		const lbreak = '%0D%0A';
		let pageName = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
		let mailTemplate = `mailto:${this.props.feedbackEmail}`;
		// let mailTemplate = `mailto:${`UpdateEmail@someday.com`}`;
		mailTemplate += `?subject=${ this.props.gitHubRepo.desc } Webpart Question or Issue on PAGE: ${ pageName }`;
		mailTemplate += `&body=Add your question or comment here: ${ lbreak }${ lbreak }${ lbreak }`;
		mailTemplate += `Page Name: ${ pageName }${ lbreak }${ lbreak }`;
		mailTemplate += `Link to page:${ lbreak }${ window.location.href }${ lbreak }${ lbreak }`;
		mailTemplate += `Best Regards, ${ lbreak }${ lbreak }`;
	
		window.open( mailTemplate );
	  }
	

}
