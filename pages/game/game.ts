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
  @ViewChild('resultone') myResultOne;
  @ViewChild('resulttwo') myResultTwo;

  private gesture: Gesture;

  private npc: Npc;
  private playerOne: Player;
  private playerTwo: Player;

  private locationManager : LocationManager;
  public canvas: HTMLCanvasElement;
  public resultOne: HTMLParagraphElement;
  public resultTwo: HTMLParagraphElement;
  public question: string;
  public resultDiffOne: string;
  public resultDiffTwo: string;

  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
      this.locationManager = LocationManager.getInstace();
      this.npc = new Npc();
      this.playerOne = new Player();
      this.playerTwo = new Player();
      this.loadNextLocation();
  }
  
  ionViewDidLoad() {
    this.canvas = this.myCanvas.nativeElement;
	this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.resultOne = this.myResultOne.nativeElement;
    this.resultTwo = this.myResultTwo.nativeElement;


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
          if (!this.playerOne.isConfirmed) {
              this.locationManager.setPoint(this.playerOne.location, x, y);
              this.loadImage(context, this.playerOne.location.xPosition, this.playerOne.location.yPosition, isPlayer);
          } else {
              this.loadImage(context, this.playerOne.location.xPosition, this.playerOne.location.yPosition, isPlayer);
              this.locationManager.setPoint(this.playerTwo.location, x, y);
              this.loadImage(context, this.playerTwo.location.xPosition, this.playerTwo.location.yPosition, isPlayer);
          }
      } else {
          this.loadImage(context, this.npc.location.xPosition, this.npc.location.yPosition, isPlayer);
      }
  }

  public confirmLocation() {
      if (!this.playerOne.isConfirmed)
          this.playerOne.isConfirmed = true;
      else
          this.playerTwo.isConfirmed = true;
      this.checkWinner();
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

    private checkWinner() {
        if (!this.playerOne.isConfirmed || !this.playerTwo.isConfirmed) return;
        var event = { clientX: this.npc.location.xPosition, clientY: this.npc.location.yPosition };
        this.setCoordinate(this.canvas, event, false);
        this.drawLineDiff(this.playerOne.location);
        this.drawLineDiff(this.playerTwo.location);
        this.resultDiffOne = this.getDifferenceValue(this.playerOne.location) + " Km";
        this.resultOne.style.visibility = "visible";
        this.resultDiffTwo = this.getDifferenceValue(this.playerTwo.location) + " Km";
        this.resultTwo.style.visibility = "visible";
    }

    private getDifferenceValue(fromLocation):number {
        return this.locationManager.getPointsApart(fromLocation, this.npc.location);
    }

  private presentPlayerInputPrompt() {
      //TODO
  }

  private loadNextLocation() {
      this.npc.setLocation(this.locationManager.getRandomLocation());
      this.question = "Wo ist " + this.npc.location.name + "?";
  }

  private clearCanvas(context,isPlayer) {
      if(isPlayer)
          context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawLineDiff(fromLocation) {
        var ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.setLineDash([5,15]);
        ctx.moveTo(fromLocation.xPosition + TextResource.pinWidth, fromLocation.yPosition + TextResource.pinHeight);
        ctx.lineTo(this.npc.location.xPosition, this.npc.location.yPosition);
        ctx.stroke();
   }

  private loadImage(context,x,y,isPlayer){
	var imageObj = new Image();
    imageObj.src = isPlayer ? TextResource.pinUrl : TextResource.pin2Url;
    imageObj.onload = function() {
        context.drawImage(imageObj, x, y, TextResource.pinWidth, TextResource.pinHeight);
    };
  }
  
  private pushHome() {
      this.navCtrl.push(HomePage);
  }

  private pinchEvent(event) {
      console.log(event);
  }
 
}




