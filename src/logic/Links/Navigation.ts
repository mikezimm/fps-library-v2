
import { PageContext } from '@microsoft/sp-page-context';

export function goToParentSite( e: any, pageContext: PageContext ): void {
  // let e: any = event;
  console.log('goToParentSite event:',e);

  let target = e.ctrlKey === true || e.altKey === true ? '_blank' : '_self';
  let parentUrl = pageContext.web.absoluteUrl.substr(0, pageContext.web.absoluteUrl.lastIndexOf('/') );
  window.open( parentUrl, target );

}

export function  goToHomePage( e: any, pageContext: PageContext ): void {
  // let e: any = event;
  console.log('goToHomePage event',e);

  let target = e.ctrlKey === true || e.altKey === true ? '_blank' : '_self';
  let parentUrl = pageContext.web.absoluteUrl;
  window.open( parentUrl, target );

}