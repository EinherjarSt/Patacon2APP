import { AbstractControl } from '@angular/forms';

export function EstimatedDatesValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const departureDate = control.get('estimatedArrivalDateAtProducer');
  const returnDate = control.get('estimatedArrivalDateAtPatacon');
  const departureTime = control.get('estimatedArrivalDateAtProducer');
  const returnTime = control.get('estimatedArrivalTimeAtPatacon');

  if (departureDate.pristine || returnDate.pristine || departureTime.pristine || returnTime.pristine) {
    return null;
  }
  console.log(returnDate.value.isBefore(departureDate.value));
  return returnDate.value.isBefore(departureDate.value  || returnTime.value < departureTime.value )? { 'returnBehindDepartureDate': true } : null;
}