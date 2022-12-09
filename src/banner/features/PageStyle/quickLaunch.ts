
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
          if ( document.getElementById( 'spLeftNav' ) ) {
              if ( minimize === false ) {
                document.getElementById( 'spLeftNav' ).style.width = null;
                document.getElementById( 'spLeftNav' ).style.marginRight = null;
                document.getElementById( 'spLeftNav' ).style.overflow = null;
              } else { 
                document.getElementById( 'spLeftNav' ).style.width = '20px';
                document.getElementById( 'spLeftNav' ).style.marginRight = '50px';
                document.getElementById( 'spLeftNav' ).style.overflow = 'hidden';
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
