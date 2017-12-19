import React from 'react'
import { Link } from 'react-router-dom'
import update from 'immutability-helper';
import * as request from 'superagent';

class CatalogoCarrito extends React.Component {

  render() {
    return (
      <div>

        <div className="row productosCarrito">

          <div className="col s2">
            <img src={this.props.imagen}/>
          </div>

          <div className="col s2">
            {this.props.nombre}
            <strong>Unidades: </strong> {this.props.cantidad}
          </div>

          <div className="col s12">
            <strong>Subtotal($): </strong> <p className="subtotalProductos"> { this.props.precio * this.props.cantidad}</p>
          </div>

        </div>

      </div>
    )
  }

}

export default CatalogoCarrito
