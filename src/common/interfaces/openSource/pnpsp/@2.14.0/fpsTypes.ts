/**
* Specifies the type of a principal.
*/
export declare const enum PrincipalType {
  /**
   * Enumeration whose value specifies no principal type.
   */
  None = 0,
  /**
   * Enumeration whose value specifies a user as the principal type.
   */
  User = 1,
  /**
   * Enumeration whose value specifies a distribution list as the principal type.
   */
  DistributionList = 2,
  /**
   * Enumeration whose value specifies a security group as the principal type.
   */
  SecurityGroup = 4,
  /**
   * Enumeration whose value specifies a group as the principal type.
   */
  SharePointGroup = 8,
  /**
   * Enumeration whose value specifies all principal types.
   */
  All = 15
}