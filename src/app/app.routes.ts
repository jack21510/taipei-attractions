import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'attractions',
    loadComponent: () =>
      import('./pages/attractions/attractions-list.component').then(
        (m) => m.AttractionsListComponent
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
  { path: '', redirectTo: 'attractions', pathMatch: 'full' },
];
