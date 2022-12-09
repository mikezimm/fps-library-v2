


 /***
 *     d888b  d88888b d888888b      d888888b  .o88b.  .d88b.  d8b   db      d888888b d8b   db d88888b  .d88b.  
 *    88' Y8b 88'     `~~88~~'        `88'   d8P  Y8 .8P  Y8. 888o  88        `88'   888o  88 88'     .8P  Y8. 
 *    88      88ooooo    88            88    8P      88    88 88V8o 88         88    88V8o 88 88ooo   88    88 
 *    88  ooo 88~~~~~    88            88    8b      88    88 88 V8o88         88    88 V8o88 88~~~   88    88 
 *    88. ~8~ 88.        88           .88.   Y8b  d8 `8b  d8' 88  V888        .88.   88  V888 88      `8b  d8' 
 *     Y888P  Y88888P    YP         Y888888P  `Y88P'  `Y88P'  VP   V8P      Y888888P VP   V8P YP       `Y88P'  
 *                                                                                                             
 *   import { getFileTypeIconInfo } from '@mikezimm/npmfunctions/dist/HelpInfo/Icons/stdECStorage';
 */
export function getFileTypeIconInfo( ext: string) {

  let iconColor = 'black';
  let iconName = ext;
  let iconTitle =  ext;
  switch (ext) {
    case 'xls':
    case 'xlsm':
    case 'xlsb':
    case 'xlsx':
      iconColor = 'darkgreen';
      iconName = 'ExcelDocument';
      break;

    case 'doc':
    case 'docx':
      iconColor = 'darkblue';
      iconName = 'WordDocument';
      break;

    case 'ppt':
    case 'pptx':
    case 'pptm':
      iconColor = 'firebrick';
      iconName = 'PowerPointDocument';
      break;

    case 'pdf':
      iconColor = 'red';
      break;

    case 'one':
    case 'onepkg':
      iconColor = 'purple';
      iconName = 'OneNoteLogo';
      break;

    case 'msg':
      iconColor = 'blue';
      iconName = 'OutlookLogo';
      break;

    case '7z':
    case 'zip':
      iconColor = 'blue';
      iconName = 'ZipFolder';
      break;

    case 'avi':
    case 'mp4':
    case 'wmf':
    case 'mov':
    case 'wmv':
      iconColor = 'blue';
      iconName = 'MSNVideosSolid';
      break;

    case 'msg':
      iconColor = 'blue';
      iconName = 'Microphone';
      break;

    case 'png':
    case 'gif':
    case 'jpg':
    case 'jpeg':
      iconColor = 'blue';
      iconName = 'Photo2';
      break;

    case 'txt':
    case 'csv':
      iconName = 'TextDocument';
      break;

    case 'dwg':
      iconName = 'PenWorkspace';
      break;

    default:
      iconName = 'FileTemplate';
      break;
  }

  return { iconName: iconName, iconColor: iconColor, iconTitle: iconTitle };

 }