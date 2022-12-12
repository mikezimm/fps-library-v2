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


import { IFPSPinMenu, IPinMeState, IPinStatus } from '../features/PinMe/Interfaces';
import { FPSPinMe, getDefaultFPSPinState, } from '../features/PinMe/FPSPinMenu';
import { ILoadPerformance } from '../../components/molecules/Performance/IPerformance';

import { IBannerPages  } from '../mainReact/IWebpartBannerProps';
import { ISpecialMessage } from '../components/SpecialBanner/interface';
import { IFPSCorePinMeReactComponentProps } from '../mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '../mainReact/ReactComponentState';


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

    parentProps:    IFPSCorePinMeReactComponentProps;
    parentState:    IFPSCorePinMeReactComponentState;

    appendTitle?: string | JSX.Element; //Can be used to add text to the bannerTitle.  aka when filtering in component, show filter test
    WebPartHelpElement: JSX.Element;
    SpecialMessage?: ISpecialMessage;

    contentPages : IBannerPages;

    nearBannerElementsArray: Element[];
    farBannerElementsArray: Element[];

    updatePinState: any;
    pinState: IPinMeState;

    refreshId?: string;
    replacePanelHTML?: JSX.Element;//Intended for help info and can include performance if added in onInit, but do not add in onInit if you plan to update in React Component
    bonusHTML1?: JSX.Element;  //Intended for extra element to be passed in during reactComponent such as Performance or other info.
    panelPerformance?: ILoadPerformance;
    bonusHTML2?: any;  //Intended for extra element to be passed in during reactComponent which is added after panelPerformance.

}

export interface IFetchBannerXState {

}

export default class FetchBanner extends React.Component<IFetchBannerXProps, IFetchBannerXState> {


