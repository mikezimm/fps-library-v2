
import { ISimpleLink } from '../../logic/Links/Interfaces';
import { IFpsFieldAsXMLReturn, fetchFpsItemAsXML } from './FetchItem';

export interface IFpsPageAsXML extends Partial<any> {
  CanvasContent1?: string;
  LayoutsWebpartsContent?: string;
  BannerImageUrl?: ISimpleLink;
  WikiField?: any;
  Title: string;
  Description: string;
  FileRef: string;
  FileLeafRef: string;
}

export interface IFpsPageAsXMLReturn extends IFpsFieldAsXMLReturn {
  item?: IFpsPageAsXML;
}

export async function fetchFpsPageAsXML(webUrl: string, listTitle: string, Id: number, selectThese: string[], expandThese: string[], DoNotExpandThese: string[] = [],
  isModern: boolean, alertMe: boolean, consoleLog: boolean): Promise<IFpsPageAsXMLReturn> {

  if (isModern === true) {
    selectThese = [...['*'], ...selectThese, ...['CanvasContent1', 'LayoutsWebpartsContent', 'BannerImageUrl',]];

  } else { selectThese = [...['*'], ...selectThese, ...['WikiField',]]; }

  const result: IFpsPageAsXMLReturn = await fetchFpsItemAsXML(webUrl, listTitle, Id, selectThese, expandThese, DoNotExpandThese, alertMe, consoleLog);

  return result;

}
