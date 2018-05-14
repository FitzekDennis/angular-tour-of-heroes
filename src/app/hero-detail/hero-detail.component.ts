import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {
  // Hero war kein Input, da es nur in getHero gesetzt wird, nie von außen.
  public hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hero$ = this.route.paramMap.pipe(
      map(params => +params.get('id')),
      switchMap(id => this.heroService.getHero(id))
    );
  }

  goBack(): void {
    // Nicht mit location.back() arbeiten, weil das nicht zwangsweise das dashboard ist.
    this.router.navigate(['/dashboard']);
  }

  save(hero: Hero): void {
    this.heroService.updateHero(hero)
    .subscribe(() => this.goBack());
  }
}
