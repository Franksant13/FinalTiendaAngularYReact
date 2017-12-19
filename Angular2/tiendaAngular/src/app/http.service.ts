import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private http : Http) { }

  getDatos(){
    return this.http.get('https://storenextu.firebaseio.com/users/.json').map((response: Response)=>response.json())
  }

  getProductos(){
    return this.http.get('https://storenextu.firebaseio.com/products/.json').map((response: Response)=>response.json())
  }

  setCarrito(infoCarrito: any){
    let datos = JSON.stringify(infoCarrito);
    return this.http.post('https://storenextu.firebaseio.com/carrito/.json', datos).map((response: Response)=>response.json())
  }

  setCarritoId(idCarrito: any, info: any){
    let carritoURL = 'https://storenextu.firebaseio.com/carrito/' + idCarrito + '/.json';
    let newDato = {
      'id': idCarrito,
      "cantidad" : info.cantidad,
      "imagenProducto": info.imagenProducto,
      "precioProducto": info.precioProducto,
      "nombreProducto" : info.nombreProducto,
      "usuario" : info.usuario
    };
    return this.http.put(carritoURL, newDato).map((response: Response)=>response.json())
  }

  getCarrito(){
    return this.http.get('https://storenextu.firebaseio.com/carrito/.json').map((response: Response)=>response.json())
  }

  editProductos(nombreProducto, newDato){
    let urlProducto = 'https://storenextu.firebaseio.com/products/' + nombreProducto + '/.json'
    let newDatoCantidad = {"unidadesDisp":newDato};
    return this.http.patch(urlProducto, newDatoCantidad).map((response: Response)=>response.json())
  }

  deleteCarrito(idProducto){
    let carritoURL = 'https://storenextu.firebaseio.com/carrito/' + idProducto + '/.json';
    return this.http.delete(carritoURL).map((response: Response)=>response.json())
  }

}
