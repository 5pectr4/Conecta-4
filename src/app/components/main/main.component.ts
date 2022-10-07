import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent   {
  
  jugadasAmarillo = 0;
  jugadasRojo = 0;
  partidasGanadasAmarillo = 0;
  partidasGanadasRojo = 0;

  setDatos(value:number) { //Array<number>
    this.jugadasAmarillo = value;
    // this.jugadasRojo = value[1];
    // this.partidasGanadasAmarillo = value[2];
    // this.partidasGanadasRojo = value[3];
  }

}
