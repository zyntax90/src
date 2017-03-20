import { Component } from '@angular/core';

@Component({
  selector: 'page-location',
})
export class Location {

  private index : number;
  public xPosition : number;
  public yPosition : number;
  public name: string;
	
  constructor() {
	this.xPosition = 0;
	this.yPosition = 0;
    this.name = "";
  }
  
  public isValid():boolean{
	if(this.name.length > 0 && this.name.length <= 30){
		return true;
	}else{
		return false;
	}
  }

  
}
