import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { participations } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { country } from 'src/app/core/models/Olympic';
import { Observable, of } from 'rxjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartDetailsComponent } from 'src/app/core/shared/chart-details/chart-details.component';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgApexchartsModule,
    ChartDetailsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  public olympics$: Observable<country[]> = of([]);
  dataCountry: participations[] = []
  index!: number;
  countryName!: string;
  labels: string[] = []
  totalMedals: number = 0;
  totalAthlete: number = 0;
  series : number[] = []
  axis: number [] = []
  isOffline: boolean = false;

  constructor (
    private route : ActivatedRoute, 
    private olympicService: OlympicService, 
    private router : Router
  ) {
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
    
      this.index = Number(this.route.snapshot.paramMap.get('index'));
      this.olympics$.subscribe((data => {
        if(data && Array.isArray(data) && data.length > 0){
          //Gestion de la redirection vers la page not found si le parametre de l'url est incorrect
          if (this.index < 0 || this.index >= data.length) {
            this.router.navigate(['/not-found']); // Rediriger vers la page "Not Found"
            return; // Sortir de la méthode pour éviter d'accéder aux données
          }
          this.dataCountry = data[this.index].participations
          console.log('Data of country =>',this.dataCountry)
          this.countryName = data[this.index].country
          this.getLabels(this.dataCountry)
          this.getTotalMedals(this.dataCountry)
          this.getTotalAthlete(this.dataCountry)
          this.getAxis(this.dataCountry)
          this.getSerie(this.dataCountry)
        } else {
          console.log('données en cours de chargement')
        }
      }))
  }

  //Permet de récuperer les labels a afficher dans le chart
  getLabels(data: participations[]): void {
    if (Array.isArray(data)) {
      this.labels = data.map(country => country.city);
      console.log('Tableau des labels =>',this.labels)
    } else {
      console.error('data n\'est pas un tableau valide', data);
    }
  }

  //Récupere le total des medails pour un pays
  getTotalMedals(data: participations[]): void {
    if (Array.isArray(data)){
      this.totalMedals = data.reduce((acc, medals) => acc + (medals.medalsCount || 0), 0);
      console.log('Total de médailles =>', this.totalMedals);
    } else {
      console.error('data n\'est pas un tableau valide', data);
    }
  }

  //Récupere le total des athletes pour un pays
  getTotalAthlete(data : participations[]): void {
    if (Array.isArray(data)){
      this.totalAthlete = data.reduce((acc, medals) => acc + (medals.athleteCount || 0), 0);
      console.log('Total des athletes =>', this.totalAthlete);
    } else {
      console.error('data n\'est pas un tableau valide', data);
    }
  }

  //Récupere les valeurs de l'axe x (année)
  getAxis(data : participations[]): void {
    if (Array.isArray(data)) {
      this.axis = data.map(country => country.year);
      console.log('Tableau des axis =>',this.axis)
    } else {
      console.error('data n\'est pas un tableau valide', data);
    }
  }

  //Récupere les valeurs de la serie (medailles) pour un pays et ajuster la courbe du chart
  getSerie(data : participations[]): void{
    if (Array.isArray(data)) {
      this.series = data.map(country => country.medalsCount);
      console.log('Tableau des series =>',this.series)
    } else {
      console.error('data n\'est pas un tableau valide', data);
    }
  }
}
