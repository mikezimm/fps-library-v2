import * as React from 'react';
import { Icon, IIconStyles, } from 'office-ui-fabric-react/lib/Icon';

// Min props to use this component... This indicates how many items are in the item page
export interface IPageArrowsParentProps {
  itemsPerPage?: number;  //Number of items to show for paging
  debugMode?: boolean; //Currently used in ALVFM

}

export interface IMinPageArrowsProps {
    itemCount: number;  //Total number of items in the list
    itemsPerPage: number; //Number to show at a time
    debugMode?: boolean;
    setParentStateFirstLast: any; //Function to update parent state's first and list visible
    fontSize?: number; // Defaults to 28px

    //https://github.com/mikezimm/drilldown7/issues/198
    resetArrows?: string;  //unique Id used to reset arrows to starting position

    //https://github.com/mikezimm/drilldown7/issues/250
    pageArrowStyles?: React.CSSProperties;  // Style adjustments to overall component, like marginTop: -10px to center on Drilldown
}

//Parent component state should also extend this state.
export interface IMinPageArrowsState {
  firstVisible: number; //Index of item to start showing ( for paging )
  lastVisible: number; //Index of item to start showing ( for paging )
}



export default class PageArrows extends React.Component<IMinPageArrowsProps, IMinPageArrowsState> {

    private _maxFirst: number = 0;
    private _maxLast: number = 0;

    private _updateMaxFirst() {
       this._maxFirst = this.props.itemsPerPage === 0 ? 0 : Math.floor( this.props.itemCount / this.props.itemsPerPage ) * this.props.itemsPerPage;
    }

    private _updateMaxLast() {
        this._maxLast = this._maxFirst + this.props.itemsPerPage;
    }

    public constructor(props:IMinPageArrowsProps){
        super(props);

        this.state = {
            firstVisible: 0,
            lastVisible: this.props.itemsPerPage - 1,
        };
    }

    public componentDidMount() {
        this._updateMaxFirst();
        this._updateMaxLast();
    }

