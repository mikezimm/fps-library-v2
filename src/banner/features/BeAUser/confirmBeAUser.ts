
export function confirmBeAUser() {

  let result = confirm('This button is available when at least one of the Audience Targetting options are available in the web part. \n\n\nPress OK to simulate "be a regular user".  \n\nThis will temporarily show the web part as if you were a typical "Visitor" to your site (with Read permissions).  \n\nTo make this go away, just Refresh the page :)');

  return result;

}
