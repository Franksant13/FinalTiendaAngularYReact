import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CarritoComponent } from './carrito/carrito.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpService } from './http.service';
import { BarraNavComponent } from './barra-nav/barra-nav.component';
import { ProductoComponent } from './producto/producto.component';

import { NotificacionCarritoService } from './notificacion-carrito.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TiendaComponent,
    CarritoComponent,
    BarraNavComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [HttpService, NotificacionCarritoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
