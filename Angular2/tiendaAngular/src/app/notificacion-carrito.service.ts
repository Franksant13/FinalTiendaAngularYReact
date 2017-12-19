import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificacionCarritoService {

  constructor() { }

  private subject = new Subject<any>();

  sendMessage(message: any) {
    this.subject.next(message);
    console.log(message);
  }

  notifyObservable$ = this.subject.asObservable();

  // getMessage(): Observable<any> {
  //     return this.subject.asObservable();
  // }

}
