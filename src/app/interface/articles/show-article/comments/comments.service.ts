import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

import { Comments } from './comment.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommentsServices {

    // ------------------------- Comments DB Link
    urlPost = 'https://smartslimenglishproject.firebaseio.com/comments/';

    commentsChanged = new Subject<Comments[]>();
    startedEditing = new Subject<number>();
    private comments: Comments[] = [];

    constructor(private http: HttpClient, private db: AngularFireDatabase) { }

    // ----------------------------------Get Comments By Article ID
    getComments(articleKey: string) {
        return this.db.list<Comments[]>('/comments/' + articleKey)
            .snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(c => {
                        const data = c.payload.val() as Comments[];
                        const id = c.payload.key;
                        const finalComments = { id, ...data };
                        return finalComments;
                    })
                )
            )
    }

    // ----------------------------------Set Comments
    setComments(articleKey: string) {
        this.getComments(articleKey)
            .subscribe((comments: Comments[]) => {
                this.comments = comments;
                this.commentsChanged.next(this.comments.slice());
            });
    }

    // -----------------------------------------------Add Comment
    addComment(comment: Comments, articleKey: string) {
        this.comments.push(comment);
        this.commentsChanged.next(this.comments.slice());
        return this.http.post(this.urlPost + articleKey + '.json', comment);
    }

    // --------------------------------------------------------------------------------Edit Comment
    updateComment(index: number, id: string, newComment: Comments, articleKey: string) {
        this.comments[index] = newComment;
        this.commentsChanged.next(this.comments.slice());
        return this.http.patch(this.urlPost + articleKey + '/' + id + '.json', newComment);
    }

    // ----------------------------------Delete Comment
    deleteComment(index: number) {
        this.comments.splice(index, 1);
        this.commentsChanged.next(this.comments.slice());
    }

}