
import { RefineRuleValues } from './IRefiners';

import { RefinerRulesPane } from './IRefiners';

export interface IRefinerKeyText {
  key: string;
  text: string;
}

export function buildKeyText( str: RefineRuleValues) : IRefinerKeyText {
  return { key: str, text: str };
}

export function refinerRuleItems() : IRefinerKeyText[] {

  let options: IRefinerKeyText[]  = [];

  RefinerRulesPane.map( rule => {
    options.push( buildKeyText( rule ) );
  });

  return options;

}
