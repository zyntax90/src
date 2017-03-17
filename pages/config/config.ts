import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Gesture, AlertController } from 'ionic-angular';
import { TextResource } from '../resources';
import { FileService } from '../services';
import { Location } from '../location';
import { LocationManager } from '../locationManager';


@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
 
  @ViewChild('canvasmap') element;
  private gesture: Gesture;
 
  private location: Location;
  private locationManager : LocationManager;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
      this.locationManager = LocationManager.getInstace();
      this.location = new Location();
  }
  
  ionViewDidLoad() {
	this.canvas = <HTMLCanvasElement>document.getElementById('cnvs');
	this.canvas.width = this.canvas.offsetWidth;
	this.canvas.height = this.canvas.offsetHeight;
   
	/*this.gesture = new Gesture(this.element.nativeElement);
	this.gesture.listen();
	this.gesture.on('pinch', e => this.pinchEvent(e));*/
  }
  
  
  private pinchEvent(event) {
    console.log(event);
  }
  
  public setCoordinate(canvas,event){
  
    var rect = this.canvas.getBoundingClientRect();
	var context = this.canvas.getContext("2d");
	
	var x = event.clientX - rect.left;
	var y= event.clientY - rect.top;
    this.location.setPoint(x, y);

	context.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.loadImage(context,this.location.xPosition,this.location.yPosition);
  }
  
  public addLocation(){
	this.presentAddLocationTextPrompt();
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
  
  private loadImage(context,x,y){
	var imageObj = new Image();
    imageObj.src = TextResource.pinUrl;
    imageObj.onload = function() {
		context.drawImage(imageObj, x, y, 20, 20);
    };
  }
  
  public pushHome() {
      FileService.saveLocations(this.locationManager.getLocations());
      this.navCtrl.push(HomePage);
  }
 
}




