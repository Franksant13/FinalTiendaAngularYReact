import React from 'react';
import * as request from 'superagent';
import {  BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import BarraNavegacion from './tienda/BarraNavegacion.jsx';
import Catalogo from './tienda/Catalogo.jsx';


class Tienda extends React.Component{

  constructor(props) {
    super(props)
      this.state = {
        catalogo: [],
        productos: [],
        listaCarrito : [],
        dataProductos: {},
      }
      this.filtrarCatalogo = this.filtrarCatalogo.bind(this);
  }

  componentWillMount(){
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
          this.setState({catalogo : nombres });
          this.setState({productos : this.state.catalogo});
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

          <div className="row mainProductosDiv">

            <div className="col s9">
              <h4>Catalogo de Productos</h4>
            </div>

            <div className="col s3">
              <form>
                <div className="input-field col s12">
                  <input onChange={this.filtrarCatalogo} placeholder="Buscar Producto" id="first_name" type="text" className="validate" required></input>
                  <label>Que estas buscando?</label>
                </div>
              </form>
            </div>

            <div className="col s12">
              {
                this.mostrarProductos()
              }
           </div>


          </div>
        </div>
      </div>
    )
  }

  mostrarProductos(){
    return this.state.productos.map(
              (producto) => { return <Catalogo key={ producto.nombreProducto } id={producto.nombreProducto}  nombre={ producto.nombreProducto } imagen={ producto.imagen } descripcion={ producto.precio } disponible={ producto.unidadesDisp } filtro ={this.state.palabraFiltro} /> }
            )
  }

  filtrarCatalogo(event){
    this.state.productos = this.state.catalogo;
    console.log(event.target.value);
    let palabraFiltro = event.target.value.toLowerCase();
    let itemMatch = [];

      for(let item of this.state.productos){
        let nombre = item.nombreProducto.toLowerCase();
        if(nombre.includes( palabraFiltro )){
          itemMatch.push(item)}
        }
      this.setState({productos : itemMatch});
      if(itemMatch.length == 0){
        this.state.productos = []
      }
      console.log(this.state.productos)
  }



}

export default Tienda;
