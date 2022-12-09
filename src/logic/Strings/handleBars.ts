
import { WebPartContextCopy_15_2 } from '../../common/interfaces/@msft/1.15.2/WebPartContext';

export interface IHandleBarReplacements {
  // [key: string]: string[];
  Pages: string[];
  Lists: string[];
  Users: string[];
  Webs: string[];
  Sites: string[];

}

export const HandleBarReplacements : IHandleBarReplacements = {

    Pages: [ '{{PageId}}' ] ,
    Lists: [ '{{ListTitle}}', '{{ListId}}', '{{ListUrl}}' ] ,
    Users: [ '{{UserName}}', '{{UserLogin}}', '{{UserEmail}}' ] ,
    Webs: [ '{{WebTitle}}', '{{WebUrl}}', '{{SiteId}}' ] ,
    Sites: [ '{{SiteTitle}}', '{{SiteUrl}}', '{{SiteId}}' ] ,

}

/**
 * Replaces HandleBar style strings with known replacements from context
 * 
 * Used first in PageInfo converting web part prop input in relatedItems heading, web, ListTitle and restFilter
 * 
 * @param str 
 * @param context 
 * @returns 
 */
export function replaceHandleBars( str: string , context: WebPartContextCopy_15_2 ): string {

    if ( !str ) { return '' ; } else {

      if ( str.indexOf('{{') === -1 || str.indexOf('}}') === -1 ) {
        return str;

      } else {

        let newStr = str.replace( /{{PageId}}/gi , `${context.pageContext.listItem ? context.pageContext.listItem.id.toFixed() : '{{PageId}}'}` );

        if ( str.indexOf('{{List') > -1 ) {
          newStr = newStr.replace( /{{ListTitle}}/gi , `${context.pageContext.list ? context.pageContext.list.title : '{{ListTitle}}' }` );
          newStr = newStr.replace( /{{ListId}}/gi , `${context.pageContext.list ? context.pageContext.list.id : '{{ListId}}'}` );
          newStr = newStr.replace( /{{ListUrl}}/gi , `${context.pageContext.list ? context.pageContext.list.serverRelativeUrl : '{{ListUrl}}'}` );
        }

        if ( str.indexOf('{{User') > -1 ) {
          newStr = newStr.replace( /{{UserName}}/gi , `${ context.pageContext.user.displayName }` );
          newStr = newStr.replace( /{{UserLogin}}/gi , `${ context.pageContext.user.loginName }` );
          newStr = newStr.replace( /{{UserEmail}}/gi , `${ context.pageContext.user.email }` );
        }

        if ( str.indexOf('{{Web') > -1 ) {
          newStr = newStr.replace( /{{WebTitle}}/gi , `${context.pageContext.web.title}` );
          newStr = newStr.replace( /{{WebUrl}}/gi , `${context.pageContext.web.serverRelativeUrl}` );
          newStr = newStr.replace( /{{WebId}}/gi , `${context.pageContext.web.id}` );
        }

        if ( str.indexOf('{{Site') > -1 ) {
          newStr = newStr.replace( /{{SiteTitle}}/gi , `${context.pageContext.web.title}` );
          newStr = newStr.replace( /{{SiteUrl}}/gi , `${context.pageContext.web.serverRelativeUrl}` );
          newStr = newStr.replace( /{{SiteId}}/gi , `${context.pageContext.web.id}` );
        }

        let now = new Date();

        newStr = newStr.replace( /{{Now}}/gi , `${ now.toLocaleString() }` );
        newStr = newStr.replace( /{{Today}}/gi , `${ now.toLocaleDateString() }` );

        return newStr;

      }
    }
}
