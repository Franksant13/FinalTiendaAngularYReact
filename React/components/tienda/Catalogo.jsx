import React from 'react'
import { Link } from 'react-router-dom'
import update from 'immutability-helper';
import * as request from 'superagent';

import BarraNavegacion from './BarraNavegacion.jsx';

class Catalogo extends React.Component {

  componentWillMount(){
    this.setState({loader:true});
   }

  constructor(props) {
    super(props);
    this.state = {
      inputValue : 1,
      listaProductos: [],
      listaCarrito: [],
      loader : true,
      usuario : window.sessionStorage.getItem("Session")
    };

    this.agregarProducto = this.agregarProducto.bind(this);
  }

  render() {
    return (

    <div className="col s3 containerProductos">
      <div className="card">

       <div className="card-image">
         <img src={this.props.imagen}/>
         <span className="card-title tituloProducto">{this.props.nombre}</span>
       </div>

       <div className="card-content">

         <p><strong>Precio:</strong> $ {this.props.descripcion}</p>
         <p><strong>Unidades Disponibles:</strong> {this.props.disponible}</p>
         <br/>
         <Link to={`/producto/${this.props.id}/${this.props.descripcion}/${this.props.disponible}/${this.props.imagen}`} className="waves-effect  blue darken-3 btn">Ver Mas</Link>
         <br/>
         <br/>
         <div className="addCarrito">
           <a onClick={this.agregarProducto} className="btn-floating btn-large waves-effect amber darken-1"><i className="material-icons">add</i></a>
           <input type="number" min="1" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
         </div>

       </div>

     </div>
    </div>

    )
  }

//Listener para busqueda
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  componentWillMount(){
    this.setState({loader:false});
  }

//Agregar Productos Al Carrito
  agregarProducto(){

    let envioInfo = {
      "cantidad" : this.state.inputValue,
      "imagenProducto": this.props.imagen,
      "precioProducto": this.props.descripcion,
      "nombreProducto" : this.props.nombre,
      "usuario" : this.state.usuario
    }

    request
      .post('https://storenextu.firebaseio.com/carrito/.json')
      .send(envioInfo)
      .end((err, res)=>{
        if(err || !res.ok){
          console.log("Error: " + err);
        }else{
          let newDato = {
            'id': res.body.name,
            "cantidad" : this.state.inputValue,
            "imagenProducto": this.props.imagen,
            "precioProducto": this.props.descripcion,
            "nombreProducto" : this.props.nombre,
            "usuario" : this.state.usuario
          };
          console.log(res.body.name)
          request
          .put('https://storenextu.firebaseio.com/carrito/' + res.body.name + '/.json')
          .send(newDato)
          .end((err, res)=>{
            if(err || !res.ok){
              console.log("Error: " + err);
            }else{
              console.log(res)
            }
          })
        }
      })

    console.log(envioInfo);

  }

}

export default Catalogo
