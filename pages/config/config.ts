import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Common } from '../common';
import { App } from 'ionic-angular';
import { Gesture } from 'ionic-angular';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
 
  @ViewChild('cnvs') element;
  gesture: Gesture
 
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
   this.canvas.width = this.canvas.offsetWidth;
   this.canvas.height = this.canvas.offsetHeight;
   
   
     this.gesture = new Gesture(this.element.nativeElement);    
    
    //listen for the gesture
    this.gesture.listen();
    
    //turn on listening for pinch or rotate events
    this.gesture.on('pinch', e => console.log(e));
    
    //add event listener
    this.gesture.on('pinch', () => console.log('pinch end event'));
  }
  
  public pinchEvent(e){
 }
  
  
 
  public setCoordinate(canvas,event){
    if(this.isVisible == "hidden"){
		this.isVisible = "visible";
	}
	var rect = this.canvas.getBoundingClientRect();
	this.xPos = event.clientX - rect.left;
	this.yPos = event.clientY - rect.top;
	
	var context = this.canvas.getContext("2d");
	this.loadImage(context,this.xPos,this.yPos);
  }
  
  private loadImage(context,x,y){
	var imageObj = new Image();
    imageObj.src = Common.pinUrl;
    imageObj.onload = function() {
		context.drawImage(imageObj, x, y, 20, 20);
    };
  }
  
  public pushHome(){
	this.navCtrl.push(HomePage);
  }
 
}





