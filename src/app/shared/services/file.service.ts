import { Injectable } from '@angular/core';
import { Design } from '../models/design';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public currentDesign : Design | null = null;
  public hasPendingChanges : boolean = false ;
  
  constructor() { }

  public export() : string {
    return JSON.stringify(this.currentDesign) ;
  }

  public import(fileContent: string) {
    try {
      this.currentDesign = JSON.parse(fileContent) ;
    }
    catch (e) 
    {
      console.log({exception:e}) ;
      this.currentDesign = null ;
    }
  }
}
