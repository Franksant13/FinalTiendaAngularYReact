import React from 'react';
import * as request from 'superagent';
import {  BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

class LoginForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      mensaje: '',
      data: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentWillMount(){
    request
      .get('https://storenextu.firebaseio.com/users/.json')
      .end((err, res)=>{
        if(err || !res.ok){
          console.log("Error: " + err);
        }else{
          this.setState({data: res.body});
        }
      })
  }

  render(){

    if (this.checkSession()){
      return <Redirect to='/tienda'/>
    }

    return(
      <div className="login row">
        <div className="col s6 form-container animated fadeIn slow">
          <form onSubmit={this.checkLogin}>
            <h4 className="text-center white-text">Inicia Sesión</h4>
            <div className="col s12 input-field">
              <input type="email" ref="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="Mail" className="validate white-text" required aria-required="true" />
              <label htmlFor="email" data-error="Error en formato de email. Ejemplo: mail@mail.com" data-success="Formato de email correcto">Correo Electrónico</label>
            </div>
            <div className="col s12 input-field">
              <input type="password" ref="password" id="password" value={this.state.password} onChange={this.handleChange} placeholder="Constraseña" className="validate  white-text" required aria-required="true" />
              <label htmlFor="password" data-error="Contraseña no puede ser vacía" className="white-text">Contraseña</label>
            </div>
            <div className="col s12 center-align">
              <div className="mensaje">
              {this.state.mensaje}
              </div>
              <button type="submit" className="btn btn-success" >Ingresar</button>
            </div>
          </form>
        </div>
      </div>
   );

 }



//Verificar Sesión
  checkSession(){
    return sessionStorage.getItem("Session");
  }

//Obtener Valor Inputs Formulario
  handleChange(event) {
    if(event.target.id == "email"){
      this.setState({email: event.target.value});
    }
    if(event.target.id == "password"){
        this.setState({password: event.target.value});
    }
  }

//Verificar Usuario
  checkLogin(event) {
    event.preventDefault();

    let email = this.state.email.toLowerCase()
    //let emailId = email.replace(/[^a-zA-Z 0-9.]+/g,'').replace(/\./g,'');
    let password = this.state.password;
    let mensajeLogin = '';



    for (var key in this.state.data) {
    console.log(this.state.data[key].mail + "  " + email);
        if(email == this.state.data[key].mail && password == this.state.data[key].pass){
          mensajeLogin = "Iniciando Sesión";
          window.sessionStorage.setItem("Session", email);
          break;
        }else{
          mensajeLogin = 'Credenciales incorrectos';
        }
      }



    this.setState({mensaje : mensajeLogin});
  }

}

export default LoginForm;
