import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import { AppComponent } from '../app.component'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public nombreProducto: string;
  public imageProducto: string;
  public cantidadProducto: string;
  public precioProducto: string;

  constructor(private route: ActivatedRoute, public appComponent : AppComponent) {
    this.route.queryParams.subscribe(params => {
          this.nombreProducto = params["nombreProducto"];
          this.imageProducto = params["imagenProducto"];
          this.cantidadProducto = params["unidadesProducto"];
          this.precioProducto = params["precioProducto"];
      });
  }

  ngOnInit() {
    this.appComponent.changeValue();
  }

}
