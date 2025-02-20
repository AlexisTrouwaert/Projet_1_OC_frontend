import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { country } from 'src/app/core/models/Olympic';
import { map } from 'rxjs';
import { participations } from 'src/app/core/models/Participation';
import { ChartsComponent } from 'src/app/core/shared/charts/charts.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgApexchartsModule,
    ChartsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<country[]> = of([]);
  olympicsData: country[] = []
  nbJo: number = 0
  isOffline: boolean = false;
  labels: string[] = []
  series : number[] = []

  constructor(private olympicService: OlympicService, private router: Router) {
    this.olympics$ = this.olympicService.getOlympics().pipe(
          catchError((error) => {
            console.error('Erreur lors du chargement des données', error);
            this.router.navigate(['/not-found']); // Rediriger en cas d'échec de la requête
            return of([]); // Retourne un tableau vide pour éviter le crash
          })
        );
      
  }

  ngOnInit(): void {

    this.isOffline = !navigator.onLine;
    if (this.isOffline) {
      console.error("Vous êtes hors ligne.");
      this.router.navigate(['/not-found']); // Redirection si pas de connexion
      return;
    }


    this.olympics$.subscribe((data => {

      if(data && Array.isArray(data) && data.length > 0){
        this.olympicsData = data
        this.getLabels(data)
        this.getMedalsCount(data)
        this.nbJo = data[0].participations.length
      } else {
        console.log('données en cours de chargement')
      }
    }))
  }

  //Permet de récuperer les labels a afficher dans le chart
  getLabels(data: country[]): void {
    if (Array.isArray(data)) {
      this.labels = data.map(country => country.country);
      console.log(this.labels)
    } else {
      console.error('data n\'est pas un tableau valide', data);
    }
  }

  //Récupere le total des medails de chaque pays
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
