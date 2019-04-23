import { Component, Input, Output, EventEmitter } from '@angular/core';
//import { NativeStorage } from '@ionic-native/native-storage';
//import { QueryProvider } from '../../providers/query/query';

@Component({
  selector: 'oc-hours',
  templateUrl: 'oc-hours.html'
})
export class OcHoursComponent {

  @Input('ocTimings') ocTimings: any;
  @Output() timingUploaded = new EventEmitter();

  weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  timings = [];

  constructor(
    //private angQuery: QueryProvider,
  //  private nativeStorage: NativeStorage
  ) {
    this.weekDays.forEach(data => {
      this.timings.push({ 'day': data, status: 'open', from: '09:00', to: '23:00' });
    })
  }

  save(timings) {
    this.timingUploaded.emit(timings);
  }

}
