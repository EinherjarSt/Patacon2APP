import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { pluck, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  height$: Observable<number>;
  width$: Observable<number>;
  //create more Observables as and when needed for various properties

  constructor() {
    let windowSize$ = new BehaviorSubject(getWindowSize());

    this.height$ = windowSize$.pipe(pluck('height'), distinctUntilChanged()) as Observable<number>;
    this.width$ = windowSize$.pipe(pluck('width'), distinctUntilChanged()) as Observable<number>;

    fromEvent(window, 'resize').pipe(map(getWindowSize)).subscribe(windowSize$);
  }
}

function getWindowSize() {
  return {
    height: window.innerHeight,
    width: window.innerWidth
  };
};