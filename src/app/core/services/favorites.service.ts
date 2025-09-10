import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Attraction } from '../models/attraction.model';
import { StorageUtil } from '../utils/storage.util';

type Favorite = Attraction;

const LS_KEY = 'favorites_v1';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private _fav$ = new BehaviorSubject<Favorite[]>(
    StorageUtil.getJSON<Favorite[]>(LS_KEY, [])
  );
  readonly favorites$ = this._fav$.asObservable();

  private persist() {
    StorageUtil.setJSON(LS_KEY, this._fav$.value);
  }

  list(): Favorite[] {
    return this._fav$.value;
  }

  upsert(items: Favorite[]) {
    const map = new Map<number, Favorite>(this._fav$.value.map(x => [x.id, x]));
    for (const it of items) map.set(it.id, { ...map.get(it.id), ...it });
    this._fav$.next([...map.values()]);
    this.persist();
  }

  remove(ids: number[]) {
    const next = this._fav$.value.filter(x => !ids.includes(x.id));
    this._fav$.next(next);
    this.persist();
  }

  updateOne(id: number, patch: Partial<Favorite>) {
    const next = this._fav$.value.map(x => x.id === id ? { ...x, ...patch } : x);
    this._fav$.next(next);
    this.persist();
  }

  has(id: number) { return this._fav$.value.some(x => x.id === id); }
}
