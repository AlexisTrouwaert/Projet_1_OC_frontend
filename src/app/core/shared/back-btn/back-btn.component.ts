import { Component } from '@angular/core';

@Component({
  selector: 'app-back-btn',
  standalone: true,
  imports: [],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.scss'
})
export class BackBtnComponent {

  //permet de retourner en arriere dans l'historique du navigateur
  back(): void {
    history.back();
  }
}
