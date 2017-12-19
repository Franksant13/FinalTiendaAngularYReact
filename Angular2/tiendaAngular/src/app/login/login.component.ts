import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpService : HttpService, public router: Router) { }

  ngOnInit() {
  }

  show: boolean = false;
  user: string = "";

  onSubmit(form) {
    //obtiene los valores desde el form
    var usuario = form.value.usuario;
    var pass = form.value.pass;

    //Lectura de Base de datos
    var sesion = '';
    var datos = this.httpService.getDatos();
    datos.subscribe((data: Response)=>{
      for (var key in data) {
        if(usuario == data[key].mail && pass == data[key].pass){
          sesion = data[key].mail;
          this.user = usuario;
          window.sessionStorage.setItem("UsuarioLogeado",this.user);
          break;
        }
      }

      if(sesion != ''){
        this.router.navigate(['tienda']);
        this.show = false
      }else{
        this.show = true
      }

    });

  };

}
