import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-resources',
})
export class TextResource {
 
  public static pinUrl: string = "img/pin.ico";
  public static pinWidth: number = 20;
  public static pinHeight: number = 20;
  public static pin2Url: string = "img/pin2.ico";
  public static mapUrl : string = "img/europe.jpg";

  public static literal_hasWon: string = " hat gewonnen";

  constructor(public navCtrl: NavController) {
  }
}
