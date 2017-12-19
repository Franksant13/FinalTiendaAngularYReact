import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { Response } from '@angular/http';

import { AppComponent } from '../app.component';

import {AfterViewInit} from '@angular/core';

import {Location} from '@angular/common';

import { NotificacionCarritoService } from '../notificacion-carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, AfterViewInit {

  constructor(private httpService : HttpService, public appComponent : AppComponent, private _location: Location, private notificacionCarritoService : NotificacionCarritoService) { }

  carritoProductos;
  precioTotal: number = 0.0;
  productosDatos;

  ngOnInit() {
    this.appComponent.changeValue();

    var numElemCarrito = this.httpService.getCarrito();
    numElemCarrito.subscribe((data: Response)=>{
      let carrito : any[] = [];
      for (var key in data) {
           carrito.push(data[key]);
      }
      this.carritoProductos = carrito;
      console.log(data)

      let precioInd = 0;
      for(var i = 0; i < this.carritoProductos.length; i++){
        precioInd = parseFloat(this.carritoProductos[i].precioProducto) * parseFloat(this.carritoProductos[i].cantidad);
        this.precioTotal = this.precioTotal + precioInd;
      }

    })
  }

  ngAfterViewInit() {
    var subTotales = document.getElementsByClassName('subtotalProductos');

    for(var i = 0; i < subTotales.length; i++){
      this.precioTotal = this.precioTotal + parseFloat(subTotales[i].innerHTML);
    }
  }

  PagarCarrito(){

    var datosProductos = this.httpService.getProductos();
    datosProductos.subscribe((data: Response)=>{

      let nombres : any[] = [];
      for (var key in data) {
           nombres.push(data[key]);
      }
      this.productosDatos = nombres;

      for(var i = 0; i < this.carritoProductos.length; i++){

        let cantidadActual = 0;
        for(var j = 0; j < this.productosDatos.length; j++){
          if(this.productosDatos[j].nombreProducto == this.carritoProductos[i].nombreProducto){
            cantidadActual = this.productosDatos[j].unidadesDisp;
          }
        }

        //Actualizar Productos
        let nuevaCantidad = cantidadActual - this.carritoProductos[i].cantidad;
        var elim = this.httpService.editProductos(this.carritoProductos[i].nombreProducto, nuevaCantidad);
        elim.subscribe((data: Response)=>{
          console.log(data);
        })

        //Eliminar Productos del Carrito
        var elim = this.httpService.deleteCarrito(this.carritoProductos[i].id);
        elim.subscribe((data: Response)=>{
          console.log(data);
        })
      }

    });

    this.notificacionCarritoService.sendMessage(0);
    this._location.back();
  }

}
