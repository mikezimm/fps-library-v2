
import * as React from 'react';

import WebPartLinks from "../components/WebPartLinks/WebPartLinks";
import { createPerformanceTableVisitor } from '../../components/molecules/Performance/tables';
import { IBannerPages, IWebpartBannerProps } from '../mainReact/IWebpartBannerProps';
import ReactJson from 'react-json-view';
import { MessageBar, MessageBarType, PanelType, Pivot, PivotItem, PivotLinkFormat, PivotLinkSize } from 'office-ui-fabric-react';
import SinglePage from '../components/SingleHelpPage/SinglePage';
import { Icon } from 'office-ui-fabric-react';
import { getHistoryContent } from '../features/WebPartHistory/HistoryContent';
import { IFPSWindow } from '../../common/interfaces/fps/Window';


const HX = '';  //2022-01-31: Added Pivot Tiles

const H0 = 'Why';  //2022-01-31: Added Pivot Tiles
const H1 = 'Getting started';  //Templates
const H2 = 'Basics';  //Templates
const H3 = 'Advanced';  //Templates
const H4 = 'Future';  //Templates
const H5 = 'Dev';  //Templates
const H6 = 'Errors';  //Templates
const H7 = 'Tricks';  //Templates
const H8 = 'About';  //Templates
const H9 = 'Export';  //Templates
const HA = 'History';  //Templates
const HB = 'Health';  //Templates

export const pivotHeadingX = HX;
export const pivotHeading0 = H0;

