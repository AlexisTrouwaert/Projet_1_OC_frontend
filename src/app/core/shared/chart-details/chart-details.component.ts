import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { ApexChart, ApexLegend, ApexResponsive, ApexTitleSubtitle, ApexDataLabels, ApexPlotOptions, ApexStroke, ApexXAxis, ApexYAxis, ApexTooltip } from "ng-apexcharts";
import { NgApexchartsModule } from 'ng-apexcharts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart-details',
  standalone: true,
  imports: [
    NgApexchartsModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './chart-details.component.html',
  styleUrl: './chart-details.component.scss'
})
export class ChartDetailsComponent {
  @Input() series: number[] = []; // Les données pour le graphique
  @Input() labels: string[] = []; // Les labels des données
  @Input() axis: number[] = [] //Les valeurs de l'abscisse du graphique
  
  constructor (private router : Router) {
  
  }
  
  ngOnChanges(): void {
    this.updateChart();
  }
  
  updateChart(): void {
    this.chartOptions = {
      series: [{
        name : 'Medals Count',
        data : this.series,
      }],
      chart: { 
        width: '100%', 
        type: "line",
        zoom : {
          enabled: false,
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Medals',
        align: 'left',
        style: {
          color: 'black'
        }
      },
      grid: {
        row: {
          colors: ['#f3f3f35e', '#f3f3f3a8'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: this.axis,
        labels: {
          style : {
            colors: 'black'
          }
        }
      },
      yaxis: {
        min: 0,
        labels:{
          style:{
            colors: ['#000000']
          }
        }
      },
      tooltip: {
        theme: "dark"
      } as ApexTooltip,
      responsive: [{
        breakpoint: 463,
        options: {
          chart: { width: 200 },
          legend: { position: "bottom" }
        }
      }],
    };
  }
  
  chartOptions = {
    series: [{
      name : 'Medals Count',
      data : this.series,
    }],
    chart: {
      width: '100%',
      type: "line",
      zoom : {
        enabled: false,
      }
    } as ApexChart,
    dataLabels: {
      enabled: false, // Désactive les pourcentages
    },
    stroke: {
      curve: 'straight'
    } as ApexStroke,
    title: {
      text: 'Product Trends by Month',
      align: 'left',
      style: {
        color: 'white'
      }
    } as ApexTitleSubtitle,
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: this.axis,
      labels: {
        style : {
          colors: 'white'
        }
      }
    } as ApexXAxis,
    yaxis: {
      min: 0,
      labels:{
        style:{
          colors: 'white'
        }
      }
    } as ApexYAxis,
    tooltip: {
      theme: "dark" 
    } as ApexTooltip,
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




