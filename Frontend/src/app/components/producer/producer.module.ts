import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProducerRoutingModule } from './producer-routing.module';
import { ProducerComponent } from './producer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    ProducerComponent
  ],
  imports: [
    CommonModule,
    ProducerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1HH5VHGjmUH6NH_nWbquzVovye0VtNyc'
    })
  ]
})
export class ProducerModule { }