import { Component } from '@angular/core';
import { ReportComponent } from '../components/report/report/report.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReportComponent, MatListModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}
