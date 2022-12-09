
import { IUser } from '../Users/IUserInterfaces';

//import { getGreeting, getNicks } from '@mikezimm/npmfunctions/dist/Services/Time/personalize';

export function getGreeting(name: IUser){
    let hour = new Date().getHours();
    let message = "";
    if (hour < 1){
      message = "Almost bedtimenick!";
    } else if (hour < 2){
      message = "Past your bedtimenick?";  
    } else if (hour < 7){
      message = "Top O the mornin to younick";    
    } else if (hour < 12){
      message = "Good morning nick!";
    } else if (hour < 17){
      message = "Afternoon partnernick";   
    } else if (hour < 18){
      message = "It's Five o'clock Somewhere...nick";    
    } else if (hour < 19){
      message = "I'm getting hungry... dinner time yetnick?";    
    } else if (hour < 22){
      message = "Some people start to get sleepy nownick";    
    } else {
      message = "https://en.wikipedia.org/wiki/Midnightnick";    
    }
  
    //console.log('getGreeting:', name);
    let userName : any = name;
    if (userName ){
      if (userName.title.indexOf("Click") > -1 ) {
        message = message.replace('Afternoon partner',"Servus");
        message = message.replace('Top O the mornin to you',"Neata");
        message = message.replace('nick'," BK");
  
      } else if (userName.title.indexOf(zzz) > 0 ) {
        message = message.replace('nick'," BM");
      } else { 
        message = message.replace('nick', " " + userName.initials);
      }
    }
    return message;
  
  }
  
  export function getNicks(name: IUser){
    let hour = new Date().getHours();
    //console.log('getNicks:', name);
    let message  : any = name;
    let result = "";
    if ( message) {
      if (message.title.indexOf('Clicky') === 0 ){
        result = "Hey " + xxx + "!";
      } else if (message.title == 'Mike ' + zzz ){
        result = "Hey " + zzz + "!";
      } else {
        result = 'Hi ' + message.title.split(' ')[0];
      }
    }
  
    return result;
  
  }

  
  const xxx = 'Sunshine';
  const zzz = 'Zimmerman';
