import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Common } from '../common';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
 
  private xPos : number;
  private yPos : number;
  
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public imgPinSource : string;
  public imgMapSource : string;
  public isVisible : string;
  
  constructor(public navCtrl: NavController,public app: App) {
   this.xPos = 0;
   this.yPos = 0;
   this.imgPinSource = Common.pinUrl;
   this.imgMapSource = Common.mapUrl;
   this.isVisible = 'hidden';
  }
  
  ionViewDidLoad() {
   this.canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  }
  
 
  public setCoordinate(event){
    if(this.isVisible == "hidden"){
		this.isVisible = "visible";
	}
	
	this.xPos = event.x;
	this.yPos = event.y;
	
	var context = this.canvas.getContext("2d");
	this.loadImage(context,Common.pinUrl,this.xPos,this.yPos);
	/*var pinImg = new Image();
	pinImg.coords={this.xPos,this.xPos,this.yPos,this.yPos}
	pinImg.onload = function() {
		context.drawImage(pinImg, pinImg.coords.x, pinImg.coords.y);
	};
	
	pinImg.src = Common.pinUrl;	*/
  }
  
  private loadImage(context,src,x,y){
	var imageObj = new Image();
    imageObj.src = Common.pinUrl;
    imageObj.onload = function() {
		alert("drawing");
        context.drawImage(imageObj, 100, 100,10,10);
    };
  }
  
  public pushHome(){
	this.navCtrl.push(HomePage);
  }

}


