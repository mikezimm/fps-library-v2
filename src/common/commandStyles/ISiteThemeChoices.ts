import { IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';
import { bannerThemeChoices } from "./defaults";

export type ISiteThemeChoices = 'light' | 'dark' | 'primary';

export interface ISiteThemes {
  light: string;
  dark: string;
  primary: string;
}

export const bannerThemeChoicesWSiteTheme: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
  ...bannerThemeChoices,
  { index: 13, key: 'siteDark', text: "Site Theme - Dark bar" },
  { index: 14, key: 'siteLight', text: "Site Theme - Light bar" },
  { index: 14, key: 'sitePrimary', text: "Site Theme - Primary color" },
];

export function getThemeClass(choice: string, themes: ISiteThemes ): string {

  if ( choice.toLowerCase().indexOf('light') > -1 ) { return themes.light }
  else if ( choice.toLowerCase().indexOf('dark') > -1 ) { return themes.dark }
  else if ( choice.toLowerCase().indexOf('primary') > -1 ) { return themes.dark }
  else return `InvalidSiteThemeClass`;

}

export function check4SiteTheme(choice: string): boolean {
  return choice.toLowerCase().indexOf('site') > -1 ? true : false;
}
