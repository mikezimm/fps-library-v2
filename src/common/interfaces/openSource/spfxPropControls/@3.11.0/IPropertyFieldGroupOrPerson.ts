/**
 * THESE WERE COPIED FROM @pnp/spfx-property-controls@3.11.0 to avoid importing library
 */


/**
 * Defines a People object for the PropertyFieldPeoplePicker
 */
 export interface IPropertyFieldGroupOrPerson {
  /**
   * Group ID
   */
  id?: string;
  /**
   * Group Description
   */
  description?: string;
  /**
   * User's full name
   */
  fullName: string;
  /**
   * User's login
   */
  login: string;
  /**
   * User's email (optional)
   */
  email?: string;
  /**
   * User's job title (optional)
   */
  jobTitle?: string;
  /**
   * User's initials (optional)
   */
  initials?: string;
  /**
   * User's image url (optional)
   */
  imageUrl?: string;
}
