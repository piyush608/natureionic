import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BUSINESS_URL, RECIPE_URL, HUNTEDPRODUCT_URL, BASE_URL, FORUM_URL, SEARCH_URL } from '../../app/app.url.config';

@Injectable()
export class SearchProvider {

  constructor(public http: HttpClient) {
  }

  getTopSearches() {
    return this.http.get(SEARCH_URL + '/getTopSearches');
  }

  createKeyword(keyword) {
    return this.http.post(SEARCH_URL + '/createKeyword', keyword);
  }

  updateKeyword(keywordId) {
    return this.http.patch(SEARCH_URL + '/updateKeyword/' + keywordId, keywordId);
  }

  searchedExistsKeywords(query) {
    return this.http.get(SEARCH_URL + '/getExistKeyword', { params: 
      {
        name: query.name
      }
    });
  }

  searchedKeywords(query) {
    return this.http.get(SEARCH_URL + '/getSearchResults', { params: 
      {
        name: query.name
      }
    });
  }

  searchHashtags(query) {
    return this.http.get(FORUM_URL + '/getSearchedHasgtags', { params: 
      {
        name: query.name
      }
    });
  }

  searchedBusinesses(query) {
    return this.http.get(BUSINESS_URL + '/getSearchedBusinesses', { params: 
      {
        name: query.name
      }
    });
  }

  searchedRecipes(query) {
    return this.http.get(RECIPE_URL + '/getSearchedRecipes', { params: 
      {
        name: query.name
      }
    });
  }

  searchedHuntedProducts(query) {
    return this.http.get(HUNTEDPRODUCT_URL + '/getSearchedHuntedProducts', { params: 
      {
        name: query.name
      }
    });
  }

  searchedUsers(query) {
    return this.http.get(BASE_URL + '/getSearchedUsers', { params: 
      {
        name: query.name
      }
    });
  }

  searchedForums(query) {
    return this.http.get(FORUM_URL + '/getSearchedForums', { params: 
      {
        name: query.name
      }
    });
  }
}