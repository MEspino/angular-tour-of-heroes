import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { debounce } from 'rxjs/operators/debounce';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heores$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private _heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heores$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this._heroService.searchHeroes(term)),
    );
  }

}
