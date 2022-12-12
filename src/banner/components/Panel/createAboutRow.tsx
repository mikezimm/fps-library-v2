import * as React from 'react';
import { IRepoLinks } from '../Links_/CreateLinks';
import { convertIssuesMarkdownStringToSpan } from '../Elements/Markdown';


export function createAboutRow(date: string, version: string, focus: any, repoLinks: IRepoLinks | null) {

  let fullFocus = convertIssuesMarkdownStringToSpan(focus, repoLinks);

  let tds = [<span style={{ whiteSpace: 'nowrap' }}>{date}</span>,
  <span style={{ whiteSpace: 'nowrap' }}>{version}</span>,
  <span>{fullFocus}</span>,];

  return tds;
}
