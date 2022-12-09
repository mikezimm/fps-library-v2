import { createLink } from './CreateLinks';

export const baseDevDocs = 'https://developer.microsoft.com/en-us/fabric#/controls/web/';

export const JSONEditor = createLink( 'https://codebeautify.org/jsonviewer', '_blank', 'Edit JSON here: CodeBeautify.org');
export const JSONEditorShort = createLink( 'https://codebeautify.org/jsonviewer', '_blank', 'Edit JSON here');
export const FLICONio = createLink( 'https://www.flicon.io/', '_blank', 'flicon.io');

/**
 *  Fabric UI Controls on DevDocs
 */

export const devDocsWeb = createLink( baseDevDocs,'_blank', 'Fabric UI' );
export const devDocsButton = createLink( baseDevDocs + 'button','_blank', 'Button' );
export const devDocsStack = createLink( baseDevDocs + 'stack','_blank', 'Stack' );
export const devDocsSlider = createLink( baseDevDocs + 'slider','_blank', 'Slider' );
export const devDocsToggle = createLink( baseDevDocs + 'toggle','_blank', 'Toggle' );

export const devDocsDropdown = createLink( baseDevDocs + 'dropdown','_blank', 'Dropdown' );
export const devDocsCheckbox = createLink( baseDevDocs + 'checkbox','_blank', 'Checkbox' );
export const devDocsSearchbox = createLink( baseDevDocs + 'searchbox','_blank', 'Searchbox' );
export const devDocsProgress = createLink( baseDevDocs + 'progressindicator','_blank', 'Progress' );
export const devDocsMessageBar = createLink( baseDevDocs + 'messagebar','_blank', 'MessageBar' );
export const devDocsPanel = createLink( baseDevDocs + 'panel','_blank', 'Panel' );
export const devDocsPeoplePicker = createLink( baseDevDocs + 'peoplepicker','_blank', 'PeoplePicker' );

export const devDocsChoice = createLink( baseDevDocs + 'choicegroup','_blank', 'Choice' );
export const devDocsList = createLink( baseDevDocs + 'detailslist','_blank', 'List' );
export const devDocsDate = createLink( baseDevDocs + 'datepicker','_blank', 'DatePicker' );
export const devDocsPivo = createLink( baseDevDocs + 'pivot','_blank', 'Pivot' );
export const devDocsText = createLink( baseDevDocs + 'textfield','_blank', 'TextField' );
export const devDocsLink = createLink( baseDevDocs + 'link','_blank', 'Link' );
export const devDocsIcon = createLink( 'https://developer.microsoft.com/en-us/fabric#/styles/web/icons#available-icons','_blank', 'Icons' );
export const devDocsReGr = createLink( baseDevDocs + 'resizegroup','_blank', 'ResizeGroup' );

export const devDocsPnpJSsp = createLink( 'https://pnp.github.io/pnpjs/sp/','_blank', 'PnpJS' );

/**
 *  Github Samples
 */

 export const baseGetSPFxContReactSrc = 'https://github.com/SharePoint/sp-dev-fx-controls-react/tree/master/src/controls/';

 export const baseGitContReact = 'https://github.com/SharePoint/sp-dev-fx-controls-react/';
 export const gitRepoSPFxContReact = createLink( baseGitContReact,'_blank', 'controls-react' );
 export const gitRepoPnpJSsp = createLink( 'https://github.com/pnp/pnpjs/','_blank', '@PnpJS' );
 
 export const gitSampleReactList = createLink( baseGetSPFxContReactSrc + 'listView','_blank', 'List View' );
 export const gitSampleReactDate = createLink( baseGetSPFxContReactSrc + 'dateTimePicker','_blank', 'Date-Time' );
 export const gitSampleWebPartTitle = createLink( baseGetSPFxContReactSrc + '/WebPartTitle/','_blank', 'Webpart Title' );