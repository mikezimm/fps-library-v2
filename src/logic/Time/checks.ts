
const zuluRegex = /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\dZ/; // SharePoint Created/Modified:  "2020-09-01T02:10:08Z"
const yyyymmRegex = /^([0-9]{4})[\/\-.](1[0-2]|0[1-9])$/; //2018-10
const yyyymmddRegex = /^(([12]\d{3})[\/\-.](0[1-9]|1[0-2])[\/\-.](0[1-9]|[12]\d|3[01]))$/; //2018-10-31
const yyyymmddhhmmssRegex = /^([0-9]{4})[\/\-.](1[0-2]|0[1-9])[\/\-.](3[01]|0[1-9]|[12][0-9]) (2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])$/; //2008-10-30 17:21:59
const mmddyyyyRegex = /\d{2}[\/\-.]\d{2}[\/\-.]\d{4}/;
const isoRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/; //2012-10-06T04:13:00+00:00


export function isStringValidDate( test: string, type : 'zulu' | 'us' | 'eu' | 'iso' | 'common') {
  
  let result = false;

  if ( result === false && ( type === 'zulu' || type === 'common' ) ) { 
    result = zuluRegex.exec(test) ? true : false;
  }
  if ( result === false && ( type === 'us' || type === 'common' ) ) { 
    result = yyyymmRegex.exec(test) || yyyymmddRegex.exec(test) || yyyymmddhhmmssRegex.exec(test) ? true : false;
  }
  if ( result === false && ( type === 'eu' || type === 'common' ) ) { 
    result = mmddyyyyRegex.exec(test) ? true : false;
  }
  if ( result === false && ( type === 'iso' || type === 'common' ) ) { 
    result = isoRegex.exec(test) ? true : false;
  }

  return result;

}

