import { AbstractControl } from '@angular/forms';

export function EstimatedDatesValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const departureDate = control.get('estimatedArrivalDateAtProducer');
  const returnDate = control.get('estimatedArrivalDateAtPatacon');
  
  if (departureDate.pristine || returnDate.pristine) {
    return null;
  }
  return departureDate.value.getTime() >= returnDate.value.getTime() ? { 'returnBehindDepartureDate': true } : null;
}