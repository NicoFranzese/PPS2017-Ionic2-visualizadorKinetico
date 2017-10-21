import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GaleriaPage } from '../galeria/galeria';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  MarioBross(){
    localStorage.setItem("tema","MarioBross");
    this.navCtrl.push(GaleriaPage);
  }

  Animales(){
    localStorage.setItem("tema","Animales");
    this.navCtrl.push(GaleriaPage);
  }

  Autos(){
    localStorage.setItem("tema","Autos");
    this.navCtrl.push(GaleriaPage);
  }

}
