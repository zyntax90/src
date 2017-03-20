import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigPage } from '../config/config';
import { GamePage } from '../game/game';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  
  constructor(public navCtrl: NavController) {
  }
  
  public pushConfig(event, item){
	this.navCtrl.push(ConfigPage, {
	item: item
	});
  }
  
  public pushGame(event, item){
      this.navCtrl.push(GamePage, {
          item: item
      });
  }

}
