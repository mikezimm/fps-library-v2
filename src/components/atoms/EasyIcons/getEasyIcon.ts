import { EasyIconLocation, IEasyIcons } from './eiTypes';

/**
 * Logic order:
 * First checks keywords in the first Prop to test ( Title )
 * Then checks for all the Icons in Title
 * Then repeats for the next Prop - Description
 * @param EasyIcons
 * @param item
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function getEasyIcon(EasyIcons: IEasyIcons, item: any): string | null {

  //If this is disabled, then exit
  if (EasyIcons.Enabled !== true)
    return null;

  const EasyErrors: string[] = [];
  let EasyIconUrl = '';
  EasyIcons.Priority.map(prop => {
    if (item[prop]) {
      EasyIcons.GroupKeys.map(Key => {
        if (EasyIcons.Valid.indexOf(Key) < 0) {
          if (EasyErrors.indexOf(Key) < 0) { EasyErrors.push(Key); }
        } else if (!EasyIconUrl && EasyIcons.Groups[Key].Status === 'Active') {
          EasyIcons.Groups[Key]?.Icons.map((Icon: string) => {
            if (!EasyIconUrl && Icon) { //Only continue if EasyIconUrl is not found and Icon is a non-empty string
              //Combine all the options into regex as optional qualifiers
              const KeyOptions = EasyIcons.Groups[Key]; // Added this to remove type error in line below where its' possibly undefined
              const Options: string = KeyOptions.Options ? `(${KeyOptions?.Options.join(')?(')})?` : '';
              // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
              const IconRegex = new RegExp(`(\\b)${Icon}${Options}(\\b)`, 'i');
              if (item[prop].match(IconRegex)) {
                EasyIconUrl = `${EasyIconLocation}${Key}/${Icon}.png`;
              }
            }
          });
        }
      });
    }
  });

  return EasyIconUrl;

}
