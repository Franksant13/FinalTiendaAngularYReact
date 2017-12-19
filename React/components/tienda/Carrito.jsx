import React from 'react';
import * as request from 'superagent';
import {  BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import BarraNavegacion from './BarraNavegacion.jsx';
import CatalogoCarrito from './catalogoCarrito.jsx';

class Carrito extends React.Component{

  constructor(){
    super()
    this.state = {
        precioFinal: 0,
        catalogo: [],
        productos: [],
      }
      this.pagarProductos = this.pagarProductos.bind(this);
    }

    componentWillMount(){
      request
        .get('https://storenextu.firebaseio.com/carrito/.json')
        .end((err, res)=>{
          if(err || !res.ok){
            console.log("Error: " + err);
          }else{
            let nombres = [];
            for (var key in res.body) {
              nombres.push(res.body[key]);
            }
            this.setState({catalogo : nombres });
            this.setState({productos : this.state.catalogo});

            let precioInd = 0;
            for(var i = 0; i < nombres.length; i++){
              precioInd = nombres[i].precioProducto * nombres[i].cantidad;
              this.setState({precioFinal : this.state.precioFinal + precioInd});
            }
              console.log(this.state.precioFinal);

          }

        })
    }


    render(){
        return(
          <div className="tienda row">

            <div className="container">
              <BarraNavegacion />
            </div>

            <div className="container">
              <h3>Carrito de compras</h3>
              <div className="row">

                <div className="col s6">

                    {
                      this.mostrarProductos()
                    }

                </div>

                <div className="col s6">
                  <h3>Total ($): </h3>
                  <h3>{this.state.precioFinal}</h3>
                  <a onClick={this.pagarProductos} className="waves-effect waves-light btn">Pagar</a>
                </div>

              </div>
            </div>

          </div>
       );
    }

    mostrarProductos(){
      return this.state.productos.map(
        (producto) => { return <CatalogoCarrito key={producto.id} nombre={ producto.nombreProducto } precio={ producto.precioProducto } imagen={ producto.imagenProducto } cantidad={ producto.cantidad }  /> }
      )
    }

    pagarProductos(){

      request
        .get('https://storenextu.firebaseio.com/products/.json')
        .end((err, res)=>{
          if(err || !res.ok){
            console.log("Error: " + err);
          }else{

            let nombres = [];
            for (var key in res.body) {
              nombres.push(res.body[key]);
            }
            for(var i = 0; i < this.state.productos.length; i++){

              let cantidadActual = 0;
              for(var j = 0; j < nombres.length; j++){
                if(this.state.productos[i].nombreProducto == nombres[j].nombreProducto){
                  cantidadActual = nombres[j].unidadesDisp;

                }
              }

              //Actualizar Productos
              let nuevaCantidad = cantidadActual - this.state.productos[i].cantidad;
              let nuevoValor = {"unidadesDisp":nuevaCantidad}
              request
                .patch('https://storenextu.firebaseio.com/products/' + this.state.productos[i].nombreProducto + '/.json')
                .send(nuevoValor)
                .end((err, res)=>{
                  if(err || !res.ok){
                    console.log("Error: " + err);
                  }else{
                    console.log(res)
                  }
                })

              //Eliminar carrito
              request
                .delete('https://storenextu.firebaseio.com/carrito/' + this.state.productos[i].id + '/.json')
                .end((err, res)=>{
                  if(err || !res.ok){
                    console.log("Error: " + err);
                  }else{
                    console.log(res)
                    this.props.history.push('/tienda');
                  }
                })
            }
          }
        })

    }

}
export default Carrito;
