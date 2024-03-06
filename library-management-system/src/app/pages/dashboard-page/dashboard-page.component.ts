import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ReadersComponent } from './readers/readers.component';
import { NavbarComponent } from './common/navbar/navbar.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, NavbarComponent, ReadersComponent, RouterModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
