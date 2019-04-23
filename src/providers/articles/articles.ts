import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ARTICLE_URL } from '../../app/app.url.config';

@Injectable()
export class ArticlesProvider {

  constructor(public http: HttpClient) {
  }

  getArticles() {
    return this.http.get(ARTICLE_URL + '/getFeaturedArticles');
  }

  getArticlesOredrByCat(catId) {
    return this.http.get(ARTICLE_URL + '/getCategpryArticles/' + catId);
  }

  getArticleCategories() {
    return this.http.get(ARTICLE_URL + '/getCategories');
  }

  getArticleCategory(catId) {
    return this.http.get(ARTICLE_URL + '/getCategory/' + catId);
  }

  getArticleDetails(articleId) {
    return this.http.get(ARTICLE_URL + '/getArticle/' + articleId);
  }
}
