import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from './common/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, SidebarComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
