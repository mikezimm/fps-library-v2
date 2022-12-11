/***
 *     d888b  d88888b d888888b      d88888b .88b  d88.  .d8b.  d888888b db
 *    88' Y8b 88'     `~~88~~'      88'     88'YbdP`88 d8' `8b   `88'   88
 *    88      88ooooo    88         88ooooo 88  88  88 88ooo88    88    88
 *    88  ooo 88~~~~~    88         88~~~~~ 88  88  88 88~~~88    88    88
 *    88. ~8~ 88.        88         88.     88  88  88 88   88   .88.   88booo.
 *     Y888P  Y88888P    YP         Y88888P YP  YP  YP YP   YP Y888888P Y88888P
 *
 *
 */

export function getEmailFromLoginName(uName: string) : string | null {

  let result = null;

  if (uName.indexOf('|') > -1 && uName.indexOf('@') > 0) {
    //This is an ID structure from reading in from the list:  "i:0#.f|membership|clicky.mcclickster@tenant.onmicrosoft.com"
    let uProps = uName.split('|');
    let expectedEmailIndex = 2;
    if (uProps.length === 3 && uProps[expectedEmailIndex].indexOf('@') > -1) {
      result = uProps[expectedEmailIndex];
    } else {
      alert('Not able to find email from this user name: ' + uName);
    }
  }

  return result;

}
