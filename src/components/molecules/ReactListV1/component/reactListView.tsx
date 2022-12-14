
import * as React from 'react';
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import { Pivot, PivotItem,} from 'office-ui-fabric-react/lib/Pivot';

import ReactJson from "react-json-view";

import { getMaxRichHeightNum } from '../functions/richHeight';

import { ListView, SelectionMode, IGrouping, } from "@pnp/spfx-controls-react/lib/ListView";

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';


import PageArrows from '../../Arrows/PageArrows';

import { IReactListItemsProps } from './IReactListItemsProps';
import { IReactListItemsState } from './IReactListItemsState';

import { replaceHandleBarsValues } from '../../../../logic/Strings/handleBarsSub';
import { IDrillItemInfo } from '../../../interfaces/Drilldown/IDrillItem';

import { IQuickButton } from '../../../interfaces/QuickCommands/IQuickCommands';

import { IViewFieldDD } from '../interfaces/IViewFieldDD';
import { buildConfirmDialogBig, IMyBigDialogProps } from '../../../atoms/Elements/confirmDialogBig';
import { IContentsToggles, makeToggles } from '../atoms/toggleFieldBuilder';
import { autoDetailsList } from '../atoms/detailsList';
import { findParentElementPropLikeThis } from '../../../../logic/DOM/Search/domSearch';
import { updateReactListItem } from '../functions/updateReactListItem';
import { doesObjectExistInArray } from '../../../../logic/Arrays/searching/objectfind';

import { createPanelButtonsV2 } from '../atoms/createPanelButtonsV2';
import { createPanelAttachmentElements } from '../../../../pnpjs/Attachments/fetchAttachments';

require('@mikezimm/fps-styles/dist/reactListView.css');

export default class ReactListItems extends React.Component<IReactListItemsProps, IReactListItemsState> {

  private _componentWidth: number = null;

    /**
     * createPanelAttachments is identical on ActionNews and Drilldown7 except panelItem interface
     * @param thisId 
     * @param panelItem 
     */

    private async _createPanelAttachments( thisId: any, panelItem: IDrillItemInfo ): Promise<void>{

      const attachments = await createPanelAttachmentElements( this.props.webUrl, this.props.listTitle, panelItem );
      this.setState({ 
        panelAttachments: attachments,
        lastAttachId: thisId,
      });

    }

    private delim = '|||';


