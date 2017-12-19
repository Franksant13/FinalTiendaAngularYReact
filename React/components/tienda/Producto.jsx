import React from 'react';
import { Link } from 'react-router-dom'

class Producto extends React.Component{

  constructor(props){
    super(props)
    this.state = {

      }
    }

    render() {

    console.log(this.props.match.params);

        return(
        <div className="container productoContainer">
          <div className="row">
            <div className="col s12">
              <h3>{this.props.match.params.nombre}</h3>
            </div>
            <div className="col s6">
              <img src={"/assets/productos/" + this.props.match.params.nombre + ".jpg "}/>
              <Link to={`/tienda`} className="waves-effect grey lighten-3 btn">Atras</Link>
            </div>
            <div className="col s6">
              <div className="chip">
                <strong>Precio: </strong> {this.props.match.params.precio}
              </div>
              <br/>
              <div className="chip">
                <strong>Unidades Disponibles: </strong> {this.props.match.params.cantidad}
              </div>
            </div>
          </div>
        </div>
        )
    }


}
export default Producto;
