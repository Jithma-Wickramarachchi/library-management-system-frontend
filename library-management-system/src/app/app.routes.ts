import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReadersComponent } from './pages/dashboard-page/readers/readers.component';

export const routes: Routes = [
    { path : '', component : HomePageComponent},
    { path : 'dashboard-page', component : DashboardPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
