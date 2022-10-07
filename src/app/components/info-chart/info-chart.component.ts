import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-chart',
  templateUrl: './info-chart.component.html',
  styleUrls: ['./info-chart.component.css']
})
export class InfoChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  jugadasAmarillo = 0;
  jugadasRojo = 0;
  partidasGanadasAmarillo = 0;
  partidasGanadasRojo = 0;
}