    public componentDidUpdate(prevProps: IMinPageArrowsProps){

      if ( prevProps.resetArrows !== this.props.resetArrows ) {
        //https://github.com/mikezimm/drilldown7/issues/207
        this._updateMaxFirst();
        this._updateMaxLast();

        this.setState({
          firstVisible: 0,
          lastVisible: this.props.itemsPerPage - 1,
        });

      } else {
        let refresh = false;
        if ( prevProps.itemsPerPage !== this.props.itemsPerPage ) { refresh = true; }
        if ( prevProps.itemCount !== this.props.itemCount ) { refresh = true; }
        if ( prevProps.debugMode !== this.props.debugMode ) { refresh = true; }
  
        if ( refresh === true ) {
            this._updateMaxFirst();
            this._updateMaxLast();
        }
      }
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
      
    public render(): React.ReactElement<IMinPageArrowsProps> {
    
      const arrowSize: string = this.props.fontSize ? `${ this.props.fontSize }px`  : '28px';
      const fontSize: string = this.props.fontSize ? `${ this.props.fontSize - 4 }px`  : '24px';

      const leftActive: boolean = this.state.firstVisible === 0 ? false : true ;
      const rightActive: boolean = this.state.lastVisible === this.props.itemCount -1 ? false : true;
      const leftArrowStyles: IIconStyles = { root: { padding: '5px 10px', fontSize: arrowSize, cursor: leftActive === true ? 'pointer' : 'default', opacity:  leftActive === true ? 1 : .2 }} ;
      const rightArrowStyles: IIconStyles = { root: { padding: '5px 10px', fontSize: arrowSize, cursor: rightActive === true ? 'pointer' : 'default', opacity: rightActive === true ? 1 : .2 }} ;
  
      const bigLeftActive: boolean = this.state.firstVisible === 0 ? false : true ;
      const bigRightActive: boolean = this.state.firstVisible >= this._maxFirst || this.state.lastVisible === this.props.itemCount -1 ? false : true;
      const bigLeftArrowStyles: IIconStyles = { root: { padding: '5px 10px', fontSize: arrowSize, cursor: bigLeftActive === true ? 'pointer' : 'default', opacity:  bigLeftActive === true ? 1 : .2 }} ;
      const bigRightArrowStyles: IIconStyles = { root: { padding: '5px 10px', fontSize: arrowSize, cursor: bigRightActive === true ? 'pointer' : 'default', opacity: bigRightActive === true ? 1 : .2 }} ;
  
      const pageArrowStyles: React.CSSProperties = { ...{ paddingLeft: '30px', display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', alignItems: 'center'}, ...this.props.pageArrowStyles } ;
  
      const maxFirstDebug = this.props.debugMode !== true ? null : <div style={{ paddingLeft: '30px' }}>_maxFirst: { this._maxFirst }</div>;
      const maxLastDebug = this.props.debugMode !== true ? null : <div style={{ paddingLeft: '30px' }}>_maxLast: { this._maxLast }</div>;
  
      const PageArrowsComponent = this.props.itemCount <= this.props.itemsPerPage ? 
      <div>Showing all { this.props.itemCount } items.</div>
      : <div style={ pageArrowStyles }>
          <Icon iconName='DoubleChevronLeftMed' onClick={ this._bigLeftPage.bind(this)} title={ `Jump backward ${ this.props.itemsPerPage * 5 } items` } styles={ bigLeftArrowStyles }/>
          <Icon iconName='ChevronLeftMed' onClick={ this._leftPage.bind(this)} title={ `Show previous ${ this.props.itemsPerPage } items` } styles={ leftArrowStyles }/>
          <span style={{ fontSize: fontSize, textAlign: 'center' }}> <span> { `${this.props.fontSize && this.props.fontSize >= 32 ? 'showing' : ''} items: `}</span>
             <span style={{ whiteSpace: 'nowrap' }}>{ `${this.state.firstVisible + 1 } - ${this.state.lastVisible + 1}` }</span>
          </span>
          <Icon iconName='ChevronRightMed' onClick={ this._rightPage.bind(this)} title={ `Show next ${ this.props.itemsPerPage } items` } styles={ rightArrowStyles }/>
          <Icon iconName='DoubleChevronRight12' onClick={ this._bigRightPage.bind(this)} title={ `Jump forward ${ this.props.itemsPerPage * 5 } items` } styles={ bigRightArrowStyles }/>
          { maxFirstDebug }
          { maxLastDebug }
      </div>;

      return ( PageArrowsComponent );
    }

    private _rightPage() {
        this._updatePage( this.state.firstVisible + this.props.itemsPerPage ) ;

    }

    private _leftPage() {
        this._updatePage( this.state.firstVisible - this.props.itemsPerPage ) ;
    }

    private _bigRightPage() {
        if ( this.state.firstVisible < this._maxFirst ) {
            this._updatePage( this.state.firstVisible + this.props.itemsPerPage * 5 ) ;
        }
    }

    private _bigLeftPage() {
        this._updatePage( this.state.firstVisible - this.props.itemsPerPage * 5 ) ;
    }

    private _updatePage( firstVisible: number ) {

        if ( firstVisible < 0 ) { firstVisible = 0 ; }  //Make sure firstVisible is always at least 0;
        if ( firstVisible > this._maxFirst ) { firstVisible = this._maxFirst ; } //Make sure the firstVisible is never more than the _maxFirst

        let lastVisible = firstVisible + this.props.itemsPerPage - 1; //Must be -1 because the first visible really counts in the total itemsPerPage
        if ( lastVisible > this.props.itemCount -1 ) { lastVisible = this.props.itemCount -1 ; } //Make sure lastVisible is always <= last item index

        if ( firstVisible > lastVisible ) { // Revert the itemsPerPage update since it would be greater than the lastVisible
            firstVisible = firstVisible - this.props.itemsPerPage ;
        }

        this.setState({
            firstVisible: firstVisible,
            lastVisible: lastVisible,
        });

        this.props.setParentStateFirstLast( firstVisible, lastVisible );

    }

}
