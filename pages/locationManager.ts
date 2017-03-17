import { Component } from '@angular/core';
import { FileService } from '../pages/services';
@Component({
  selector: 'page-location'
})
export class LocationManager {
 
    private static instance: LocationManager = new LocationManager();
    private locations: Array<Location> = FileService.loadLocations();
        
    constructor() {
        if (LocationManager.instance) {
            throw new Error("Singeleton Exception");
        }
        
        LocationManager.instance = this;
    }

    public static getInstace(): LocationManager {
        return LocationManager.instance;
    }

    public addLocation(location):void {
        this.locations.push(location);
    }

    public getLocations(): Array<Location> {
        return this.locations;
    }

    /*public getLocation(index): Location {
        return this.locations.filter(location => location.index === index)[0];
    }*/
}
