import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-resources',
})
export class TextResource {
 
  public static pinUrl: string = "img/pin.ico";
  public static pin2Url: string = "img/pin2.ico";
  public static mapUrl : string = "img/europe.jpg";
	
  constructor(public navCtrl: NavController) {
  }
}