export interface Planification {
    planification_id: number;
    ref_producer: string;
    ref_location: string;
    kilograms: number; //kg
    containerType: string;
    harvestingType: string;//type
    quality: string;
    freight: string; //transport
    comment:string;
    grapeVariety: string;
    date: string;
}