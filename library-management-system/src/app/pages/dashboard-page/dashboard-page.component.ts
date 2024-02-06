import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ReadersComponent } from './readers/readers.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, SidebarComponent, ReadersComponent, RouterModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
