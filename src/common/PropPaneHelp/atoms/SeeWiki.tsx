import * as React from 'react';
import { IWebpartBannerProps } from '../../../banner/mainReact/IWebpartBannerProps';

export function PleaseSeeWiki ( bannerProps: IWebpartBannerProps, ) {
  return <p>Please see the { bannerProps.gitHubRepo.wiki }  for more information</p>;
} 