
// import { PageContext } from '@microsoft/sp-page-context';
import { PageContextCopy_15_2 } from '../../common/interfaces/indexes/WebPartContext@152';

export function goToParentSite( pageContext: PageContextCopy_15_2 ): void {
  // let e: any = event;
  // console.log('goToParentSite event:',e);

  // let target = e.ctrlKey === true || e.altKey === true ? '_blank' : '_self';
  let target = '_blank';
  let parentUrl = pageContext.web.absoluteUrl.substr(0, pageContext.web.absoluteUrl.lastIndexOf('/') );
  window.open( parentUrl, target );

}

export function  goToHomePage( pageContext: PageContextCopy_15_2 ): void {
  // let e: any = event;
  // console.log('goToHomePage event',e);

  // let target = e.ctrlKey === true || e.altKey === true ? '_blank' : '_self';
  let target = '_blank';
  let parentUrl = pageContext.web.absoluteUrl;
  window.open( parentUrl, target );

}