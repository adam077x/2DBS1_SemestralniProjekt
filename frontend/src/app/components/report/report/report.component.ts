import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    MatListModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

}
