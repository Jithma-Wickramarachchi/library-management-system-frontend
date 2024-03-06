import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReadersComponent } from './pages/dashboard-page/readers/readers.component';
import { BooksComponent } from './pages/dashboard-page/books/books.component';
import { TransactionsComponent } from './pages/dashboard-page/transactions/transactions.component';
import { FinesComponent } from './pages/dashboard-page/fines/fines.component';
import { ReportsComponent } from './pages/dashboard-page/reports/reports.component';

export const routes: Routes = [
    { path : '', component : HomePageComponent},
    { path : 'dashboard-page', component : DashboardPageComponent,
        children: [
            { path : 'readers', component : ReadersComponent},
            { path : 'books', component : BooksComponent},
            { path : 'transactions', component : TransactionsComponent},
            { path : 'fines', component : FinesComponent},
            { path : 'reports', component : ReportsComponent}
        ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
