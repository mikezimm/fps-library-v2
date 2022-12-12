import { IAllPreConfigSettings, ISitePreConfigProps, IConfigurationProp, colorClassName, } from "./IPreConfig";


export function getThisSitesPreConfigProps(PreConfiguredProps: IAllPreConfigSettings, thisProps: any, serverRelativeUrl: string): ISitePreConfigProps {

  let presets: IConfigurationProp[] = [];
  let forces: IConfigurationProp[] = [];

  let testServerRelativeUrl = serverRelativeUrl.lastIndexOf('/') === serverRelativeUrl.length ? serverRelativeUrl : serverRelativeUrl + '/';

  PreConfiguredProps.preset.map(preconfig => {
    //Added preconfig.location === '*' || so that if it has * it will apply everywhere
    if (preconfig.location === '*' || testServerRelativeUrl.toLowerCase().indexOf(preconfig.location) > -1) {
      preconfig.triggered = true;
      Object.keys(preconfig.props).map(prop => {
        //   if ( !thisProps[prop] ) { 
        let className: colorClassName = getPropColorClass(thisProps[prop], preconfig.props[prop], 'yellow');
        presets.push({ source: preconfig.source, location: preconfig.location, type: 'preset', prop: prop, value: preconfig.props[prop], status: 'tbd', className: className, triggered: true });
        //   }
      });
    }
  });

  PreConfiguredProps.forced.map(preconfig => {
    //Added preconfig.location === '*' || so that if it has * it will apply everywhere
    if (preconfig.location === '*' || testServerRelativeUrl.toLowerCase().indexOf(preconfig.location) > -1) {
      preconfig.triggered = true;
      Object.keys(preconfig.props).map(prop => {
        //   if ( thisProps[prop] !== preconfig.props[ prop ] ) {
        let className: colorClassName = getPropColorClass(thisProps[prop], preconfig.props[prop], 'red');
        forces.push({ source: preconfig.source, location: preconfig.location, type: 'forced', prop: prop, value: preconfig.props[prop], status: 'tbd', className: className, triggered: true });
        //   }
      });
    }
  });

  return { presets: presets, forces: forces };

}

export function getPropColorClass( actualProp: any, testProp: any, notEqualClass: colorClassName, defValue: colorClassName = 'na' ) {

  let className: colorClassName = 'na';
  if ( actualProp === testProp ) { className = 'green' ; } 
  else if ( actualProp && ( actualProp !== testProp ) ) { className = notEqualClass ; }
  else { className = defValue; }

  return className;
}