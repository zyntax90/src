import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
 
  constructor(public navCtrl: NavController) {
   
  }
  
  public getCoordinate(event){
  
  }
  
  public pushHome(){
	this.navCtrl.push(HomePage);
  }

}
