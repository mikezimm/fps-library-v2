import * as React from 'react';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';
import { DisplayMode } from '@microsoft/sp-core-library';

/***
 *    d88888b d8888b. .d8888.      d8888b. d8888b. d88888b .d8888. d88888b d888888b .d8888. 
 *    88'     88  `8D 88'  YP      88  `8D 88  `8D 88'     88'  YP 88'     `~~88~~' 88'  YP 
 *    88ooo   88oodD' `8bo.        88oodD' 88oobY' 88ooooo `8bo.   88ooooo    88    `8bo.   
 *    88~~~   88~~~     `Y8b.      88~~~   88`8b   88~~~~~   `Y8b. 88~~~~~    88      `Y8b. 
 *    88      88      db   8D      88      88 `88. 88.     db   8D 88.        88    db   8D 
 *    YP      88      `8888Y'      88      88   YD Y88888P `8888Y' Y88888P    YP    `8888Y' 
 *                                                                                          
 *                                                                                          
 */


import { IPinMeState, IPinStatus } from '../features/PinMe/Interfaces';
import { FPSPinMe, getDefaultFPSPinState, } from '../features/PinMe/FPSPinMenu';
import { ILoadPerformance } from '../../components/molecules/Performance/IPerformance';

import { IBannerPages, IWebpartBannerProps  } from '../mainReact/IWebpartBannerProps';
import { ISpecialMessage } from '../components/SpecialBanner/interface';
// import { IFPSCorePinMeReactComponentProps } from '../mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '../mainReact/ReactComponentState';
import { updateFarElementsPinMe } from './PinFunctions';
import { getWebPartHelpElementX } from '../../common/PropPaneHelp/PropPaneHelp';
import { createSpecialElement } from '../components/SpecialBanner/component';
import { Panel, PanelType } from 'office-ui-fabric-react';
import { IKeySiteProps } from '../components/Gear/IKeySiteProps';
import { getMinPanel } from './MinPanel';
import { getFullPanel, pivotHeading0, pivotHeadingX } from './FullPanel';
import { mainBannerContent } from './BannerContent';
import { getForceNarrow } from './Near/CheckNarrow';
import { updateNearElements } from './Near/updateNearElements';
import { IMinPandoramicProps } from '../features/Expando/Interfaces';
import { setExpandoRamicMode } from '../features/Expando/functions';
import { ISiteThemes } from '../../common/commandStyles/ISiteThemeChoices';
import EasyPagesHook from '../components/EasyPages/componentSources';
// import { IMinWPFieldPanelProps } from '../../components/molecules/FieldPanel/IMinWPFieldPanelProps';

require('@mikezimm/fps-styles/dist/banner.css');

/***
 *    db       .d88b.   .o88b.  .d8b.  db      
 *    88      .8P  Y8. d8P  Y8 d8' `8b 88      
 *    88      88    88 8P      88ooo88 88      
 *    88      88    88 8b      88~~~88 88      
 *    88booo. `8b  d8' Y8b  d8 88   88 88booo. 
 *    Y88888P  `Y88P'   `Y88P' YP   YP Y88888P 
 *                                             
 *                                             
 */



//Use this to add more console.logs for this component
const consoleFunctions: boolean = true;

export interface IFetchBannerXProps {

    bannerProps:    IWebpartBannerProps;
    parentState:    IFPSCorePinMeReactComponentState;

    siteThemes: ISiteThemes; // Pass in the theme from the main react css styles.fpsBannerThemeDark / fpsBannerThemeLight

    appendTitle?: string | JSX.Element; //Can be used to add text to the bannerTitle.  aka when filtering in component, show filter test
    WebPartHelpPivots: JSX.Element[]; // Changed to accept web part specific pivot items insead of entire page.
    SpecialMessage?: ISpecialMessage;

    contentPages : IBannerPages;

    nearBannerElementsArray: Element[];
    farBannerElementsArray: Element[];

