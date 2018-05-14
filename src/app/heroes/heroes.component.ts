import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, Subject } from 'rxjs';
import { combineLatest, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  public heroes$: Observable<Hero[]>;

  private refreshTrigger$: Subject<void>;
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.refreshTrigger$ = new Subject();
    this.heroes$ = this.refreshTrigger$.pipe(
      startWith(null),
      switchMap(() => this.heroService.getHeroes())
    );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.heroService.addHero({ name } as Hero).subscribe(() => this.refreshTrigger$.next());
  }
  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(() => this.refreshTrigger$.next());
  }
}
