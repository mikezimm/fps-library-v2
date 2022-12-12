import * as React from 'react';

require('@mikezimm/fps-styles/dist/PropPanelHelp.css');

export const CSSOverRideWarning = <div style={{fontSize: 'large' }}>
  <div className={ 'fps-pph-topic' } style={{fontSize: 'large' }}><mark>NOTICE</mark></div>
  <div>Any 3rd party app that modifies the page styling (like these) are using undocumented tricks </div>
  <div>  - - <b>WHICH ARE SUBJECT TO BREAK without notice by Microsoft</b>.</div>
  <div>These settings are applied after this web part loads.</div>
  <div><b>Users may briefly see the original styling</b>.  Especially if their connection is slow or your page takes a long time to load.</div>
</div>;

export const DeveloperWarning = <div style={{fontSize: 'large' }}>
  <div className={ 'fps-pph-topic' } style={{fontSize: 'large' }}><mark>NOTICE</mark></div>
  <div>ONLY turn these on IF you know what you are doing and need them.</div>
</div>;