    updatePinState?: any; // Only needed when web part manages pinMeState
    pinState?: IPinMeState; // Only needed when web part manages pinMeState

    refreshId?: string;
    replacePanelHTML?: JSX.Element;//Intended for help info and can include performance if added in onInit, but do not add in onInit if you plan to update in React Component
    bonusHTML1?: JSX.Element;  //Intended for extra element to be passed in during reactComponent such as Performance or other info.
    panelPerformance?: ILoadPerformance;
    bonusHTML2?: any;  //Intended for extra element to be passed in during reactComponent which is added after panelPerformance.

}

export interface IFetchBannerXState {

  showPanel: boolean;
	showSettings: boolean;
	selectedKey: string;

	showPropsHelp: boolean;

	panelType: PanelType;
	// keySiteProps: IKeySiteProps;
	expandoramicMode: boolean;
	// renderCount: number;
  showEasyPages: boolean;

  pinState: IPinMeState;

}

export default class FetchBanner extends React.Component<IFetchBannerXProps, IFetchBannerXState> {

  private _pinMeState: IPinMeState;
  private _updatePinState: any;

  private _webPartHelpElement = getWebPartHelpElementX( this.props.WebPartHelpPivots, this.props.bannerProps, );

  private makeLargerCmdStyles() {
    const smaller: React.CSSProperties = JSON.parse(JSON.stringify( this.props.bannerProps.bannerCmdReactCSS ));
    smaller.fontSize = 'larger';
    smaller.marginRight = '';
    return smaller;
  }

  private pimMeCmdStyles: React.CSSProperties = null as any;

    
/***
 *    d8b   db d88888b  .d8b.  d8888b.      d88888b  .d8b.  d8888b.      d88888b db      d88888b 
 *    888o  88 88'     d8' `8b 88  `8D      88'     d8' `8b 88  `8D      88'     88      88'     
 *    88V8o 88 88ooooo 88ooo88 88oobY'      88ooo   88ooo88 88oobY'      88ooooo 88      88ooooo 
 *    88 V8o88 88~~~~~ 88~~~88 88`8b        88~~~   88~~~88 88`8b        88~~~~~ 88      88~~~~~ 
 *    88  V888 88.     88   88 88 `88.      88      88   88 88 `88.      88.     88booo. 88.     
 *    VP   V8P Y88888P YP   YP 88   YD      YP      YP   YP 88   YD      Y88888P Y88888P Y88888P 
 *                                                                                               
 *                                                                                               
 */

  private nearBannerElements = this.buildNearBannerElements();

  private buildNearBannerElements() {
    const elements: any[] = this.props.nearBannerElementsArray ? this.props.nearBannerElementsArray : [];
    return elements;
  }

  private buildFarBannerElements() {
    const farElements: any[] = [];
    if ( this.props.farBannerElementsArray && this.props.farBannerElementsArray.length > 0 ) {
      this.props.farBannerElementsArray.map( ele => farElements.push ( ele ) );
    }
    if ( this.props.bannerProps.showTricks === true ) {
      farElements.push( null );
    }
    return farElements;
  }


  /***
  *     .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
  *    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
  *    8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
  *    8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
  *    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
  *     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
  *                                                                                                  
  *                                                                                                  
  */
 

