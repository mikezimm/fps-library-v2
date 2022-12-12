
import * as React from 'react';


  // Could be used to add ellipse:  https://semicolon.dev/tutorial/css/text-overflow-ellipsis-doesnt-work
  // Need to test though.
  const ellipseStyle: React.CSSProperties = {
    minWidth: '0px',
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  /**
 * Copied from ECStorage
 * Super cool solution based on:  https://stackoverflow.com/a/43235785
 * @param text 
 * @param highlight 
 */

   export function getHighlightedText( text: string, highlight: string ) {
    // <div dangerouslySetInnerHTML={{ __html: this.state.showPanelItem.WikiField }} />
    // Split on highlight term and include term into parts, ignore case
    if (!highlight || highlight.indexOf('*') > -1 ) {
      return text;

    } else {
      const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
      return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', backgroundColor: 'yellow' } : {} }>
          { part }
        </span>)
      } </span>;
    }

  }
