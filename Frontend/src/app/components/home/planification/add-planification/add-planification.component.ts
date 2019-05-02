import { Component, OnInit } from '@angular/core';
import { ProducersService } from '../../../../services/producers.service'
import { Producer} from '../../../../model-classes/producer';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-planification',
  templateUrl: './add-planification.component.html',
  styleUrls: ['./add-planification.component.css']
})
export class AddPlanificationComponent implements OnInit {
  producers :Producer[];
  myControl = new FormControl();
  filteredOptions: Observable<Producer[]>;

  constructor( private producerService: ProducersService) { 
    this.getProducers();
  }

  getProducers(){
    this.producers = this.producerService.getProducers();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: Producer): Producer[] {
    const filterValue = value.name.toLowerCase();

    return this.producers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
