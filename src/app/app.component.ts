import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { BackBtnComponent } from './core/shared/back-btn/back-btn.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService, private router : Router) {}

  hiddenRoute: string[] = ['/'];
  hiddenBackBtn: boolean = false;

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
    this.router.events.subscribe(() => {
      this.hiddenBackBtn = this.hiddenRoute.includes(this.router.url);
    });
  }
}
