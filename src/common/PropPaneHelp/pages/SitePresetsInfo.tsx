import { PivotItem } from 'office-ui-fabric-react';
import * as React from 'react';
import { ISitePreConfigProps } from '../IPreConfig';

/**
 * 2022-08-29:  Refactored return statement to fix compile warning.
* @param sitePresets : ISitePreConfigProps
 * @returns
 */


export function SitePresetsInfo(sitePresets: ISitePreConfigProps): JSX.Element | undefined {

  const usePreSets = sitePresets && (sitePresets.forces.length > 0 || sitePresets.presets.length > 0) ? true : false;

  if (usePreSets === true) {

    const allForces: string[] = [];

    const forcesRows: any[] = [];
    let forcePreviously: any = null;
    sitePresets.forces.map((preset, index) => {
      if (index === 0 || sitePresets.forces[index].source !== sitePresets.forces[index - 1].source) {
        forcesRows.push(<tr className={'fps-policy'} style={{ color: 'darkred' }}><td colSpan={2}>{preset.source}</td><td colSpan={2}>{preset.location}</td></tr>);
      }
      let wasForced: string = '';
      let wasForcedClass = wasForced ? 'was-forced' : '';
      if (allForces.indexOf(preset.prop) > -1) {
        wasForced = '*';
        forcePreviously = <div>* These items were previously enforced</div>;
      } else { allForces.push(preset.prop); }

      forcesRows.push(<tr className={preset.className}><td>{preset.prop}</td><td title={`for sites: ${preset.location}`}>{preset.type}</td><td className={wasForcedClass}>{preset.status}{wasForced}</td><td>{JSON.stringify(preset.value)} </td></tr>);
    });

    const forces = sitePresets.forces.length === 0 ? null : <div>
      <div className={'fps-pph-topic'}>Forced Properties - may seem editable but are auto-set.</div>
      <div className={''}>In the case a property is forced multiple times, the last one is the one that gets applied.</div>
      {forcePreviously}
      <table className='configured-props'>
        {forcesRows}
        {/* { sitePresets.forces.map ( ( preset, index ) => {
              return <tr className={preset.className}><td>{preset.prop}</td><td title={ `for sites: ${preset.location}`}>{preset.type}</td><td>{preset.status}</td><td>{JSON.stringify(preset.value) } </td></tr>;
            }) } */}
      </table>
    </div>;

    const presetsRows: any[] = [];
    const alreadyEnforced: string[] = [];
    sitePresets.presets.map((preset, index) => {
      if (index === 0 || sitePresets.presets[index].source !== sitePresets.presets[index - 1].source) {
        presetsRows.push(<tr className={'fps-policy'} style={{ color: 'darkgreen' }}><td colSpan={2}>{preset.source}</td><td colSpan={2}>{preset.location}</td></tr>);
      }
      let wasForced: string = '';
      if (allForces.indexOf(preset.prop) > -1 && alreadyEnforced.indexOf(preset.prop) < 0) { alreadyEnforced.push(preset.prop); wasForced = '^'; }
      let wasForcedClass = wasForced ? 'was-forced' : '';
      presetsRows.push(<tr className={preset.className}><td>{preset.prop}</td><td title={`for sites: ${preset.location}`}>{preset.type}</td><td className={wasForcedClass}>{preset.status}{wasForced}</td><td>{JSON.stringify(preset.value)} </td></tr>);
    });

    const alreadyEnforcedStr = alreadyEnforced.join('; ');
    const presets = sitePresets.presets.length === 0 ? null : <div>
      <div className={'fps-pph-topic'}>Preset Properties</div>
      <div className={''}>These presets were over-written by the forced policies listed above:</div>
      <div className={''}>In the case a property is preset multiple times, the last one is the one that gets applied.</div>
      <div className={'width90'}>{alreadyEnforcedStr}</div>
      <table className='configured-props'>
        {presetsRows}
        {/* { sitePresets.presets.map ( ( preset, index )  => {
              return <tr className={preset.className}><td>{preset.prop}</td><td title={ `for sites: ${preset.location}`}>{preset.type}</td><td>{preset.status}</td><td>{JSON.stringify(preset.value) } </td></tr>;
            }) } */}
      </table>

    </div>;


    const preSetsContent: JSX.Element = <div className={'fps-pph-content'} style={{ display: 'flex' }}>
      <div>
        {forces}
        {presets}
      </div>
    </div>;

    const returnPivot: JSX.Element = 
      <PivotItem headerText={ undefined } itemIcon='Badge'>
        { preSetsContent }
      </PivotItem>;


    return returnPivot;

  } else {

    return undefined;
  }

}
