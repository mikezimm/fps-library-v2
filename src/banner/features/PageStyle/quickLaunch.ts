
/**
 * Used with FPS Options Functions
 * @param quickLaunchHide 
 */

/**
 * This minimizes the quick launch, originally copied from ImageMapper
 * @param document : should be of type Document
 * @param minimize 
 */

//2022-11-27:  Removed document argument because it is visible from here

/**
 * Combines setQuickLaunch and minimizeQuickLaunch into one
 */

export function setQuickLaunch ( minimize : boolean, alertError: boolean = true, consoleResult: boolean = false  ) {

  //specifically not undefined or null in case it is not yet preset.
  if ( minimize === true || minimize === false ) { 
    try {
        const spLeftNav: HTMLElement | null = document.getElementById( 'spLeftNav' ) ;
        if ( spLeftNav !== null ) {
            if ( minimize === false ) {
              spLeftNav.style.width = 'null';
              spLeftNav.style.marginRight = 'null';
              spLeftNav.style.overflow = 'null';
            } else { 
              spLeftNav.style.width = '20px';
              spLeftNav.style.marginRight = '50px';
              spLeftNav.style.overflow = 'hidden';
          }
        }

        if ( consoleResult === true ) {
            console.log('minimizeQuickLaunch:  set minimize to ', minimize);
        }

    } catch (e) {
        if ( alertError === true ) {
            alert('minimizeQuickLaunch:  Could not find element with id: spLeftNav');
        }
        console.log('minimizeQuickLaunch:  Could not find element with id: spLeftNav');
    }
  }
}
