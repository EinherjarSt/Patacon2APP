import { Pipe, PipeTransform } from '@angular/core';
import {Trip} from '../model-classes/trip';
@Pipe({
  name: 'filterTripsByStatus'
})
export class FilterTripsByStatusPipe implements PipeTransform {

  transform(trips: Trip[], status_to_filter_by?: String[]): any {
    var isThereAnyFilterToApply = status_to_filter_by.length != 0;
    
    if(isThereAnyFilterToApply) 
    {
      var filtering_function = trip => status_to_filter_by.includes(trip.status);
      trips = trips.filter(filtering_function);
    }
    return trips;
  }

}