  private makeLargerCmdStyles() {
    const smaller: React.CSSProperties = JSON.parse(JSON.stringify( this.props.parentProps.bannerProps.bannerCmdReactCSS ));
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
    const farElements: any[] = this.props.farBannerElementsArray ? this.props.farBannerElementsArray : [];
    if ( this.props.parentProps.bannerProps.showTricks === true ) {
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
    this.state = {

    };

  }

  public componentDidMount() {
    if ( consoleFunctions === true ) console.log('FetchBannerElement ~ componentDidMount');
    this.pimMeCmdStyles = this.makeLargerCmdStyles();
    //Copied from FPSPageInfo.tsx componentDidMount
    const { displayMode, fpsPinMenu } = this.props.parentProps;
    const tempPinState: IPinMeState = displayMode === DisplayMode.Edit ? 'normal' : this.props.pinState;
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
    const { displayMode, fpsPinMenu, } = this.props.parentProps;
    const pinStatus: IPinStatus = getDefaultFPSPinState ( prevProps.parentProps.fpsPinMenu, fpsPinMenu, displayMode );

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

    return refresh;
  }

  public render(): React.ReactElement<IFetchBannerXProps> {
    if ( consoleFunctions === true ) console.log('FetchBannerElement ~ render');
    const { bannerProps, } = this.props.parentProps;
    const { displayMode, fpsPinMenu } = this.props.parentProps;

    const farBannerElementsArray = this.updateFarElementsPinMe( fpsPinMenu );

    const bannerSuffix = '';
    //Exclude the props.bannerProps.title if the webpart is narrow to make more responsive
    let bannerTitle = bannerProps.bannerWidth < 900 ? bannerProps.title : `${bannerProps.title} ${ ( bannerSuffix ? ' - ' + bannerSuffix : '' ) }`;

    if ( bannerTitle === '' ) { bannerTitle = 'ignore' ; }
    if ( displayMode === DisplayMode.Edit ) { bannerTitle += '' ; }

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


    let forceNarrowStyles = this.props.pinState === 'pinFull' || this.props.pinState === 'pinMini' ? true : false ;

    //If there is no updatePinState function, then the web part does not use it so ignore this code.
    if ( !this.props.updatePinState ) {
      forceNarrowStyles = false;
    }

    return ( <WebpartBanner 

      //If refreshId={ this.props.parentState.refreshId } -- causes React minified error #85
      refreshId={ this.props.refreshId ? this.props.refreshId : '' }
      displayMode={ bannerProps.displayMode }
      WebPartHelpElement={ this.props.WebPartHelpElement }
      SpecialMessage={ this.props.SpecialMessage }
      forceNarrowStyles= { forceNarrowStyles }
      contentPages= { this.props.contentPages }
      feedbackEmail= { bannerProps.feedbackEmail }
      FPSUser={ bannerProps.FPSUser }
      exportProps={ bannerProps.exportProps }
      showBanner={ bannerProps.showBanner }
      // Adding this to adjust expected width for when prop pane could be opened
      bannerWidth={ ( bannerProps.bannerWidth ) }
      pageContext={ bannerProps.pageContext }
      pageLayout={ bannerProps.pageLayout }
      title ={ bannerTitle }
      appendTitle ={ this.props.appendTitle }
      panelTitle = { bannerProps.panelTitle }
      infoElement = { bannerProps.infoElement }
      bannerReactCSS={ bannerProps.bannerReactCSS }
      bannerCmdReactCSS={ bannerProps.bannerCmdReactCSS }
      showTricks={ bannerProps.showTricks }
      showGoToParent={ bannerProps.showGoToParent }
      showGoToHome={ bannerProps.showGoToHome }
      onHomePage={ bannerProps.onHomePage }

      webpartHistory={ bannerProps.webpartHistory }

      showBannerGear={ bannerProps.showBannerGear }

      showFullPanel={ bannerProps.showFullPanel }
      replacePanelHTML={ this.props.replacePanelHTML ? this.props.replacePanelHTML : bannerProps.replacePanelHTML }

      bonusHTML1={ this.props.bonusHTML1 ? this.props.bonusHTML1 : null }
      panelPerformance={ this.props.panelPerformance ? this.props.panelPerformance : null as any }
      bonusHTML2={ this.props.bonusHTML2 ? this.props.bonusHTML2 : null }

      replacePanelWarning={ bannerProps.replacePanelWarning }

      hoverEffect={ bannerProps.hoverEffect }
      gitHubRepo={ bannerProps.gitHubRepo }
      earyAccess={ bannerProps.earyAccess }
      wideToggle={ bannerProps.wideToggle }
      nearElements = { this.nearBannerElements }
      farElements = { farBannerElementsArray }

      showRepoLinks={ bannerProps.showRepoLinks }
      showExport={ bannerProps.showExport }

      //2022-02-17:  Added these for expandoramic mode
      domElement = { bannerProps.domElement }
      enableExpandoramic = { bannerProps.enableExpandoramic }
      expandoDefault = { bannerProps.expandoDefault }
      expandoStyle = { bannerProps.expandoStyle}
      expandAlert = { bannerProps.expandAlert }
      expandConsole = { bannerProps.expandConsole }
      expandoPadding = { bannerProps.expandoPadding }

      beAUser = { bannerProps.beAUser }
      showBeAUserIcon = { bannerProps.showBeAUserIcon }
      beAUserFunction={ bannerProps.beAUserFunction }

    ></WebpartBanner> ) ;

  }


  private updateFarElementsPinMe( fpsPinMenu: IFPSPinMenu, updatePinState: any, pinState: IPinMeState, displayMode: DisplayMode, pimMeCmdStyles: React.CSSProperties,  ): JSX.Element[] {

    const farBannerElementsArray: JSX.Element[] = this.buildFarBannerElements();

    const PinDefault = <Icon  title={ 'Set to default' } iconName='ArrowDownRightMirrored8' onClick={ () => this.setPinArrowFunction( fpsPinMenu, updatePinState, 'normal', displayMode) } style={ pimMeCmdStyles  }/>;

    //If there is no updatePinState function, then the web part does not use it so ignore this code.
    if ( updatePinState ) {
      if ( fpsPinMenu.forcePinState !== true && pinState === 'normal' ) {
        farBannerElementsArray.push( <Icon title={ 'Pin to top' } iconName='Pinned' 
          onClick={ () => this.setPinArrowFunction( fpsPinMenu, updatePinState, 'pinFull', displayMode ) } style={ pimMeCmdStyles }/> );

      } else if ( pinState === 'pinFull' ) {
        farBannerElementsArray.push( <Icon  title={ 'Minimize' } iconName='CollapseMenu' 
          onClick={ () => this.setPinArrowFunction(fpsPinMenu, updatePinState, 'pinMini', displayMode) } style={ pimMeCmdStyles  }/> );
        if ( fpsPinMenu.forcePinState !== true ) farBannerElementsArray.push( PinDefault );

      } else if ( pinState === 'pinMini' ) {
        farBannerElementsArray.push( <Icon  title={ 'Expand' } iconName='DoubleChevronDown' 
          onClick={ () => this.setPinArrowFunction(fpsPinMenu, updatePinState, 'pinMini', displayMode) } style={ pimMeCmdStyles  }/> );

        if ( fpsPinMenu.forcePinState !== true ) farBannerElementsArray.push( PinDefault );
      }
    }

    return farBannerElementsArray;

  }

  private setPinArrowFunction( fpsPinMenu: IFPSPinMenu, updatePinState: any, pinState: IPinMeState, displayMode: DisplayMode,  ): void {
    if ( consoleFunctions === true ) console.log(`FetchBannerX ~ ${pinState}`);
    FPSPinMe( fpsPinMenu.domElement, pinState, null,  false, true, null as any, fpsPinMenu.pageLayout, displayMode );
    if ( updatePinState ) updatePinState( pinState );
  }

}
