import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApexChart, ApexLegend, ApexResponsive, ApexTitleSubtitle, ApexDataLabels, ApexPlotOptions } from "ng-apexcharts";
import { NgApexchartsModule } from 'ng-apexcharts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    NgApexchartsModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})


export class ChartsComponent {
  @Input() series: number[] = []; // Les données pour le graphique
  @Input() labels: string[] = []; // Les labels des données

  constructor (private router : Router) {

  }

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(): void {
    this.chartOptions = {
      series: this.series,
      chart: { 
        width: '100%', 
        type: "pie",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log('clicked on index', config.dataPointIndex)
            this.router.navigate(['/details/', config.dataPointIndex])
          }
        }
      },
      labels: this.labels,
      dataLabels: {
        enabled: false, // Désactive les pourcentages
      },
      plotOptions: {
        pie: {
          expandOnClick: true // Agrandit la part cliquée
        }
      },
      responsive: [{
        breakpoint: 870,
        options: {
          chart: { width: 250 },
          legend: { position: "bottom" }
        }
      }],
    };
  }

  chartOptions = {
    series: this.series,
    chart: {
      width: '100%',
      type: "pie",
    } as ApexChart,
    labels: this.labels,
    dataLabels: {
      enabled: false, // Désactive les pourcentages
    },
    plotOptions: {
      pie: {
        expandOnClick: true // Agrandit la part cliquée
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          } as ApexLegend
        }
      }
    ] as ApexResponsive[],
  };
}