import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-common',
  templateUrl: 'common.html'
})
export class Common {
 
  public static pinUrl : string = "img/pin.ico";
  public static mapUrl : string = "img/europe.jpg";
	
  constructor(public navCtrl: NavController) {
  }
}
