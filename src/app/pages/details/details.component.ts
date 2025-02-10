import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { participations } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { country } from 'src/app/core/models/Olympic';
import { Observable, of } from 'rxjs';
import { ChartsComponent } from 'src/app/core/shared/charts/charts.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgApexchartsModule,
    ChartsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  public olympics$: Observable<country[]> = of([]);
  index!: number;
  countryName!: string;
  labels: string[] = []
  series : number[] = []

  constructor (private route : ActivatedRoute, private olympicService: OlympicService) {
    this.olympics$ = this.olympicService.getOlympics();
  }

  ngOnInit(): void {
      this.index = Number(this.route.snapshot.paramMap.get('index'));
      this.olympics$.subscribe((data => {
        if(data && Array.isArray(data) && data.length > 0){
          this.countryName = data[this.index].country
          this.getLabels(data)
          this.getMedalsCount(data)
        } else {
          console.log('données en cours de chargement')
        }
      }))
  }

  getLabels(data: country[]): void {
    if (Array.isArray(data)) {
      this.labels = data[this.index].participations.map(country => country.city);
      console.log('labels',this.labels)
    } else {
      console.error('data n\'est pas un tableau valide', data);
    }
  }

  getMedalsCount(data: country[]): void {
    if (Array.isArray(data)){
      this.series = data.map(country => {
        return country.participations?.reduce((acc: number, participation: participations) => acc + participation.medalsCount, 0);
      });
      console.log('Series:', this.series);
    } else {
      console.error('data n\'est pas un tableau valide', data);
    }
  }
}
