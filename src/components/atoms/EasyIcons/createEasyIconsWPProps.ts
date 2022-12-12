import { EasyIconObjectDefault, IEasyIcons, IEasyIconsWPProps } from './eiTypes';
import { getStringArrayFromString } from '../../../logic/indexes/StringsIndex';

export function createEasyIconsWPProps(easyIconWPProps: IEasyIconsWPProps): IEasyIcons {

  const EasyIcons: IEasyIcons = EasyIconObjectDefault;

  const GroupKeys: any[] | null = getStringArrayFromString(easyIconWPProps.easyIconKeys, ';', true, null, true);
  const Ignore: any[] | null = getStringArrayFromString(easyIconWPProps.easyIconIgnore, ';', true, null, true);

  if (easyIconWPProps)
    EasyIcons.Enabled = easyIconWPProps.easyIconEnable === false ? false : true;
  if (easyIconWPProps)
    EasyIcons.GroupKeys = GroupKeys ? GroupKeys : [];
  if (easyIconWPProps)
    EasyIcons.Ignore = Ignore ? Ignore : [];

  return EasyIcons;
}
