
export interface IMinTeachBubble {
  step?: number;
  // NOTE:  Target must start with # for Id and prefer to end with a unique webpart instance ID
  // Sample on how to set ID for Pivot component below
  target: string;
  headline: string;
  message?: string;
  content?: JSX.Element;

}

/**
 *  This is an example of how to set the ID of a PivotItem so it can be referenced.
 *    Just use the getTabId callback.
 
    <Pivot
      getTabId={ ( itemKey, index ) => { return `ALVFMMainPivot${itemKey}`} }
      styles={ mainPivotStyles }
    >
 *
 */