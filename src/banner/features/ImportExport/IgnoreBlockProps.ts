import { changesFieldPanel } from "../../../components/molecules/FieldPanel/components/IMinWPFieldPanelProps";

//Common props to Ignore export
export const exportIgnorePropsFPS : string[] = [ 'analyticsList', 'analyticsWeb', ...changesFieldPanel ];

//Common props to block import
export const importBlockPropsFPS : string[] = [ 'scenario', 'analyticsList', 'analyticsWeb', 'lastPropDetailChange', 'showBanner' , 
  'showTricks', 'showRepoLinks', 'showExport', 'fpsImportProps', 'fullPanelAudience', 
  'documentationIsValid', 'requireDocumentation', 'requireContacts', 
  'currentWeb', 'loadPerformance', 'webpartHistory', 'pageLayout' ];