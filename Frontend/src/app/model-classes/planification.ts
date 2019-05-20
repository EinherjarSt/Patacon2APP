import { Location } from '../model-classes/location';
import { Producer } from '../model-classes/producer';

export interface Planification {
    planification_id: number;
    ref_producer: Producer;
    ref_location: Location;
    kilograms: number; //kg
    containerType: string;
    harvestingType: string;//type
    quality: string;
    freight: string; //transport
    comment:string;
    grapeVariety: string;
    date: string;
}