import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Platform, Gesture, AlertController, ModalController } from 'ionic-angular';
import { TextResource } from '../common/resources';
import { FileService } from '../common/services';
import { Location } from '../location';
import { LocationManager } from '../locationManager';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
 
    @ViewChild('canvasmap') element;
    @ViewChild('cnvs') myCanvas;
  private gesture: Gesture;
 
  private location: Location;
  private locationManager : LocationManager;
  private isCancelled: boolean;
  private modal: any;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  
  constructor(public navCtrl: NavController, public platform: Platform, private modalCtrl: ModalController, private alertCtrl: AlertController) {
      this.locationManager = LocationManager.getInstace();
      this.location = new Location();
  }

  ionViewDidLoad() {
    this.canvas = this.myCanvas.nativeElement;
	this.canvas.width = this.canvas.offsetWidth;
	this.canvas.height = this.canvas.offsetHeight;
   
	/*this.gesture = new Gesture(this.element.nativeElement);
	this.gesture.listen();
	this.gesture.on('pinch', e => this.pinchEvent(e));*/
  }
  
  /**
   * Public Methods
   */


  public setCoordinate(canvas,event){
  
    var rect = this.canvas.getBoundingClientRect();
    var context = this.canvas.getContext("2d");
    context.clearRect(this.location.xPosition, this.location.yPosition, TextResource.pinWidth, TextResource.pinHeight);

	var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    this.locationManager.setPoint(this.location,x, y);

	this.loadImage(context,this.location.xPosition,this.location.yPosition);
  }
  
  public addLocation(){
	this.presentAddLocationTextPrompt();
  }

   public presentCancelPrompt() {
    let alert = this.alertCtrl.create({
    title: 'Abbruch',
    message: 'Wollen Sie die Bearbeitung abbrechen?',
    buttons: [
      {
        text: 'Ja',
        role: 'cancel',
        handler: () => {
			this.pushHome();
		}
      },
      {
        text: 'Nein',
        handler: () => {
        }
      }
    ]
  });
  alert.present();
  }

    /**
     * Private Methods
     */
  
  private loadImage(context,x,y){
	var imageObj = new Image();
    imageObj.src = TextResource.pinUrl;
    imageObj.onload = function() {
        context.drawImage(imageObj, x, y, TextResource.pinWidth, TextResource.pinHeight);
    };
   }

  private presentAddLocationTextPrompt() {
      let alert = this.alertCtrl.create({
          title: 'Ortsbezeichnung',
          inputs: [
              {
                  name: 'locationName',
                  placeholder: 'Ortsname'
              }
          ],
          buttons: [
              {
                  text: 'Abbrechen',
                  role: 'cancel',
                  handler: data => {
                      console.log('Ortsangabe abgebrochen');
                 }
              },
              {
                  text: 'Hinzufügen',
                  handler: data => {
                      this.location.name = data.locationName;
                      if (this.location.isValid()) {
                          //var instance = LocationManager.getInstace();
                          this.locationManager.addLocation(this.location);
                          //FileService.saveLocation(this.location);
                      } else {
                          // invalid location
                          return false;
                      }
                  }
              }
          ]
      });
      alert.present();
  }
  
  private pushHome() {
    FileService.saveLocations(this.locationManager.getLocations());
    this.navCtrl.push(HomePage);
  }

  private pinchEvent(event) {
      console.log(event);
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




