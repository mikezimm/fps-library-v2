
import * as React from 'react';
import { convertIssuesMarkdownStringToSpan } from '../../../components/atoms/Elements/markdown';
import { IRepoLinks } from '../../../components/atoms/Links/CreateLinks';

export function createAboutRow(date: string, version: string, focus: any, repoLinks: IRepoLinks | null) : JSX.Element[] {

  let fullFocus = convertIssuesMarkdownStringToSpan(focus, repoLinks);

  let tds = [<span style={{ whiteSpace: 'nowrap' }}>{date}</span>,
  <span style={{ whiteSpace: 'nowrap' }}>{version}</span>,
  <span>{fullFocus}</span>,];

  return tds;
}

