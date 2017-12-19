import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showNavBar: boolean = false;

  changeValue(){
    this.showNavBar = true;
  }

  hideBar(){
    this.showNavBar = false;
  }

}
