import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-analysis-result',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './analysis-result.html',
  styleUrls: ['./analysis-result.css']
})
export class AnalysisResultComponent {
  @Input() analysis: any;
}