  public constructor(props:IFetchBannerXProps){
    super(props);
    if ( consoleFunctions === true ) console.log('FetchBannerElement ~ constructor');
    const expandoProps : IMinPandoramicProps= this.props.bannerProps.expandoProps;

    /**
     * Establish local variables for managing pin state depending on what is passed in.
     *   This is because there is an option for the main webpart to manage pinMeState by passing in it's own update function and value.
     *   By default, it is managed all by FPS Banner based on the settings from the property pane.
     */
    const _pinMeState: IPinMeState = this.props.pinState ? this.props.pinState : this.props.bannerProps.fpsPinMenu.defPinState;
    this._updatePinState = this.props.updatePinState ? this.props.updatePinState : this._updatePinStateHere.bind(this);
    this._pinMeState = _pinMeState;
    this.state = {
      showPanel: false,
      // keySiteProps: keySiteProps,
      selectedKey: this.props.replacePanelHTML ? pivotHeadingX : pivotHeading0,    //2022-01-31: Added Pivot Tiles
      panelType: PanelType.medium,
      showSettings: false,
      expandoramicMode: expandoProps.enableExpandoramic === true && expandoProps.expandoDefault === true ? true : false ,
      // renderCount: 0,
      showPropsHelp: false,
      showEasyPages: false,
      pinState: _pinMeState,
    };

  }

  public componentDidMount() {
    if ( consoleFunctions === true ) console.log('FetchBannerElement ~ componentDidMount');
    this.pimMeCmdStyles = this.makeLargerCmdStyles();
    //Copied from FPSPageInfo.tsx componentDidMount
    const { displayMode, fpsPinMenu } = this.props.bannerProps;
    const tempPinState: IPinMeState = displayMode === DisplayMode.Edit ? 'normal' : this._pinMeState;
    FPSPinMe( fpsPinMenu.domElement, tempPinState, null,  false, true, null as any, fpsPinMenu.pageLayout, displayMode );

  }
  //        
    /***
   *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
   *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
   *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
   *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
   *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
   *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
   *                                                                                         
   *                                                                                         
   */

  public componentDidUpdate(prevProps: IFetchBannerXProps){
    if ( consoleFunctions === true ) console.log('FetchBannerElement ~ componentDidUpdate');
    const { displayMode, fpsPinMenu, } = this.props.bannerProps;
    const pinStatus: IPinStatus = getDefaultFPSPinState ( prevProps.bannerProps.fpsPinMenu, fpsPinMenu, displayMode );

    this.pimMeCmdStyles = this.makeLargerCmdStyles();

    let refresh: boolean = false;
    if ( pinStatus.refresh === true ) {
      FPSPinMe( fpsPinMenu.domElement, pinStatus.defPinState, null,  false, true, null as any, fpsPinMenu.pageLayout, displayMode );
    }

    if ( JSON.stringify( prevProps.panelPerformance ) !== JSON.stringify( this.props.panelPerformance ) ) {
      refresh = true;

    } else if ( prevProps.bonusHTML1 !== this.props.bonusHTML1 ) {
      refresh = true;

    } else if ( prevProps.bonusHTML2 !== this.props.bonusHTML2 ) {
      refresh = true;

    } else if ( typeof prevProps.appendTitle !== typeof this.props.appendTitle ) {
      refresh = true;

    } else if ( typeof prevProps.appendTitle === 'string' && typeof this.props.appendTitle === 'string' && prevProps.appendTitle && this.props.appendTitle ) {
      refresh = true;

    }

    if ( refresh === true ) this._webPartHelpElement = getWebPartHelpElementX( this.props.WebPartHelpPivots, this.props.bannerProps );

    return refresh;
  }


/***
 *    d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *    88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *    88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *    88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *    88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *    88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                     
 *                                                     
 */


