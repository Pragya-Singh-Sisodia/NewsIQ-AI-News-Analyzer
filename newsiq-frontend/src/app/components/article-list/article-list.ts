import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './article-list.html',
  styleUrls: ['./article-list.css']
})
export class ArticleListComponent {
  @Input() articles: any[] = [];
}