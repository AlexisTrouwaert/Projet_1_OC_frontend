import { Component, Input } from '@angular/core';
import { ApexChart, ApexLegend, ApexResponsive, ApexTitleSubtitle, ApexDataLabels } from "ng-apexcharts";
import { NgApexchartsModule } from 'ng-apexcharts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(): void {
    this.chartOptions = {
      series: this.series,
      chart: { width: 780, type: "pie" },
      labels: this.labels,
      dataLabels: {
        enabled: false, // Désactive les pourcentages
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: "bottom" }
        }
      }],
      title: { text: "Répartition des médailles par pays", align: 'center'},
    };
  }

  chartOptions = {
    series: this.series,
    chart: {
      width: 380,
      type: "pie",
    } as ApexChart,
    labels: this.labels,
    dataLabels: {
      enabled: false, // Désactive les pourcentages
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
    title: {
      text: "Chargement des données"
    } as ApexTitleSubtitle
  };
}