  public render(): React.ReactElement<IFetchBannerXProps> {
    if ( consoleFunctions === true ) console.log('FetchBannerElement ~ render');

    if ( this.props.bannerProps.showBanner !== true ) {
			return ( <div></div> );
		} else {

      const { bannerProps, } = this.props;
      const { displayMode, fpsPinMenu, } = this.props.bannerProps;

      const { showBanner, showTricks, showRepoLinks } = this.props.bannerProps;
      const { showPanel, showSettings, showEasyPages, showPropsHelp } = this.state;


      const forceNarrowStyles = getForceNarrow( this._pinMeState, this._updatePinState );

      const farBannerElementsArray = updateFarElementsPinMe({ farBannerElementsArray: this.buildFarBannerElements(),
        displayMode: displayMode, fpsPinMenu: fpsPinMenu, pinState: this._pinMeState, updatePinState: this._updatePinState, pimMeCmdStyles: this.pimMeCmdStyles });

      const nearBannerElementsArray = updateNearElements( this.nearBannerElements, this.props.bannerProps, this.showSettings.bind(this), this._toggleExpando.bind(this), this._toggleEasyLinks.bind(this) );

        /***
       *    d8888b.  .d8b.  d8b   db d8b   db d88888b d8888b.      d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
       *    88  `8D d8' `8b 888o  88 888o  88 88'     88  `8D      88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
       *    88oooY' 88ooo88 88V8o 88 88V8o 88 88ooooo 88oobY'      88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
       *    88~~~b. 88~~~88 88 V8o88 88 V8o88 88~~~~~ 88`8b        88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
       *    88   8D 88   88 88  V888 88  V888 88.     88 `88.      88.     88booo. 88.     88  88  88 88.     88  V888    88    
       *    Y8888P' YP   YP VP   V8P VP   V8P Y88888P 88   YD      Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
       *         
       *         
       */

      const bannerContent = mainBannerContent( bannerProps, forceNarrowStyles, this.props.siteThemes,
        nearBannerElementsArray, farBannerElementsArray,
        showSettings, showPropsHelp, this._openPanel.bind( this ) ,this._togglePropsHelp.bind( this ) );



      /***
       *     d888b  d88888b d888888b      .88b  d88. d888888b d8b   db      d8888b.  .d8b.  d8b   db d88888b db      
       *    88' Y8b 88'     `~~88~~'      88'YbdP`88   `88'   888o  88      88  `8D d8' `8b 888o  88 88'     88      
       *    88      88ooooo    88         88  88  88    88    88V8o 88      88oodD' 88ooo88 88V8o 88 88ooooo 88      
       *    88  ooo 88~~~~~    88         88  88  88    88    88 V8o88      88~~~   88~~~88 88 V8o88 88~~~~~ 88      
       *    88. ~8~ 88.        88         88  88  88   .88.   88  V888      88      88   88 88  V888 88.     88booo. 
       *     Y888P  Y88888P    YP         YP  YP  YP Y888888P VP   V8P      88      YP   YP VP   V8P Y88888P Y88888P 
       *                                                                                                             
       *                                                                                                             
       */
      let panelContent = null;

      if ( showPanel === true && this.props.bannerProps.showFullPanel !== true ) {
        panelContent = getMinPanel( this.props.bannerProps );



/***
 *     d888b  d88888b d888888b      d88888b db    db db      db           d8888b.  .d8b.  d8b   db d88888b db      
 *    88' Y8b 88'     `~~88~~'      88'     88    88 88      88           88  `8D d8' `8b 888o  88 88'     88      
 *    88      88ooooo    88         88ooo   88    88 88      88           88oodD' 88ooo88 88V8o 88 88ooooo 88      
 *    88  ooo 88~~~~~    88         88~~~   88    88 88      88           88~~~   88~~~88 88 V8o88 88~~~~~ 88      
 *    88. ~8~ 88.        88         88      88b  d88 88booo. 88booo.      88      88   88 88  V888 88.     88booo. 
 *     Y888P  Y88888P    YP         YP      ~Y8888P' Y88888P Y88888P      88      YP   YP VP   V8P Y88888P Y88888P 
 *  
 *  
 */
      } else if ( showPanel === true ) {
        // Added contentPages to params for https://github.com/mikezimm/fps-library-v2/issues/9
        panelContent = getFullPanel( this.props.bannerProps, this.state.selectedKey, 
          this.state.panelType, this._selectedIndex.bind(this), this._panelWidth.bind(this), this.props.contentPages );
      }


/***
 *     .o88b.  .d88b.  d8b   db .d8888. d888888b      d8888b.  .d8b.  d8b   db d88888b db      
 *    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~'      88  `8D d8' `8b 888o  88 88'     88      
 *    8P      88    88 88V8o 88 `8bo.      88         88oodD' 88ooo88 88V8o 88 88ooooo 88      
 *    8b      88    88 88 V8o88   `Y8b.    88         88~~~   88~~~88 88 V8o88 88~~~~~ 88      
 *    Y8b  d8 `8b  d8' 88  V888 db   8D    88         88      88   88 88  V888 88.     88booo. 
 *     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP         88      YP   YP VP   V8P Y88888P Y88888P 
 *                                                                                             
 *                                                                                             
 */

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





/***
 *    .d8888. d8888b. d88888b  .o88b. d888888b  .d8b.  db      
 *    88'  YP 88  `8D 88'     d8P  Y8   `88'   d8' `8b 88      
 *    `8bo.   88oodD' 88ooooo 8P         88    88ooo88 88      
 *      `Y8b. 88~~~   88~~~~~ 8b         88    88~~~88 88      
 *    db   8D 88      88.     Y8b  d8   .88.   88   88 88booo. 
 *    `8888Y' 88      Y88888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                             
 *                                                             
 */


      let SpecialElement: any = this.props.SpecialMessage ? createSpecialElement( this.props.SpecialMessage ) : undefined;




      /***
 *    d8888b. d8888b.  .d88b.  d8888b. .d8888.      db   db d88888b db      d8888b. 
 *    88  `8D 88  `8D .8P  Y8. 88  `8D 88'  YP      88   88 88'     88      88  `8D 
 *    88oodD' 88oobY' 88    88 88oodD' `8bo.        88ooo88 88ooooo 88      88oodD' 
 *    88~~~   88`8b   88    88 88~~~     `Y8b.      88~~~88 88~~~~~ 88      88~~~   
 *    88      88 `88. `8b  d8' 88      db   8D      88   88 88.     88booo. 88      
 *    88      88   YD  `Y88P'  88      `8888Y'      YP   YP Y88888P Y88888P 88      
 *                                                                                  
 *                                                                                  
 */
      let propsHelp = null;
			if ( this._webPartHelpElement ) { 
				propsHelp = <div className={ this.state.showPropsHelp !== true ? 'fps-pph-hide' : 'fps-pph-show'  }>
					{ this._webPartHelpElement ? this._webPartHelpElement : null }
				</div>;
			}


    const EasyPagesElement = <EasyPagesHook 
      easyPagesExtraProps={ { ...bannerProps.easyPagesExtraProps, ...{ easyPagesExpanded: showEasyPages, easyPagesToggleExpanded: this._toggleEasyLinks.bind(this) } } }
      easyPagesSourceProps= { bannerProps.easyPagesSourceProps }
      EasyIconsObject= { bannerProps.EasyIconsObject }
    />;


      /***
 *    d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *    88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *    88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *    88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
 *    88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *    88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *                                                       
 *                                                       
 */

      return (
        <div className={ 'banner-component' } >
          { SpecialElement }
          { bannerContent }
          { EasyPagesElement }
          { propsHelp }
          { bannerPanel }
        </div>
      // //If refreshId={ this.props.parentState.refreshId } -- causes React minified error #85
      // refreshId={ this.props.refreshId ? this.props.refreshId : '' }
      // displayMode={ bannerProps.displayMode }
      // WebPartHelpElement={ this.props.bannerProps.WebPartHelpElement }
      // SpecialMessage={ this.props.SpecialMessage }
      // forceNarrowStyles= { forceNarrowStyles }
      // contentPages= { this.props.contentPages }
      // feedbackEmail= { bannerProps.feedbackEmail }
      // FPSUser={ bannerProps.FPSUser }
      // exportProps={ bannerProps.exportProps }
      // showBanner={ bannerProps.showBanner }
      // // Adding this to adjust expected width for when prop pane could be opened
      // bannerWidth={ ( bannerProps.bannerWidth ) }
      // pageContext={ bannerProps.pageContext }
      // pageLayout={ bannerProps.pageLayout }
      // title ={ bannerTitle }
      // appendTitle ={ this.props.appendTitle }
      // panelTitle = { bannerProps.panelTitle }
      // infoElement = { bannerProps.infoElement }
      // bannerReactCSS={ bannerProps.bannerReactCSS }
      // bannerCmdReactCSS={ bannerProps.bannerCmdReactCSS }
      // showTricks={ bannerProps.showTricks }
      // showGoToParent={ bannerProps.showGoToParent }
      // showGoToHome={ bannerProps.showGoToHome }
      // onHomePage={ bannerProps.onHomePage }

      // webpartHistory={ bannerProps.webpartHistory }

      // showBannerGear={ bannerProps.showBannerGear }

      // showFullPanel={ bannerProps.showFullPanel }
      // replacePanelHTML={ this.props.replacePanelHTML ? this.props.replacePanelHTML : bannerProps.replacePanelHTML }

      // bonusHTML1={ this.props.bonusHTML1 ? this.props.bonusHTML1 : null }
      // panelPerformance={ this.props.panelPerformance ? this.props.panelPerformance : null as any }
      // bonusHTML2={ this.props.bonusHTML2 ? this.props.bonusHTML2 : null }

      // replacePanelWarning={ bannerProps.replacePanelWarning }

      // hoverEffect={ bannerProps.hoverEffect }
      // gitHubRepo={ bannerProps.gitHubRepo }
      // earyAccess={ bannerProps.earyAccess }
      // wideToggle={ bannerProps.wideToggle }
      // nearElements = { this.nearBannerElements }
      // farElements = { farBannerElementsArray }

      // showRepoLinks={ bannerProps.showRepoLinks }
      // showExport={ bannerProps.showExport }

      // //2022-02-17:  Added these for expandoramic mode
      // domElement = { bannerProps.domElement }
      // enableExpandoramic = { bannerProps.enableExpandoramic }
      // expandoDefault = { bannerProps.expandoDefault }
      // expandoStyle = { bannerProps.expandoStyle}
      // expandAlert = { bannerProps.expandAlert }
      // expandConsole = { bannerProps.expandConsole }
      // expandoPadding = { bannerProps.expandoPadding }

      // beAUser = { bannerProps.beAUser }
      // showBeAUserIcon = { bannerProps.showBeAUserIcon }
      // beAUserFunction={ bannerProps.beAUserFunction }
      ) ;

    }

  }

  private _toggleEasyLinks( ): void {
    this.setState({ showEasyPages: !this.state.showEasyPages });
  }


  public _selectedIndex = (item: any ): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
		let itemKey = item.props.itemKey;
		this.setState({ selectedKey: itemKey });

	}

  private _toggleExpando ( )  {
    const { domElement, pageLayout } = this.props.bannerProps;
    const { expandoStyle, expandAlert, expandConsole, expandoPadding } = this.props.bannerProps.expandoProps;

		const newMode = this.state.expandoramicMode === true ? false : true;
		setExpandoRamicMode( domElement, newMode, expandoStyle, expandAlert, expandConsole, expandoPadding, pageLayout );
		// if ( this.state.expandoramicMode === true ) {
			this.setState({ expandoramicMode: newMode,});
		// } else {

			// this.setState({ showPanel: true,});
		// }

	}

  private _updatePinStateHere( newValue: IPinMeState ) {
    this._pinMeState = newValue;
    this.setState({ pinState: newValue, });
 }


  private showSettings() {  this.setState({ showSettings: !this.state.showSettings }); }

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

	private _togglePropsHelp(){
		let newState = this.state.showPropsHelp === true ? false : true;
		this.setState( { showPropsHelp: newState });
	}

}
