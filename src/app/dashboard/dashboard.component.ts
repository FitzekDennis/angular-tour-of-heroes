import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // Hatten wir ja schon drüber gesprochen, so stellt man das um
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // So sieht das ganze aus, wenn man das mit der async pipe macht, kein subscribe mehr, das übernimmt die pipe.
    // War es absicht, dass das erste Element übersprungen wird? (Arrayindex ist 0-basiert)
    this.heroes$ = this.heroService.getHeroes().pipe(map(heroes => heroes.slice(0, 5)));
  }
}
