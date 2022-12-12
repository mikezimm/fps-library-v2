import { IAllPreConfigSettings, ISitePreConfigProps } from "./IPreConfig";
import { getThisSitesPreConfigProps } from "./getThisSitesPreConfigProps";

export function applyPresetCollectionDefaults( sitePresets: ISitePreConfigProps,  PreConfiguredProps: IAllPreConfigSettings, thisProps: any, serverRelativeUrl: string ) {

    sitePresets = getThisSitesPreConfigProps( PreConfiguredProps, thisProps, serverRelativeUrl );

    sitePresets.presets.map( setting => {
        if ( thisProps[setting.prop] === setting.value ) { 
        setting.status = 'valid';

        } else if ( thisProps[setting.prop] === undefined || thisProps[setting.prop] === null ) { //Changed from just !this... because if value was 'false' it would set to true
            thisProps[setting.prop] = setting.value ;
            setting.status = 'preset';

        }
    });

    sitePresets.forces.map( setting => {
        if ( thisProps[setting.prop] === setting.value ) { 
        setting.status = 'valid';

        } else if ( !thisProps[setting.prop] ) { 
        thisProps[setting.prop] = setting.value ;
        setting.status = 'preset';

        } else if ( thisProps[setting.prop] !== setting.value ) { 
        thisProps[setting.prop] = setting.value ;
        setting.status = 'changed';

        }

    });

    console.log('Preset props used:', sitePresets );
    return sitePresets;

}
