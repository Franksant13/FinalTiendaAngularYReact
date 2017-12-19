import { Component, OnInit } from '@angular/core';

import {Router, NavigationExtras} from "@angular/router";

import { HttpService } from '../http.service';
import { Response } from '@angular/http';

import { AppComponent } from '../app.component';

import { NotificacionCarritoService } from '../notificacion-carrito.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  constructor(private httpService : HttpService, public appComponent : AppComponent, private router : Router, private notificacionCarritoService : NotificacionCarritoService) { }

  productosNombres;
  productosNombresFiltro;
  show: boolean = true;
  usuario: string = '';

  ngOnInit() {
    this.usuario = window.sessionStorage.getItem("UsuarioLogeado");

    this.appComponent.changeValue();

    var datosProductos = this.httpService.getProductos();
    datosProductos.subscribe((data: Response)=>{

      let nombres : any[] = [];
      for (var key in data) {
           nombres.push(data[key]);
      }
      this.productosNombres = nombres;
      console.log(this.productosNombres);
    });

  }

  onSearchChange(searchValue : string ) {
    this.show = false;
    let productosFiltrados : any[] = [];
    for(var i = 0; i < this.productosNombres.length; i++){
      let nombre = this.productosNombres[i].nombreProducto;
      let comparacion = searchValue.length;
      var res = nombre.slice(0, comparacion);
      res = res.toLowerCase();
      searchValue = searchValue.toLowerCase();
      if(res == searchValue){
        productosFiltrados.push(this.productosNombres[i]);
      }
    }
    this.productosNombresFiltro = productosFiltrados;
    console.log(this.productosNombresFiltro);
  }

  abrirProducto(nombreProductoClick){
    let nomProd, imgProd, precioProd, unProd;

    for(var i = 0; i < this.productosNombres.length; i++){
      let nombre = this.productosNombres[i].nombreProducto;
      if(nombre == nombreProductoClick){
        nomProd = this.productosNombres[i].nombreProducto;
        imgProd = this.productosNombres[i].imagen;
        precioProd = this.productosNombres[i].precio;
        unProd = this.productosNombres[i].unidadesDisp;
      }
    }

    let navigationExtras: NavigationExtras = {
        queryParams: {
            "nombreProducto": nomProd,
            "imagenProducto": imgProd,
            "precioProducto": precioProd,
            "unidadesProducto": unProd
        }
    };
    this.router.navigate(["producto"], navigationExtras);
  }

  agregarCarrito(cantidad:string, nombre:string, imagen:string, precio:string){
    let envioInfo = {
        "cantidad" : cantidad,
        "imagenProducto": imagen,
        "precioProducto": precio,
        "nombreProducto" : nombre,
        "usuario" : this.usuario
    }
    var envio = this.httpService.setCarrito(envioInfo);
    envio.subscribe((data1: Response)=>{
      //console.log(data['name']);
      var envio2 = this.httpService.setCarritoId(data1['name'], envioInfo);
      envio2.subscribe((data2: Response)=>{
        console.log(data2);
        var numElemCarrito = this.httpService.getCarrito();
        numElemCarrito.subscribe((data: Response)=>{
          console.log(data);
          let carrito : any[] = [];
          for (var key in data) {
               carrito.push(data[key]);
          }

          this.notificacionCarritoService.sendMessage(carrito.length);
          console.log(carrito.length)
        })
      })
    })

  }

}
