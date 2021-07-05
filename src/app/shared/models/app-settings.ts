import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class AppSettings {
    public selectLayerWhileDragging : boolean = false ;
}
