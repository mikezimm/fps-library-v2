

import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IWhoDunItItem extends Partial<any> {
  Author?: any;
  Editor?: any;

  FirstPublishedDate?: any;

  createdLoc?: string;
  "Author/Title"?: string;

  modifiedLoc?: string;
  "Editor/Title"?: string;

}

export interface IWhoDunItRow {
  item: IWhoDunItItem;
  showCreated?: boolean;       // Show Created Date / Author if it is different
  showPublished?: boolean;     // Show first published date and by whome
  showModified?: boolean;      // Show Modified Date / Editor if it is different
}

export function getWhoDunItElements( props: IWhoDunItRow ): JSX.Element {

  const {  item, showCreated, showModified, showPublished } = props;

  const modifiedString: string = showModified === true ? `Modified${ item.modifiedLoc } - ${ item['Editor/Title'] }` : '';
  
  const WhoDates = <div className={ 'whoDateStamps' }>
    { showCreated !== true || item.FirstPublishedDate ? null : 
      <div className={ 'dateStamps' } title = { modifiedString } >
        <div>Created</div> <div>{ item.createdLoc }</div> <div>{ item['Author/Title'] }</div>
      </div>
    }
    { showPublished !== true ? null :
      <div className={ 'dateStamps' } title = { modifiedString } >
        {/* <div>Published</div> <div>{ item.FirstPublishedDate.toLocalTime() }</div> <div>{ item['Author/Title'] }</div> */}
        <div>Published</div> <div>{ item.FirstPublishedDate ? item.FirstPublishedDate : 'NOT YET PUBLISHED' }</div> <div>{  }</div>
      </div>
    }
    {/* { showModified !== true ? null :
      <div className={ 'dateStamps' }>
        <div>Modified</div> <div>{ item.modifiedLoc }</div> <div>{ item['Editor/Title'] }</div>
      </div>
    } */}
  </div>;

  return WhoDates;
}