import { Subscription } from "rxjs/Subscription";
import { Component, Input } from "@angular/core";
import { User } from "../../models/user.model";

@Component({
  selector: "forum-comment",
  templateUrl: "forum-comment.html"
})
export class ForumCommentComponent {
  @Input("forumId") forumId: string;
  @Input("data") comment: any;
  commentLike$: Subscription;
  commentDislike$: Subscription;
  isLiked: any;
  isDisliked: any;
  liked: boolean;
  disliked: boolean;
  likes: number;
  dislikes: number;
  user = new User();
  publishedTime;
  postedBy;
  authorImage;

  constructor() {}

  ngOnInit() {
    this.getCommentTimestamp();
    setInterval(() => {
      this.getCommentTimestamp();
    }, 45000);
  }

  ngOnDestroy() {}

  getCommentTimestamp() {
    let originalDate = new Date(this.comment.date);
    let endDate = new Date();

    if (
      (endDate.getTime() - originalDate.getTime()) / (1000 * 60 * 60 * 24) >=
      1
    )
      this.publishedTime =
        parseInt(
          (
            (endDate.getTime() - originalDate.getTime()) /
            (1000 * 60 * 60 * 24)
          ).toString()
        ) + "d ago";
    else {
      if ((endDate.getTime() - originalDate.getTime()) / (1000 * 60 * 60) >= 1)
        this.publishedTime =
          parseInt(
            (
              (endDate.getTime() - originalDate.getTime()) /
              (1000 * 60 * 60)
            ).toString()
          ) + "h ago";
      else {
        if ((endDate.getTime() - originalDate.getTime()) / (1000 * 60) >= 1)
          this.publishedTime =
            parseInt(
              (
                (endDate.getTime() - originalDate.getTime()) /
                (1000 * 60)
              ).toString()
            ) + "m ago";
        else {
          if ((endDate.getTime() - originalDate.getTime()) / 1000 >= 1)
            this.publishedTime =
              parseInt(
                ((endDate.getTime() - originalDate.getTime()) / 1000).toString()
              ) + "s ago";
          else this.publishedTime = " now";
        }
      }
    }
  }

  like() {
    if (this.isLiked.flag === true) {
      this.likes -= 1;
      this.isLiked.flag = !this.isLiked.flag;
    } else {
      this.likes += 1;
      this.isLiked.flag = !this.isLiked.flag;
      if (this.isDisliked.flag === true) {
        this.dislikes -= 1;
        this.isDisliked.flag = !this.isDisliked.flag;
      }
    }
  }

  dislike() {
    if (this.isDisliked.flag === true) {
      this.dislikes -= 1;
      this.isDisliked.flag = !this.isDisliked.flag;
    } else {
      this.dislikes += 1;
      this.isDisliked.flag = !this.isDisliked.flag;
      if (this.isLiked.flag === true) {
        this.likes -= 1;
        this.isLiked.flag = !this.isLiked.flag;
      }
    }
  }
}
