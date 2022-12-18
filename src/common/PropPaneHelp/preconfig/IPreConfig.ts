

export interface IPreConfigSettings {
  // [key: string]: string | boolean | any | undefined;
    source: string; // Basically the Const name so it can be traced back.
    location: string;
    props: any;
    triggered?: boolean;
}

export interface IAllPreConfigSettings {
  // [key: string]: IPreConfigSettings[];
    forced: IPreConfigSettings[];
    preset: IPreConfigSettings[];
}

export type colorClassName = 'green' | 'yellow' | 'red' | 'na';
export interface IConfigurationProp {
  // [key: string]: string | boolean | colorClassName | any | undefined;
    source: string; // Basically the Const name so it can be traced back.
    location: string;
    prop: string;
    value: any;
    type: 'preset' | 'forced' | 'unk';
    status: 'tbd' |  'valid' | 'preset' | 'changed' | 'error' | 'unk';
    className: colorClassName;
    triggered?: boolean;

}

export interface ISitePreConfigProps {
  // [key: string]: IConfigurationProp[];
    presets: IConfigurationProp[];
    forces: IConfigurationProp[];
}



