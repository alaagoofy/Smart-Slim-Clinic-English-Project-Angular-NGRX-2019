import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommentsServices } from './comments.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as authReducers from '../../../../Auth/store/auth.reducers'
import { User } from 'src/app/Auth/user.interface';
import { Comments } from './comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit, OnDestroy {

  @Input() articleKey: string;
  user: User;
  comments: Comments[] = [];
  subScription: Subscription;
  totalComments: number;
  checkComments = false;
  editedComment: string = '';
  commentText: string = '';

  constructor(private commentsServices: CommentsServices, private store: Store<authReducers.FeatureState>) { }

  ngOnInit() {
    // -----------------------------------------------------GET AND SET COMMENTS
    this.commentsServices.setComments(this.articleKey);
    this.subScription = this.commentsServices.commentsChanged
      .subscribe((comments: Comments[]) => {
        if (comments.length !== 0) {
          this.comments = comments;
          this.checkComments = false;
          this.totalComments = this.comments.length;
        } else {
          this.totalComments = 0;
        }
      });
    this.store.select('auth').subscribe(user => {
      this.user = user.user;
    })
  }
  // --------------------------------Save New Comment
  save(comment) {
    this.checkComments = false;
    let finalComment = {
      userName: this.user.name,
      userEmail: this.user.email,
      comment: comment.comment,
      userImage: this.user.avatar,
      dateTime: new Date()
    };
    this.commentsServices.addComment(finalComment, this.articleKey).subscribe();
    this.commentText = '';
  }

  // --------------------------------Show comment textbox
  onEdit(id: string) {
    (document.querySelector('.' + id) as HTMLElement).style.display = 'none';
    this.editedComment = id;
  }

  // --------------------------------Cancel Editing Comment
  cancel(id: string) {
    (document.querySelector('.' + id) as HTMLElement).style.display = 'block';
    this.editedComment = '';
  }


  // --------------------------------Edit Comment
  edit(i: number, id: string, comment: string) {
    let finalComment = {
      userName: this.user.name,
      userEmail: this.user.email,
      comment: comment,
      userImage: this.user.avatar,
      dateTime: new Date()
    };
    this.commentsServices.updateComment(i, id, finalComment, this.articleKey).subscribe();
    (document.querySelector('.' + id) as HTMLElement).style.display = 'block';
    this.editedComment = '';
  }

  // --------------------------------Clear Subscription
  ngOnDestroy() {
    this.subScription.unsubscribe();
  }
}
