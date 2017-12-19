import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, browserHistory, IndexRoute } from 'react-router-dom'

import LoginForm from './components/Login.jsx';
import Tienda from './components/Tienda.jsx';
import Carrito from './components/tienda/Carrito.jsx';
import Producto from './components/tienda/Producto.jsx'

ReactDOM.render(

    <Router history={browserHistory} >
      <div>
        <Route path="/login" component={LoginForm}/>
        <Route path="/tienda" component={Tienda}/>
        <Route path="/carrito" component={Carrito}/>
        <Route path='/producto/:nombre/:precio/:cantidad/:imagen' component={Producto}/>
        <Route path="/" component={LoginForm}/>
      </div>
    </Router>
  , document.getElementById('app')
)
