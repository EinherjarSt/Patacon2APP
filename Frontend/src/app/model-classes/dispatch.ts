export class Dispatch {
    constructor(
      public id: number,
      public driverReference: string,
      public truckReference: number,
      public planificationReference: string,
      public shippedKilograms: number,
      public arrivalAtPataconDate: string,
      public arrivalAtPataconTime: string,
      public arrivalAtVineyardDate: string,
      public arrivalAtVineyardTime: string,
      public status: string,
      public containerType: string
    ) {}
   
  }

  