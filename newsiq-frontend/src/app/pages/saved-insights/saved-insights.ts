import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-saved-insights',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './saved-insights.html',
  styleUrls: ['./saved-insights.css']
})
export class SavedInsightsComponent implements OnInit {
  insights: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadInsights();
  }

  loadInsights() {
    this.newsService.getInsights().subscribe({
      next: (data: any) => {
        this.insights = data;
      },
      error: (error) => {
        console.error('Error fetching insights', error);
      }
    });
  }

  parseKeyPoints(points: string): string[] {
    try {
      return JSON.parse(points);
    } catch {
      return [];
    }
  }
}