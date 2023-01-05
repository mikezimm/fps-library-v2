
import * as React from 'react';
import { convertIssuesMarkdownStringToSpan } from '../../../components/atoms/Elements/markdown';
import { IRepoLinks } from '../../../components/atoms/Links/CreateLinks';
import { makeid } from '../../../logic/Strings/guids';

export function createWhyRow(webpart: any, comments: any, repoLink: IRepoLinks | undefined): JSX.Element[] {

  let fullFocus = convertIssuesMarkdownStringToSpan(comments, repoLink);

  let tds = [<span key={makeid(6)} style={{ whiteSpace: 'nowrap' }}>{webpart}</span>,
  <span key={makeid(6)}>{fullFocus}</span>,];

  return tds;
}
