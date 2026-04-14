import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NewsService } from '../../services/news.service';
import { ArticleListComponent } from '../../components/article-list/article-list';
import { AnalysisResultComponent } from '../../components/analysis-result/analysis-result';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ArticleListComponent,
    AnalysisResultComponent,MatProgressSpinnerModule,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  title = '';
  url = '';
  original_text = '';
  contextMode = 'Student';
  savedArticleId: number | null = null;

  articles: any[] = [];
  analysisResult: any = null;
  isAnalyzing = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.newsService.getArticles().subscribe({
      next: (data: any) => {
        this.articles = data;
      },
      error: (error) => {
        console.error('Error fetching articles', error);
      }
    });
  }

  isSaveDisabled(): boolean {
  return (
    !this.title.trim() ||
    !this.original_text.trim()
  );
}

isAnalyzeDisabled(): boolean {
  return (
    !this.original_text.trim() ||
    this.isAnalyzing
  );
}

  saveArticle() {

    if (!this.title.trim() || !this.original_text.trim()) {
  alert('Please enter article title and text');
  return;
}
    const articleData = {
      title: this.title,
      url: this.url,
      original_text: this.original_text
    };

    this.newsService.saveArticle(articleData).subscribe({
     next: (response: any) => {
     this.savedArticleId = response.articleId;
        alert('Article saved successfully');
        this.loadArticles();
      },
      error: (error) => {
        console.error('Error saving article', error);
      }
    });
  }

  analyzeArticle() {
    if (!this.original_text.trim()) {
      alert('Please enter article text first');
      return;
    }

    this.isAnalyzing = true;
    this.analysisResult = '';

this.newsService.analyzeArticle(
  this.original_text,
  this.contextMode,
  this.savedArticleId || 1
).subscribe({
      next: (response: any) => {
        this.analysisResult = response.analysis;
        this.isAnalyzing = false;
      },
      error: (error) => {
        console.error('Error analyzing article', error);
        this.isAnalyzing = false;
        alert('Failed to analyze article');
      }
    });
  }
}