import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { TiendaComponent } from '../tienda/tienda.component';
import { ProductoComponent } from '../producto/producto.component';
import { CarritoComponent } from '../carrito/carrito.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'carrito', component: CarritoComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
