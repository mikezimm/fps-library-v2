
//Copied from Action News and Drilldown

export interface IFieldDef {
  // [key: string]: string | boolean | any | undefined ;
  name: string;
  title: string;
  column: string;
  type: string; //Smart, Text, Number, etc...
  required: boolean;
  disabled: boolean;
  hidden: boolean;
  blinkOnProject: boolean;
  value?: any;

}