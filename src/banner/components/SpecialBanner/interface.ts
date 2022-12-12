
export interface ISpecialMessage {
  message: string;
  style?: React.CSSProperties; 
  leftIcon?: string;
  rightIcon?: string;
  link?: {
    Url: string;
    Desc: string;
  }
}

/**
 * This packages up a web part upgrade notice
 * @param kind 
 * @param url 
 * @param desc 
 */
export function specialUpgrade ( kind: 'critical' | 'warn', url: string, desc: string = 'More Info' ) {
  const obj: ISpecialMessage = {
    message: 'Please upgrade your web part',
    style: kind === 'critical' ? { color: 'yellow', background: 'red' } : {},
    leftIcon: kind === 'warn' ? 'Info' : 'WarningSolid',
    rightIcon: 'UpdateRestore',
    link: {
      Url: url,
      Desc: desc,
    }
  }

  return obj;
}
