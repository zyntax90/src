import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Gesture, AlertController } from 'ionic-angular';
import { TextResource } from '../common/resources';
import { FileService } from '../common/services';
import { LocationManager } from '../locationManager';
import { Npc } from '../game/npc';
import { Player } from '../game/player';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
 
  @ViewChild('canvasmap') element;
  @ViewChild('cnvs') myCanvas;

  private gesture: Gesture;

  private npc: Npc;
  private player: Player;

  private locationManager : LocationManager;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public question: string;
  public resultDiff : string;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
      this.locationManager = LocationManager.getInstace();
      //Test
      this.player = new Player();
      this.loadNextLocation();
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

  public setCoordinate(canvas, event,isPlayer) {
      //TODO
      var rect = this.canvas.getBoundingClientRect();
      var context = this.canvas.getContext("2d");
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;

      this.clearCanvas(context, isPlayer);

      if (isPlayer) {   
          this.locationManager.setPoint(this.player.location,x, y);
          this.loadImage(context, this.player.location.xPosition, this.player.location.yPosition, isPlayer);
      } else {
         // this.locationManager.setPoint(this.npc.location, x, y);
          this.loadImage(context, this.npc.location.xPosition, this.npc.location.yPosition, isPlayer);
      }
  }

  public confirmLocation(){
	if (this.player.isConfirmed) return;
      this.player.isConfirmed = true;
      var event = { clientX: this.npc.location.xPosition, clientY:  this.npc.location.yPosition};
      this.setCoordinate(this.canvas, event, false);
      //drawLine

      var textResult = <HTMLParagraphElement>document.getElementById('result');
      this.resultDiff = this.getDifferenceValue() + " Km";
      textResult.style.visibility = "visible";
      
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

    private getDifferenceValue():number {
        return this.locationManager.getPointsApart(this.player.location, this.npc.location);
    }

  private presentPlayerInputPrompt() {
      //TODO
  }

  private loadNextLocation() {
      this.npc = new Npc();
      this.npc.setLocation(this.locationManager.getRandomLocation());
      this.question = "Wo ist " + this.npc.location.name + "?";
  }

  private clearCanvas(context,isPlayer) {
      if(isPlayer)
          context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private loadImage(context,x,y,isPlayer){
	var imageObj = new Image();
    imageObj.src = isPlayer ? TextResource.pinUrl : TextResource.pin2Url;
    imageObj.onload = function() {
		context.drawImage(imageObj, x, y, 20, 20);
    };
  }
  
  private pushHome() {
      this.navCtrl.push(HomePage);
  }

  private pinchEvent(event) {
      console.log(event);
  }
 
}




