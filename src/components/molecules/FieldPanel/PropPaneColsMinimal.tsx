import * as React from 'react';

import { ILoadPerformance, ILoadPerformanceOps, IPerformanceOp, } from "../Performance/IPerformance";
import { startPerformOp, updatePerformanceEnd, createBasePerformanceInit, } from "../Performance/functions";

// import "@pnp/sp/webs";
// import "@pnp/sp/clientside-pages/web";

import { getMainSelectedItems, } from './components/OnClickHelpers';

import { ISelectedInfo, updateSelectedInfo, } from './components/OnClickHelpers';

import { IFieldPanelFetchState, IFieldPanelState, IMinField, } from './components/IFieldPanelHookProps';
import { IMinWPFieldPanelProps, IMinListProps } from "./components/IMinWPFieldPanelProps";

import { MainPane } from './components/main/Pane';
import { fetchErrorPanel, FetchPane } from './components/fetch/Pane';
import { fetchFields } from './components/fetch/funcions';

require('@mikezimm/fps-styles/dist/PropPaneCols.css');

export default class FieldPanelMin extends React.Component< IMinWPFieldPanelProps, IFieldPanelState > {

  private _performance: ILoadPerformance = null;

  /**
   * This updates the private _performance.ops object.
   * @param key 
   * @param phase 
   * @param note 
   * @param count 
   * @returns 
   */
    private _updatePerformance( key: ILoadPerformanceOps, phase: 'start' | 'update', note: string = '', count: number ): void {

      const ops: any = this._performance.ops;
      let thisPart : IPerformanceOp = ops[key];

      if ( phase === 'start' || !thisPart ) {
        thisPart = startPerformOp( `${key} ${ note ? ' - ' + note : '' }`, this.props.displayMode );

    } else if ( phase === 'update' ) {
        thisPart = updatePerformanceEnd( thisPart, true , count );

    }
    const thisOPs: any = this._performance.ops;
    thisOPs[ key] = thisPart;
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

    public constructor( props: IMinWPFieldPanelProps ){
    super(props);

    this._performance = createBasePerformanceInit( this.props.displayMode, false );
    this._performance.ops.superOnInit = startPerformOp( 'superOnInit', this.props.displayMode );

    this.state = {
      status: 'Not started',
      fetched: false,
      searchText: '',
      searchProp: '',
      listFields: [],
      filtered: [],
      selected: [],
      listIdx: this.props.lists.length > 0 ? 0 : null,
      errMessage: '',
      showDesignMode: false,
      fullDesign: false,
      panelItem: null,
    };
  
    this._performance.ops.superOnInit = updatePerformanceEnd( this._performance.ops.superOnInit, true,666 );

  }

  public componentDidUpdate(prevProps: IMinWPFieldPanelProps) : boolean {

    let refresh: boolean = false;

    if ( JSON.stringify( this.props.lists) !== JSON.stringify( prevProps.lists) ) {
      refresh = true;

      this.setState({
        status: 'Not started',
        fetched: false,
        searchText: '',
        searchProp: '',
        listFields: [],
        filtered: [],
        selected: [],
        listIdx: this.props.lists.length > 0 ? 0 : null,
        errMessage: '', 
      });

    }
    return refresh;

  }

  public render(): React.ReactElement<IMinWPFieldPanelProps> {

    const { lists, } = this.props;
    const { status, showDesignMode, errMessage, listIdx, panelItem, searchText } = this.state;

    const fetchPane : JSX.Element = FetchPane( { 
      onClickFetchFields: this._clickFetchFields.bind(this),
      designMode: showDesignMode,
      performance : this._performance,
      status: status,
    } );

    if ( this.state.errMessage ) {
      const result : JSX.Element= fetchErrorPanel( fetchPane, errMessage, lists[ listIdx ].webUrl, lists[ listIdx ].listTitle );
      return ( result );

    } else if ( lists.length === 0 ) {
      return ( <div className={ 'prop-pane-cols' } >
                  <h3>There are no lists to show columns for.</h3>
              </div>);

    } else {


      const MainPanel: JSX.Element = MainPane( this.props, this.state, 
        {
            selectFiltered: this._selectFiltered,
            onFilterClick2: this._onFilterClick2,
            onTextSearch: this._onTextSearch.bind(this),
            toggleDesign: null,
            onSelectItem: this._onSelectItem,
            onTypeClick: this._onTypeClick.bind(this),
          } );

      return (

        <div className={ [ 'prop-pane-cols', 'cols-results' ].join( ' ' ) } >
          { fetchPane }
          { MainPanel }
        </div>
      );

    }

  }

  private async _clickFetchFields( ) : Promise<void> {

    const { lists, } = this.props;
    const list: IMinListProps = lists[this.state.listIdx] ;
    const fetch = true;

    if ( fetch === true ) {
      this._updatePerformance( 'fetch4', 'start', 'fetchFields', null );
      const fetchState: IFieldPanelFetchState = await fetchFields( list );
      this._updatePerformance( 'fetch4', 'update', '', fetchState.filtered.length );

      this.setState( fetchState );
      console.log( 'fetchState: finished!', fetchState );
    }

  }

  private _selectFiltered = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    const { listFields, selected, searchText } = this.state;
    const selectedInfo: ISelectedInfo = updateSelectedInfo( ev, listFields, selected, searchText );
    this.setState( selectedInfo );
  }

  private _onFilterClick2 = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    const target: any = ev.target;
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'
    const fieldtype: string = this.state?.searchText.toLocaleLowerCase() === target.dataset?.fieldtype.toLocaleLowerCase() ? '' : target.dataset.fieldtype;
    this._onSearchChange( fieldtype , '' );
  }

  private _onTypeClick ( field: IMinField ): void {
    const filterType : string = this.state.searchProp ? '' : field.TypeDisplayName;
    this._onSearchChange( '' , filterType );
  }

  private _onSelectItem = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    const newSelected: IMinField [] = getMainSelectedItems( ev, this.state.listFields, this.state.selected );
    this.setState({ selected: newSelected });
  };


  private _onTextSearch ( input: any, text: string = '' ): void {
    const SearchValue : string = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';
    this._onSearchChange( SearchValue , '' );
  }

  private _onSearchChange ( SearchValue: string, property: string = '' ): void {

    const SearchValueLc = SearchValue.toLocaleLowerCase();

    const filtered: IMinField[] = [];

    this.state.listFields.map( ( field: IMinField) => {
      const textFound: number = !SearchValueLc ? 0 : field.searchTextLC.indexOf( SearchValueLc ) ;
      const propertyFound: boolean = !property ? true : field.TypeDisplayName === property;
      if ( textFound > -1 && propertyFound === true ) filtered.push( field );
    });

    const searchText: string = `${SearchValue}${ property ? property : ''}`;
    const showDesignMode: boolean = this.props.designMode !== 'Disabled' ? true : false;
    if ( !SearchValueLc ) {
      this.setState({ filtered: filtered, searchText: searchText, searchProp: property, showDesignMode: showDesignMode });
    } else {
      this.setState({ filtered: filtered, searchText: searchText, searchProp: property, showDesignMode: showDesignMode });
    }
  }

}
