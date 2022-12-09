/**
 * Migrated from
 * npmFunctions/src\Services\Regex_\htmlTags_.ts
 * 
 * Some functions in the file were moved to logic/DOM/Tags
 */

export interface IRegExTag {
  key: string;
  desc: string;
  
  misc?: string;
  // tags?: string[];
  tags: string[];  //Set to required to fix lint error in: FPSApplyHeadingCSS
  open: RegExp;
  close: RegExp;
  openG: RegExp;
  closeG: RegExp;
}

export interface IHTMLRegEx {
  h1?: IRegExTag;
  h2?: IRegExTag;
  h3?: IRegExTag;
  h4?: IRegExTag;
  h12?: IRegExTag;
  h13?: IRegExTag;
  h14?: IRegExTag;
  p?: IRegExTag;
  div?: IRegExTag;
  li?: IRegExTag;
  a?: IRegExTag;
  mark?: IRegExTag;
  bold?: IRegExTag;
  img?: IRegExTag;
  script?: IRegExTag;
  style?: IRegExTag;
}

export type IHTMLRegExKeys = 'h1' | 'h2' | 'h3' | 'h4' | 'h12' | 'h13' | 'h14' | 'p' | 'mark' | 'bold' | 'li' | 'img' ;
