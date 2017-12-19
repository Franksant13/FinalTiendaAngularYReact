import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Producto from './Producto.jsx';
import Carrito from './Carrito.jsx';
import LoginForm from '../Login.jsx';



class Main extends React.Component{
constructor(){
  super()
  this.state = {
      numCarrito: 1
    }
    this.changeNumCarrito = this.changeNumCarrito.bind(this);
  }

  changeNumCarrito(){
    this.setState({numCarrito : this.state.numCarrito + 1});
  }

  render(){
      return(

          <nav>
            <div className="nav-wrapper grey lighten-5">
              <a onClick={this.changeNumCarrito} className="brand-logo">La Bodega</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/tienda" className="text-shadow active"><i className="material-icons">apps</i></Link></li>
                <li><Link to="/carrito" className="text-shadow active"><i className="material-icons">shopping_cart</i></Link> <div id="numIcon"><p>{this.state.numCarrito}</p></div></li>
                <li className="cursor " onClick={this.logout}><Link to="/login"><i className="material-icons">redo</i></Link></li>
              </ul>
            </div>
          </nav>
        );
  }

  logout(){
    sessionStorage.removeItem('Session'); //Eliminar los datos de la sesión
  }


}
export default Main;
