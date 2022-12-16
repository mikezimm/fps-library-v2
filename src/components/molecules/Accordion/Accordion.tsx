import * as React from 'react';
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

export type IAnimation = 'TopDown' | 'CenterExpand';

export interface IMinAccordionProps {
    title: any; //Text or element
    content: any; //JSX.Element
    showAccordion?: boolean; //Defaults to false
    animation?: IAnimation; //Defaults to top-down

    componentStyles?: React.CSSProperties; //This is where you can set paddingBottom for entire component
    defaultIcon?: string; //Defaults to 
    titleStyles?: React.CSSProperties;
    contentStyles?: React.CSSProperties; //This is where to set the height

    toggleCallback?: any; //Can be used by caller to know the current state and make adjustments.  Sends current state back.
}

export interface IMinAccordionState {
    showAccordion: boolean;
}

require('@mikezimm/fps-styles/dist/AccordionStyles.css');

export default class Accordion extends React.Component<IMinAccordionProps, IMinAccordionState> {

    public constructor(props:IMinAccordionProps){
        super(props);

        this.state = {
            showAccordion: this.props.showAccordion !== undefined ? this.props.showAccordion : false,
        };
    }

    public componentDidMount() {
    }

    public componentDidUpdate(prevProps: IMinAccordionProps){

        let refresh = false;
        if ( prevProps.showAccordion !== this.props.showAccordion ) { refresh = true; }
        if ( refresh === true ) {
        }

    }

    public render(): React.ReactElement<IMinAccordionProps> {

        const { defaultIcon } = this.props;
        const { showAccordion, } = this.state;

        let accordionClassName = '';

        switch ( this.props.animation ) {

            case 'CenterExpand':
                accordionClassName = showAccordion === true ? 'show-fps-accordion-2' : 'hide-fps-accordion-2';
                break;

            case 'TopDown':
                accordionClassName = showAccordion === true ? 'show-fps-accordion-1' : 'hide-fps-accordion-1';
                break;

            default: 
                accordionClassName = showAccordion === true ? 'show-fps-accordion-1' : 'hide-fps-accordion-1';

        }
        const ExpandIconName = defaultIcon ? defaultIcon : 'ChevronDownSmall' ;

        const AccordionIcon = <Icon style={{ paddingLeft: '20px'}} iconName={ showAccordion === true ? 'ChevronUpSmall' : ExpandIconName }/>;

        const TitleClassNames = [ 'fps-accordion-title-flex', typeof this.props.title === 'string' ? 'fps-accordion-title' : null ].join(' ');

        const contentStylesWhenVisible = this.props.contentStyles ? this.props.contentStyles : { height: '100px' };
        const contentStyles = showAccordion === true ? contentStylesWhenVisible : undefined ;

        const AccordionComponent = <div style={ this.props.componentStyles }>

          <div className={ TitleClassNames } style={ this.props.titleStyles }
            onClick={ this._toggleAccordion.bind( this ) }>{ this.props.title } { AccordionIcon }</div>

          <div className={ [ 'fps-accordion', accordionClassName ].join(' ')} style={ contentStyles } >
                { this.props.content }
          </div>

        </div>;

        return ( AccordionComponent );
    }

    private _toggleAccordion( ) {
        let showAccordion = this.state.showAccordion === true ? false : true;
        this.setState( { showAccordion: showAccordion });
        if ( this.props.toggleCallback ) this.props.toggleCallback( showAccordion );
      }

}
