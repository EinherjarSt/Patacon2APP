import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env} from '@env/environment';
import { Filter } from '../model-classes/filter';
import { DispatchesService } from './dispatches.service';
import { ProducerviewService } from './producerview.service';
import { InsightsService } from './insights.service';


@Injectable({
  providedIn: 'root'
})

export class SMS {

    constructor(private http: HttpClient,
      private dispatchService: DispatchesService,
      private producerViewService: ProducerviewService,
      private insightsService: InsightsService) { }
  
    sendMessage(phoneNumber: string, message: string): Observable<String> {
  
      const body = new HttpParams()
      .set('phoneNumber', phoneNumber)
      .set('message', message);
      
      return this.http.post<{msg: string}>(env.api.concat('/sms/send') , body)
        .pipe(
          map(result => {
            return result.msg;
          })
        );
    }

  sendSMS(idDispatch) {
        let info: Filter;
        this.dispatchService.getDispatchWithFullInfo(idDispatch).subscribe(res => {
          info = res;
          console.log(res);
          let condition = this.verifyConditionsSMS(info);
          if (condition != 0) {

            if (condition == 1) {
              //INSERT AN ALERT HEREEEE!!!!
              console.log("NO SE PUEDE NOTIFICAR AL PRODUCTOR!!\n EL CAMION NO TIENE GPS!!");
            }
            else if (condition == 2) {
              //INSERT AN ALERT HEREEEE!!!!
              console.log("NO SE PUEDE NOTIFICAR AL PRODUCTOR!!\n TIENE ESTADO PENDIENTE!!");
            }
            else {
              //INSERT AN ALERT HEREEEE!!!!
              console.log("NO SE PUEDE NOTIFICAR AL PRODUCTOR!!\n TIENE ESTADO TERMINADO!!");
            }

          }
          else {
            let message = "\nDespacho Iniciado! \n" +
              "Chofer: " + info.driverName + " " + info.driverSurname + "/" + info.driverRun +
              "\nTel: " + info.driverPhoneNumber;
            message = this.getCleanedString(message);
            //THE ARRIVAL TIME ISN'T IN THE MESSAGE BECAUSE THIS DOESN'T FIT INTO FREE SMS's
            //FOR THE FULL VERSION ADD THE NEXT LINES 
            /**
                let date = info.arrivalAtVineyardDatetime.toString().replace(/T/, ' ').replace(/\..+/, '').substr(11,16);
                message+="\nLlegada: "+date +"\n";
            */

            let idCypher = this.producerViewService.encryptNumber(info.dispatchId + "");
            //REPLACE THE LOCALHOST:4200 BY THE FINAL ADDRESS
            let link = env.prod.concat("/#/producer/" + idCypher);
            let url = "\n"+link;
            message += url;
            this.sendMessage(info.producerPhoneNumber, message).subscribe(res => {
              console.log(res);
                this.insightsService.editLastMessageSentData(info.dispatchId);
            });
          }

        });
  }

  /**
   * Verify if an sms have correct data
   * 0: is OK
   * 1: The truck doesn't have GPS
   * 2: The status is 'Pendiente'
   * 3: The status is 'Terminado'
   * @param filter 
   */
  verifyConditionsSMS(filter: Filter) {
    if (filter.truckGPSImei == null) return 1;
    else if (filter.dispatchStatus == 'Pendiente') return 2;
    else if (filter.dispatchStatus == 'Terminado') return 3;
    return 0;
  }

  getCleanedString(text){
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
    for (var i = 0; i < specialChars.length; i++) {
        text= text.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }   
 
    // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
    text = text.replace(/á/gi,"a");
    text = text.replace(/é/gi,"e");
    text = text.replace(/í/gi,"i");
    text = text.replace(/ó/gi,"o");
    text = text.replace(/ú/gi,"u");
    text = text.replace(/ñ/gi,"n");
    return text;
 }

   }
  