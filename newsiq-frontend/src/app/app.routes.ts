import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SavedInsightsComponent } from './pages/saved-insights/saved-insights';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'saved-insights', component: SavedInsightsComponent }
];