import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppComponent } from '../app.component';

import { HttpService } from '../http.service';
import { Response } from '@angular/http';

import { Subscription } from 'rxjs/Subscription';
import { NotificacionCarritoService } from '../notificacion-carrito.service';

@Component({
  selector: 'app-barra-nav',
  templateUrl: './barra-nav.component.html',
  styleUrls: ['./barra-nav.component.css']
})

export class BarraNavComponent implements OnInit, OnDestroy {

  showNumber: boolean = false;
  message: any;
  subscription: Subscription;

  constructor(private httpService : HttpService, public appComponent : AppComponent, private notificacionCarritoService: NotificacionCarritoService) {
  }


  ngOnInit() {

    this.subscription = this.notificacionCarritoService.notifyObservable$.subscribe(message => {
      this.message = message;
    });

    var numElemCarrito = this.httpService.getCarrito();
    numElemCarrito.subscribe((data: Response)=>{
      let carrito : any[] = [];
      for (var key in data) {
           carrito.push(data[key]);
      }
      this.message = carrito.length;
    })

    if(this.message == 0){
      this.showNumber = false;
    }else{
      this.showNumber = true;
    }

  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  hideBar(){
    this.appComponent.hideBar();
  }

}
