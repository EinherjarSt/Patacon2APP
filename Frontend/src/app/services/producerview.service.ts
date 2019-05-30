import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProducerviewService {
  cypherArray: string[] = ['hP', '2w','jJ','u7','43','1Q','ns','GL','Pz','45'];
  randomArray: string[] = ['T','P','Z','e','O','H','h','Z','2','4','G','q','9','6'];

  constructor() { }
/**
 * Encrypt using the cypher array where select each number of the string and select 
 * a string by the position of the number that is between 0-9. Between each number 
 * the encrypt put a garbage char.
 * Ex: 57 = 1Q_GL_ where _ is a garbage char from randomArray
 * @param num string with the original number
 */
  encryptNumber(num:string){
    let array = num.split('');
    let cypher = "";
    for (let i = 0; i < array.length; i++) {
      const number = parseInt(array[i]);
      cypher+= this.cypherArray[number];
      let n = Math.floor((Math.random() * 13) + 0);
      cypher+=this.randomArray[n];
    }
    return cypher;
  }
  /**
   * Decrypt a text using reverse process that encryptNumber
   * @param text encrypt text
   */  
  decryptNumber(text: string){
    let array = text.split('');
    let cont =0;
    let stringNumber="";
    let number=""
    for (let i = 0; i < array.length; i++) {
      if(cont!=2){
        stringNumber+=array[i];
        cont++;
      }
      else{
        for (let j = 0; j < this.cypherArray.length; j++) {
          if(stringNumber==this.cypherArray[j]){
            number+=j;
            stringNumber="";
            cont=0;
          }
        }
      }
    }
    return parseInt(number);
  }

}