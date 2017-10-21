import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { ToastController } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the GaleriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {
  private bandera = false;
  private banderaC = false;
  private banderaF = false;
  private indice = 0;
  public imagenes = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private nativeAudio: NativeAudio,
    private toastCtrl: ToastController, private deviceMotion: DeviceMotion, private vibration: Vibration) {
      this.CargarTematica();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GaleriaPage');
  }

  ngOnInit() {
    this.movimiento2();
  }

  CargarTematica() {
    this.imagenes = [
      {
        "url": "./assets/img/" +localStorage.getItem("tema")+ "/1.jpg"
      },
      {
        "url": "./assets/img/" +localStorage.getItem("tema")+ "/2.jpg"
      },
      {
        "url": "./assets/img/" +localStorage.getItem("tema")+ "/3.jpg"
      },
      {
        "url": "./assets/img/" +localStorage.getItem("tema")+ "/4.jpg"
      },
      {
        "url": "./assets/img/" +localStorage.getItem("tema")+ "/5.jpg"
      }
    ];    

    this.nativeAudio.preloadSimple('sonido', 'assets/sound/prip.mp3');
    
  }

  movimiento2() {
    var subscription = this.deviceMotion.watchAcceleration({ frequency: 80 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      //console.log(acceleration);

      if ((this.indice == 0) && (this.banderaC == false)) {
        this.banderaC = true;
        this.mensajeToast("Comienzo de la galería.");
        this.vibration.vibrate(1000);
      }

      if (this.indice != 4){
        this.banderaF = false;
      }

      if ((this.indice == 4) && (this.banderaF == false)) {
        this.banderaF = true;
        this.vibration.vibrate(1000);
      }       

      if ((acceleration.x < 0 - 5) && (this.bandera == false)) {
        this.bandera = true;
          if (this.indice == 4) {
            this.banderaC = false;
            this.indice = 0;
          } else {
            this.indice += 1;            
          }        
          this.imagenes[this.indice];
          this.nativeAudio.play('sonido');
      }
      
      if ((acceleration.x > 0 + 5) && (this.bandera == false)){
        this.bandera = true;
          if (this.indice == 0) {
            this.banderaC = false;
            this.indice = 0;
          } else {
            this.indice -= 1;
          }
          this.imagenes[this.indice];
          this.nativeAudio.play('sonido');
        }

        if ((acceleration.x > 0 - 2) && (acceleration.x < 0 + 2)){
          this.bandera = false;
        }
    });
  }

private mensajeToast(message: string)
{
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000
  });
  toast.present();
}

}