// Added contentPages to params for https://github.com/mikezimm/fps-library-v2/issues/9
export function getFullPanel (  bannerProps: IWebpartBannerProps, selectedKey: string, panelType: PanelType, _selectedIndex: any, _panelWidth: any, contentPages: IBannerPages ) : JSX.Element {

    const { gitHubRepo, showRepoLinks, replacePanelWarning, replacePanelHTML,  exportProps, webpartHistory } = bannerProps;

    const webPartLinks =  <WebPartLinks 
      parentListURL = { '' } //Get from list item
      childListURL = { '' } //Get from list item

      parentListName = { '' } // Static Name of list (for URL) - used for links and determined by first returned item
      childListName = { '' } // Static Name of list (for URL) - used for links and determined by first returned item

      repoObject = { gitHubRepo }
      showRepoLinks = { showRepoLinks }

    ></WebPartLinks>;

    const thisWindow : IFPSWindow = window as any;
    let content = null;
    let thisPage = null;
    // let showMedical = this.isShowTricks && ( thisWindow.FPSUser || thisWindow.FPSOptions )  ? true : false;
    let showMedical = bannerProps.showTricks === true && ( thisWindow.FPSUser || thisWindow.FPSOptions )  ? true : false;

    const bonusHTML1: any = bannerProps.bonusHTML1 ? bannerProps.bonusHTML1 : null;
    const panelPerformance = bannerProps.panelPerformance ? createPerformanceTableVisitor( bannerProps.panelPerformance, [] ): null;
    const bonusHTML2: any = bannerProps.bonusHTML2 ? bannerProps.bonusHTML2 : null;

    if ( selectedKey === HX ) {
      console.log('Banner component -build content');
      content = <div>
        <div style={{ padding: '10px 20px 20px 20px', background: 'yellow', marginTop: '20px' }}>{ replacePanelWarning }</div>
        <div>{ replacePanelHTML }</div>
        { bonusHTML1 ? <div>{ bonusHTML1 }</div> : null }
        { panelPerformance ? <div>{ panelPerformance }</div> : null }
        { bonusHTML2 ? <div>{ bonusHTML2 }</div> : null }
      </div>;


    } else if ( selectedKey === H1 ) {
        content = contentPages.gettingStartedContent;

    } else if ( selectedKey === H2 ) {
        content= contentPages.basicsContent;

    } else if ( selectedKey === H3 ) {
        content=  contentPages.advancedContent;

    } else if ( selectedKey === H4 ) {
        content=  contentPages.futureContent;

    // } else if ( selectedKey === H5 ) {
    //     content=  this.dev;

    } else if ( selectedKey === H6 ) {
        content=  contentPages.errorsContent;

    } else if ( selectedKey === H7 ) {
        content= contentPages.tricksTable;

    } else if ( selectedKey === H8 ) {
        content= contentPages.aboutTable;

    } else if ( selectedKey === H0 ) {  //2022-01-31: Added Pivot Tiles
        content= contentPages.whyContent;

    } else if ( selectedKey === H9 ) {  //2022-01-31: Added Pivot Tiles
        content= <div id="CommandsJSONPanel" style={{paddingTop: '20px'}}>
          <h3>Summary of Exportable Properties</h3>
          <ReactJson src={ exportProps } name={ 'Export Properties' } collapsed={ false } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '10px 0px' }}/>
          <ReactJson src={ webpartHistory } name={ 'Webpart History' } collapsed={ 2 } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '10px 0px' }}/>
        </div>;

    } else if ( selectedKey === HA ) {  //2022-01-31: Added Pivot Tiles
 
      content= getHistoryContent( bannerProps.webpartHistory );

    } else if ( selectedKey === HB ) {  //2022-01-31: Added Pivot Tiles

      if ( showMedical === true ) {
        let medicalElements : any = [];
        if ( thisWindow.FPSEnviro ) {
          medicalElements.push( <ReactJson src={ thisWindow.FPSEnviro } name={ 'FPSEnviro' } collapsed={ 1 } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ false } style={{ padding: '10px 0px' }}/> );
        }
        if ( thisWindow.FPSUser ) {
          medicalElements.push( <ReactJson src={ thisWindow.FPSUser } name={ 'FPSUser' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ false } style={{ padding: '10px 0px' }}/> );
        }
        if ( thisWindow.FPSOptions ) {
          medicalElements.push( <ReactJson src={ thisWindow.FPSOptions } name={ 'FPSOptions' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ false } style={{ padding: '10px 0px' }}/> );
        }
        content= <div id="MedicalPanel" style={{paddingTop: '20px'}}>
          { medicalElements }
        </div>;
      }
    }

    if ( selectedKey === H9 || selectedKey === HA || selectedKey === HB || selectedKey === HX ) {
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
      { getRandomTip( contentPages.webParTips ) }
    </table>;

    const tips = contentPages.webParTips.length === 0 ? null :
      <MessageBar messageBarType={MessageBarType.warning } >
        <div style={{fontWeight: 600, fontSize: 'large', marginBottom: '12px'}} >Pro TIP:</div> 
        <div style={{minHeight: '30px'}} >{ tipsTable }</div>
      </MessageBar>;

      const wideIcon = bannerProps.wideToggle !== true ? null : <Icon iconName= { panelType === PanelType.medium ? 'MaximumValue' : 'MinimumValue' } style={{ fontSize: 'xx-large', cursor: 'pointer' }} 
        onClick={ _panelWidth.bind(this) }/>;


      const showExport = bannerProps.showExport === true && exportProps !== null ? true : false;
      const showHistory = webpartHistory ? true : false;

    let panelTitle = bannerProps.panelTitle;
    if ( panelTitle && ['hide','ignore','empty'].indexOf( panelTitle.toLowerCase() ) >= 0 ) {
      panelTitle = gitHubRepo.desc;
    }

    const panelContent = <div style={{ paddingBottom: '50px' } }>
      { tips }
      { webPartLinks }
      <div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3> { panelTitle }</h3>
          <div title={ panelType === PanelType.medium ? 'Make panel wider' : 'Make panel narrower' }>
          { wideIcon }
        </div>
      </div>

      <Pivot
          linkFormat={PivotLinkFormat.links}
          linkSize={PivotLinkSize.normal }
          onLinkClick={ _selectedIndex }
      > 
        {/* changed null to undefined :  https://github.com/mikezimm/ALVFinMan/issues/171 */}
        { replacePanelHTML == ''                ? undefined : <PivotItem headerText={HX} ariaLabel={HX} title={HX} itemKey={HX} itemIcon={ 'SunQuestionMark' }/> }

        {/* 2022-12-20:  Updated all these to be !contentPages to resulve this issue:
              https://github.com/mikezimm/fps-library-v2/issues/9
        */}

        { !contentPages.whyContent              ?  undefined : <PivotItem headerText={H0} ariaLabel={H0} title={H0} itemKey={H0} itemIcon={ 'QandA' }/> }

        { !contentPages.gettingStartedContent   ?  undefined : <PivotItem headerText={H1} ariaLabel={H1} title={H1} itemKey={H1} itemIcon={ undefined }/> }
        { !contentPages.basicsContent				    ?  undefined : <PivotItem headerText={H2} ariaLabel={H2} title={H2} itemKey={H2} itemIcon={ undefined }/> }
        { !contentPages.advancedContent			    ?  undefined : <PivotItem headerText={H3} ariaLabel={H3} title={H3} itemKey={H3} itemIcon={ undefined }/> }
        { !contentPages.futureContent		        ?  undefined : <PivotItem headerText={H4} ariaLabel={H4} title={H4} itemKey={H4} itemIcon={ 'RenewalFuture' }/> }
        { !contentPages.errorsContent 				  ?  undefined : <PivotItem headerText={H6} ariaLabel={H6} title={H6} itemKey={H6} itemIcon={ 'Warning12' }/> }

        {/* Dev tab was here */}

        { !bannerProps.showTricks !== true || !contentPages.tricksTable ?  undefined : <PivotItem headerText={ undefined } ariaLabel={H7} title={H7} itemKey={H7} itemIcon={ 'AutoEnhanceOn' }/> }
        { !contentPages.aboutTable ? undefined : <PivotItem headerText={ undefined } ariaLabel={H8} title={H8} itemKey={H8} itemIcon={ 'Info' }/> }
        { showExport !== true ? null : <PivotItem headerText={ undefined } ariaLabel={H9} title={H9} itemKey={H9} itemIcon={ 'Export' }/> }
        { showHistory !== true ? null : <PivotItem headerText={ undefined } ariaLabel={HA} title={HA} itemKey={HA} itemIcon={ 'FullHistory' }/> }
        { showMedical !== true ? null : <PivotItem headerText={ undefined } ariaLabel={HB} title={HB} itemKey={HB} itemIcon={ 'Medical' }/> }
      </Pivot>
      { thisPage }
    </div>;

  return panelContent;

}


/***
 *         dD      d8888b.  .d8b.  d8b   db d8888b.      d888888b d888888b d8888b. 
 *        d8'      88  `8D d8' `8b 888o  88 88  `8D      `~~88~~'   `88'   88  `8D 
 *       d8'       88oobY' 88ooo88 88V8o 88 88   88         88       88    88oodD' 
 *      d8'        88`8b   88~~~88 88 V8o88 88   88         88       88    88~~~   
 *     d8'         88 `88. 88   88 88  V888 88  .8D         88      .88.   88      
 *    C8'          88   YD YP   YP VP   V8P Y8888D'         YP    Y888888P 88      
 *                                                                                 
 *                                                                                 
 */

function getRandomTip( webParTipsX: any[] ) {

  return webParTipsX[Math.floor(Math.random() * webParTipsX.length)];

}
