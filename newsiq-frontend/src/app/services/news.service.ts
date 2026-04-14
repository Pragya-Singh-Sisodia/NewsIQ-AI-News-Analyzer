import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private articleApiUrl = `${environment.apiBaseUrl}/articles`;
private analyzeApiUrl = `${environment.apiBaseUrl}/analyze`;

  constructor(private http: HttpClient) {}

  saveArticle(article: any) {
    return this.http.post(this.articleApiUrl, article);
  }

  getArticles() {
    return this.http.get(this.articleApiUrl);
  }


  getInsights() {
 return this.http.get(`${environment.apiBaseUrl}/articles/insights/all`);
}
 analyzeArticle(articleText: string, contextMode: string, articleId: number) {
    return this.http.post(this.analyzeApiUrl, {
  articleText: articleText,
  contextMode: contextMode,
  articleId: articleId
});
  }
}