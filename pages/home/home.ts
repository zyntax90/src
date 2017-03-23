import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { ConfigPage } from '../config/config';
import { GamePage } from '../game/game';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
    private modal: any;
    constructor(public navCtrl: NavController, public platform: Platform) {
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

  /**
  *Special
  */
  backButtonAction() {
      /* checks if modal is open */
      if (this.modal && this.modal.index === 0) {
          /* closes modal */
          console.log("here");
          //this.pushHome();
      } else {
          /* exits the app, since this is the main/first tab */
          this.platform.exitApp();
          // this.navCtrl.setRoot(AnotherPage);  <-- if you wanted to go to another page
      }
  }

}
