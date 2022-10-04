import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { InfoChartComponent } from './components/info-chart/info-chart.component'


@NgModule({

  //Vistas que pertenecen al modulo
  declarations: [
    AppComponent,
    GameComponent,
    InfoChartComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
