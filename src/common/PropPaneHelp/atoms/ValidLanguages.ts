// was src\Services\PropPane\zReusablePropPane.ts

import { PropertyPaneLink, } from '@microsoft/sp-property-pane';

export const ValidLocalLanguages = PropertyPaneLink('languagesLink' , {
  text: 'See list of valid languages',
  href: 'https://docs.microsoft.com/en-us/previous-versions/windows/desktop/indexsrv/valid-locale-identifiers',
  target: '_blank',
});
