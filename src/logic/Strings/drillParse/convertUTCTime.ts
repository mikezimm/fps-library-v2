import { ITrimTimes } from '../../../pnpjs/Lists/getVX/IGetInterfaceV2';

export function convertUTCTime(trimmedItem: string, rightSide: ITrimTimes) {

  if (typeof trimmedItem !== 'string') {
    return 'No date';
  }
  const thisTime = new Date(trimmedItem);
  if (!thisTime) {
    return 'No date';
  }

  const year = thisTime.getFullYear();
  const month = (thisTime.getMonth() + 1).toString();
  const date = thisTime.getDate();
  const hour24 = thisTime.getHours();
  const hour12 = thisTime.getHours() - 12;
  const mins = thisTime.getMinutes().toString();
  const secs = thisTime.getSeconds().toFixed();
  const quarter = `Q${Math.floor(thisTime.getMonth() / 3 + 1)}`;

  let hourStamp: string = '';
  let AMStamp: string = '';
  const minStamp: string = mins.length === 1 ? `0${mins}` : mins;
  const secStamp: string = secs.length === 1 ? `0${secs}` : secs;
  const monthStamp: string = month.length === 1 ? `0${month}` : month;

  let needsAM = rightSide.indexOf('AM') > -1 ? true : false;
  let isAM = hour12 < 0 ? true : false;

  if (needsAM === true) {

    hourStamp = hour12 >= 0 ? hour12.toString() : hour24.toString();
    AMStamp = isAM === true ? ' AM' : ' PM';

    if (hourStamp.length === 1) { hourStamp = `0${hourStamp}`; }

  } else {
    hourStamp = hour24.toString();
    if (hourStamp.length === 1) { hourStamp = `0${hourStamp}`; }

  }

  const theDate = date > 9 ? `${date}` : `0${date}`;

  let result = '';
  switch (rightSide) {

    case 'YYYY-MM':
      result = `${year}-${monthStamp}`;
      break;
    case 'YYYY-MM-DD':
      result = `${year}-${monthStamp}-${theDate}`;
      break;
    case 'YYYY-MM-DD-HH:mm': case 'YYYY-MM-DD-HH:mm_AM':
      result = `${year}-${monthStamp}-${theDate} ${hourStamp}:${minStamp}${AMStamp}`;
      break;
    case 'HH:mm': case 'HH:mm_AM':
      result = `${hourStamp}:${minStamp}${AMStamp}`;
      break;
    case 'HH:mm:ss': case 'HH:mm:ss_AM':
      result = `${hourStamp}:${minStamp}:${secStamp}${AMStamp}`;
      break;
    case 'Q1-YY':
      result = `${quarter}-${year.toString().slice(-2)}`;
      break;
    case 'YY-Q1':
      result = `${year.toString().slice(-2)}-${quarter}`;
      break;
    case 'YYYY-Q1':
      result = `${year.toString()}-${quarter}`;
      break;
  }

  return result;

}
