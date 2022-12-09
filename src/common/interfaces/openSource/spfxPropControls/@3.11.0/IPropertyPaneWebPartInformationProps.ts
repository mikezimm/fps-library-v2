/**
 * THESE WERE COPIED FROM @pnp/spfx-property-controls@3.11.0 to avoid importing library
 */

 export interface IPropertyPaneWebPartInformationProps {
  /**
   * A link pointing to an external source for more information
   */
  moreInfoLink?: string;
  /**
   * A string defining the target for the link, e.g. _blank
   */
  moreInfoLinkTarget?: string;
  /**
   * A required description of the webpart
   */
  description: string;
  /**
   * Optional embedded video
   */
  videoProperties?: IVideoEmbedProperties;
  /**
   * An UNIQUE key indicates the identity of this control
   */
  key: string;
}

export interface IVideoEmbedProperties {
  /**
   * The url to a video, e.g. https://www.youtube.com/embed/d_9o3tQ90zo
   */
  embedLink: string;
  /**
   * Optional width of the iframe embedding the video
   */
  width?: number;
  /**
   * Optional height of the iframe embedding the video
   */
  height?: number;
  /**
   * Any additional properties to add to the iframe link, for instance {allowFullScreen: true} for Youtube videos
   */
  properties?: any;
}

