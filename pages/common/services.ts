import { Component } from '@angular/core';


@Component({
  selector: 'page-service',
})
export class FileService {
    public static saveLocations(locations):void {
        window.localStorage.setItem("Locations", JSON.stringify(locations));
    }

    public static loadLocations(): Array<Location> {
        //window.localStorage.removeItem('Locations');
        return JSON.parse(window.localStorage.getItem('Locations'));
    }
    
   
}
