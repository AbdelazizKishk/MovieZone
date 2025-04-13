import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    title: 'Home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'moives',
    loadComponent: () =>
      import('./pages/moives/moives.component').then((m) => m.MoivesComponent),
    title: 'moives',
  },
  {
    path: 'tvShows',
    loadComponent: () =>
      import('./pages/tv-shows/tv-shows.component').then(
        (m) => m.TvShowsComponent
      ),
    title: 'TvShows',
  },
  {
    path: 'detalis/:id',
    loadComponent: () =>
      import('./pages/detalis/detalis.component').then(
        (m) => m.DetalisComponent
      ),
    title: 'Detalis Movie',
  },
  {
    path: 'detalisTv/:id',
    loadComponent: () =>
      import('./pages/detalis-tv/detalis-tv.component').then(
        (m) => m.DetalisTvComponent
      ),
    title: 'Detalis Tv',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
    title: 'Error',
  },
];
