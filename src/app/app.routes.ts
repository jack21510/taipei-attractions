import { Routes } from '@angular/router';
import { AttractionsListComponent } from './pages/attractions/attractions-list.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'attractions' },
  { path: 'attractions', component: AttractionsListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', redirectTo: 'attractions' },
];
