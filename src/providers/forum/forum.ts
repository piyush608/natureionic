import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FORUM_URL } from '../../app/app.url.config';

export interface Comment {
  addedBy: string;
  comment: string;
}
@Injectable()
export class ForumProvider {
  nextQuery: any;

  constructor(public http: HttpClient) {
  }

  addForum(forum) {
    return this.http.post(FORUM_URL + '/createForum', forum);
  }

  uploadForumImage(forumId, photoId) {
    return this.http.patch(FORUM_URL + '/uploadImages/' + forumId, { photoId: photoId });
  }

  getForumDetails(id) {
    return this.http.get(FORUM_URL + '/getForum/' + id);
  }

  getUpdatedLikesDislikes(id) {
    return this.http.get(FORUM_URL + '/getUpdatedLikesDislikes/' + id);
  }

  getUpdatedComments(id) {
    return this.http.get(FORUM_URL + '/getUpdatedComments/' + id);
  }

  getLatestForums() {
    return this.http.get(FORUM_URL + '/getLatestForums');
  }

  getNextLatestForums(skip) {
    return this.http.get(FORUM_URL + '/getNextLatestForums/' + parseInt(skip));
  }

  getTrendingForums() {
    return this.http.get(FORUM_URL + '/getTrendingForums');
  }

  getNextTrendingForums(skip) {
    return this.http.get(FORUM_URL + '/getNextTrendingForums/' + parseInt(skip));
  }

  getHashTag(id) {
    return this.http.get(FORUM_URL + '/getHashTag/' + id);
  }

  addHashTag(hashTag) {
    return this.http.post(FORUM_URL + '/createTag', hashTag);
  }

  addComment(forumId, comment) {
    return this.http.patch(FORUM_URL + '/addComment/' + forumId, comment);
  }
}