    private handleExpandedFieldInfoToIViewFields( viewFields?: IViewFieldDD[] ) {
        //Before this line was added, I think it was mutating props causing double render
        viewFields = JSON.parse(JSON.stringify( viewFields ));
        viewFields.map( vf => {
            //2022-03-18:  MEMO TO SELF... SOMETHING SEEMS OFF about this replace...
            vf.name = vf.name.replace(/\//g,'');
        });

        return viewFields;

    }  

    private createBlankDialog() {

        let myDialog: IMyBigDialogProps = {
            title: '',
            dialogMessage: '',
            showDialog: false,
            confirmButton: '',
            _confirmDialog: this._confirmUpdateDialog.bind(this),
            _closeDialog: this._closeDialog.bind(this),
        };

        return myDialog;

    }


    /***
 *          .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
 *         d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
 *         8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
 *         8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
 *         Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
 *          `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
 *                                                                                                       
 *                                                                                                       
 */ 

     private _ListViewFontSizes: any[] = [ `default-font-size`, `larger-font-size`, `large-font-size` ];

    constructor(props: IReactListItemsProps) {
        super(props);
        console.log( 'listView PROPS: ', this.props, );

        let viewFields : IViewFieldDD[] = [];
        if ( this.props.viewFields.length > 0 ) { 
            viewFields = this.handleExpandedFieldInfoToIViewFields( this.props.viewFields );
        }

        let groupByFields : IGrouping[] = [];
        if ( this.props.groupByFields && this.props.groupByFields.length > 0 ) { 
            //Added this reparse to prevent mutating props
            groupByFields = JSON.parse(JSON.stringify( this.props.groupByFields ));
            groupByFields.map( gF => {  gF.name = gF.name.replace(/\//g,'') ;  });
        }

        const richHeightNum = getMaxRichHeightNum( this.props.autoRichHeight, this.props.richHeights[0], this.props.items );

        this.state = {
          fontSize: this._ListViewFontSizes[0] ,  //=>> address:  https://github.com/mikezimm/drilldown7/issues/169
          maxChars: this.props.maxChars ? this.props.maxChars : 50,
          viewFields: viewFields,
          groupByFields:  groupByFields,
          showPanel: false,
          showAttach: false,
          panelId: null,
          lastPanelId: null,
          panelItem: null,
          panelAttachments: [],
          lastAttachId: null,
          clickedAttach: false,
          myDialog: this.createBlankDialog(),
          pickedCommand: null,
          panelWidth: PanelType.medium,
          richHeightNum: richHeightNum,
          richHeightStr: `${richHeightNum}em`,
          firstVisible: 0,
          lastVisible: this.props.itemsPerPage - 1,

          commandResult: null,
          commandError: false,
        };
    }
        
    public componentDidMount() {
        //this._getListItems();
    }


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

    public componentDidUpdate(prevProps: IReactListItemsProps, prevState: IReactListItemsState): void {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        let redraw = false;
        let updateViewFields = false;
        let resetArrows = false;

        if ( JSON.stringify(prevProps.viewFields) !== JSON.stringify(this.props.viewFields )) {
            updateViewFields = true;
            redraw = true;
        }

        if ( JSON.stringify(prevProps.groupByFields) !== JSON.stringify(this.props.groupByFields )) {
            updateViewFields = true;
            redraw = true;
        }

        if ( prevProps.resetArrows !== this.props.resetArrows ) {
            // updateViewFields = true;
            resetArrows = true;
            this.setState({
              firstVisible: 0,
              lastVisible: this.props.itemsPerPage - 1,
            });
        }

        if ( prevProps.richHeights.join('') !== this.props.richHeights.join('') ) { 
          updateViewFields = true;
          redraw = true;
        }

        // if ( prevProps.items.length !== this.props.items.length ) { 
        //   this._setMaxRichHeight( this.props.autoRichHeight, this.props.richHeight, this.props.items ); 
        //   redraw = true; }
        if ( prevProps.listUrl !== this.props.listUrl ) { redraw = true; }


        /* eslint-enable @typescript-eslint/no-unused-vars */

        this._updateStateOnPropsChange( updateViewFields );
    }

/***
 *         d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *         88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *         88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *         88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *         88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *         88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                          
 *                                                          
 */

    public render(): React.ReactElement<IReactListItemsProps> {

        //console.log( 'ReactListItems props & state: ', this.props, this.state );

        // let thisLog = null;

        let showRichHeightButton: any = false;

        //2022-02-01:  Updated this from drilldown7
        if (this.props.items === null || this.props.items.length === 0) {

             return (
                <div className={'' }>
                    List View has NO Items to show
                </div>
                );

        } else {

            let attachments = this.state.panelAttachments.length > 0 ? this.state.panelAttachments : null ;

            let dialog = !this.state.myDialog.showDialog ? null : buildConfirmDialogBig( this.state.myDialog );

            const { quickCommands,  } = this.props;
            const { commandError, commandResult } = this.state;

            /***
             *    d888888b  .d88b.   d888b   d888b  db      d88888b .d8888. 
             *    `~~88~~' .8P  Y8. 88' Y8b 88' Y8b 88      88'     88'  YP 
             *       88    88    88 88      88      88      88ooooo `8bo.   
             *       88    88    88 88  ooo 88  ooo 88      88~~~~~   `Y8b. 
             *       88    `8b  d8' 88. ~8~ 88. ~8~ 88booo. 88.     db   8D 
             *       YP     `Y88P'   Y888P   Y888P  Y88888P Y88888P `8888Y' 
             *                                                              
             *                                                              
             */

            let toggles = !this.state.showPanel ? null : <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles( )) } </div>;

            const itemLink: any = <div style={{ cursor: 'pointer', fontSize: 'larger', 'fontWeight': 600, color: 'darkblue', padding: '10px 10px 10px 0px', margin: '20px 0px' }} 
              onClick={ () => { window.open( this.state.panelItem.goToPropsLink, '_blank' ) ; }}>Click to open item</div>;

            let fullPanel = null;
            if ( this.state.showPanel === true && this.state.panelId ) {
                fullPanel = <Panel
                    isOpen={this.state.showPanel}
                    type={ this.state.panelWidth }
                    onDismiss={this._onClosePanel}
                    headerText={ this.state.panelId.toString() }
                    closeButtonAriaLabel="Close"
                    onRenderFooterContent={this._onRenderFooterContent}
                    isLightDismiss={ true }
                    isFooterAtBottom={ true }
                >
                    { toggles }
                    <Pivot 
                        aria-label="Basic Pivot Example"
                        defaultSelectedIndex ={ 0 }
                        style={{ paddingTop: '16px'}}
                    >
                      <PivotItem headerText="Commands" itemKey= "Commands"><div>
                          {/* https://github.com/mikezimm/drilldown7/issues/168 */}
                          { itemLink }
                          <div id='20pxSpacer' style={{ height: '20px'}}/>
                          { attachments }
                          {/* { createPanelButtonsV1( this.props.quickCommands, this.state.panelItem, this.props.sourceUserInfo, this._panelButtonClicked.bind(this), this.delim ) } */}
                          { createPanelButtonsV2( this.props.quickCommands, this.state.panelItem, this.props.sourceUserInfo, this._panelButtonClickedv2.bind(this), this.delim ) }
                          {/* { <Icon iconName= { 'Add' } style={ defaultBannerCommandStyles }/> } */}
                        </div>
                      </PivotItem>
                      <PivotItem headerText="Details" itemKey= "Details">
                        {/* https://github.com/mikezimm/drilldown7/issues/168 */}
                        { itemLink }
                        { autoDetailsList(this.state.panelItem, ["Title","refiners"],["search","meta","searchString"],true) }
                      </PivotItem>
                      <PivotItem headerText="JSON" itemKey= "JSON"><div id="CommandsJSONPanel" style={{paddingTop: '20px'}}>
                          {/* https://github.com/mikezimm/drilldown7/issues/168 */}
                          { itemLink }
                          <ReactJson src={ this.state.panelItem } name={ 'panelItem' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '20px 0px' }}/>
                        </div>
                      </PivotItem>
                    </Pivot>

                </Panel>;
            }

            /**
             * 2022-02-01:  This was copied/updated from drilldown7 to actionnews
             */
            let attachPanel = null;
            if ( this.state.showAttach === true && this.state.panelId ) {
                attachPanel = <Panel
                    isOpen={this.state.showAttach}
                    type={ this.state.panelWidth }
                    onDismiss={this._onClosePanel}
                    headerText={ this.state.panelId.toString() }
                    closeButtonAriaLabel="Close"
                    onRenderFooterContent={this._onRenderFooterContent}
                    isLightDismiss={ true }
                    isFooterAtBottom={ true }
                >
                    { attachments }
                </Panel>;
            }

            let viewFieldsBase: IViewFieldDD[] = this.state.viewFields;
            let attachField: IViewFieldDD[] = [];
            if ( this.props.includeAttach ) {
                //Add attachments column:
                let callBack = this.props.includeDetails ? null : this._onShowPanel.bind(this);

                attachField.push({
                    name: 'Attachments',
                    displayName: 'Attach',
                    sorting: true,
                    minWidth: 25,
                    maxWidth: 35,
                    render: (item: IDrillItemInfo) => {
                        let cursor = item.Attachments ? "pointer" : '';
                        return <div id= { 'ButtonID' + item.Id } onClick={ callBack } style={{ fontSize: 'larger' , fontWeight: 'bolder', width: '25px', textAlign: 'center', cursor: cursor }}><Icon iconName= { item.Attachments ? "Attach" : ''}/></div>;
                    },
                });
            }

            let viewFields = attachField.concat( viewFieldsBase );

            let filtered : IDrillItemInfo[]= [];
            this.props.items.map( ( item, idx ) => {
              if ( idx >= this.state.firstVisible && idx <= this.state.lastVisible ) {
                filtered.push( item );
              }
            });

            const pageArrows = <PageArrows 
              itemCount={ this.props.items.length }
              itemsPerPage={ this.props.itemsPerPage }
              setParentStateFirstLast={ this._updateFirstLastVisible.bind(this) }
              debugMode = { this.props.debugMode }
              fontSize = { this._componentWidth && this._componentWidth > 800 ? 28 : 24 }
              resetArrows = { this.props.resetArrows }
              pageArrowStyles = {{ marginTop: '-7px' }}
            />;

            viewFields.map ( field => {
              //This is for:  https://github.com/mikezimm/drilldown7/issues/224
              if ( this.props.richColumns.indexOf( field.name ) > -1 ) {
                showRichHeightButton = true;
                const fieldStyles = [ `list-view-rt` ];
                // fieldStyles.push( this._RichTextRowHeight[ this.state.richHeight ] );
                field.render =  ( item: { [x: string]: any; }, index: any ) => { return <div style={{ maxHeight: this.state.richHeightStr }} className={ fieldStyles.join(' ') } dangerouslySetInnerHTML={{__html: item[ field.name ]}} /> }
                // field.render =  ( item, index ) => { this._renderRich( item, field.name ) }

              } else if ( field.linkSubstitute || field.textSubstitute ) {
                // Testing to see if Url value is valid... has a value, is a string, and either starts with http or /sites/

                // Testing to see if Url value is valid... has a value, is a string, and either starts with http or /sites/
                const isValidSubLink = typeof field.linkSubstitute === "string" &&
                  ( field.linkSubstitute.indexOf("/sites/") === 0 || field.linkSubstitute.indexOf("http") === 0 ) ? true : false;

                // Testing to see if Url value is valid... has a value, is a string, and either starts with http or /sites/
                const isValidText = typeof field.textSubstitute === "string" ? true : false;

                if ( isValidSubLink !== true && isValidText !== true ) {
                  return;

                } else {

                  // Start on https://github.com/mikezimm/drilldown7/issues/70, https://github.com/mikezimm/drilldown7/issues/268
                  field.render = ( item: { [x: string]: any; }, index: any ) => { 
                    const linkSubstitute = isValidSubLink === true ? replaceHandleBarsValues( item, field.linkSubstitute, true ) : '';
                    const textSubstitute = isValidText === true ? replaceHandleBarsValues( item, field.textSubstitute, field.showEmptyAsEmpty === true ? true : false ) : item[field.name];

                    // Return element as a link if the Url passes simple validation.  Else just return the displayed value as normal span
                    if ( isValidSubLink === true && linkSubstitute ) {
                      return <a href={ linkSubstitute }>{ textSubstitute }</a>;

                    } else {
                      return <span >{ textSubstitute }</span>;
                    }


                  } //  close:  field.render = ( item, index ) => { 
                } //    close   if ( isValid === true ) {
              } //      close: } else if ( field.linkSubstitute ) {
            }); //      close:  viewFields.map ( field => {

            //=>> address:  https://github.com/mikezimm/drilldown7/issues/270
            const changeRichHeight = showRichHeightButton !== true ? null : 
                <div title={ `Change row height from ${this.state.richHeightStr}`} onClick={ this._updateRichHeightState.bind(this) } 
                  style={{ fontSize: 'larger' , fontWeight: 'bolder', width: '25px', textAlign: 'center', cursor: 'pointer' }}>
                  <Icon iconName= 'CollapseMenu'/></div>;

            // determine iconFieldName https://github.com/mikezimm/drilldown7/issues/163
            const iconFieldName = this.props.isLibrary === true ? 'FileRef' : undefined;
            //=>> address:  https://github.com/mikezimm/drilldown7/issues/169
            const changeFont = <div title="Change font size" onClick={ this._changeFontSize.bind(this) } style={{ fontSize: 'larger' , fontWeight: 'bolder', width: '25px', textAlign: 'center', cursor: 'pointer' }}><Icon iconName= 'FontSize'/></div>;
            let listView = <div className={ this.state.fontSize }>
            <ListView
                items={ filtered }
                viewFields={ viewFields }
                // className={ 'font-size-14' }
                // listClassName={ stylesL.fontSizeLarger }
                compact={true}
                selectionMode={ this.props.includeDetails ? SelectionMode.single : SelectionMode.none }
                selection={this._onShowPanel.bind(this)}
                showFilter={false}
                iconFieldName={ iconFieldName }
                //defaultFilter="John"
                filterPlaceHolder="Search..."
                groupByFields={ this.props.groupByFields } 
            /></div>;

            //        let logTable = itemRows === null ? <div>Nothing to show</div> : <table style={{ display: 'block'}} className={stylesInfo.infoTable}>

            let barText = this.props.blueBar && this.props.blueBar != null ? this.props.blueBar : <span>Items</span>;  // eslint-disable-line eqeqeq

            let webTitle = null;
            let listLink = !this.props.includeListLink ? null : <div className={ `info-heading` } onClick={ this._onGoToList.bind(this) } 
                style={{ marginRight: 30, whiteSpace: 'nowrap', paddingTop: 0, cursor: 'pointer', fontSize: 'smaller',background: 'transparent' }}>
                    <span style={{ background: 'transparent' }} className={ `list-link` }>Go to list</span></div>;

            let createItemLink = !this.props.createItemLink ? null : <div title="Create new item" className={ `info-heading` } onClick={ this._CreateNewItem.bind(this) } 
            style={{ marginRight: 30, whiteSpace: 'nowrap', paddingTop: 0, cursor: 'pointer', fontSize: 'larger',background: 'transparent' }}>
                <span style={{ background: 'transparent' }} className={ `list-link` }><Icon iconName="AddTo"/></span></div>;

            // https://github.com/mikezimm/drilldown7/issues/249
            let maxBlueBarLeft = createItemLink ? 35 : 40;
            if ( !listLink ) maxBlueBarLeft += 15;

            if ( barText !== null ) {
                webTitle =<div  style={{ display: 'flex', justifyContent: 'space-between', }} className={ [`info-heading`, `inner-shadow`, `fps-list-header-bar`, this.props.themeClass ].join(' ') }>
                  {/* https://github.com/mikezimm/drilldown7/issues/249 */}
                  <span className={ `blue-bar-left` } style={{ maxWidth: `${maxBlueBarLeft}%`}} title={ this.props.blueBarTitleText }>( { this.props.items.length }  ) { barText }</span>
                   { pageArrows }
                   {/* //=>> address:  https://github.com/mikezimm/drilldown7/issues/169 */}
                   <span style={{ gridRow: 'nowrap', display: 'inline-flex', gridGap: '.75em', marginRight: '25px' }}>
                      { changeFont }
                      { changeRichHeight }
                   </span>
                   <span style={{ whiteSpace: 'nowrap', display: 'flex', marginRight: '25px' }}>
                      { createItemLink }
                      { listLink }
                    </span>
                  </div>;

              /**
               * Brought this in directly from Drilldown web part
               * added quickCommands && due to testing on spfx-v2-tester
               */
              const createFooter = quickCommands && quickCommands.successBanner > 0 ? true : false; //CommandItemNotUpdatedMessage
              const footerEleClasses = ['quickCommandFooterStyles', commandResult ? 'quickCommandShow' : 'quickCommandHide' ];

              if ( !commandResult ) { 
                //Do nothing if no result
               } else if (commandResult.status === 'Success') { 

               } else if (commandResult.status === 'Unknown') {
                  footerEleClasses.push('quickCommandWarn');

              } else {
                  footerEleClasses.push('quickCommandError');
              }

              const footerInfo = !commandResult ? '' : 
              commandResult.statusElement ? commandResult.statusElement : 
              commandResult.errorInfo ? commandResult.errorInfo.returnMess : '' 

              /**
               * NOTE:  You ALWAYS need a footer element if it's active, even if there is nothing to show.
               * If not, then you do not get the smooth transitions when it is visible.
               */
              const footerElement = createFooter === false ? null : <div className={ footerEleClasses.join(' ') }>
                  { footerInfo }
              </div>;

              /*stylesL.reactListView*/
              return (
                <div className={ '' } 
                  ref={el => {
                    // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
                    if (!el) return;
                    this._componentWidth = el.getBoundingClientRect().width ; 
                    // console.log('componentWidth', this._componentWidth ) ;
                  } }
                  >
                    <div style={{ paddingTop: 10}} className={ `info-pane-tight` }>
                      { webTitle }
                      { fullPanel }
                      { attachPanel }
                      { dialog }
                      { footerElement }
                      { listView }
                    </div>
                </div>
                );
              }

        } //if ( this.props.items != null && this.props.items.length > 0 ) {    
    } // Render



    /***
 *         db    db d8888b. d8888b.  .d8b.  d888888b d88888b      .d8888. d888888b  .d8b.  d888888b d88888b 
 *         88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'          88'  YP `~~88~~' d8' `8b `~~88~~' 88'     
 *         88    88 88oodD' 88   88 88ooo88    88    88ooooo      `8bo.      88    88ooo88    88    88ooooo 
 *         88    88 88~~~   88   88 88~~~88    88    88~~~~~        `Y8b.    88    88~~~88    88    88~~~~~ 
 *         88b  d88 88      88  .8D 88   88    88    88.          db   8D    88    88   88    88    88.     
 *         ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P      `8888Y'    YP    YP   YP    YP    Y88888P 
 *                                                                                                          
 *                                                                                                          
 */

    private _updateRichHeightState(): void {

      const oldValue = this.state.richHeightNum;
      const oldIdx = this.props.richHeights.indexOf( oldValue );
      const nextIdx = oldIdx === this.props.richHeights.length -1 ? 0 : oldIdx + 1;
      const richHeightNum = this.props.richHeights[ nextIdx ];

      this.setState({ richHeightNum: richHeightNum, richHeightStr: `${richHeightNum}em` });
    }


    private _onGoToList = () : void => {

        if ( !this.props.listUrl || this.props.listUrl === null || this.props.listUrl === undefined || this.props.listUrl.length === 0 ) {
            return; // Do nothing
        }
        let e: any = event;
        let isAltClick = e.altKey;
        let isShfitClick = e.shiftKey;
        let isCtrlClick = e.ctrlKey;
        
        console.log('AltClick, ShfitClick, CtrlClick:', isAltClick, isShfitClick, isCtrlClick );

        window.open( `${this.props.listUrl}?Source=${window.location.pathname}`, "_blank");

    }

    private _CreateNewItem = () : void => {

      if ( this.props.isLibrary === true ) {
        window.open( `${this.props.listUrl}`, "_blank");

      } else {
        window.open( `${this.props.listUrl}/NewForm.aspx?Source=${window.location.pathname}&${window.location.search}`, "_blank");

      }


    }

    private _updateStateOnPropsChange( pushViewFieldsToState : boolean ): void {

        let viewFields : IViewFieldDD[] = [];

        if ( this.props.viewFields.length > 0 ) { 
            viewFields = this.handleExpandedFieldInfoToIViewFields( this.props.viewFields );
        }
   
        let groupByFields : IGrouping[] = [];
        if ( this.props.groupByFields && this.props.groupByFields.length > 0 ) { 
            groupByFields = JSON.parse(JSON.stringify( this.props.groupByFields ));
            groupByFields.map( gF => {  gF.name = gF.name.replace(/\//g,'') ;  });
        }

        if ( pushViewFieldsToState === true ) {
            this.setState({
                viewFields: viewFields,
                groupByFields: groupByFields,

            });
        }
    }

/***
 *    d8888b. db    db d888888b d888888b  .d88b.  d8b   db       .o88b. db      d888888b  .o88b. db   dD 
 *    88  `8D 88    88 `~~88~~' `~~88~~' .8P  Y8. 888o  88      d8P  Y8 88        `88'   d8P  Y8 88 ,8P' 
 *    88oooY' 88    88    88       88    88    88 88V8o 88      8P      88         88    8P      88,8P   
 *    88~~~b. 88    88    88       88    88    88 88 V8o88      8b      88         88    8b      88`8b   
 *    88   8D 88b  d88    88       88    `8b  d8' 88  V888      Y8b  d8 88booo.   .88.   Y8b  d8 88 `88. 
 *    Y8888P' ~Y8888P'    YP       YP     `Y88P'  VP   V8P       `Y88P' Y88888P Y888888P  `Y88P' YP   YD 
 *                                                                                                       
 *                                                                                                       
 */

    private async _panelButtonClickedv2 ( b: any, item: any ): Promise<void> {

      console.log( '_panelButtonClickedv2', item );

      if ( !item ) { 

          alert('Whoops! Can not find ID of _panelButtonClicked!');
          return null;

      } else {

        try {
          await this.startThisQuickUpdate2( b, item );
        } catch (ev) {
          console.log('_panelButtonClicked error:', ev );
        }
      }
  }

    /**
     * Open the dialog
     */
    //private _confirmUpdateDialog = () => {
    private async _confirmUpdateDialog (item: any): Promise<void> {

        let e: any = event; // eslint-disable-line @typescript-eslint/no-unused-vars

        let thisButtonObject : IQuickButton = this.state.pickedCommand ;
        await this.completeThisQuickUpdate( this.state.panelId.toString(), thisButtonObject );

        this.setState({
            myDialog: this.createBlankDialog(),
        });

    }

    //=>> address:  https://github.com/mikezimm/drilldown7/issues/169
    private _changeFontSize() {

      const oldValue = this.state.fontSize;
      const oldIdx = this._ListViewFontSizes.indexOf( oldValue );
      const nextIdx = oldIdx === this._ListViewFontSizes.length -1 ? 0 : oldIdx + 1;

      this.setState({ fontSize: this._ListViewFontSizes[ nextIdx ] });
    }

    private async startThisQuickUpdate2 ( thisButtonObject: any, item: any ): Promise<void>{

      const itemId = item.Id;

      if ( !thisButtonObject ) {
          alert('_panelButtonClicked - can not find thisButtonObject - ' + itemId );
      } else {

          if ( thisButtonObject.updateItem ) {
              let readyToUpdate = true;
              if ( !this.props.webUrl ) { alert('Missing listWebUrl for quickCommands') ; readyToUpdate = false ; }
              if ( !this.props.listTitle ) { alert('Missing listTitle for quickCommands') ; readyToUpdate = false ; }

              if ( readyToUpdate === true ) {
                  //Attempt to update item:
                  if ( thisButtonObject.confirm && thisButtonObject.confirm.length > 0 ) { 

                      let myDialog: IMyBigDialogProps = this.createBlankDialog();
                      myDialog.title = "Are you sure you want to make this update?";
                      myDialog.dialogMessage = thisButtonObject.confirm + '';
                      myDialog.confirmButton = thisButtonObject.label + '';
                      myDialog.showDialog = true;
                      myDialog.maxWidth = 600;

                      this.setState({
                          pickedCommand: thisButtonObject,
                          myDialog: myDialog as IMyBigDialogProps,
                      });

                  } else {
                      await this.completeThisQuickUpdate ( itemId, thisButtonObject );

                  }



              } else {
                  //Don't update item:
              }
          }

          if ( thisButtonObject.panelMessage ) {
              this.setState({
                  panelMessage: thisButtonObject.panelMessage,
              });
          }
      }

  }


    private async completeThisQuickUpdate( itemId: string, thisButtonObject : IQuickButton ): Promise<void> {

        const result = await updateReactListItem( this.props.webUrl, this.props.listTitle, parseInt(itemId), thisButtonObject, this.props.sourceUserInfo, this.state.panelItem );
        //If success (result is error message and null by default )
        // if ( result === null && this.props.quickCommands.onUpdateReload === true ) {

        /**
         * Updated this logic based on returning resultInfo not null for errors:
         * https://github.com/mikezimm/fps-library-v2/issues/20
         */
        if ( this.props.quickCommands.successBanner > 0 && result.status === 'Success') {

            let updates = Object.keys(thisButtonObject.updateItem).map( k => {
                return k;
            });

            result.statusElement = <div style={{ marginTop: '5px'}}> { [
              <h3 key="h3Finished" style={{paddingTop: '10px'}}>Finished updating item [ {itemId} ]</h3>,
              <div  key="bannerIncluding">Including: { updates.join(', ')} </div>
            ] }</div>;

            this.props.quickCommands.refreshCallback( result, false );

        //https://github.com/mikezimm/fps-library-v2/issues/20
        } else if ( result ) {
            this.props.quickCommands.refreshCallback( result, true );
        }

        this.setState({ 
          commandResult: result,
          commandError: result.status === 'Success' ? false : true,
        });

        if ( result ) {
          const delay = result.status !== 'Success' ? 10000 : this.props.quickCommands.successBanner;
          setTimeout(() => {
            this.setState({ 
              commandResult: null,
              commandError: false,
             });
          } , delay);
        }

    }
    /**
     * Close the dialog
     */
    private _closeDialog = () => {
        this.setState({
            myDialog: this.createBlankDialog(),
        });
    }


/***
 *    .d8888. db   db  .d88b.  db   d8b   db      d8888b.  .d8b.  d8b   db d88888b db      
 *    88'  YP 88   88 .8P  Y8. 88   I8I   88      88  `8D d8' `8b 888o  88 88'     88      
 *    `8bo.   88ooo88 88    88 88   I8I   88      88oodD' 88ooo88 88V8o 88 88ooooo 88      
 *      `Y8b. 88~~~88 88    88 Y8   I8I   88      88~~~   88~~~88 88 V8o88 88~~~~~ 88      
 *    db   8D 88   88 `8b  d8' `8b d8'8b d8'      88      88   88 88  V888 88.     88booo. 
 *    `8888Y' YP   YP  `Y88P'   `8b8' `8d8'       88      YP   YP VP   V8P Y88888P Y88888P 
 *                                                                                         
 *                                                                                         
 */

    private async _onShowPanel (item: any) {
  
        let e: any = event;
        // console.log('_onShowPanel: e',e);
        // console.log('_onShowPanel item clicked:',item);

        let isLink = e && e.srcElement && e.srcElement.href && e.srcElement.href.length > 0 ? true : false;

        /**
         * Added to solve https://github.com/mikezimm/drilldown7/issues/159 
         *  on /sites/ChinaSustainabilitySteeringCommittee/SitePages/Climate-Articles.aspx
         * Have never seen this error before.  Tried same exact config to same list on another site and do not get the error.
         * 
         */
        if ( e === undefined ) {
            return;

        } else if ( isLink === true ) {
            window.open(e.srcElement.href, '_blank');

        } else {

            let clickedAttachIcon = e?.target?.dataset?.iconName === 'Attach' ? true : false;

            if (clickedAttachIcon === true || item.length > 0 ) {
                let thisID = clickedAttachIcon === true ? findParentElementPropLikeThis(e.target, 'id', 'ButtonID', 5, 'begins') : item[0].Id;
                thisID = typeof thisID === 'string' ? thisID.replace('ButtonID','') : thisID;

                let panelItem  : IDrillItemInfo = this._getItemFromId(this.props.items, 'Id', thisID );
                let lastPanelId = this.state.panelId;

                let clickedAttach = false;
                if ( e.srcElement.dataset && e.srcElement.dataset.iconName === 'Attach' ) {
                    clickedAttach = true;
                }

                await this._createPanelAttachments(thisID, panelItem );

                let canShowAPanel = thisID === null || thisID === undefined || panelItem === null ? false : true;
                let showFullPanel = canShowAPanel === true && clickedAttach !== true ? true : false;
                // 2020-10-13:  The last check in this row just didn't seem right... was && this.props.includeListLink === true ? true : false; 
                let showAttachPanel = canShowAPanel === true && clickedAttach === true && this.props.includeAttach === true ? true : false; 

                this.setState({ 
                    showPanel: showFullPanel,
                    showAttach: showAttachPanel , 
                    clickedAttach: clickedAttach,
                    panelId: thisID,
                    panelItem: panelItem,
                    lastPanelId: lastPanelId,
                    panelAttachments: this.state.lastAttachId === thisID ? this.state.panelAttachments : [],

                });

            }

        } 

    }

    private _getItemFromId( items: IDrillItemInfo[], key: string, val: any ) {
        let panelItem : IDrillItemInfo =  null;
        let showIndex: any | false = doesObjectExistInArray(this.props.items, key, val, false);
        if (showIndex !== false ) {
            panelItem = this.props.items[showIndex];
            // console.log('showPanelPropsItem', panelItem );
        }
        return panelItem;

    }

    private _onClosePanel = (): void => {
        this.setState({ 
            showPanel: false,
            showAttach: false , 
            clickedAttach: false,
         });
      }


/***
 *    d8888b.  .d8b.  d8b   db d88888b db           d88888b  .d88b.   .d88b.  d888888b d88888b d8888b. 
 *    88  `8D d8' `8b 888o  88 88'     88           88'     .8P  Y8. .8P  Y8. `~~88~~' 88'     88  `8D 
 *    88oodD' 88ooo88 88V8o 88 88ooooo 88           88ooo   88    88 88    88    88    88ooooo 88oobY' 
 *    88~~~   88~~~88 88 V8o88 88~~~~~ 88           88~~~   88    88 88    88    88    88~~~~~ 88`8b   
 *    88      88   88 88  V888 88.     88booo.      88      `8b  d8' `8b  d8'    88    88.     88 `88. 
 *    88      YP   YP VP   V8P Y88888P Y88888P      YP       `Y88P'   `Y88P'     YP    Y88888P 88   YD 
 *                                                                                                     
 *                                                                                                     
 */

      /**
       * This was copied from codepen example code to render a footer with buttons:
       * https://fabricweb.z5.web.core.windows.net/oufr/6.50.2/#/examples/panel
       * 
       */
    private _onRenderFooterContent = (): JSX.Element => {
        return null;

        return (
        <div>
            <PrimaryButton onClick={this._onClosePanel} style={{ marginRight: '8px' }}>
            Save
            </PrimaryButton>
            <DefaultButton onClick={this._onClosePanel}>Cancel</DefaultButton>
        </div>
        );
    }

        
    /***
     *         d888888b  .d88b.   d888b   d888b  db      d88888b .d8888. 
     *         `~~88~~' .8P  Y8. 88' Y8b 88' Y8b 88      88'     88'  YP 
     *            88    88    88 88      88      88      88ooooo `8bo.   
     *            88    88    88 88  ooo 88  ooo 88      88~~~~~   `Y8b. 
     *            88    `8b  d8' 88. ~8~ 88. ~8~ 88booo. 88.     db   8D 
     *            YP     `Y88P'   Y888P   Y888P  Y88888P Y88888P `8888Y' 
     *                                                                   
     *                                                                   
     */

    private getPageToggles( ) {

        let togRefinerCounts = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Panel width</span>,
            key: 'togggleWidth',
            _onChange: this.updatePanelWidth.bind(this),
            checked: this.state.panelWidth === PanelType.medium ? false : true,
            onText: 'Wide',
            offText: 'Medium',
            className: '',
            styles: '',
        };

        let theseToggles = [];

        theseToggles.push( togRefinerCounts ) ;
        
        let pageToggles : IContentsToggles = {
            toggles: theseToggles,
            childGap: 10,
            vertical: false,
            hAlign: 'end',
            vAlign: 'start',
            rootStyle: { width: 100 , paddingTop: 0, paddingRight: 0, }, //This defines the styles on each toggle
        };

        return pageToggles;

    }

    private updatePanelWidth() {
        this.setState({
            panelWidth: this.state.panelWidth === PanelType.medium ? PanelType.large : PanelType.medium,
        });
    }

    private _updateFirstLastVisible( firstVisible: number, lastVisible: number ) {
      this.setState({
        firstVisible: firstVisible,
        lastVisible: lastVisible,
      });
    }

}
